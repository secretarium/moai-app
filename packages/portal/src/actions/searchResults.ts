import { commands } from './constants';
import { requestFactory } from './factories';


export const getTested = (barcode: number): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_TESTED, { barcode: barcode })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });

export const getExposed = (venue: number, time: number): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_EXPOSED, { venue: venue, time: time })({
        onResult: result => {
            return {
                payload: {
                    result
                }
            };
        }
    });