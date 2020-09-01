/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace Express {
    interface User {
        id: string;
        username: string;
        priv: boolean;
    }

    interface Request {
        moaiRootUrl: string;
        moaiCSRFToken: string;
        // csrfToken: () => string;
    }
}
