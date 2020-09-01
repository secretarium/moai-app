import { config } from 'dotenv-flow';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import UserController from './user/user.controller';
import validateEnv from './utils/validateEnv';

config();
validateEnv();

const app = new App(
    [
        new AuthenticationController(),
        new UserController()
    ]
);

export default app;
