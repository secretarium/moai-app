import { actionTypes, commands } from './constants';
import { requestFactory } from './factories';

export const getVenues = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_VENUES, { max: 10, cursor: 0 })({
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

export const setRiskProfile = (riskLevel: 'low' | 'medium' | 'high'): Moai.AnyAction => ({
    type: actionTypes.MOAI_SET_RISK_PROFILE,
    payload: {
        riskLevel
    }
});

export const getExposureRisk = (results: number[]): Moai.FunctionAction => (dispatch, getState) => {
    const riskProfile = getState()?.exposure.riskProfile;
    dispatch(requestFactory(commands.MOAI_GET_EXPOSURE_RISK, { riskProfile: riskProfile, questionnaire: results })({
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
    }));
};

export const registerExposureFeedback = (testId: string, token: string, data: Record<string, unknown>): Moai.FunctionAction =>
    requestFactory(commands.MOAI_REGISTER_EXPOSURE_FEEDBACK, { testId: testId, token: token, data: data })();
