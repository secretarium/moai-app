const { getDefaultConfig } = require('@expo/metro-config');
const merge = require('deepmerge');

const baseConfig = getDefaultConfig(__dirname);
const config = merge(baseConfig, {
    transformer: {
        minifierConfig: {
            ecma: 8,
            compress: {
                drop_console: true
            },
            keep_classnames: true,
            keep_fnames: true,
            mangle: {
                keep_classnames: true,
                keep_fnames: true
            }
        }
    },
    resolver: {
        assetExts: ['txt', 'ttf', 'png']
    }
}, {
    arrayMerge: (target, source) => Array.from(new Set([...source, ...target]))
});

module.exports = config;
