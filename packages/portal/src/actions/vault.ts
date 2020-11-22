import { actionTypes } from './constants';
import { EncryptedKeyPair } from '@secretarium/connector';


export const addKeys = (keyPair: EncryptedKeyPair): MoaiPortal.AnyAction => ({
    type: actionTypes.VAULT_COMMIT_LOCAL_KEYS,
    payload: {
        keyPair
    }
});

export const removeKeys = (keyPairs: EncryptedKeyPair): MoaiPortal.AnyAction => ({
    type: actionTypes.VAULT_REMOVE_LOCAL_KEYS,
    payload: {
        keyPairs
    }
});