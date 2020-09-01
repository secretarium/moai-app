namespace Express {
    interface User {
        id: string;
        username: string;
        priv: boolean;
    }

    interface Request {
        moaiRootUrl: string;
        moaiCSRFToken: string;
        csrfToken: () => string;
    }
}

type MoaiConfiguration = {
    port: number;
    mongo: string;
    enableCors: boolean;
    sessionSecret: string;
}

type MoaiError = {
    error: string;
    message: string;
    stack: string | MoaiError;
}