import { Immunity, StoreComponent } from '../global';
import { commands } from '../actions/constants';

export const initialState: Immunity = {
    immunityRecords: [],
    immunityCertificate: null
};

export const immunity: StoreComponent<Immunity> = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...initialState
            };
        }
        case commands.MOAI_GET_IMMUNITY_RECORDS.SUCCESS: {
            return {
                ...state,
                immunityRecords: payload.result
            };
        }
        case commands.MOAI_GET_IMMUNITY_CERTIFICATE.SUCCESS: {
            return {
                ...state,
                immunityCertificate: payload.result
            };
        }
        default:
            return state;
    }
};