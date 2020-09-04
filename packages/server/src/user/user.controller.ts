import { Router, Request, Response, NextFunction } from 'express';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import authMiddleware from '../middleware/auth.middleware';
import userModel from './user.model';
import UserNotFoundException from '../exceptions/UserNotFoundException';

class UserController implements Moai.Controller {
    public path = '/users';
    public router = Router();
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
        this.router.get(`${this.path}/:id/tags`, authMiddleware, this.getAllTagsOfUser);
    }

    private getUserById = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const userQuery = this.user.findById(id);
        if (request.query.withTags === 'true') {
            userQuery.populate('tags').exec();
        }
        const user = await userQuery;
        if (user) {
            response.json(user);
        } else {
            next(new UserNotFoundException(id));
        }
    }

    private getAllTagsOfUser = async (request: Moai.RequestWithUser, response: Response, next: NextFunction) => {
        const userId = request.params.id;
        if (userId === request.user._id.toString()) {
            const tags = await this.tag.find({ author: userId });
            response.json(tags);
        }
        next(new NotAuthorizedException());
    }
}

export default UserController;
