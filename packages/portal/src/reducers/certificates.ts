import { Certificates, StoreComponent } from '../global';
import { commands } from '../actions/constants';

export const initialState: Certificates = {
    isFetching: true,
    requesters: [],
    requestRecords: []
};

export const certificates: StoreComponent<Certificates> = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...initialState
            };
        }
        case commands.MOAI_GET_IMMUNITY_CERTIFICATE_REQUESTS.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                requesters: payload
            };
        }
        case commands.MOAI_GET_IMMUNITY_CERTIFICATE_REQUEST_RECORDS.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                requestRecords: payload
            };
        }
        default:
            return state;
    }
};