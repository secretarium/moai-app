import { Vault, StoreComponent, StoreComponentMigrator } from '../global';
import { actionTypes } from '../actions/constants';


export const initialState: Vault = {
    keyPairs: []
};

const vaultMigrator: StoreComponentMigrator<Vault> = (state) => {
    return {
        ...state
    };
};

const extractKeyInfo = (keyPair: MoaiPortal.EncKeyPair) => {
    switch (keyPair.version) {
        default:
            return {
                version: keyPair.version,
                iv: keyPair.iv,
                salt: keyPair.salt,
                data: keyPair.data
            };
    }
};

export const vault: StoreComponent<Vault> = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            let result;
            if (payload?.vault?.keyPairs !== undefined) {
                result = vaultMigrator(payload.vault);
            } else {
                result = state;
            }
            return {
                ...result
            };
        }
        case actionTypes.VAULT_COMMIT_LOCAL_KEYS: {
            const keyPairs = state.keyPairs;
            if (!keyPairs.some(keyPair => keyPair.name === payload.username)) {
                keyPairs.push({
                    name: payload.username,
                    ...extractKeyInfo(payload.keyPair)
                });
            }
            return {
                ...state,
                keyPairs
            };
        }
        case actionTypes.VAULT_REMOVE_LOCAL_KEYS: {
            const keyPairs = state.keyPairs.filter(keyPair => !keyPair.name.includes(payload.username));
            return {
                ...state,
                keyPairs
            };
        }
        default:
            return state;
    }
};