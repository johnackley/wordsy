import { setEquals, str2set } from './optype';

test('string-array-set-add', () => {
  const expected = new Set<number>([1,2,4,5,6,8]);
  const actual = str2set('12+46=58');
  expect(actual).toBeTruthy();
  expect(actual.size).toBe(6);
  expect(actual.has(1)).toBeTruthy();
  expect(actual.has(4)).toBeTruthy();
  expect(actual.has(8)).toBeTruthy();
  expect(actual.size).toBe(expected.size);
  expect([...actual].every((x) => expected.has(x))).toBeTruthy();
  expect(setEquals(actual, expected)).toBeTruthy();
});

test('string-array-set-mul', () => {
  const expected = new Set<number>([0,3,7,9]);
  const actual = str2set('30-7*3=9');
  expect(actual).toBeTruthy();
  expect(actual.size).toBe(4);
  expect(actual.has(0)).toBeTruthy();
  expect(actual.has(3)).toBeTruthy();
  expect(actual.has(7)).toBeTruthy();
  expect(actual.has(9)).toBeTruthy();
  expect(actual.size).toBe(expected.size);
  expect([...actual].every((x) => expected.has(x))).toBeTruthy();
  expect(setEquals(actual, expected)).toBeTruthy();
});

test('string-array-set-div', () => {
  const expected = new Set<number>([0,1,2,3,7]);
  const actual = str2set('210/3=70');
  expect(actual).toBeTruthy();
  expect(actual.size).toBe(5);
  expect(actual.has(0)).toBeTruthy();
  expect(actual.has(3)).toBeTruthy();
  expect(actual.has(7)).toBeTruthy();
  expect(actual.size).toBe(expected.size);
  expect([...actual].every((x) => expected.has(x))).toBeTruthy();
  expect(setEquals(actual, expected)).toBeTruthy();
});

test('string-array-set-sub', () => {
  const expected = new Set<number>([1,2,4,5,6,8]);
  const actual = str2set('58-12=46');
  expect(actual).toBeTruthy();
  expect(actual.size).toBe(6);
  expect(actual.has(1)).toBeTruthy();
  expect(actual.has(4)).toBeTruthy();
  expect(actual.has(8)).toBeTruthy();
  expect(actual.size).toBe(expected.size);
  expect([...actual].every((x) => expected.has(x))).toBeTruthy();
  expect(setEquals(actual, expected)).toBeTruthy();
});
