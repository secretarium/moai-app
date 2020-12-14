import { SearchResults, StoreComponent } from '../global';
import { commands, actionTypes } from '../actions/constants';

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
                exposed: payload.result.userIds
            };
        }
        case commands.MOAI_GET_TESTED.FAILURE: {
            let resultingError: string;
            if (error?.message === 'invalid arg \'barcode\'') {
                resultingError = 'Please enter a valid barcode.';
            } else {
                resultingError = 'Unknown error occured while validating.';
            }
            return {
                ...state,
                searchTestedError: resultingError
            };
        }
        case commands.MOAI_GET_EXPOSED.FAILURE: {
            let resultingError: string;
            if (error?.message === 'invalid arg \'venue\'') {
                resultingError = 'Please enter a valid venue code.';
            } else {
                resultingError = 'Unknown error occured while validating.';
            }
            return {
                ...state,
                searchExposedError: resultingError
            };
        }
        case actionTypes.MOAI_PORTAL_SEARCH_ERROR_CLEANUP: {
            delete state.searchExposedError;
            delete state.searchTestedError;
            return {
                ...state
            };
        }
        default:
            return state;
    }
};