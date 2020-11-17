import { actionTypes, commands } from './constants';
import secretariumHandler from '../utils/secretariumHandler';
import { requestFactory } from './factories';


export const generateLocalKey = (): MoaiPortal.FunctionAction => (dispatch) => {
    secretariumHandler
        .createKey()
        .then((key) => dispatch({
            type: actionTypes.MOAI_PORTAL_SAVE_LOCAL_KEY,
            payload: key
        }))
        .catch((error) => {
            console.error('generateLocalKey', error);
        });
};


export const connect = (email: string): MoaiPortal.FunctionAction => (dispatch) => {
    secretariumHandler
        .connect()
        .then(() => dispatch(registerTracer(email)))
        .catch((error) => {
            console.error('connect', error);
        });
};


export const disconnect = () => ({
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


export const registerTracer = (email: string) =>
    requestFactory(commands.MOAI_REGISTER_TRACER, { email: email })({
        onResult: result => {
            return {
                payload: {
                    result  // for now
                }
            };
        }
    });


export const verifyTracer = (code: string) =>
    requestFactory(commands.MOAI_VERIFY_TRACER, { code: code })({
        onExecuted: () => ({
            payload: true
        }),
        onError: (error) => ({
            payload: false,
            error: new Error(error)
        })
    });


export const getTested = (barcode: number) =>
    requestFactory(commands.MOAI_GET_TESTED, { barcode: barcode })({
        onResult: result => {
            return {
                payload: {
                    result  // for now
                }
            };
        }
    });


export const getExposed = (venue: number, time: number) =>
    requestFactory(commands.MOAI_GET_EXPOSED, { venue: venue, time: time })({
        onResult: result => {
            return {
                payload: {
                    result  // for now
                }
            };
        }
    });


export const getConversations = () =>
    requestFactory(commands.MOAI_GET_CONVERSATIONS)({
        onResult: result => {
            return {
                payload: {
                    result  // for now
                }
            };
        }
    });


export const getConversation = (address: string, token: string) =>
    requestFactory(commands.MOAI_GET_CONVERSATION, { address: address, token: token })({
        onResult: result => {
            return {
                payload: {
                    result  // for now
                }
            };
        }
    });


export const createConversation = (pseudo: string) =>
    requestFactory(commands.MOAI_CREATE_CONVERSATION, { pseudo: pseudo })({
        onResult: result => {
            return {
                payload: {
                    result // for now
                }
            };
        }
    });


export const getLastMessage = (id: number, token: number) =>
    requestFactory(commands.MOAI_GET_LAST_MESSAGE, { id: id, token: token })({
        onResult: result => {
            return {
                payload: {
                    result  // for now
                }
            };
        }
    });


export const sendMessage = (id: number, token: number, text: string) =>
    requestFactory(commands.MOAI_SEND_MESSAGE, { id: id, token: token, text: text })({
        onExecuted: () => ({
            payload: { message: text }
        })
    });


export const markRead = (id: number, token: number, index: number) =>
    requestFactory(commands.MOAI_MARK_AS_READ, { id: id, token: token, index: index })({
        onExecuted: () => ({
            payload: {}
        })
    });
