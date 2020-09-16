const { withExpo } = require('@expo/next-adapter');
const { nextI18NextRewrites } = require('next-i18next/rewrites');
const localeSubpaths = {};

module.exports = {
    ...withExpo({
        projectRoot: __dirname,
        webpack: (config) => {
            config.module.rules.unshift({
                test: /\.svg$/,
                issuer: {
                    test: /\.(js|ts)x?$/
                },
                use: ['@svgr/webpack']
            });
            return config;
        }
    }),
    reactStrictMode: true,
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
        localeSubpaths
    }
};
