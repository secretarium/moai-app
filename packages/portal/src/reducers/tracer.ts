import { Tracer, StoreComponent } from '../global';
import { actionTypes, commands } from '../actions/constants';

export const initialState: Tracer = {
    isConnected: false,
    isVerified: false
};

export const tracer: StoreComponent<Tracer> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...initialState
            };
        }
        case actionTypes.MOAI_PORTAL_LOGOUT: {
            return {
                ...state,
                ...payload
            };
        }
        case actionTypes.MOAI_PORTAL_LOGIN: {
            return {
                ...state,
                ...payload
            };
        }
        case commands.MOAI_REGISTER_TRACER.REQUEST: {
            delete state.loginError;
            return {
                ...state
            };
        }
        case commands.MOAI_REGISTER_TRACER.FAILURE:
        case actionTypes.PDATA_NEW_USER_FAILED: {
            return {
                ...state,
                loginError: error?.message ?? error ?? 'Unknown error occured while registering.'
            };
        }
        case commands.MOAI_REGISTER_TRACER.SUCCESS: {
            return {
                ...state,
                emailVerificationAttempt: (state.emailVerificationAttempt + 1) ?? 0
            };
        }
        case commands.MOAI_VERIFY_TRACER.REQUEST: {
            delete state.validationError;
            return {
                ...state
            };
        }
        case commands.MOAI_VERIFY_TRACER.FAILURE: {
            return {
                ...state,
                ...payload,
                validationError: error?.message ?? error ?? 'Unknown error occured while validating.'
            };
        }
        case commands.MOAI_VERIFY_TRACER.SUCCESS: {
            return {
                ...state,
                ...payload
            };
        }
        case actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_REQUESTED:
            delete state.loginError;
            return {
                ...state
            };
        case actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL:
            if (state.isVerified === true) {
                return {
                    ...state,
                    isConnected: true
                };
            } else {
                return {
                    ...state
                };
            }
        case actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_FAILED:
            return {
                ...state,
                loginError: error?.message ?? error ?? 'Unknown error occured while loging in.'
            };
        default:
            return state;
    }
};