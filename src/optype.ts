/**
 * Operator - allowable arithmetic operators
 */
export type Operator = '+' | '-' | '*' | '/';
export const OperatorRE = /^[-+*/]$/;
export const isOperator = (op: string): op is Operator => {
  return op.match(OperatorRE) != null;
}

export function parseAllowed(arg: string) : Operator[] {
  const ret : Operator[] = [];
  for (const op of arg.split('')) {
    if (!isOperator(op)) {
      throw new Error(`bad allowed operator: ${op}`);
    }
    ret.push(op);
  }
  return ret;
}

/**
 * 
 * @param str 
 * @returns Set<number>
 */
export function str2set(str: string) : Set<number> {
  return new Set(str.split('').filter(c => /^\d$/.test(c)).map(Number));
}

/**
 * 
 * @param str 
 * @returns Set<number>
 */
 export function setEquals(s1 : Set<number>, s2 : Set<number>) : boolean {
  return s1.size === s2.size && [...s1].every((x) => s2.has(x));
}

/**
 * OpResult - return of value and extrapolated string
 */
export class OpResult {
  uniq: Set<number>;
  res: number;
  str: string;
  opt: OpType;
  public constructor(other: OpResult) {
    this.uniq = str2set(other.str);
    this.res = other.res;
    this.str = other.str;
    this.opt = other.opt;
  }
  public hasAllAndOnly(required : Set<number>) : boolean {
    return setEquals(this.uniq, required);
  }
}

/**
 * OpType - type of operations for Nerdle
 */
export class OpType {
  totDigs : number = 0;
  digs : number[] = [];
  ops : Operator[] = [];
  fn : Function;

  constructor(pat : string) {
    const things = pat.split('');
    // sanity check that odd things are digits and even things are operators
    for (let thx = 0; thx < things.length; thx++) {
      if (thx % 2 === 1 && !things[thx].match(/[/*+-]+/)) {
        // odd thing is not an operator
        throw new Error(`odd thing (${things[thx]}@${thx}) is not an operator`);
      } else if (thx % 2 === 0 && !things[thx].match(/[0-9]/)) {
        // odd thing is not a digit
        throw new Error(`even thing (${things[thx]}@${thx}) is not a digit`);
      }
    }

    let fnexp = '';
    let strexp = '';
    let argn = 0;
    let x : string;
    const stmts : string[] = [];
    things.forEach(t => {
      if (/^\d$/.test(t)) {
        // is digit
        const dig = Number(t);
        this.totDigs += dig;
        this.digs.push(dig);
        switch (dig) {
          case 1:
            x = `(a[${argn}])`;
            break;
          case 2:
            x = `((a[${argn}]*10) + a[${argn+1}])`;
            break;
          case 3:
            x = `((a[${argn}]*100) + (a[${argn+1}]*10) + a[${argn+2}])`;
            break;
        }
        stmts.push(`if (a[${argn}] === 0) { return null; }`); // kick out leading zeroes
        stmts.push(`let x${argn} = ${x};`);
        fnexp += `x${argn}`;
        strexp += `\${x${argn}}`;
        argn += dig;
      } else if (isOperator(t)) {
        // operator
        this.ops.push(t);
        fnexp += t;
        strexp += t;
      } else {
        // illegal
        throw new Error(`OpPat: illegal char ${t}`);
      }
    });
    const body = `"use strict";
${stmts.join('\n')}
let res = ${fnexp};
return {
  res,
  str: \`${strexp}=\${res}\`,
  opt: this
}`;
//     console.log(`----------- ${pat} ---------------
// ${body}
// ---------------------------------`);
    this.fn = Function('a', body);
  }
}

export function buildOps(equalPos : number, ops : Operator[]) : OpType[] {
  const ret : OpType[] = [];
  for (let i = 0; i < ops.length; i++) {
    const oi : Operator = ops[i];
    switch (equalPos) {
    case 7:
      ret.push(new OpType(`3${oi}2`));
      break;
    case 6:
      ret.push(new OpType(`3${oi}1`));
      ret.push(new OpType(`2${oi}2`));
      break;
    case 5:
      ret.push(new OpType(`2${oi}1`));
      break;
    }
    for (let j = 0; j < ops.length; j++) {
      const oj : Operator = ops[j];
      switch (equalPos) {
      case 7:
        ret.push(new OpType(`2${oi}1${oj}1`));
        ret.push(new OpType(`1${oi}2${oj}1`));
        ret.push(new OpType(`1${oi}1${oj}2`));
        break;
      case 6:
        ret.push(new OpType(`1${oi}1${oj}1`));
        break;
      }
    }
  }
  return ret;
}