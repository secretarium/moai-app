import { commands } from './constants';
import { requestFactory } from './factories';

export const getImmunityRecords = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_IMMUNITY_RECORDS, {})();

export const getImmunityCertificate = (): Moai.FunctionAction =>
    requestFactory(commands.MOAI_GET_IMMUNITY_CERTIFICATE, {})();

export const requestImmunityCertificate = (userDetailsDigest: string): Moai.FunctionAction =>
    requestFactory(commands.MOAI_REQUEST_IMMUNITY_CERTIFICATE, {userDetailsDigest: userDetailsDigest})();