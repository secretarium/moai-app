import secretariumHandler from '../utils/secretariumHandler';
import { actionTypes, commands } from './constants';
import { ClearKeyPair } from '@secretarium/connector';
import { ParsedCode } from '../components/Checkin/dataParser';
import { requestFactory } from './factories';
import { getConversations } from './conversations';


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
                        dispatch({
                            type: actionTypes.SECRETARIUM_CONNECT_CONFIGURATION_SUCCESSFUL,
                            workload: dispatch => dispatch(getConversations())
                        });
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

export const checkIn = (venue: ParsedCode): Moai.FunctionAction =>
    requestFactory(commands.MOAI_CHECK_IN, venue)({
        onExecuted: () => ({
            workload: dispatch => {
                dispatch({
                    type: actionTypes.MOAI_SAVE_QR_CODE,
                    payload: venue
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

export const registerTest = (testId: string): Moai.FunctionAction =>
    requestFactory(commands.MOAI_REGISTER_TEST, { testId: testId })({
        onError: (error) => ({
            error: new Error(error)
        })
    });

export const getVenues = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_VENUES, { max: 10, cursor: 0 })({
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

export const registerNotificationToken = (expoPushToken: string, encryptionKey: string): Moai.FunctionAction =>
    requestFactory(commands.MOAI_REGISTER_NOTIFICATION_TOKEN, { token: expoPushToken, encryptionKey: encryptionKey })({
        onExecuted: () => ({
            workload: dispatch => {
                dispatch({ type: actionTypes.MOAI_SAVE_EXPO_PUSH_TOKEN, payload: expoPushToken });
            }
        }),
        onError: (error) => ({
            error: new Error(error)
        })
    });

export const getExposureRisk = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_EXPOSURE_RISK, {})();

export const registerExposureFeedback = (testId: string, token: string, data: Record<string, unknown>): Moai.FunctionAction =>
    requestFactory(commands.MOAI_REGISTER_EXPOSURE_FEEDBACK, { testId: testId, token: token, data: data })();