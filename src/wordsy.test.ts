import { Wordsy } from './wordsy';

test('shell for: 6 -', () => {
  const w = new Wordsy().cli('6 -');
  expect(w.shell()).toBe(
    "for f in `a-z`; do look $f | egrep '^......$' | egrep -v '[A-Z]'; done"
  );
});

test('shell for: 6 - la ern 0,l 2,a', () => {
  const w = new Wordsy().cli('6 - la ern 0,l 2,a');
  expect(w.shell()).toBe(
    "for f in `a-z`; do look $f | egrep '^......$' | egrep -v '[A-Zern]|^l.....$|^..a...$' | egrep 'l' | egrep 'a'; done"
  );
});

test('shell for: 5 .n... te aor 0,e 2,t 3,n 4,e', () => {
  const w = new Wordsy().cli('5 .n... te aor 0,e 2,t 3,n 4,e');
  expect(w.shell()).toBe(
    "for f in `a-z`; do look $f | egrep '^.n...$' | egrep -v '[A-Zaor]|^e....$|^..t..$|^...n.$|^....e$' | egrep 't' | egrep 'e'; done"
  );
});
