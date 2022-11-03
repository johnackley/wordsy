import { Wordsy } from './wordsy';

const w = new Wordsy().cli(process.argv.slice(2));
console.log(w.shell());
