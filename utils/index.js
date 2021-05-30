const fetch = require('node-fetch')

/**
 * Download
 * @param {url} url url want to be downloads
 */
exports.download = async function(url) {
    const res = await fetch(url)
    return res.buffer()
}

/**
 * random
 * @returns random number
 */
exports.random = function() {
    return `${Math.floor(Math.random() * 1e4)}`
}