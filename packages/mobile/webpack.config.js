const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    const oneOfPos = config.module.rules.findIndex(branch => branch.oneOf);
    config.module.rules[oneOfPos].oneOf.unshift({
        test: /\.svg$/,
        use: ['@svgr/webpack']
    });

    return config;
};
