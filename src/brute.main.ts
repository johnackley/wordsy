import { brute } from './brute';


/**
 * cli for brute() 
 * to cover as much of the possible digits/ops, do these two to start:
 * 12+46=58
 * 30-7*3=9
 */
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