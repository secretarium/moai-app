import { actionTypes } from './constants';
import { EncryptedKeyPair } from '@secretarium/connector';


export const addKeys = (keyPair: EncryptedKeyPair, username: string): MoaiPortal.AnyAction => ({
    type: actionTypes.VAULT_COMMIT_LOCAL_KEYS,
    payload: {
        keyPair,
        username
    }
});

export const removeKeys = (username: string): MoaiPortal.AnyAction => ({
    type: actionTypes.VAULT_REMOVE_LOCAL_KEYS,
    payload: {
        username
    }
});