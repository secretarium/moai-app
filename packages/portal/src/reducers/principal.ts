import { Principal, StoreComponent } from '../global';
import { actionTypes, commands } from '../actions/constants';

export const initialState: Principal = {
    isConnected: false,
    isFetching: false,
    contacts: [{ id: 1 }, { id: 2 }, { id: 3 }]
};

export const principal: StoreComponent<Principal> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case actionTypes.MOAI_PORTAL_SAVE_LOCAL_KEY: {
            return {
                ...state,
                localKey: payload
            };
        }
        case commands.MOAI_PORTAL_GET_CONTACTS.REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case commands.MOAI_PORTAL_GET_CONTACTS.SUCCESS: {
            return {
                ...state,
                contacts: payload,
                isFetching: false
            };
        }
        default:
            return state;
    }
};