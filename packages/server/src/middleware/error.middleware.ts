import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, __unused__request: Request, response: Response, __unused__next: NextFunction): void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .json({
            message,
            status
        });
}

export default errorMiddleware;
