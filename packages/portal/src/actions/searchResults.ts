import { commands } from './constants';
import { requestFactory } from './factories';


export const getTested = (barcode: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_TESTED, { barcode: barcode })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });

export const getExposed = (venue: string, utc: number): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_EXPOSED, { venue: venue, utc: utc })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });