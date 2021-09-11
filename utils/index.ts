import axios from 'axios';

export const download = async function (url: string) {
    const res = await axios.get(url, {
        responseType: 'arraybuffer',
        headers: {
            "DNT": 1,
            "Upgrade-Insecure-Request": 1
        }
    })
    return res.data
}

export const random = function () {
    return `${Math.floor(Math.random() * 1e4)}`
}

export const normalize = function (text: string) {
    let normal = text.replace(/[^a-zA-Z0-9' ]/g, ' ').split(' ');
    let chunk = [];
    for (const i of normal) {
        i === '' ? '' : chunk.push(i);
    }
    return chunk.join(' ');
}