import { Principal, StoreComponent } from '../global';
import { actionTypes } from '../actions/constants';

export const initialState: Principal = {
    isConnected: false
};

export const principal: StoreComponent<Principal> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case actionTypes.MOAI_PORTAL_SAVE_LOCAL_KEY: {
            return {
                ...state,
                localKey: payload
            };
        }
        default:
            return state;
    }
};