module.exports = ({ env }) => ({
    settings: {
        public: {
            path: env('CMS_PUBLIC_DIRECTORY', './public')
        },
    },
});