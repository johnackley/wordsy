// Brute Force Nerdle solver

import { buildOps, OpResult, OpType } from './optype';

export function brute(equalPos : number, allowedOpsArg : string, nums : number[]) : string[] {
  const allowedOps = new Set<string>();
  const opsAry = allowedOpsArg.split('');
  opsAry.forEach(s => allowedOps.add(s));
  const ops = buildOps(equalPos, opsAry);

  const ret : string[] = [];
  const numsSet = new Set(nums);
  const len = nums.length;
  for (let h = 0; h < len; h++) {
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        ops.filter(o => o.totDigs === 3).forEach(op => {
          const opands = [nums[h], nums[i], nums[j]];
          const opres = op.fn(opands);
          if (opres && hasAllAndOnly(numsSet, opands, opres)) {
            ret.push(opres.str);
          }
        });
        for (let k = 0; k < len; k++) {
          ops.filter(o => o.totDigs === 4).forEach(op => {
            const opands = [nums[h], nums[i], nums[j], nums[k]];
            const opres = op.fn(opands);
            if (opres && hasAllAndOnly(numsSet, opands, opres)) {
              ret.push(opres.str);
            }
          });
        }
      }
    }
  }
  return ret;
}

function hasAllAndOnly(reqSet : Set<number>, opands : number[], opres : OpResult) : boolean {
  if (opres.str.length !== 8) {
    return false;
  }
  const solSet = new Set([...opands, ...`${opres.res}`.split('').map(n => parseInt(n))]);
  if (reqSet.size === solSet.size &&
    [...reqSet].every((x) => solSet.has(x))) {
    return true;
  }
  return false;
}
