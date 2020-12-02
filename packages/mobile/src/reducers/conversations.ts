import { Conversations, StoreComponent } from '../global';
import { commands } from '../actions/constants';

export const initialState: Conversations = {
    isFetching: true,
    conversationList: [],
    messages: []
};

export const conversations: StoreComponent<Conversations> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...initialState
            };
        }
        case commands.MOAI_GET_CONVERSATIONS.REQUEST: {
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