//External node module imports
import express, { Application, Handler, Request } from 'express';
import expressSession from 'express-session';
import mongoSessionConnect from 'connect-mongo';
import body_parser from 'body-parser';
import csrf from 'csurf';
import passport from 'passport';
import moaiOptions from './utils/options';
import dbcon from './utils/dbConnection';
import { migrate } from './utils/dbHandler';
import ErrorHelper from './utils/errorHelper';
import requestMiddleware from './utils/requestMiddleware';
import tagRouter from './routes/tagRoute';
import UserController from './controllers/userController';

const mongoSession = mongoSessionConnect(expressSession);
const csrfHandle = csrf();

class MoaiServer {
    config: MoaiConfiguration;
    app: Application;
    requestMiddleware: typeof requestMiddleware;
    tagRoute: Handler;

    constructor(config: MoaiConfiguration) {
        this.config = moaiOptions(config);
        this.app = express();

        // Define config in global scope (needed for server extensions)
        global['config'] = this.config;

        // Configure EXPRESS.JS router
        // Remove unwanted express headers
        this.app.set('x-powered-by', false);
        // Allow CORS requests when enabled
        if (this.config.enableCors === true) {
            this.app.use((__unused__req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
        }

        // Middleware imports
        this.requestMiddleware = requestMiddleware;
    }

    /**
     * @fn start
     * @desc Start the MoaiServer service, routes are setup and
     * automatic status update is triggered.
     * @return {Promise} Resolve to a native Express.js router ready to use on success.
     * In case of error, an ErrorStack is rejected.
     */
    start(): Promise<Application> {
        // const _this: MoaiServer = this;
        return new Promise((resolve, reject) => {

            // Operate database migration if necessary
            migrate().then(async () => {

                // Setup sessions with third party middleware
                const mongoSessionStore = new mongoSession({
                    client: await dbcon(),
                    collection: 'MOAI_SESSIONS'
                });

                this.app.use(expressSession({
                    secret: this.config.sessionSecret,
                    saveUninitialized: false,
                    resave: false,
                    cookie: { secure: false },
                    store: mongoSessionStore
                }));

                this.app.use(passport.initialize());
                this.app.use(passport.session());

                //Passport session serialize and deserialize
                passport.serializeUser(UserController.serializeUser);
                passport.deserializeUser(UserController.deserializeUser);

                // Keeping a pointer to the original mounting point of the server
                this.app.use((req: Request, __unused__res, next) => {
                    req.moaiRootUrl = req.baseUrl;
                    next();
                });

                // Init third party middleware for parsing HTTP requests body
                this.app.use(body_parser.json({
                    limit: '10mb'
                }));
                this.app.use(body_parser.urlencoded({
                    extended: true,
                    limit: '10mb'
                }));

                // Adding session checks and monitoring
                this.app.use('/', this.requestMiddleware.addActionToCollection);
                this.app.use('/', this.requestMiddleware.verifySessionAndPrivilege);

                // Setup remaining route using controllers
                this.setupTag();

                // Setup CSRF protecting middleware
                this.app.use(csrfHandle);
                this.app.use((error, __unused__req, res, next) => {
                    if (!error)
                        next();
                    else {
                        if (error.code === 'EBADCSRFTOKEN') {
                            // Handle CSRF token errors here
                            res.status(403);
                            res.json(ErrorHelper('Form tempered with'));
                        } else {
                            next(error);
                        }
                    }
                });
                this.app.use((req: Request, __unused__res, next) => {
                    req.moaiCSRFToken = req.csrfToken();
                    next();
                });

                this.app.all('/*', (__unused__req, res) => {
                    res.status(400);
                    res.json(ErrorHelper('Bad request'));
                });

                // Return the Express application
                return resolve(this.app);

            }).catch(err => reject(err));
        });
    }

    /**
     * @fn stop
     * @desc Stops the moai server service. After a call to stop, all references on the
     * express router MUST be released and this service endpoints are expected to fail.
     * @return {Promise} Resolve to true on success, ErrorStack otherwise
     */
    stop(): Promise<void> {
        return dbcon().then(client => client.close());
    }

    /**
     * @fn setup
     * @desc Initialize the synchronization related routes
     */
    setupTag(): void {
        // Modules
        this.app.use('/tag', tagRouter);
    }
}

export default MoaiServer;