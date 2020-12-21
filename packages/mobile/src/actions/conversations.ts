import { commands } from './constants';
import { requestFactory } from './factories';

export const getConversations = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_CONVERSATIONS, { max: 10, cursor: 0 })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });

export const getConversation = (address: string, token: string): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_CONVERSATION, { address: address, token: token }, true)({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
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