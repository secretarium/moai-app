const { withExpo } = require('@expo/next-adapter');
const { nextI18NextRewrites } = require('next-i18next/rewrites');
const localeSubpaths = {};

module.exports = {
    ...withExpo({
        projectRoot: __dirname
    }),
    reactStrictMode: true,
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
        localeSubpaths
    }
};
