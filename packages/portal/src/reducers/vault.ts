import { Vault, StoreComponent } from '../global';
import { actionTypes } from '../actions/constants';

export const initialState: Vault = {
    email: null,
    keyPair: null
};

export const vault: StoreComponent<Vault> = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...state
            };
        }
        case actionTypes.VAULT_COMMIT_LOCAL_KEYS: {
            return {
                email: payload.email,
                keyPair: payload.keyPair
            };
        }
        case actionTypes.VAULT_REMOVE_LOCAL_KEYS: {
            return {
                ...state
            };
        }
        default:
            return state;
    }
};