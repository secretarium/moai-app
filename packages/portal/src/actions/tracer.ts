import { actionTypes, commands } from './constants';
import secretariumHandler from '../utils/secretariumHandler';
import { requestFactory } from './factories';
import { EncryptedKeyPair } from '@secretarium/connector';
import { addKeys } from './vault';


export const register = (email: string, password: string): MoaiPortal.AnyAction => ({
    type: actionTypes.PDATA_NEW_USER_REQUESTED,
    workload: (dispatch: MoaiPortal.Dispatch) => {
        secretariumHandler
            .disconnect()
            .then(() => {
                return new Promise((resolve) => {
                    secretariumHandler
                        .createKey(password)
                        .then((key) => key.exportEncryptedKey())
                        .then((encryptedKeyPair) => {
                            dispatch(addKeys(encryptedKeyPair)).then(() => resolve(encryptedKeyPair));
                        });
                });
            })
            .then((encryptedKeyPair: EncryptedKeyPair) => {
                dispatch({
                    type: actionTypes.PDATA_NEW_USER_SUCCESSFUL,
                    workload: (dispatch: MoaiPortal.Dispatch) => {
                        dispatch(
                            connectAndRegister(encryptedKeyPair, email, password)
                        );
                    }
                });
            })
            //.then(() => dispatch(registerTracer(email)))
            .catch((error: any) => {
                console.error(error);
                dispatch({
                    type: actionTypes.PDATA_NEW_USER_FAILED,
                    error: new Error(error)
                });
            });
    }
});

export const registerTracer = (email: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_REGISTER_TRACER, { email: email })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });

export const verifyTracer = (code: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_VERIFY_TRACER, { code: code })({
        onExecuted: () => ({
            payload: true
        }),
        onError: (error) => ({
            payload: false,
            error: new Error(error)
        })
    });

export const connectAndRegister = (encryptedKeyPair: EncryptedKeyPair, email: string, password: string): MoaiPortal.FunctionAction => (dispatch) => {
    secretariumHandler
        .use(encryptedKeyPair, password)
        .then(() => secretariumHandler.connect())
        .then(() => dispatch(registerTracer(email)))
        .catch((error) => {
            console.error('connect', error);
        });
};

export const connect = (encryptedKeyPair: EncryptedKeyPair, email: string, password: string): MoaiPortal.FunctionAction => (dispatch) => {
    secretariumHandler
        .use(encryptedKeyPair, password)
        .then(() => secretariumHandler.connect())
        .catch((error) => {
            console.error('connect', error);
        });
};

export const disconnect = (): MoaiPortal.AnyAction => ({
    type: actionTypes.SECRETARIUM_DISCONNECT_REQUESTED,
    workload: (dispatch: MoaiPortal.Dispatch) => {
        secretariumHandler
            .disconnect()
            .then(() => {
                dispatch({
                    type: actionTypes.MOAI_PORTAL_LOGOUT
                });
                dispatch({
                    type: actionTypes.SECRETARIUM_DISCONNECT_SUCCESSFUL
                });
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.SECRETARIUM_DISCONNECT_FAILED,
                    error: new Error(error)
                });
            });
    }
});