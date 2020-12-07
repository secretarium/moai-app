import { Vault, StoreComponent, StoreComponentMigrator } from '../global';
import { actionTypes } from '../actions/constants';

export const initialState: Vault = {
    email: null,
    keyPair: null
};

const vaultMigrator: StoreComponentMigrator<Vault> = (state) => {
    return {
        ...state
    };
};

export const vault: StoreComponent<Vault> = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            let result;
            if (payload?.vault?.keyPair !== undefined) {
                result = vaultMigrator(payload.vault);
            } else {
                result = state;
            }
            return {
                ...result
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