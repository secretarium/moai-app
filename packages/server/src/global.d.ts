import { Request } from 'express';
import User from './user/user.interface';

declare namespace Moai {

    interface RequestWithUser extends Request {
        user: User;
    }

    interface DataStoredInToken {
        _id: string;
    }

    interface Controller {
        path: string;
        router: Router;
    }

    interface TokenData {
        token: string;
        expiresIn: number;
    }

    type UserCreationData = {
        cookie: string;
        user: User;
    };
}

export = Moai;
export as namespace Moai;