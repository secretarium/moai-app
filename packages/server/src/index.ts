import server from './server';

let moaiServer = server.getServer().listen(undefined, () => {
    console.log('Listening...'); // eslint-disable-line no-console
});

if (module.hot) {
    module.hot.accept('./server', () => {
        moaiServer.close(() => {
            moaiServer = moaiServer.listen(undefined, () => {
                console.log('Listening...'); // eslint-disable-line no-console
            });
            return true;
        });
    });
}