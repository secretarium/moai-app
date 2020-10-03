const merge = require('deepmerge');
const isPlainObject = require('is-plain-object');
const { createMetroConfiguration } = require('expo-yarn-workspaces');

const baseConfig = createMetroConfiguration(__dirname);
const config = merge(baseConfig, {
    transformer: {
        minifierConfig: {
            ecma: 8,
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
    isMergeableObject: isPlainObject
});

module.exports = config;
