/**
 *
 * @param {*} errorObj Personalised error message
 * @param {*} errorStack Raised error
 */
function ErrorStack(errorObj: string | MoaiError, errorStack?: MoaiError): Partial<MoaiError> {

    const error: Partial<MoaiError> = {};
    let errorMessage = '';

    error.toString = () => JSON.stringify(this);

    // Extract current error message
    if (typeof errorObj === 'string')
        errorMessage = errorObj;
    else if (typeof errorObj === 'object' && Object.prototype.hasOwnProperty.call(errorObj, 'message'))
        errorMessage = errorObj.message;
    else if (typeof errorObj === 'object' && Object.prototype.hasOwnProperty.call(errorObj, 'error'))
        errorMessage = errorObj.error;
    else if (errorObj === undefined || errorObj === null)
        errorMessage = 'Undefined';
    else
        errorMessage = errorObj.toString();
    error.error = errorMessage;

    //Extract error stack
    if (errorStack === undefined && Object.prototype.hasOwnProperty.call(errorObj, 'stack'))
        errorStack = (errorObj as MoaiError).stack as MoaiError;
    if (errorStack !== undefined) {
        if (errorStack instanceof Error)
            error.stack = { error: errorStack.message } as MoaiError;
        else
            error.stack = errorStack;
    }

    return error;
}

export default ErrorStack;