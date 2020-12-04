import secretariumHandler from '../utils/secretariumHandler';
import { actionTypes } from './constants';
import { ClearKeyPair } from '@secretarium/connector';

export const generateLocalKey = (): Moai.FunctionAction => (dispatch) =>
    secretariumHandler.createDeviceKey()
        .then((key) => {
            key.exportKey()
                .then((clearKeyPair) => {
                    dispatch({
                        type: actionTypes.MOAI_SAVE_LOCAL_KEY,
                        payload: clearKeyPair
                    });
                })
                .catch((error) => console.error('exportKey', error));
        })
        .catch((error) => {
            console.error('generateLocalKey', error);
        });

export const connect = (clearKeyPair: ClearKeyPair): Moai.AnyAction => ({
    type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_REQUESTED,
    workload: (dispatch: Moai.Dispatch) => {
        secretariumHandler
            .use(clearKeyPair)
            .then(() => {
                secretariumHandler.connect()
                    .then(() => {
                        dispatch({ type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL });
                    })
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