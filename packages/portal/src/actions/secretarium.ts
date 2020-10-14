import { actionTypes } from './constants';
import secretariumHandler from '../utils/secretariumHandler';

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

export const registerNewUser = (values: any): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({
        type: actionTypes.PDATA_NEW_USER_SUCCESSFUL,
        payload: {
            email: values?.email?.trim().toLowerCase(),
            password: values?.password
        }
    });
};

export const sendMessage = (message: MoaiPortal.Message): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({
        type: actionTypes.MOAI_PORTAL_SEND_MESSAGE,
        payload: message
    });
};

export const receiveMessage = (message: MoaiPortal.Message): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({
        type: actionTypes.MOAI_PORTAL_RECEIVE_MESSAGE,
        payload: message
    });
};

export const getChats = (chats: any): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({
        type: actionTypes.MOAI_PORTAL_CHAT_LIST,
        payload: chats
    });
};