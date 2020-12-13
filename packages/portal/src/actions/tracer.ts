import { actionTypes, commands } from './constants';
import secretariumHandler from '../utils/secretariumHandler';
import { requestFactory } from './factories';
import { EncryptedKeyPair } from '@secretarium/connector';
import { addKeys, removeKeys } from './vault';
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
                    workload: (dispatch) => {
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
            isConnected: true
        }
    });
};

export const clearTracerErrors = (): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({ type: actionTypes.MOAI_PORTAL_TRACER_ERROR_CLEANUP });
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
            error: new Error(error),
            workload: dispatch => dispatch(removeKeys(email))
        })
    });

export const verifyTracer = (code: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_VERIFY_TRACER, { code: code })({
        onExecuted: () => ({
            payload: {
                isConnected: true,
                isVerified: true
            }
        }),
        onError: (error) => ({
            payload: {
                isConnected: false
            },
            error: new Error(error)
        })
    });

export const challengeTracer = (): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_CHALLENGE_TRACER, {})({
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

export const getTracerDetails = (): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_TRACER_DETAILS, {})({
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

export const connect = (encryptedKeyPair: EncryptedKeyPair, email: string, password: string, isRegistering?: boolean): MoaiPortal.AnyAction => ({
    type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_REQUESTED,
    workload: (dispatch: MoaiPortal.Dispatch) => {
        secretariumHandler
            .use(encryptedKeyPair, password)
            .then(() => {
                secretariumHandler.connect()
                    .then(() => {
                        dispatch({
                            type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL,
                            workload: (dispatch) => {
                                dispatch(getTracerDetails());
                            }
                        });
                        if (isRegistering) {
                            dispatch(registerTracer(email));
                        }
                    })
                    .catch((error) => {
                        dispatch({ type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_FAILED, error });
                    });
            })
            .catch((error) => {
                dispatch({ type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_FAILED, error });
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
                    isConnected: false,
                    isVerified: null
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