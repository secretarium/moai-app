const { withExpo } = require('@expo/next-adapter');
const { nextI18NextRewrites } = require('next-i18next/rewrites');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const localeSubpaths = {};

module.exports = {
    ...withExpo(withImages(withFonts({
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
    }))),
    reactStrictMode: true,
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
        localeSubpaths
    }
};
