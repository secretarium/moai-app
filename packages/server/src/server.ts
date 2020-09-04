import { config } from 'dotenv-flow';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import NodeController from './node/node.controller';
import UserController from './user/user.controller';
import validateEnv from './utils/validateEnv';

config();
validateEnv();

const app = new App(
    [
        new AuthenticationController(),
        new NodeController(),
        new UserController()
    ]
);

export default app;
