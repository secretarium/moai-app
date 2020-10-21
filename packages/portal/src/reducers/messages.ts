import { Messages, StoreComponent } from '../global';
//import { actionTypes } from '../actions/constants';

export const initialState: Messages = {
    messageList: {}
};

export const messages: StoreComponent<Messages> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        // case actionTypes.MOAI_PORTAL_SEND_MESSAGE:
        // case actionTypes.MOAI_PORTAL_RECEIVE_MESSAGE: {
        //     return state.messageList.concat([{
        //         message: payload.message,
        //         user_ID: payload.user_ID,
        //         timestamp: payload.timestamp,
        //         seen: payload.seen
        //     }]);
        // }
        default:
            return state;
    }
};