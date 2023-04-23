import { OpType, Operator, isOperator, parseAllowed } from './optype';

test('isAllowed(all)', () => {
  expect(isOperator('+')).toBeTruthy;
  expect(isOperator('-')).toBeTruthy;
  expect(isOperator('*')).toBeTruthy;
  expect(isOperator('/')).toBeTruthy;
});

test('parseAllowed(all)', () => {
  const input = '+-*/';
  const actual = parseAllowed(input);
  expect(actual).toBeTruthy();
  expect(actual.length).toBe(4);
  expect(actual[0]).toBe('+');
  expect(actual[1]).toBe('-');
  expect(actual[2]).toBe('*');
  expect(actual[3]).toBe('/');
});



// new OpType(`2${oi}2`)
test('new optype(2+2)', () => {
  const expected = { res: 58, str: '12+46=58' };
  const input = [1,2,4,6];
  const actual = new OpType('2+2');
  expect(actual.totDigs).toBe(4);
  const val = actual.fn(input);
  expect(val.res).toStrictEqual(expected.res);
});

// new OpType(`1${oi}1${oj}1`)
test('new optype(1+1+1)', () => {
  const expectedDigs = [1, 1, 1];
  const expectedTotDigs = 3;
  const expectedOps = ["+", "+"];
  const args = [1,2,3];
  const expectedResult = {res: 6, str: "1+2+3=6"};

  const actual = new OpType('1+1+1');
  expect(actual.digs).toEqual(expectedDigs);
  expect(actual.ops).toEqual(expectedOps);
  expect(actual.totDigs).toEqual(expectedTotDigs);
  expect(actual.fn(args).res).toEqual(expectedResult.res);
});

// new OpType(`1${oi}1${oj}2`)
test('new optype(1+1+2)', () => {
  const expectedDigs = [1, 1, 2];
  const expectedTotDigs = 4;
  const expectedOps = ["+", "-"];
  const args = [9,8,1,2];
  const expectedResult = {res: 5, str: "9+8-12=5"};

  const actual = new OpType('1+1-2');
  expect(actual.digs).toEqual(expectedDigs);
  expect(actual.ops).toEqual(expectedOps);
  expect(actual.totDigs).toEqual(expectedTotDigs);
  expect(actual.fn(args).res).toEqual(expectedResult.res);
});

// new OpType(`1${oi}2${oj}1`)
test('new optype(1+2-1)', () => {
  const expectedDigs = [1, 2, 1];
  const expectedTotDigs = 4;
  const expectedOps = ["+", "-"];
  const args = [2,1,3,9];
  const expectedResult = {res: 6, str: "2+13-9=6"};

  const actual = new OpType('1+2-1');
  expect(actual.digs).toEqual(expectedDigs);
  expect(actual.ops).toEqual(expectedOps);
  expect(actual.totDigs).toEqual(expectedTotDigs);
  expect(actual.fn(args).res).toEqual(expectedResult.res);
});

// new OpType(`2${oi}1${oj}1`)
test('new optype(2-1-1)', () => {
  const expectedDigs = [2, 1, 1];
  const expectedTotDigs = 4;
  const expectedOps = ["-", "-"];
  const args = [1,9,8,7];
  const expectedResult = {res: 4, str: "19-8-7=4"};

  const actual = new OpType('2-1-1');
  expect(actual.digs).toEqual(expectedDigs);
  expect(actual.ops).toEqual(expectedOps);
  expect(actual.totDigs).toEqual(expectedTotDigs);
  expect(actual.fn(args).res).toEqual(expectedResult.res);
});

// new OpType(`2${oi}1`)
test('new optype(2*1)', () => {
  const expectedDigs = [2, 1];
  const expectedTotDigs = 3;
  const expectedOps = ["*"];
  const args = [2,0,5];
  const expectedResult = {res: 100, str: "20*5=100"};

  const actual = new OpType('2*1');
  expect(actual.digs).toEqual(expectedDigs);
  expect(actual.ops).toEqual(expectedOps);
  expect(actual.totDigs).toEqual(expectedTotDigs);
  expect(actual.fn(args).res).toEqual(expectedResult.res);
});

// new OpType(`3${oi}1`)
test('new optype(3-1)', () => {
  const expectedDigs = [3, 1];
  const expectedTotDigs = 4;
  const expectedOps = ["-"];
  const args = [1,0,0,1];
  const expectedResult = {res: 99, str: "100-1=99"};

  const actual = new OpType('3-1');
  expect(actual.digs).toEqual(expectedDigs);
  expect(actual.ops).toEqual(expectedOps);
  expect(actual.totDigs).toEqual(expectedTotDigs);
  expect(actual.fn(args).res).toEqual(expectedResult.res);
});

// new OpType(`3${oi}2`)
test('new optype(3-2)', () => {
  const expectedDigs = [3, 2];
  const expectedTotDigs = 5;
  const expectedOps = ["-"];
  const args = [1,0,0,9,8];
  const expectedResult = {res: 2, str: "100-98=2"};

  const actual = new OpType('3-2');
  expect(actual.digs).toEqual(expectedDigs);
  expect(actual.ops).toEqual(expectedOps);
  expect(actual.totDigs).toEqual(expectedTotDigs);
  expect(actual.fn(args).res).toEqual(expectedResult.res);
});
