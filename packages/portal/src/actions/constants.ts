let actionMarker = 0;

const commandsPrototype = {
    MOAI: { application: 'moai', command: 'update-user' },
    SECRETARIUM_FORCED_DISCONNECT: { application: '__local__', command: '__systemForceDisconnectHook__', explicit: 'active-disconnection' }
};

const actionPrototypes = {
    MOAI_PORTAL_SAVE_LOCAL_KEY: 'MOAI_PORTAL_SAVE_LOCAL_KEY',
    MOAI_PORTAL_SEND_MESSAGE: 'MOAI_PORTAL_SEND_MESSAGE',
    MOAI_PORTAL_RECEIVE_MESSAGE: 'MOAI_PORTAL_RECEIVE_MESSAGE',
    MOAI_PORTAL_CHAT_LIST: 'MOAI_PORTAL_CHAT_LIST',
    SECRETARIUM_CONNECT_CONFIGURATION_REQUESTED: 'SECRETARIUM_CONNECT_CONFIGURATION_REQUESTED',
    SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL: 'SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL',
    SECRETARIUM_CONNECT_CONFIGURATION_FAILED: 'SECRETARIUM_CONNECT_CONFIGURATION_FAILED',
    SECRETARIUM_CONNECT_DEVTAP: 'SECRETARIUM_CONNECT_DEVTAP',
    SECRETARIUM_CONNECT_REQUESTED: 'SECRETARIUM_CONNECT_REQUESTED',
    SECRETARIUM_CONNECT_SUCCESSFUL: 'SECRETARIUM_CONNECT_SUCCESSFUL',
    SECRETARIUM_CONNECT_FAILED: 'SECRETARIUM_CONNECT_FAILED',
    SECRETARIUM_DISCONNECT_REQUESTED: 'SECRETARIUM_DISCONNECT_REQUESTED',
    SECRETARIUM_DISCONNECT_SUCCESSFUL: 'SECRETARIUM_DISCONNECT_SUCCESSFUL',
    SECRETARIUM_DISCONNECT_FAILED: 'SECRETARIUM_DISCONNECT_FAILED',
    SECRETARIUM_SOCKET_INTERRUPTED: 'SECRETARIUM_SOCKET_INTERRUPTED',
    SECRETARIUM_SOCKET_NO_DOCUMENT_FOCUS: 'SECRETARIUM_SOCKET_NO_DOCUMENT_FOCUS',
    SECRETARIUM_TRANSACTION_ACKNOWLEDGED: 'SECRETARIUM_TRANSACTION_ACKNOWLEDGED',
    SECRETARIUM_TRANSACTION_PROPOSED: 'SECRETARIUM_TRANSACTION_PROPOSED',
    SECRETARIUM_TRANSACTION_COMMITED: 'SECRETARIUM_TRANSACTION_COMMITED',
    SECRETARIUM_TRANSACTION_EXECUTED: 'SECRETARIUM_TRANSACTION_EXECUTED',
    PDATA_NEW_USER_REQUESTED: 'PDATA_NEW_USER_REQUESTED',
    PDATA_NEW_USER_SUCCESSFUL: 'PDATA_NEW_USER_SUCCESSFUL',
    PDATA_NEW_USER_FAILED: 'PDATA_NEW_USER_FAILED',
    NOOP: 'NOOP'
};

type CommandTypeMap = typeof commandsPrototype;

const decorateCommands = (commands: CommandTypeMap) => {
    const decoratedCommands: Partial<MoaiPortal.DecoratedCommandTypeMap<CommandTypeMap>> = {};
    for (const key in commands)
        decoratedCommands[key as keyof CommandTypeMap] = {
            ...commands[key as keyof CommandTypeMap],
            ...(process.env.NODE_ENV === 'development' || process.env.REACT_APP_SFX_PRODUCTION_LOGGING === 'true'
                ? {
                    REQUEST: `${key}_REQUEST`,
                    SUCCESS: `${key}_SUCCESS`,
                    FAILURE: `${key}_FAILURE`
                }
                : {
                    REQUEST: (actionMarker++).toString(16),
                    SUCCESS: (actionMarker++).toString(16),
                    FAILURE: (actionMarker++).toString(16)
                })
        } as any;
    return decoratedCommands as MoaiPortal.DecoratedCommandTypeMap<CommandTypeMap>;
};

export const commands = decorateCommands(commandsPrototype);

type ActionTypeArray = typeof actionPrototypes;

const mangleActions = (actions: ActionTypeArray) => {
    const mangledActions: Partial<ActionTypeArray> = {};
    if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_SFX_PRODUCTION_LOGGING === 'true')
        return actions;
    else {
        for (const key in actions)
            mangledActions[key as keyof ActionTypeArray] = (actionMarker++).toString(16);
        return mangledActions as ActionTypeArray;
    }
};

export const actionTypes: ActionTypeArray = mangleActions(actionPrototypes);
