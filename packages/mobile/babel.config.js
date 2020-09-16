module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            '@expo/next-adapter/babel',
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-typescript'
        ]
    };
};
