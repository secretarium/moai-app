import { commands } from './constants';
import { requestFactory } from './factories';


export const getConversations = (): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_CONVERSATIONS)({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });

export const getConversation = (address: string, token: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_CONVERSATION, { address: address, token: token })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });

export const createConversation = (pseudo: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_CREATE_CONVERSATION, { pseudo: pseudo })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });

export const getLastMessage = (id: number, token: number): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_LAST_MESSAGE, { id: id, token: token })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });

export const sendMessage = (id: number, token: number, text: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_SEND_MESSAGE, { id: id, token: token, text: text })({
        onExecuted: () => ({
            payload: { message: text }
        })
    });

export const markRead = (id: number, token: number, index: number): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_MARK_AS_READ, { id: id, token: token, index: index })({
        onExecuted: () => ({
            payload: {}
        })
    });