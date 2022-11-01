import { exec } from 'child_process';
import { Wordsy } from './wordsy';

async function main({dryrun = false}): Promise<void> {
  const wordsy = new Wordsy()
  .cli('5 ..s.. et quiz 0,s 1,t 2,e 3,e 4,t')
  // .cli('5 s...t lit oraeucdnymphvb 0,l 3,ti')
    // .setAnchors('.ro...')
    // .setFloaters('oat')
    // .setDuds('relucidnymphv')
    // .addBad(0, 'o')
    // .addBad(1, 'a')
    // .addBad(2, 'a')
    // .addBad(3, 't')
    ;
  const cmd = wordsy.shell();
  if (dryrun) {
    console.log(cmd);
    return;
  }
  await exec(cmd, (error, stdout, stderr) => {
    console.log('stdout:', stdout);
    if (error !== null) {
      console.log('exec error: ', error);
    }
  });
}

main({dryrun: true});

// .addAnchor(1, 'r')
// .addAnchor(2, 'o')
//   .addFloater('t')
//   .addFloater('r')
//   .addDud('u')
//   .addDud('n')
//   .addDud('f')
//   .addDud('l')
//   .addDud('d')
//   .addDud('s')
//   .addDud('k')
//   .addDud('e')
//   .addDud('p')
//   .addDud('i')
//   .addDud('c')
//   .addBad(1, 't')
//   .addBad(0, 't')
//   .addBad(5, 'r')