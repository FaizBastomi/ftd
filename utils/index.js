const fetch = require('node-fetch');

/**
 * Download
 * @param {url} url url want to be downloads
 */
exports.download = async function (url) {
    const res = await fetch(url);
    return res.buffer();
};

/**
 * random
 * @returns random number
 */
exports.random = function () {
    return `${Math.floor(Math.random() * 1e4)}`;
};

/**
 *
 * @param {Text} text your text
 * @returns normalized text
 */
exports.normalize = function (text) {
    text = text.replace(/[^a-zA-Z0-9' ]/g, ' ').split(' ');
    let chunk = [];
    for (const i of text) {
        i === '' ? '' : chunk.push(i);
    }
    return chunk.join(' ');
};
