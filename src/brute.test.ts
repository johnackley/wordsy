import { brute } from './brute';
import { OpResult } from './optype';

// 12+46=58
test('initial guess', () => {
  const expected = '12+46=58';
  const actual : OpResult[] = brute(6, '+', new Set<number>([1, 2, 4, 5, 6, 8]));
  expect(actual.length).toBeGreaterThan(0);
  expect(actual.filter(x => x.str.includes(expected)).length).toBe(1);
});

// 49*3=147
test('mul3 guess', () => {
  const expected = '49*3=147';
  const actual = brute(5, '*', new Set<number>([1, 3, 4, 7, 9]));
  expect(actual.length).toBeGreaterThan(0);
  expect(actual.filter(x => x.str.includes(expected)).length).toBe(1);
});

// 9+3*2=15
test('summul guess', () => {
  const expected = '9+3*2=15';
  const actual = brute(6, '+*', new Set<number>([1, 2, 3, 5, 9]));
  // console.log('actual', JSON.stringify(actual));
  expect(actual.length).toBeGreaterThan(0);
  expect(actual.filter(x => x.str.includes(expected)).length).toBe(1);
});
