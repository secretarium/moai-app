import { Principal, StoreComponent } from '../global';
import { actionTypes, commands } from '../actions/constants';

export const initialState: Principal = {
    isConnected: false,
    isFetching: false,
    isVerified: undefined
};

export const principal: StoreComponent<Principal> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case actionTypes.MOAI_PORTAL_SAVE_LOCAL_KEY: {
            return {
                ...state,
                localKey: payload
            };
        }
        case actionTypes.MOAI_PORTAL_LOGOUT: {
            return {
                ...initialState
            };
        }
        case commands.MOAI_REGISTER_TRACER.SUCCESS: {
            return {
                ...state,
                emailVerificationAttempt: (state.emailVerificationAttempt + 1) ?? 0
            };
        }
        case commands.MOAI_VERIFY_TRACER.REQUEST: {
            delete state.validationEmailError;
            return {
                ...state
            };
        }
        case commands.MOAI_VERIFY_TRACER.FAILURE: {
            return {
                ...state,
                isVerified: payload,
                validationEmailError: error
            };
        }
        case commands.MOAI_VERIFY_TRACER.SUCCESS: {
            return {
                ...state,
                isVerified: payload,
                isConnected: true
            };
        }
        default:
            return state;
    }
};