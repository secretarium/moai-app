import { Key, SCP, Transaction, EncryptedKeyPair } from '@secretarium/connector';

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

const handlerStore: {
    currentConnection: SCP;
    currentKey: Key;
    clusters: SecretariumClusterConfig;
} = {
    currentConnection: new SCP(),
    currentKey: undefined,
    clusters: {}
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

const printClusterInfo = () => {
    const printableConfig: {
        [key: string]: string;
    } = {};

    Object.entries(handlerStore.clusters).forEach(([name, configuration], cindex) => {
        printableConfig[`c${cindex}_name`] = name;
        printableConfig[`c${cindex}_key`] = configuration.key;
        configuration.gateways.forEach((gateway, gindex) => {
            printableConfig[`c${cindex}_g${gindex}_name`] = gateway.name;
            printableConfig[`c${cindex}_g${gindex}_key`] = gateway.endpoint;
        });
    });

    console.info('Moai now using the following cluster configuration');
    console.table(printableConfig);
};

const secretariumHandler = {
    connector: new SCP(),
    initialize: (): void => {
        handlerStore.clusters = (process?.env?.REACT_APP_SECRETARIUM_GATEWAYS ?? '').split(',').reduce<SecretariumClusterConfig>(gatewaysConfigReducer, {});
        printClusterInfo();
    },
    createKey: (password: string): Promise<Key> =>
        new Promise((resolve, reject) => {
            Key.createKey()
                .then((key) => key.seal(password))
                .then((key) => {
                    handlerStore.currentKey = key;
                    resolve(key);
                })
                .catch((e: any) => reject(e));
        }),
    use: (encKey: EncryptedKeyPair, password: string): Promise<Key> =>
        new Promise((resolve, reject) => {
            Key.importEncryptedKeyPair(encKey, password)
                .then((key) => {
                    handlerStore.currentKey = key;
                    resolve(key);
                })
                .catch((e: any) => reject(e));
        }),
    connect: (): Promise<any> =>
        new Promise((resolve, reject) => {
            const cluster = Object.entries<SecretariumGatewayConfig>(handlerStore.clusters)?.[0];
            const endpoint = cluster?.[1]?.gateways?.[0]?.endpoint;
            if (cluster && endpoint) {
                handlerStore.currentConnection
                    .reset()
                    .connect(endpoint, handlerStore.currentKey, cluster?.[1]?.key)
                    .then(() => {
                        resolve({
                            cluster: cluster?.[0],
                            endpoint,
                            socket: handlerStore.currentConnection
                        });
                    })
                    .catch((e: any) => reject(e));
            } else {
                console.error('fail');
                reject('Cluster not configured.');
            }
        }),
    disconnect: (): Promise<void> =>
        new Promise(resolve => {
            handlerStore?.currentConnection?.close?.();
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
        })
};

if ((process.env.NODE_ENV === 'development' || process.env.REACT_APP_SECRETARIUM_GATEWAYS_OVERWRITABLE === 'true') && window) {
    (window as any)['sfxCluster'] = (config: string | Record<string, any>) => {
        if (typeof config === 'string') {
            handlerStore.clusters = config.split(',').reduce<SecretariumClusterConfig>(gatewaysConfigReducer, {});
        } else {
            handlerStore.clusters = config;
        }
        printClusterInfo();
    };
    (window as any)['sfxCommand'] = (dcApp: string, command: string, args?: any, id?: string) => {
        secretariumHandler.request(dcApp, command, args ?? {}, id ?? `${Math.random()}`);
    };
}

export default secretariumHandler;