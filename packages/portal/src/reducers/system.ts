import { all as merge } from 'deepmerge';
import { System, StoreComponent, StoreComponentMigrator } from '../global';
import { actionTypes, commands } from '../actions/constants';
import { version } from '../../package.json';

export const initialState: System = {
    version: process.env.REACT_APP_VERSION ?? version ?? '0.0.0',
    localConfiguration: {
        theme: 'auto'
    },
    log: []
};

const systemMigrator: StoreComponentMigrator<System> = (state) => {
    return {
        ...state,
        version: initialState.version
    };
};

export const system: StoreComponent<System> = (state = initialState, { type, payload, workload, error }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            let result;
            if (payload?.system?.version === initialState.version)
                result = payload.system;
            else if (payload?.system?.version)
                result = systemMigrator(payload.system);
            else
                result = state;
            delete result.currentConnection;
            delete result.currentEphemeral;
            return {
                ...merge<any>([initialState, result]),
                log: []
            };
        }
        case actionTypes.SECRETARIUM_CONNECT_SUCCESSFUL:
            return {
                ...state,
                currentConnection: {
                    isInterrupted: false,
                    isReconnectionPaused: false,
                    cluster: payload?.cluster,
                    gateway: payload?.gateway,
                    endpoint: payload?.endpoint
                }
            };
        case actionTypes.SECRETARIUM_SOCKET_NO_DOCUMENT_FOCUS:
            if (state.currentConnection) {
                state.currentConnection.isInterrupted = true;
                state.currentConnection.isReconnectionPaused = true;
                state.currentConnection.nextTry = payload?.nextTry;
            }
            return {
                ...state
            };
        case actionTypes.SECRETARIUM_CONNECT_FAILED:
        case actionTypes.SECRETARIUM_SOCKET_INTERRUPTED:
            if (state.currentConnection) {
                state.currentConnection.isInterrupted = true;
                state.currentConnection.isReconnectionPaused = false;
                state.currentConnection.interruptionCount = (state.currentConnection.interruptionCount ?? 0) + 1;
                state.currentConnection.nextTry = payload?.nextTry;
            } else
                state.currentConnection = {
                    isInterrupted: true,
                    isReconnectionPaused: false,
                    interruptionCount: 1,
                    nextTry: payload?.nextTry,
                    error: error
                };
            return {
                ...state
            };
        case commands.SECRETARIUM_FORCED_DISCONNECT.FAILURE:
            return {
                ...state,
                currentConnection: {
                    ...state.currentConnection,
                    isForcedClosed: true
                }
            };
        default:
            if (state.log.length > 120)
                state.log.shift();
            state.log.push({
                type,
                time: (new Date()).getTime(),
                payload: Object.keys(payload ?? {}),
                hadWorkload: workload !== undefined
            });
            return state;
    }
};