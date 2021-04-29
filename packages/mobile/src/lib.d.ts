interface Window {
    moaiCluster: (config: string | Record<string, unknown>) => void;
    moaiCommand: (dcApp: string, command: string, args?: Record<string, unknown>, id?: string) => void;
    moaiHandlerStore: SecretariumClusterConfig;
    moaiStore: Store;
    moaiGremlin: (enable: boolean) => AynAction;
    moaiSubscriptions: Record<string, unknown>;
}