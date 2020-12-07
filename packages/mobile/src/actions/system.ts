import secretariumHandler from '../utils/secretariumHandler';
import { actionTypes, commands } from './constants';
import { ClearKeyPair } from '@secretarium/connector';
import { ParsedCode } from '../components/Checkin/dataParser';
import { requestFactory } from './factories';


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

export const checkIn = (venueInfo: ParsedCode): Moai.FunctionAction =>
    requestFactory(commands.MOAI_CHECK_IN, { venue: venueInfo })({
        onExecuted: () => ({
            workload: dispatch => {
                dispatch({
                    type: actionTypes.MOAI_SAVE_QR_CODE,
                    payload: venueInfo
                });
                dispatch({
                    type: actionTypes.MOAI_INCREMENT_SCAN_COUNTER
                });
            }
        }),
        onError: (error) => ({
            error: new Error(error)
        })
    });