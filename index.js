const { random, download, normalize } = require('./utils')
const readline = require('readline')
const moment = require('moment-timezone')
const fs = require('fs')
const fetch = require('node-fetch')
const Filetype = require('file-type')

let time = moment.tz('Asia/Jakarta').format('HH:mm:ss z')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

if (!fs.existsSync('./media')) {
    console.log('Creating \'media\' folder....')
    fs.mkdirSync('media')
}

const start = async function() {

    console.clear()
    console.log('Welcome to \'Fetish Downloader\'')
    console.log('All image was from reddit. For spesific search you must provide a valid subreddit.')
    console.log('You can type \'random\' for random subreddit.')
    console.log('type \'exit\' to exit')

    rl.question('\033[1;36mSearch: \033[1;32m', (input) => {
        let q = input
        if (q === 'exit' || q === 'stop') {
            console.log('See ya!')
            process.exit()
        }
        rl.question('\033[1;36mHow many: \033[1;32m', async (total) => {
            await searchImage(q, total).then(() => start())
        })
    })
}

const searchImage = async function(query, total) {
    let jum = parseInt(total) || 5
    let count = 1
    if (query === '' || query === 'random' || query === undefined || query === null) {
        const tag = ['ecchi', 'lewdanimegirls', 'hentai', 'hentaifemdom', 'hentaiparadise', 'hentai4everyone', 'animearmpits', 'animefeets', 'animethighss', 'animebooty', 'biganimetiddies', 'animebellybutton', 'sideoppai', 'ahegao']
        query = tag[Math.floor(Math.random() * tag.length)]
    }
    for (let s = 0; s < jum; s++) {
        const res = await fetch(`https://meme-api.herokuapp.com/gimme/${encodeURIComponent(query)}`).catch(console.error)
        let { url, title } = await res.json()
        title = normalize(title)

        const data = await download(url)
        let { ext } = await Filetype.fromBuffer(data)

        if (fs.existsSync(`./media/${title}.${ext}`)) {
            let name2 = random()
            console.log(`( ${title} ) name already exist, try with random name... ( ${name2} )`)
            fs.promises.writeFile(`./media/${name2}.${ext}`, data, { encoding: 'base64' })
            console.log(`[${time}]`, count++, 'Done')
        } else {
            fs.promises.writeFile(`./media/${title}.${ext}`, data, { encoding: 'base64' })
            console.log(`[${time}]`, count++, 'Done')
        }
    }
}

start()