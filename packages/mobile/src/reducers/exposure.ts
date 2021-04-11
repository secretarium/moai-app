import { Exposure, StoreComponent } from '../global';
import { actionTypes, commands } from '../actions/constants';

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
        case actionTypes.MOAI_SET_RISK_PROFILE: {
            return {
                ...state,
                riskProfile: payload.riskLevel
            };
        }
        case commands.MOAI_GET_EXPOSURE_RISK: {
            return {
                ...state
            };
        }
        default:
            return state;
    }
};