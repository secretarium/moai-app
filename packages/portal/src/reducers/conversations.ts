import { Conversations, StoreComponent } from '../global';
import { commands } from '../actions/constants';

export const initialState: Conversations = {
    isFetching: true,
    conversationList: [],
    lastMessage: [],
    messages: [],
    newMessage: false
};

export const conversations: StoreComponent<Conversations> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...initialState
            };
        }
        case commands.MOAI_GET_CONVERSATIONS.REQUEST:
        case commands.MOAI_GET_CONVERSATION.REQUEST:
        case commands.MOAI_CREATE_CONVERSATION.REQUEST: {
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
                lastMessage: [],
                isFetching: true
            };
        }
        case commands.MOAI_GET_LAST_MESSAGE.SUCCESS: {
            state.lastMessage.push(payload.result);
            return {
                ...state,
                isFetching: false,
                newMessage: false
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
                ...state,
                newMessage: true
            };
        }
        case commands.MOAI_CREATE_CONVERSATION.SUCCESS: {
            return {
                ...state,
                isFetching: false
            };
        }
        default:
            return state;
    }
};