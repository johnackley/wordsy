// Brute Force Nerdle solver

import { buildOps, OpResult, OpType, parseAllowed } from './optype';

export function brute(equalPos : number, allowedOpsArg : string, digs : Set<number>) : OpResult[] {
  const allowed = parseAllowed(allowedOpsArg);
  const ops = buildOps(equalPos, allowed);
  const ret : OpResult[] = [];
  const nums = [...digs];
  const len = nums.length;
  for (let h = 0; h < len; h++) {
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        ops.filter(o3 => o3.totDigs === 3).forEach(op3 => {
          const opands = [h, i, j].map((ix) => nums[ix]);
          const t = op3.fn(opands);
          if (t && t.str.length === 8) {
            const opres : OpResult = new OpResult(t);
            if (opres && opres.hasAllAndOnly(digs)) {
              ret.push(opres);
            }
          }
        });
        for (let k = 0; k < len; k++) {
          ops.filter(o4 => o4.totDigs === 4).forEach(op4 => {
            const opands = [h, i, j, k].map((ix) => nums[ix]);
            const t = op4.fn(opands);
            if (t && t.str.length === 8) {
              const opres : OpResult = new OpResult(t);
              if (opres && opres.hasAllAndOnly(digs)) {
                ret.push(opres);
              }
            }
          });
          for (let l = 0; l < len; l++) {
            ops.filter(o5 => o5.totDigs === 5).forEach(op5 => {
              const opands = [h, i, j, k, l].map((ix) => nums[ix]);
              const t = op5.fn(opands);
              if (t && t.str.length === 8) {
                const opres : OpResult = new OpResult(t);
                if (opres && opres.hasAllAndOnly(digs)) {
                  ret.push(opres);
                }
              }
            });
          }  
        }
      }
    }
  }
  return ret;
}
