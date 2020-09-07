const crypto = require('crypto');
const metroTransformer = require('metro-react-native-babel-transformer');
const { transform: svgTransfromer } = require('react-native-svg-transformer');

const transform = ({ src, filename, options }) => {

    let result = src;
    if (/\.(svg)$/.test(filename))
        return svgTransfromer(src, filename, options);

    const babelCompileResult = metroTransformer.transform({
        src: result,
        filename,
        options
    });

    return babelCompileResult;
};

const cacheKeyParts = [
    'Moai',
    metroTransformer.getCacheKey()
];

function getCacheKey() {
    const key = crypto.createHash('md5');
    cacheKeyParts.forEach(part => key.update(String(part)));
    return key.digest('hex');
}

module.exports = { transform, getCacheKey };