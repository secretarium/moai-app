import { Conversations, StoreComponent } from '../global';
import { commands } from '../actions/constants';

export const initialState: Conversations = {
    isFetching: true,
    conversationList: [],
    conversationLastMessageList: [],
    messages: []
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
        case commands.MOAI_GET_LAST_MESSAGE.REQUEST: {
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
            console.log(payload);
            return {
                ...state,
                isFetching: false,
                messages: payload.result.messages
            };
        }
        case commands.MOAI_GET_LAST_MESSAGE.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                conversationLastMessageList: payload.result
            };
        }
        case commands.MOAI_SEND_MESSAGE.SUCCESS: {
            return {
                ...state
            };
        }
        default:
            return state;
    }
};