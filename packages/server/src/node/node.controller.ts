import { Router, Request, Response, NextFunction } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import nodeModel from './node.model';

class UserController implements Moai.Controller {
    public path = '/nodes';
    public router = Router();
    private node = nodeModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id/chat`, authMiddleware, this.getChatNode);
        this.router.get(`${this.path}/:id/marker`, authMiddleware, this.getMarkerNode);
        this.router.get(`${this.path}/:id/registry`, authMiddleware, this.getRegistryNode);
    }

    private getChatNode = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const nodeQuery = this.node.findById(id);
        const node = await nodeQuery;
        if (node) {
            response.json(node);
        } else {
            next();
        }
    }

    private getMarkerNode = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const nodeQuery = this.node.findById(id);
        const node = await nodeQuery;
        if (node) {
            response.json(node);
        } else {
            next();
        }
    }

    private getRegistryNode = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const nodeQuery = this.node.findById(id);
        const node = await nodeQuery;
        if (node) {
            response.json(node);
        } else {
            next();
        }
    }
}

export default UserController;
