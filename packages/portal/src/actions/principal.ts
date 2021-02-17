import { actionTypes, commands } from './constants';
import secretariumHandler from '../utils/secretariumHandler';
import { requestFactory } from './factories';
import { EncryptedKeyPair } from '@secretarium/connector';
import { addKeys, removeKeys } from './vault';
import { getConversations } from './conversations';


export const register = (token: string, username: string, password: string): MoaiPortal.AnyAction => ({
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
                            dispatch(addKeys(encryptedKeyPair, username)).then(() => resolve(encryptedKeyPair));
                        });
                });
            })
            .then((encryptedKeyPair: EncryptedKeyPair) => {
                dispatch({
                    type: actionTypes.PDATA_NEW_USER_SUCCESSFUL,
                    workload: (dispatch) => {
                        dispatch(
                            connect(encryptedKeyPair, username, password, true, token)
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
        },
        workload: dispatch => dispatch(getConversations())
    });
};

export const clearTracerErrors = (): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({ type: actionTypes.MOAI_PORTAL_TRACER_ERROR_CLEANUP });
};

export const registerTracer = (token: string, username: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_REGISTER_TRACER, { token: token, username: username })({
        onExecuted: () => ({
            payload: { isConnected: true }
        }),
        onError: (error) => ({
            error: new Error(error),
            workload: dispatch => dispatch(removeKeys(username))
        })
    });

export const getTracerDetails = (): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_TRACER_DETAILS, {})({
        onResult: result => {
            return {
                payload: {
                    result
                },
                workload: dispatch => result.isGroupAdmin ? dispatch(getGroupMembers(result.group)) : null
            };
        },
        onError: (error) => ({
            error: new Error(error)
        })
    });

export const connect = (encryptedKeyPair: EncryptedKeyPair, username: string, password: string, isRegistering?: boolean, token?: string): MoaiPortal.AnyAction => ({
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
                                dispatch(login());
                            }
                        });
                        if (isRegistering) {
                            dispatch(registerTracer(token, username));
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

export const inviteTracer = (id: number, expiry: number, email: string, grantAdmin: boolean): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_INVITE_TRACER, { id: id, type: 'email-invite', expiry: 90061, grantAdmin: grantAdmin, email: email })();

export const grantAdmin = (id: number, userId: number): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GRANT_ADMIN, { id: id, type: 'grant-admin', userId: userId })();

export const revokeAdmin = (id: number, userId: number): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_REVOKE_ADMIN, { id: id, type: 'revoke-admin', userId: userId })();

export const getGroupMembers = (id: number): MoaiPortal.FunctionAction =>
    requestFactory({ ...commands.MOAI_GET_TRACERS_GROUP_MEMBERS, explicit: `mglm-${id}` }, { id: id }, true)({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });