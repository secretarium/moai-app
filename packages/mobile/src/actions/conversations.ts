import { commands } from './constants';
import { requestFactory } from './factories';
import { sendPushNotification } from '../services/notifications/notifications';

export const getConversations = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_CONVERSATIONS, { max: 10, cursor: 0 })({
        onResult: result => {
            return {
                payload: {
                    result
                },
                workload: dispatch => dispatch(getLatestConversation())
            };
        },
        onError: (error) => ({
            error: new Error(error)
        })
    });

export const getConversation = (address: string, token: string, expoPushToken: string): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_CONVERSATION, { address: address, token: token })({
        onResult: result => {
            return {
                payload: {
                    result
                },
                workload: dispatch => dispatch(getLastMessage(address, token, expoPushToken))
            };
        },
        onError: (error) => ({
            error: new Error(error)
        })
    });

export const sendMessage = (address: string, token: string, message: string): Moai.FunctionAction =>
    requestFactory(commands.MOAI_SEND_MESSAGE, { address: address, token: token, message: message })({
        onExecuted: () => ({
            payload: { message }
        }),
        onError: (error) => ({
            error: new Error(error)
        })
    });

export const getLastMessage = (address: string, token: string, expoPushToken: string): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_LAST_MESSAGE, { address: address, token: token }, true)({
        onResult: result => {
            if (result.sender === 0) {
                sendPushNotification(result.text, expoPushToken);
            }
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

export const getLatestConversation = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_LATEST_CONVERSATION, { subscribe: true }, true)();