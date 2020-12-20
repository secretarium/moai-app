import { Conversations, StoreComponent } from '../global';
import { commands } from '../actions/constants';

export const initialState: Conversations = {
    isFetching: true,
    conversation: null,
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
                conversation: payload.result.conversations[0]
            };
        }
        case commands.MOAI_GET_CONVERSATION.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                messages: payload.result.messages
            };
        }
        case commands.MOAI_GET_LATEST_CONVERSATION.SUCCESS: {
            return {
                ...state,
                conversation: payload.result
            };
        }
        case commands.MOAI_GET_LAST_MESSAGE.SUCCESS: {
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
        default:
            return state;
    }
};