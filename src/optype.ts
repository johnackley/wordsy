/**
 * OpResult - return of value and extrapolated string
 */
export type OpResult = {
  res: number;
  str: string;
}

/**
 * OpType - type of operations for Nerdle
 */
export class OpType {
  totDigs : number = 0;
  digs : number[] = [];
  ops : string[] = [];
  fn : Function;

  constructor(pat : string) {
    const things = pat.split('');
    let fnexp = '';
    let strexp = '';
    let argn = 0;
    let x, s;
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
        stmts.push(`let x${argn} = ${x};`);
        fnexp += `x${argn}`;
        strexp += `\${x${argn}}`;
        argn += dig;
      } else if (/^[-+*/]$/.test(t)) {
        // operator
        this.ops.push(t);
        fnexp += t;
        strexp += t;
      } else {
        // illegal
        throw new Error(`OpPat: illegal char ${t}`);
      }
    });
    this.fn = Function('a', `"use strict";
      ${stmts.join('\n')}
      let res = ${fnexp};
      return {
          res,
          str: \`${strexp}=\${res}\`}
      `);
  }
}

export function buildOps(ops : string[]) : OpType[] {
  const ret : OpType[] = [];
  // TODO combinations
  ops.forEach(opstr => { ret.push(new OpType(`3${opstr}2`)); });
  ops.forEach(opstr => { ret.push(new OpType(`3${opstr}1`)); });
  ops.forEach(opstr => { ret.push(new OpType(`2${opstr}2`)); });
  ops.forEach(opstr => { ret.push(new OpType(`2${opstr}1`)); });
  ops.forEach(opstr => { ret.push(new OpType(`2${opstr}1${opstr}1`)); });
  ops.forEach(opstr => { ret.push(new OpType(`1${opstr}2${opstr}1`)); });
  ops.forEach(opstr => { ret.push(new OpType(`1${opstr}1${opstr}1`)); });
  return ret;
}