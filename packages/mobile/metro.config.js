const { createMetroConfiguration } = require('expo-yarn-workspaces');

const baseConfig = createMetroConfiguration(__dirname);
const { resolver: { assetExts } } = baseConfig;

const config = {
    ...baseConfig,
    transformer: {
        babelTransformerPath: require.resolve('./transformers.config.js'),
        minifierConfig: {
            ecma: 8,
            keep_classnames: true,
            keep_fnames: true,
            module: true,
            mangle: {
                module: true,
                keep_classnames: true,
                keep_fnames: true
            }
        }
    },
    resolver: {
        ...baseConfig.resolver,
        assetExts: assetExts.filter(ext => ext !== 'svg')
    }
};

module.exports = config;
