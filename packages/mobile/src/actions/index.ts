import secretariumHandler from '../utils/secretariumHandler';
import { actionTypes } from './constants';

export const generateLocalKey = (): Moai.FunctionAction => (dispatch) =>
    secretariumHandler.createDeviceKey()
        .then((key) => dispatch({
            type: actionTypes.MOAI_SAVE_LOCAL_KEY,
            payload: key
        }));