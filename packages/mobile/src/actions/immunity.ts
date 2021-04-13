import { commands } from './constants';
import { requestFactory } from './factories';

export const getImmunityRecords = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_IMMUNITY_RECORDS, {})({
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

export const getImmunityCertificate = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_IMMUNITY_CERTIFICATE, {})({
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

export const requestImmunityCertificate = (userDetailsDigest: string): Moai.FunctionAction =>
    requestFactory(commands.MOAI_REQUEST_IMMUNITY_CERTIFICATE, { userDetailsDigest: userDetailsDigest })();

export const getVaccineCode = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_VACCINE_CODE, {})({
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