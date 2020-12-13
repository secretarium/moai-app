let actionMarker = 0;

const commandsPrototype = {
    MOAI_GET_CONVERSATIONS: { application: 'moai', command: 'get-conversations' },
    MOAI_CREATE_CONVERSATION: { application: 'moai', command: 'create-conversation' },
    MOAI_GET_CONVERSATION: { application: 'moai', command: 'conversations-get' },
    MOAI_GET_LAST_MESSAGE: { application: 'moai', command: 'conversations-get-latest-message' },
    MOAI_SEND_MESSAGE: { application: 'moai', command: 'conversations-write-message' },
    MOAI_MARK_AS_READ: { application: 'moai', command: 'mark-as-read' },
    MOAI_REGISTER_TRACER: { application: 'moai', command: 'register-tracer' },
    MOAI_VERIFY_TRACER: { application: 'moai', command: 'verify-tracer' },
    MOAI_REGISTER_TEST_BARCODE: { application: 'moai', command: 'register-test-barcode' },
    MOAI_GET_TESTED: { application: 'moai', command: 'get-tested' },
    MOAI_GET_EXPOSED: { application: 'moai', command: 'get-exposed' },
    MOAI_CHALLENGE_TRACER: { application: 'moai', command: 'challenge-tracer' },
    MOAI_GET_TRACER_DETAILS: { application: 'moai', command: 'get-tracer-details' },
    SECRETARIUM_FORCED_DISCONNECT: { application: '__local__', command: '__systemForceDisconnectHook__', explicit: 'active-disconnection' }
};

const actionPrototypes = {
    MOAI_PORTAL_LOGOUT: 'MOAI_PORTAL_LOGOUT',
    MOAI_PORTAL_LOGIN: 'MOAI_PORTAL_LOGIN',
    MOAI_PORTAL_SAVE_LOCAL_KEY: 'MOAI_PORTAL_SAVE_LOCAL_KEY',
    MOAI_PORTAL_TRACER_ERROR_CLEANUP: 'MOAI_PORTAL_TRACER_ERROR_CLEANUP',
    VAULT_COMMIT_LOCAL_KEYS: 'VAULT_COMMIT_LOCAL_KEYS',
    VAULT_REMOVE_LOCAL_KEYS: 'VAULT_REMOVE_LOCAL_KEYS',
    SECRETARIUM_CONNECT_CONFIGURATION_REQUESTED: 'SECRETARIUM_CONNECT_CONFIGURATION_REQUESTED',
    SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL: 'SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL',
    SECRETARIUM_CONNECT_CONFIGURATION_FAILED: 'SECRETARIUM_CONNECT_CONFIGURATION_FAILED',
    SECRETARIUM_CONNECT_DEVTAP: 'SECRETARIUM_CONNECT_DEVTAP',
    SECRETARIUM_CONNECT_REQUESTED: 'SECRETARIUM_CONNECT_REQUESTED',
    SECRETARIUM_CONNECT_SUCCESSFUL: 'SECRETARIUM_CONNECT_SUCCESSFUL',
    SECRETARIUM_CONNECT_FAILED: 'SECRETARIUM_CONNECT_FAILED',
    SECRETARIUM_EPHEMERAL_REQUESTED: 'SECRETARIUM_EPHEMERAL_REQUESTED',
    SECRETARIUM_EPHEMERAL_SUCCESSFUL: 'SECRETARIUM_EPHEMERAL_SUCCESSFUL',
    SECRETARIUM_EPHEMERAL_FAILED: 'SECRETARIUM_EPHEMERAL_FAILED',
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
