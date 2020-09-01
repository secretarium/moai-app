import message from './messages';
import { Response, NextFunction, Request } from 'express';

class RequestMiddleware {
    static verifySessionAndPrivilege(req: Request, res: Response, next: NextFunction): void {
        const user = req.user ? req.user.id : null;
        if (user !== null) {
            next();
        } else if (req.url === '/users/login' || req.url === '/whoami') {
            next();
        } else {
            res.status(400).json({ status: 'error', message: message.userError.NOTLOGGEDIN });
        }
    }

    /*
    ** Method:  addActionToCollection
    ** Purpose: Monitor behavior of the user and save in the database each action taken by the user.
    */
    static addActionToCollection(req: Request, __unused__res: Response, next: NextFunction): void {
        const body = Object.assign({}, req.body);
        // We do not filter here are assume password are always sent as 'pw'
        if (body.pw !== undefined)
            body.pw = '*';
        // TODO Log actions here
        next();
    }
}

export default RequestMiddleware;