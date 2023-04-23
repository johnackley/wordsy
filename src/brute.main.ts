import { brute } from './brute';
import { OpResult } from './optype';


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
  const digs = new Set<number>(process.argv.slice(4).map(Number));
  console.log(`bruting [${equalsPos}:${allowedOps}]:`, digs);
  const opresults : OpResult[] = brute(equalsPos, allowedOps, digs);
  opresults.forEach((r : OpResult) => {
    console.log(r.str);
  });
}

main();