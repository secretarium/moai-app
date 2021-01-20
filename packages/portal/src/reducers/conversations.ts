import { Conversations, StoreComponent } from '../global';
import { commands } from '../actions/constants';

export const initialState: Conversations = {
    isFetching: true,
    conversationList: [],
    lastMessages: [],
    messages: [],
    newConversation: null
};

export const conversations: StoreComponent<Conversations> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...initialState
            };
        }
        case commands.MOAI_GET_CONVERSATIONS.REQUEST:
        case commands.MOAI_GET_CONVERSATION.REQUEST: {
            return {
                ...state,
                isFetching: true
            };
        }
        case commands.MOAI_GET_CONVERSATIONS.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                conversationList: payload.result.conversations
            };
        }
        case commands.MOAI_GET_CONVERSATION.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                messages: payload.result.messages
            };
        }
        case commands.MOAI_GET_LAST_MESSAGE.REQUEST: {
            return {
                ...state,
                isFetching: true
            };
        }
        case commands.MOAI_GET_LAST_MESSAGE.SUCCESS: {
            const i = state.lastMessages.findIndex(lastMessage => lastMessage.address === payload.address);
            if (i > -1) {
                state.lastMessages[i] = { address: state.lastMessages[i].address, lastMessage: payload.result };
            } else {
                state.lastMessages.push({ address: payload.address, lastMessage: payload.result });
            }
            state.messages.push(payload.result);
            return {
                ...state,
                isFetching: false
            };
        }
        case commands.MOAI_SEND_MESSAGE.FAILURE: {
            return {
                ...state,
                messageError: error?.message ?? error ?? 'Unknown error occured while sending message.'
            };
        }
        case commands.MOAI_SEND_MESSAGE.SUCCESS: {
            return {
                ...state
            };
        }
        case commands.MOAI_CREATE_CONVERSATION.REQUEST: {
            return {
                ...state,
                isFetching: true,
                newConversation: null
            };
        }
        case commands.MOAI_CREATE_CONVERSATION.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                newConversation: payload.result
            };
        }
        default:
            return state;
    }
};