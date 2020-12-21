import { commands } from './constants';
import { requestFactory } from './factories';


export const getConversations = (): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_CONVERSATIONS, { max: 10, cursor: 0 })({
        onResult: result => {
            return {
                payload: {
                    result
                },
                workload: dispatch => result.conversations.forEach((convo) => dispatch(getLastMessage(convo.address, convo.token)))
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

export const createConversation = (title: string, name: string, userId: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_CREATE_CONVERSATION, { title: title, name: name, userId: userId })({
        onResult: result => {
            return {
                payload: {
                    result
                },
                workload: dispatch => dispatch(getConversations())
            };
        }
    });

export const getLastMessage = (address: string, token: string): MoaiPortal.FunctionAction =>
    requestFactory({...commands.MOAI_GET_LAST_MESSAGE, explicit:`mglm-${address.slice(0,5)}`}, { address: address, token: token }, true)({
        onResult: result => {
            return {
                payload: {
                    result,
                    address
                }
            };
        }
    });

export const sendMessage = (address: string, token: string, message: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_SEND_MESSAGE, { address: address, token: token, message: message })({
        onExecuted: () => ({
            payload: { message }
        }),
        onError: (error) => ({
            error: new Error(error)
        })
    });

export const markRead = (id: number, token: number, index: number): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_MARK_AS_READ, { id: id, token: token, index: index })({
        onExecuted: () => ({
            payload: {}
        })
    });