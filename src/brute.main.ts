import { brute } from './brute';

export function main() {
  const equalsPos = parseInt(process.argv[2]);
  const allowedOps = process.argv[3];
  if (!allowedOps.match(/[/*+-]+/)) {
    console.log('usage: run brute equalpos allowedops dig [dig...]');
    process.exit();
  }
  const nums : number[] = process.argv.slice(4).map(n => parseInt(n));
  console.log(`bruting [${equalsPos}:${allowedOps}]: ${nums}`);
  const res = brute(equalsPos, allowedOps, nums);
  console.log(res.join('\n'));
}

main();