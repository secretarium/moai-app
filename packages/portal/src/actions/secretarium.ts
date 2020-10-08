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
}