import { commands, actionTypes } from './constants';
import { requestFactory } from './factories';
import { createConversation } from './conversations';


export const getTested = (testId: string, type: 'covidTest' | 'covidAntibodyTest'): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_TESTED, { testId: testId, type: type })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        },
        onError: (error) => ({
            error: new Error(error)
        })
    });

export const getExposed = (venue: string, utc: number): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_EXPOSED, { venue: venue, utc: utc })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        },
        onError: (error) => ({
            error: new Error(error)
        })
    });

export const setTestResult = (testId: string, positive: boolean, userId: string, type: 'covidTest' | 'covidAntibodyTest'): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_SET_TEST_RESULT, { testId: testId, positive: positive, type: type })({
        onExecuted: () => ({
            workload: dispatch => {
                dispatch(createConversation('title', 'name', userId, positive));
            }
        })
    });

export const setNaturalImmunity = (testId: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_SET_NATURAL_IMMUNITY, { testId: testId })({});

export const clearSearchErrors = (): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({ type: actionTypes.MOAI_PORTAL_SEARCH_ERROR_CLEANUP });
};

export const clearSearchResults = (): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({ type: actionTypes.MOAI_PORTAL_CLEAR_SEARCH_RESULT });
};