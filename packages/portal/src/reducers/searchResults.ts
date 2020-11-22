import { SearchResults, StoreComponent } from '../global';
import { commands } from '../actions/constants';

export const initialState: SearchResults = {
    isFetching: true,
    tested: null,
    exposed: null
};

export const searchResults: StoreComponent<SearchResults> = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case 'persist/REHYDRATE': {
            return {
                ...initialState
            };
        }
        case commands.MOAI_GET_TESTED.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                tested: payload.result
            };
        }
        case commands.MOAI_GET_EXPOSED.SUCCESS: {
            return {
                ...state,
                isFetching: false,
                exposed: payload.result
            };
        }
        default:
            return state;
    }
};