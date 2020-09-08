import { cleanEnv, port, str, bool } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        ENABLE_CORS: bool({
            default: false
        }),
        JWT_SECRET: str(),
        MONGO_URI: str(),
        PORT: port()
    });
}

export default validateEnv;
