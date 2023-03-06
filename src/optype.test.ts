import { OpType } from './optype';

// 12+46=58
test('2+2', () => {
  const expected = { res: 58, str: '12+46=58' };
  const input = [1,2,4,6];
  const actual = new OpType('2+2');
  expect(actual.totDigs).toBe(4);
  const val = actual.fn(input);
  expect(val).toStrictEqual(expected);
});
