module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connections: {
        default: {
            connector: 'bookshelf',
            settings: {
                client: 'sqlite',
                filename: env('CMS_DATABASE_FILENAME', '.tmp/data.db'),
            },
            options: {
                useNullAsDefault: true,
            },
        },
    },
});
