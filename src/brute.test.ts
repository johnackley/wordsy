import { brute } from './brute';

// 12+46=58
test('initial guess', () => {
  const expected = '12+46=58';
  const actual = brute('+', [1, 2, 4, 5, 6, 8]);
  expect(actual.includes(expected)).toBeTruthy();
});

// 49*3=147
test('mul3 guess', () => {
  const expected = '49*3=147';
  const actual = brute('*', [1, 3, 4, 7, 9]);
  expect(actual.includes(expected)).toBeTruthy();
});

// 9+3*2=15
test.skip('summul guess', () => {
  const expected = '9+3*2=15';
  const actual = brute('+*', [1, 2, 3, 5, 9]);
  expect(actual.includes(expected)).toBeTruthy();
});
