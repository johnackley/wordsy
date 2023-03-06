import { brute } from './brute';

export function main() {
  const allowedOps = process.argv[2];
  if (!allowedOps.match(/[/*+-]+/)) {
    console.log('usage: run brute [ops] dig [dig...]');
    process.exit();
  }
  const nums : number[] = process.argv.slice(3).map(n => parseInt(n));
  console.log(`bruting with '${allowedOps}': ${nums}`);
  const res = brute(allowedOps, nums);
  console.log(res.join('\n'));
}

main();