import { Tracer, StoreComponent } from '../global';
import { actionTypes, commands } from '../actions/constants';

export const initialState: Tracer = {
    isConnected: false,
    isVerified: null
};

export const tracer: StoreComponent<Tracer> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...initialState
            };
        }
        case commands.MOAI_REGISTER_TRACER.REQUEST:
        case actionTypes.PDATA_NEW_USER_REQUESTED:
        case actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_REQUESTED: {
            delete state.loginError;
            return {
                ...state
            };
        }
        case commands.MOAI_REGISTER_TRACER.FAILURE:
        case actionTypes.PDATA_NEW_USER_FAILED: {
            let resultingError: string;
            if (error?.message === 'your organisation is not whitelisted') {
                resultingError = 'Sorry, your organisation is not whitelisted.';
            } else {
                resultingError = 'Unknown error occured while registering.';
            }
            return {
                ...state,
                registrationError: resultingError
            };
        }
        case commands.MOAI_REGISTER_TRACER.SUCCESS: {
            return {
                ...state
            };
        }
        case commands.MOAI_CHALLENGE_TRACER.REQUEST: {
            delete state.challengeError;
            delete state.validationError;
            return {
                ...state
            };
        }
        case commands.MOAI_CHALLENGE_TRACER.SUCCESS: {
            return {
                ...state,
                emailVerificationAttempt: (state.emailVerificationAttempt + 1) ?? 0
            };
        }
        case commands.MOAI_CHALLENGE_TRACER.FAILURE:
            return {
                ...state,
                challengeError: error?.message ?? error ?? 'Unknown error occured while challenging.'
            };
        case commands.MOAI_VERIFY_TRACER.REQUEST: {
            delete state.validationError;
            return {
                ...state
            };
        }
        case commands.MOAI_VERIFY_TRACER.FAILURE: {
            let resultingError: string;
            console.log(error?.message.slice(0, 12));
            if (error?.message === 'Not connected') {
                resultingError = 'Connection lost.';
            } else if (error?.message.slice(0, 12) === 'invalid code') {
                resultingError = 'Please enter a valid code.';
            } else {
                resultingError = 'Unknown error occured while validating.';
            }
            return {
                ...state,
                ...payload,
                validationError: resultingError
            };
        }
        case actionTypes.MOAI_PORTAL_LOGOUT:
        case actionTypes.MOAI_PORTAL_LOGIN:
        case commands.MOAI_VERIFY_TRACER.SUCCESS: {
            return {
                ...state,
                ...payload
            };
        }
        case actionTypes.MOAI_PORTAL_TRACER_ERROR_CLEANUP: {
            delete state.validationError;
            delete state.loginError;
            delete state.registrationError;
            return {
                ...state
            };
        }
        case commands.MOAI_GET_TRACER_DETAILS.SUCCESS: {
            return {
                ...state,
                isVerified: payload.result.verified
            };
        }
        case commands.MOAI_GET_TRACER_DETAILS.FAILURE: {
            return {
                ...state,
                isVerified: false
            };
        }
        case actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL:
        case commands.MOAI_CHALLENGE_TRACER:
            return {
                ...state
            };
        case actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_FAILED: {
            let resultingError: string;
            if (error?.message === 'Can\'t decrypt, Invalid password') {
                resultingError = 'Please enter a valid password.';
            } else {
                resultingError = 'Unknown error occured while logging in.';
            }
            return {
                ...state,
                loginError: resultingError
            };
        }
        default:
            return state;
    }
};