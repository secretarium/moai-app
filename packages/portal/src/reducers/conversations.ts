import { Conversations, StoreComponent } from '../global';
import { commands } from '../actions/constants';

export const initialState: Conversations = {
    isFetching: true,
    conversationList: [{ id: 123, endpoint: 'endpointExample', token: 11 }, { id: 456, endpoint: 'endpointExample', token: 12 }],
    messages: {
        id: 123,
        users: {
            idA: 1,
            idB: 2
        },
        myself: 1,
        messageList: [{ time: 123, text: 'Hello there NHS worker.', sender: 2, hasRead: [1, 2] }, { time: 123, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', sender: 2, hasRead: [1, 2] }, { time: 456, text: 'Hello! How may I assist you?', sender: 1, hasRead: [1, 2] }]
    }
};

export const conversations: StoreComponent<Conversations> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...initialState
            };
        }
        case commands.MOAI_GET_CONVERSATIONS.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                conversationList: payload.result
            };
        }
        case commands.MOAI_GET_CONVERSATION.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                messages: payload.result
            };
        }
        case commands.MOAI_SEND_MESSAGE.SUCCESS: {
            const newMessage: MoaiPortal.Message = {
                time: 456,
                text: payload.message,
                sender: state.messages.myself,
                hasRead: [state.messages.users.idA, state.messages.users.idB]
            };
            state.messages.messageList.push(newMessage);
            return {
                ...state
            };
        }
        default:
            return state;
    }
};