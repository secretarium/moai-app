let actionMarker = 0;

const commandsPrototype = {
    MOAI: { application: 'moai', command: 'update-user' },
    MOAI_CHECK_IN: { application: 'moai', command: 'check-in' },
    MOAI_REGISTER_TEST: { application: 'moai', command: 'register-test' },
    MOAI_GET_CONVERSATIONS: { application: 'moai', command: 'get-conversations' },
    MOAI_GET_CONVERSATION: { application: 'moai', command: 'conversations-get' },
    MOAI_GET_LAST_MESSAGE: { application: 'moai', command: 'conversations-get-latest-message' },
    MOAI_SEND_MESSAGE: { application: 'moai', command: 'conversations-write-message' },
    MOAI_GET_LATEST_CONVERSATION: { application: 'moai', command: 'get-latest-conversation' },
    MOAI_GET_VENUES: { application: 'moai', command: 'get-venues' },
    MOAI_REGISTER_NOTIFICATION_TOKEN: { application: 'moai', command: 'register-notification-token' },
    MOAI_GET_EXPOSURE_RISK: { application: 'moai', command: 'get-exposure-risk' },
    MOAI_REGISTER_EXPOSURE_FEEDBACK: { application: 'moai', command: 'register-exposure-feedback' },
    MOAI_GET_IMMUNITY_RECORDS: { application: 'moai', command: 'get-immunity-records' },
    MOAI_REQUEST_IMMUNITY_CERTIFICATE: { application: 'moai', command: 'request-immunity-certificate' },
    MOAI_GET_IMMUNITY_CERTIFICATE: { application: 'moai', command: 'get-immunity-certificate' },
    SECRETARIUM_FORCED_DISCONNECT: { application: '__local__', command: '__systemForceDisconnectHook__', explicit: 'active-disconnection' }
};

const actionPrototypes = {
    MOAI_SAVE_LOCAL_KEY: 'MOAI_SAVE_LOCAL_KEY',
    MOAI_SAVE_EXPO_PUSH_TOKEN: 'MOAI_SAVE_EXPO_PUSH_TOKEN',
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
            ...(process.env.NODE_ENV === 'development' || process.env.REACT_APP_MOAI_PRODUCTION_LOGGING === 'true'
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
    if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_MOAI_PRODUCTION_LOGGING === 'true')
        return actions;
    else {
        for (const key in actions)
            mangledActions[key as keyof ActionTypeArray] = (actionMarker++).toString(16);
        return mangledActions as ActionTypeArray;
    }
};

export const actionTypes: ActionTypeArray = mangleActions(actionPrototypes);
