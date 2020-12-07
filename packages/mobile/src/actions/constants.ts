let actionMarker = 0;

const commandsPrototype = {
    MOAI: { application: 'moai', command: 'update-user' },
    MOAI_CHECK_IN: { application: 'moai', command: 'check-in'},
    MOAI_GET_CONVERSATIONS: { application: 'moai', command: 'get-conversations' },
    MOAI_GET_CONVERSATION: { application: 'moai', command: 'conversations-get' },
    MOAI_SEND_MESSAGE: { application: 'moai', command: 'conversations-write-message' },
    SECRETARIUM_FORCED_DISCONNECT: { application: '__local__', command: '__systemForceDisconnectHook__', explicit: 'active-disconnection' }
};

const actionPrototypes = {
    MOAI_SAVE_LOCAL_KEY: 'MOAI_SAVE_LOCAL_KEY',
    MOAI_SHOW_ONBOARDING: 'MOAI_SHOW_ONBOARDING',
    MOAI_SAVE_QR_CODE: 'MOAI_SAVE_QR_CODE',
    MOAI_INCREMENT_SCAN_COUNTER: 'MOAI_INCREMENT_SCAN_COUNTER',
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
    NOOP: 'NOOP'
};

type CommandTypeMap = typeof commandsPrototype;

const decorateCommands = (commands: CommandTypeMap) => {
    const decoratedCommands: Partial<Moai.DecoratedCommandTypeMap<CommandTypeMap>> = {};
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
    return decoratedCommands as Moai.DecoratedCommandTypeMap<CommandTypeMap>;
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
