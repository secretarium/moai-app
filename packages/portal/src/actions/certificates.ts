import { commands } from './constants';
import { requestFactory } from './factories';


export const getImmunityCertificateRequests = (): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_IMMUNITY_CERTIFICATE_REQUESTS, {})({});

export const getImmunityCertificateRequestRecords = (requester: string): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_GET_IMMUNITY_CERTIFICATE_REQUEST_RECORDS, { requester: requester })({});

export const manageImmunityCertificateRequest = (requester: string, approved: boolean, expiry?: number): MoaiPortal.FunctionAction =>
    requestFactory(commands.MOAI_MANAGE_IMMUNITY_CERTIFICATE_REQUEST, { requester: requester, approved: approved, expiry: expiry })({});