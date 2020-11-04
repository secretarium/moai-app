import { actionTypes, commands } from './constants';
import secretariumHandler from '../utils/secretariumHandler';
import { requestFactory } from './factories';

export const generateLocalKey = (): MoaiPortal.FunctionAction => (dispatch) => {
    secretariumHandler.createKey()
        .then((key) => dispatch({
            type: actionTypes.MOAI_PORTAL_SAVE_LOCAL_KEY,
            payload: key
        }))
        .catch((error) => {
            console.error('generateLocalKey', error);
        });
};

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


export const getConversation = (id: number, token: number) =>
    requestFactory(commands.MOAI_GET_CONVERSATION, { id: id, token: token })({
        onResult: result => {
            return {
                payload: {
                    result  // for now
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
