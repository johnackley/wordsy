class OpType {
  num: number;
  ops: string;
  fun: (nums : number[]) => OpResult;
  constructor(num: number, ops: string, fun: (nums : number[]) => OpResult) {
    this.num = num;
    this.ops = ops;
    this.fun = fun;
  }
  public allowed(allowedOps: string) : boolean {
    // return false if op has op that is not in allowed
    return true;
  }
}

type OpResult = {
  res: number;
  str: string;
}

const ops : OpType[] = [
  new OpType(3, '*', mul3),
  new OpType(3, '*', mulmul3),
  new OpType(3, '*+', muladd3),
  new OpType(3, '*-', mulsub3),
  new OpType(3, '+', add3),
  new OpType(3, '+*', addmul3),
  new OpType(3, '+-', addsub3),
  new OpType(3, '+/', adddiv3),
  new OpType(3, '-*', submul3),
  new OpType(3, '-+', subadd3),
  new OpType(3, '/*', divadd3),
  new OpType(3, '/-', divsub3),
  new OpType(4, '+', add4),
  new OpType(4, '/', divdiv4),
  new OpType(4, '/-', divsub4),
]

export function brute(allowedOps : string, nums : number[]) : string[] {
  const ret : string[] = [];
  const numsSet = new Set(nums);
  const len = nums.length;
  for (let o = 0; o < ops.length; o++) {
    const op = ops[o]
    for (let h = 0; h < len; h++) {
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          if (op.num === 3 && op.allowed(allowedOps)) {
            const opands = [nums[h], nums[i], nums[j]];
            const opres = op.fun(opands);
            if (hasAllAndOnly(numsSet, opands, opres)) {
              ret.push(opres.str);
            }
          }
          for (let k = 0; k < len; k++) {
            if (op.num === 4 && op.allowed(allowedOps)) {
              const opands = [nums[h], nums[i], nums[j], nums[k]];
              const opres = op.fun(opands);
              if (hasAllAndOnly(numsSet, opands, opres)) {
                ret.push(opres.str);
              }
            }
          }
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

function mul3(nums : number[]) : OpResult {
  const x = (10 * nums[0]) + nums[1];
  const y = nums[2];
  const res = x * y;
  return {res, str: `${x}*${y}=${res}`};
}

function add3(nums : number[]) : OpResult {
  const x = (10 * nums[0]) + nums[1];
  const y = nums[2];
  const res = x + y;
  return {res, str: `${x}+${y}=${res}`};
}

function add4(nums : number[]) : OpResult {
  const x = (10 * nums[0]) + nums[1];
  const y = (10 * nums[2]) + nums[3];
  const res = x + y;
  return {res, str: `${x}+${y}=${res}`};
}

function addmul3(nums : number[]) : OpResult {
  const x = nums[0];
  const y = nums[1];
  const z = nums[2];
  const res = x + (y * z);
  return {res, str: `${x}+${y}*${z}=${res}`};
}

function muladd3(nums : number[]) : OpResult {
  const x = nums[0];
  const y = nums[1];
  const z = nums[2];
  const res = (x * y) + z;
  return {res, str: `${x}*${y}+${z}=${res}`};
}

function mulmul3(nums : number[]) : OpResult {
  const x = nums[0];
  const y = nums[1];
  const z = nums[2];
  const res = (x * y) * z;
  return {res, str: `${x}*${y}*${z}=${res}`};
}

function adddiv3(nums : number[]) : OpResult {
  const x = nums[0];
  const y = nums[1];
  const z = nums[2];
  if (z === 0) {
    return { res: 0, str: 'DIV-BY-ZERO'};
  }
  const res = x + (y / z);
  return {res, str: `${x}+${y}/${z}=${res}`};
}

function divadd3(nums : number[]) : OpResult {
  const x = nums[0];
  const y = nums[1];
  const z = nums[2];
  if (y !== 0) {
    return { res: 0, str: 'DIV-BY-ZERO'};
  }
  const res = (x / y) + z;
  return {res, str: `${x}/${y}+${z}=${res}`};
}

function divsub3(nums : number[]) : OpResult {
  const x = nums[0];
  const y = nums[1];
  const z = nums[2];
  if (y === 0) {
    return { res: 0, str: 'DIV-BY-ZERO'};
  }
  const res = (x / y) - z;
  return {res, str: `${x}/${y}-${z}=${res}`};
}

function divsub4(nums : number[]) : OpResult {
  const x = (10 * nums[0]) + nums[1];
  const y = nums[2];
  const z = nums[3];
  if (y === 0) {
    return { res: 0, str: 'DIV-BY-ZERO'};
  }
  const res = (x / y) - z;
  return {res, str: `${x}/${y}-${z}=${res}`};
}

function divdiv4(nums : number[]) : OpResult {
  const x = (10 * nums[0]) + nums[1];
  const y = nums[2];
  const z = nums[3];
  if (y === 0 || z === 0) {
    return { res: 0, str: 'DIV-BY-ZERO'};
  }
  const res = (x / y) / z;
  return {res, str: `${x}/${y}/${z}=${res}`};
}

function submul3(nums : number[]) : OpResult {
  const x = nums[0];
  const y = nums[1];
  const z = nums[2];
  const res = x - (y * z);
  return {res, str: `${x}-${y}*${z}=${res}`};
}

function mulsub3(nums : number[]) : OpResult {
  const x = nums[0];
  const y = nums[1];
  const z = nums[2];
  const res = (x * y) - z;
  return {res, str: `${x}*${y}-${z}=${res}`};
}

function subadd3(nums : number[]) : OpResult {
  const x = nums[0];
  const y = nums[1];
  const z = nums[2];
  const res = x - y + z;
  return {res, str: `${x}-${y}+${z}=${res}`};
}

function addsub3(nums : number[]) : OpResult {
  const x = nums[0];
  const y = nums[1];
  const z = nums[2];
  const res = x + y - z;
  return {res, str: `${x}+${y}-${z}=${res}`};
}

const allowedOps = process.argv[2];
if (!allowedOps.match(/[\/\*\+-]+/)) {
  console.log('usage: run brute [ops] dig [dig...]');
  process.exit();
}
const nums : number[] = process.argv.slice(3).map(n => parseInt(n));
console.log(`bruting with '${allowedOps}': ${nums}`);
const res = brute(allowedOps, nums);
console.log(res.join('\n'));
