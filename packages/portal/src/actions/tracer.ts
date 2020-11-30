import { actionTypes, commands } from './constants';
import secretariumHandler from '../utils/secretariumHandler';
import { requestFactory } from './factories';
import { EncryptedKeyPair } from '@secretarium/connector';
import { addKeys } from './vault';
import { getConversations } from './conversations';


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
                            dispatch(addKeys(encryptedKeyPair, email)).then(() => resolve(encryptedKeyPair));
                        });
                });
            })
            .then((encryptedKeyPair: EncryptedKeyPair) => {
                dispatch({
                    type: actionTypes.PDATA_NEW_USER_SUCCESSFUL,
                    workload: (dispatch: MoaiPortal.Dispatch) => {
                        dispatch(
                            connect(encryptedKeyPair, email, password, true)
                        );
                    }
                });
            })
            .catch((error: any) => {
                dispatch({
                    type: actionTypes.PDATA_NEW_USER_FAILED,
                    error: new Error(error)
                });
            });
    }
});

export const login = (): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({
        type: actionTypes.MOAI_PORTAL_LOGIN,
        payload: {
            isConnected: true,
            isVerified: true
        }
    });
};

export const registerTracer = (email: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_REGISTER_TRACER, { email: email })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        },
        onError: (error) => ({
            error: new Error(error)
        })
    });

export const verifyTracer = (code: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_VERIFY_TRACER, { code: code })({
        onExecuted: () => ({
            payload: {
                isVerified: true,
                isConnected: true
            }
        }),
        onError: (error) => ({
            payload: {
                isVerified: false
            },
            error: new Error(error)
        })
    });

export const connect = (encryptedKeyPair: EncryptedKeyPair, email: string, password: string, isRegistering?: boolean): MoaiPortal.AnyAction => ({
    type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_REQUESTED,
    workload: (dispatch: MoaiPortal.Dispatch) => {
        secretariumHandler
            .use(encryptedKeyPair, password)
            .then(() => {
                secretariumHandler.connect()
                    .then(() => {
                        dispatch({ type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL });
                        if (isRegistering === true) {
                            dispatch(registerTracer(email));
                        } else {
                            dispatch(login());
                        }
                    })
                    .then(() => dispatch(getConversations()))
                    .catch((error) => {
                        dispatch({ type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_FAILED });
                        console.error('connect', error);
                    });
            })
            .catch((error) => {
                dispatch({ type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_FAILED });
                console.error('connect', error);
            });
    }
});

export const disconnect = (): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({ type: actionTypes.SECRETARIUM_DISCONNECT_REQUESTED });
    secretariumHandler
        .disconnect()
        .then(() => {
            dispatch({
                type: actionTypes.MOAI_PORTAL_LOGOUT,
                payload: {
                    isConnected: false
                }
            });
            dispatch({ type: actionTypes.SECRETARIUM_DISCONNECT_SUCCESSFUL });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.SECRETARIUM_DISCONNECT_FAILED,
                error: new Error(error)
            });
        });

};