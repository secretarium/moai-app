import http from 'http';
import express from 'express';
import os from 'os';
import config from '../config/moai.config';
import MoaiServer from './moaiServer';

let webApp;
let webServer;
let moaiServer = new MoaiServer(config);

const setup = () => {
    webApp = express();
    // Remove unwanted express headers
    webApp.set('x-powered-by', false);
    return webApp;
};

moaiServer.start().then((moaiRouter) => {

    webApp = setup();
    webApp.use('/api', moaiRouter);
    webServer = http.createServer(webApp);
    webServer.listen(config.port, (error) => {
        if (error) {
            console.error('An error occurred while starting the HTTP server.', error); // eslint-disable-line no-console
            return;
        }
        console.log(`Listening at http://${os.hostname()}:${config.port}/`); // eslint-disable-line no-console
    });
    return true;
}).catch((error) => {
    console.error('An error occurred while starting the Moai core.', error); // eslint-disable-line no-console
    console.error(error.stack); // eslint-disable-line no-console
    return false;
});

if (module.hot) {
    module.hot.accept('./moaiServer', () => {
        if (webApp !== undefined)
            webServer.removeListener('request', webApp);
        moaiServer = new MoaiServer(config);
        moaiServer.start().then((moaiRouter) => {
            webApp = setup();
            webApp.use('/api', moaiRouter);
            webServer.on('request', webApp);
            return true;
        }).catch((error) => {
            console.error('An error occurred while reloading the Moai core.', error); // eslint-disable-line no-console
            console.error(error.stack); // eslint-disable-line no-console
            return false;
        });
    });
}
