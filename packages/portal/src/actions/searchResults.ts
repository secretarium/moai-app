import { commands, actionTypes } from './constants';
import { requestFactory } from './factories';


export const getTested = (barcode: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_TESTED, { barcode: barcode })({
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

export const clearSearchErrors = (): MoaiPortal.FunctionAction => (dispatch) => {
    dispatch({ type: actionTypes.MOAI_PORTAL_SEARCH_ERROR_CLEANUP });
};