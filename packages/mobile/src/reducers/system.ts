import { all as merge } from 'deepmerge';
import { System, StoreComponent, StoreComponentMigrator } from '../global';
import { actionTypes, commands } from '../actions/constants';
import { version } from '../../package.json';

export const initialState: System = {
    version: process.env.REACT_APP_VERSION ?? version ?? '0.0.0',
    localConfiguration: {
        theme: 'auto'
    },
    isConnected: false,
    showOnboarding: true,
    scanCounter: 0,
    certificateRequested: false,
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
                log: [],
                isConnected: false
            };
        }
        case actionTypes.MOAI_SAVE_LOCAL_KEY: {
            return {
                ...state,
                localKey: payload
            };
        }
        case actionTypes.MOAI_SHOW_ONBOARDING: {
            return {
                ...state,
                showOnboarding: payload
            };
        }
        case actionTypes.MOAI_SET_RISK_PROFILE: {
            return {
                ...state,
                riskProfile: payload.riskLevel
            };
        }
        case commands.MOAI_REQUEST_IMMUNITY_CERTIFICATE.FAILURE: {
            return {
                ...state
            };
        }
        case commands.MOAI_REQUEST_IMMUNITY_CERTIFICATE.SUCCESS: {
            return {
                ...state,
                certificateRequested: true
            };
        }
        case commands.MOAI_GET_VACCINE_CODE.SUCCESS: {
            return {
                ...state,
                vaccineId: payload.result
            };
        }
        case actionTypes.MOAI_SAVE_EXPO_PUSH_TOKEN: {
            return {
                ...state,
                expoPushToken: payload
            };
        }
        case actionTypes.MOAI_INCREMENT_SCAN_COUNTER: {
            return {
                ...state,
                scanCounter: state.scanCounter + 1
            };
        }
        case actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_REQUESTED: {
            delete state.connectionError;
            return {
                ...state
            };
        }
        case actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL: {
            return {
                ...state,
                isConnected: true
            };
        }
        case actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_FAILED: {
            return {
                ...state,
                isConnected: false,
                connectionError: 'Oops! Unknown error occured while trying to connect to Moai'
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
        case commands.MOAI_CHECK_IN.REQUEST:
        case commands.MOAI_REGISTER_TEST.REQUEST:
            delete state.checkInError;
            return {
                ...state
            };
        case commands.MOAI_CHECK_IN.SUCCESS:
        case commands.MOAI_REGISTER_TEST.SUCCESS:
            return {
                ...state
            };
        case commands.MOAI_REGISTER_TEST.FAILURE:
        case commands.MOAI_CHECK_IN.FAILURE:
            return {
                ...state,
                checkInError: error?.message ?? error ?? 'Oops, a problem occured'
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
