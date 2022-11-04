import shell from 'shelljs';
import { Wordsy } from './wordsy';

const w = new Wordsy().cli(process.argv.slice(2));
shell.exec(w.shell());
// console.log(w.shell());
