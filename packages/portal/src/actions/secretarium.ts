import { actionTypes, commands } from './constants';
import secretariumHandler from '../utils/secretariumHandler';
//import { requestFactory } from './factories';

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

// export const getChats = (): MoaiPortal.FunctionAction => (dispatch, getState) => {
//     dispatch(requestFactory(commands.MOAI_PORTAL_GET_CONTACTS, undefined, true)({
//         onResult: result => {
//             const state = getState();
//             const chatList = state.principal.contacts || [];
//             return {
//                 payload: {
//                     result,
//                     chatList
//                 }
//             };
//         }
//     }));
// };