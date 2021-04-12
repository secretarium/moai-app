import { Exposure, StoreComponent } from '../global';
import { commands } from '../actions/constants';

export const initialState: Exposure = {
    venues: []
};

export const exposure: StoreComponent<Exposure> = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...initialState
            };
        }
        case commands.MOAI_GET_VENUES.SUCCESS: {
            return {
                ...state,
                venues: payload.result.venues
            };
        }
        case commands.MOAI_GET_EXPOSURE_RISK.SUCCESS: {
            return {
                ...state,
                risk: payload.result
            };
        }
        default:
            return state;
    }
};