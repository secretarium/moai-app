import { ClearKeyPair, Key, SCP, Transaction, Utils } from '@secretarium/connector';
import { REACT_APP_SECRETARIUM_GATEWAYS } from '@env';

interface SecretariumGatewayConfig {
    key: string;
    gateways: Array<{
        endpoint: string;
        name: string;
    }>;
}

interface SecretariumClusterConfig {
    [cluster: string]: SecretariumGatewayConfig;
}

interface ConnectionInformation {
    cluster: string;
    endpoint: string;
    gateway: string;
    socket: SCP;
}

const handlerStore: {
    currentConnection: SCP;
    currentKey?: Key;
    clusters?: SecretariumClusterConfig;
    fileService?: string;
} = {
    currentConnection: new SCP(),
    currentKey: undefined
};

const gatewaysConfigReducer = (config: SecretariumClusterConfig, current: string): SecretariumClusterConfig => {
    const record = current.split('#');
    if (record.length !== 4) return config;
    config[record[0]] = {
        key: record[3],
        gateways: (config[record[0]]?.gateways ?? []).concat([
            {
                endpoint: record[2],
                name: record[1]
            }
        ])
    };
    return config;
};

const printClusterInfo = (): void => {

    if (!handlerStore.clusters)
        return;

    const printableConfig: {
        [key: string]: string;
    } = {};

    Object.entries(handlerStore.clusters).forEach(([name, configuration], cindex) => {
        printableConfig[`c${cindex}_name`] = name;
        printableConfig[`c${cindex}_key`] = configuration.key;
        configuration.gateways.forEach((gateway, gindex) => {
            printableConfig[`c${cindex}_g${gindex}_name`] = gateway.name;
            printableConfig[`c${cindex}_g${gindex}_endpoint`] = gateway.endpoint;
        });
    });

    console.info('Moai now using the following cluster configuration:');
    console.table(printableConfig);
};

const processClusterConfig: Window['moaiCluster'] = (config) => {
    if (typeof config === 'string')
        handlerStore.clusters = config.split(',').reduce<SecretariumClusterConfig>(gatewaysConfigReducer, {});
    else
        handlerStore.clusters = config as SecretariumClusterConfig;
    printClusterInfo();
};

let currentGateway = -1;

const secretariumHandler = {
    initialize: (): void => {

        let clusterConfigBase = REACT_APP_SECRETARIUM_GATEWAYS ?? '';

        fetch(`/config.json?v=${process.env.REACT_APP_VERSION}&t=${Date.now()}`)
            .then(response => response.json())
            .then((config: any) => {
                if (config.SECRETARIUM_GATEWAYS)
                    clusterConfigBase = config.SECRETARIUM_GATEWAYS;
                if (config.CFA_SERVICES)
                    handlerStore.fileService = config.CFA_SERVICES;
                processClusterConfig(clusterConfigBase);
                console.info('Moai now using config.json overrides');
            })
            .catch(() => {
                processClusterConfig(clusterConfigBase);
            });

    },
    createDeviceKey: (): Promise<Key> =>
        new Promise((resolve, reject) => {
            Key.createKey()
                .then((key) => {
                    handlerStore.currentKey = key;
                    resolve(key);
                })
                .catch((e: any) => reject(e));
        }),
    use: (clearKeyPair: ClearKeyPair): Promise<Key> =>
        new Promise((resolve, reject) => {
            Key.importKey(clearKeyPair)
                .then((key) => {
                    handlerStore.currentKey = key;
                    resolve(key);
                })
                .catch((e: any) => reject(e));
        }),
    connect: (): Promise<ConnectionInformation> =>
        new Promise((resolve, reject) => {

            const clusters = Object.entries<SecretariumGatewayConfig>(handlerStore.clusters ?? {});

            if (!handlerStore.clusters)
                return setTimeout(() => {
                    resolve(secretariumHandler.connect());
                }, 500);

            if (!clusters[0]) {
                console.error('There are no cluster configured !');
                return reject('There are no cluster configured !');
            }

            const cluster = clusters[0];
            let nextGateway = currentGateway;
            do {
                nextGateway = Math.floor(Math.random() * cluster[1].gateways.length);
            } while ((nextGateway === currentGateway && cluster[1].gateways?.length > 1) || nextGateway < 0 || nextGateway >= cluster[1].gateways.length);

            currentGateway = nextGateway;
            const endpoint = cluster[1].gateways?.[nextGateway]?.endpoint;
            if (cluster && endpoint && handlerStore.currentKey) {
                console.info('Moai now using the following gateway:', endpoint);
                handlerStore.currentConnection
                    .reset()
                    .connect(endpoint, handlerStore.currentKey, secretariumHandler.utils.fromBase64(cluster[1].key))
                    .then(() => {
                        resolve({
                            cluster: cluster[0],
                            gateway: cluster[1]?.gateways?.[nextGateway]?.name ?? '',
                            endpoint,
                            socket: handlerStore.currentConnection
                        });
                    })
                    .catch((e: Error) => reject(e));
            } else reject('Cluster not configured');
        }),
    disconnect: (): Promise<void> =>
        new Promise(resolve => {
            handlerStore.currentConnection?.reset();
            handlerStore.currentConnection?.close();

            handlerStore.currentConnection = new SCP();
            resolve();
        }),
    request: (dcApp: string, command: string, args: Record<string, unknown>, id?: string): Promise<Transaction> =>
        new Promise((resolve, reject) => {
            if (handlerStore.currentConnection) {
                const queryHandle = handlerStore.currentConnection.newTx(dcApp, command, id, args);
                resolve(queryHandle);
            } else {
                reject('No connection to Secretarium.');
            }
        }),
    utils: Utils
};

if ((process.env.NODE_ENV === 'development' || process.env.REACT_APP_SECRETARIUM_GATEWAYS_OVERWRITABLE === 'true') && window) {
    window['moaiCluster'] = processClusterConfig;
    window['moaiCommand'] = (dcApp, command, args, id): void => {
        secretariumHandler.request(dcApp, command, args ?? {}, id ?? `${Math.random()}`).then(query => {
            query.send();
        });
    };
    window['moaiHandlerStore'] = handlerStore;
}

export default secretariumHandler;