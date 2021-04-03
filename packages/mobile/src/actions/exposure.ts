import { commands } from './constants';
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

export const getExposureRisk = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_EXPOSURE_RISK, {})();

export const registerExposureFeedback = (testId: string, token: string, data: Record<string, unknown>): Moai.FunctionAction =>
    requestFactory(commands.MOAI_REGISTER_EXPOSURE_FEEDBACK, { testId: testId, token: token, data: data })();
