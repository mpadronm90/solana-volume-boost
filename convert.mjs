import bs58 from 'bs58';
import fs from 'fs';

const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('blockengine.json', 'utf8')));
console.log(bs58.encode(secretKey)); 