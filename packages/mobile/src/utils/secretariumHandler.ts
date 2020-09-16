import { KeysManager, SCP } from '@secretarium/connector';
import { Moai } from 'global';

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

type SecretariumHandler = {
    connector: SCP;
    initialize: () => void;
    createDeviceKey: () => Promise<any>;
    use: (keyPair: Moai.KeyPair, password: string) => Promise<any>;
    connect: () => Promise<any>;
    disconnect: () => Promise<any>;
    request: (dcApp: string, command: string, args: any, id?: string) => Promise<any>;
};

const handlerStore: {
    keysManager: any;
    currentConnection: any;
    currentKeyPair: any;
    clusters: SecretariumClusterConfig;
} = {
    keysManager: new KeysManager(),
    currentConnection: new SCP(),
    currentKeyPair: undefined,
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

    console.info('SFX now using the following cluster configuration');
    console.table(printableConfig);
};

const secretariumHandler: SecretariumHandler = {
    connector: SCP(),
    initialize: () => {
        handlerStore.clusters = (process?.env?.REACT_APP_SECRETARIUM_GATEWAYS ?? '').split(',').reduce<SecretariumClusterConfig>(gatewaysConfigReducer, {});
        printClusterInfo();
    },
    createDeviceKey: () =>
        new Promise((resolve, reject) => {
            handlerStore.keysManager
                .createKey('device-key')
                .then((keyPair: any) => {
                    handlerStore.currentKeyPair = keyPair;
                    resolve(keyPair);
                })
                .catch((e: any) => reject(e));
        }),
    use: (keyPair, password) =>
        new Promise((resolve, reject) => {
            handlerStore.keysManager
                .decryptKey(Object.assign({}, keyPair), password)
                .then((r: any) => {
                    handlerStore.currentKeyPair = r;
                    resolve(r);
                })
                .catch((e: any) => reject(e));
        }),
    connect: () =>
        new Promise((resolve, reject) => {
            const cluster = Object.entries<SecretariumGatewayConfig>(handlerStore.clusters)?.[0];
            const endpoint = cluster?.[1]?.gateways?.[0]?.endpoint;
            if (cluster && endpoint) {
                handlerStore.currentConnection
                    .reset()
                    .connect(endpoint, (handlerStore.currentKeyPair as any)?.cryptoKey, (Uint8Array as Moai.Uint8Array).secFromBase64(cluster?.[1]?.key, true))
                    .then(() => {
                        resolve({
                            cluster: cluster?.[0],
                            endpoint,
                            socket: handlerStore.currentConnection
                        });
                    })
                    .catch((e: any) => reject(e));
            } else {
                reject('Cluster not configured.');
            }
        }),
    disconnect: () =>
        new Promise(resolve => {
            handlerStore?.currentConnection?.close?.();
            resolve();
        }),
    request: (dcApp, command, args, id) =>
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
    (window as any)['sfxCluster'] = (config: string | {}) => {
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