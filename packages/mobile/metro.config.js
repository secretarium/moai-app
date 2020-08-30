const { createMetroConfiguration } = require('expo-yarn-workspaces');

const baseConfig = createMetroConfiguration(__dirname);
const config = {
    ...baseConfig,
    transformer: {
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
    }
};

module.exports = config;
