import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Request, Application, Response } from 'express';
import mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
    public app: Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.app.set('x-powered-by', false);

        const { ENABLE_CORS } = process.env;
        if (ENABLE_CORS === 'true') {
            this.app.use((__unused__req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
        }

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.initializeFallback();
    }

    public getServer(): express.Application {
        return this.app;
    }

    private initializeMiddlewares() {

        this.app.use(bodyParser.json({
            limit: '10mb'
        }));
        this.app.use(bodyParser.urlencoded({
            extended: true,
            limit: '10mb'
        }));
        this.app.use(cookieParser());

        // this.app.use(csrf());
        // this.app.use((error: any, __unused__req: Request, res: Response, next: NextFunction) => {
        //     if (!error)
        //         next();
        //     else {
        //         if (error.code === 'EBADCSRFTOKEN') {
        //             // Handle CSRF token errors here
        //             res.status(403);
        //             res.json({ message: 'Form tempered with' });
        //         } else {
        //             next(error);
        //         }
        //     }
        // });
        // this.app.use((req: Request, __unused__res: Response, next: NextFunction) => {
        //     (req as any).moaiCSRFToken = req.csrfToken();
        //     next();
        // });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeFallback() {
        this.app.all('/*', (__unused__req: Request, res: Response) => {
            console.error('TUTU>', res);
            res.status(400);
            res.json({ status: 'Bad request' });
        });
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private connectToTheDatabase() {
        const { MONGO_URI } = process.env;
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(MONGO_URI);
    }
}

export default App;
