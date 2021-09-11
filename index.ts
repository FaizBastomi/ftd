import { download, normalize, random } from './utils/index';
import readline from 'readline';
import moment from 'moment-timezone';
import * as fs from 'fs';
import axios from 'axios';
import { fromBuffer } from 'file-type';
import { memeApi } from './typing/index';

let time = moment.tz('Asia/Jakarta').format('HH:mm:ss z');
const rl = readline.createInterface(process.stdin, process.stdout);

if (!fs.existsSync('./media')) {
    console.log("Creating 'media' folder....");
    fs.mkdirSync("media");
}

const start = async function () {
    console.clear();
    console.log("Welcome to 'FTD (Fetish Downloader)' ");
    console.log("Type 'random' to download from random subreddit");
    console.log("Type 'exit' to exit")

    rl.question("Search: ", (input: string) => {
        let q = input;
        if (q == 'exit' || q == 'quit' || q == 'stop') {
            console.log("Bye Bye!");
            process.exit(1);
        }
        rl.question("How many? (default 5)\ninput: ", async (total: string) => {
            await searchImage(q, total).then(() => start());
        })
    })
}

const searchImage = async function (query: string, total: string) {
    let jum: number = parseInt(total) || 5;
    let count: number = 1;
    if (query == '' || query == 'random') {
        const tag = [
            'ecchi',
            'lewdanimegirls',
            'hentai',
            'hentaifemdom',
            'hentaiparadise',
            'hentai4everyone',
            'animearmpits',
            'animefeets',
            'animethighss',
            'animebooty',
            'biganimetiddies',
            'animebellybutton',
            'sideoppai',
            'ahegao',
        ];
        query = tag[Math.floor(Math.random() * tag.length)];
    }
    for (let s: number = 0; s < jum; s++) {
        const res: any = await axios.get(`https://meme-api.herokuapp.com/gimme/${encodeURIComponent(query)}`).catch(
            console.error,
        );
        let { url, title }: memeApi = await res.data;
        title = normalize(title);

        const data = await download(url);
        let info: any = await fromBuffer(data);

        if (fs.existsSync(`./media/${title}.${info.ext}`)) {
            let name2 = random();
            console.log(`( ${title} ) name already exist, try with random name... ( ${name2} )`);
            fs.promises.writeFile(`./media/${name2}.${info.ext}`, data, { encoding: 'base64' });
            console.log(`[${time}]`, count++, "Done");
        } else {
            fs.promises.writeFile(`./media/${title}.${info.ext}`, data, { encoding: 'base64' });
            console.log(`[${time}]`, count++, "Done");
        }
    }
};

start();