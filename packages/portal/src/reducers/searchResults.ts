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
        case commands.MOAI_GET_TESTED.REQUEST:
        case commands.MOAI_GET_EXPOSED.REQUEST: {
            delete state.searchExposedError;
            delete state.searchTestedError;
            return {
                ...state,
                isFetching: true,
                tested: null,
                exposed: null
            };
        }
        case actionTypes.MOAI_PORTAL_CLEAR_SEARCH_RESULT: {
            return {
                ...state,
                tested: null,
                exposed: null
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
            } else if (error?.message.trim() === 'no user found') {
                resultingError = 'No results.';
            } else {
                resultingError = 'Unknown error occured while searching.';
            }
            return {
                ...state,
                searchTestedError: resultingError
            };
        }
        case commands.MOAI_GET_EXPOSED.FAILURE: {
            let resultingError: string;
            if (error?.message === 'invalid arg \'venue\'') {
                resultingError = 'Please enter a valid location code.';
            } else {
                resultingError = 'Unknown error occured while searching.';
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