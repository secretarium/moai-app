import { Principal, StoreComponent } from '../global';
import { actionTypes, commands } from '../actions/constants';

export const initialState: Principal = {
    isConnected: false,
    group: null,
    groupMembers: null
};

export const principal: StoreComponent<Principal> = (state = initialState, { type, payload, error }) => {
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
            if (error?.message === 'token is already fully used, please generate a new one') {
                resultingError = 'Token has already been used, please generate a new one';
            } else if (error?.message === 'can\'t find arg \'token\'') {
                resultingError = 'Please input a token';
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
                ...state,
                isConnected: true
            };
        }
        case actionTypes.MOAI_PORTAL_LOGOUT:
        case actionTypes.MOAI_PORTAL_LOGIN: {
            return {
                ...state,
                ...payload
            };
        }
        case actionTypes.MOAI_PORTAL_TRACER_ERROR_CLEANUP: {
            delete state.loginError;
            delete state.registrationError;
            return {
                ...state
            };
        }
        case commands.MOAI_GET_TRACER_DETAILS.SUCCESS: {
            return {
                ...state,
                isAdmin: payload.result.isGroupAdmin ?? false,
                group: payload.result.group
            };
        }
        case commands.MOAI_GET_TRACERS_GROUP_MEMBERS.SUCCESS: {
            return {
                ...state,
                groupMembers: payload.result
            };
        }
        case actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL:
        case commands.MOAI_GET_TRACER_DETAILS.FAILURE:
        case commands.MOAI_GET_TRACERS_GROUP_MEMBERS.REQUEST:
        case commands.MOAI_GET_TRACERS_GROUP_MEMBERS.FAILURE:
        case commands.MOAI_INVITE_TRACER.REQUEST:
        case commands.MOAI_INVITE_TRACER.FAILURE:
        case commands.MOAI_INVITE_TRACER.SUCCESS:
        case commands.MOAI_GRANT_ADMIN.REQUEST:
        case commands.MOAI_GRANT_ADMIN.FAILURE:
        case commands.MOAI_GRANT_ADMIN.SUCCESS:
        case commands.MOAI_REVOKE_ADMIN.REQUEST:
        case commands.MOAI_REVOKE_ADMIN.FAILURE:
        case commands.MOAI_REVOKE_ADMIN.SUCCESS: {
            return {
                ...state
            };
        }
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