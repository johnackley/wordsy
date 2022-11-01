
export class Wordsy {
  len : number;
  anchors : string[] = [];
  duds : string[] = [];
  bads : string[] = [];
  floaters : string[] = [];

  constructor (len = 5) {
    this.len = len;
    this.anchors = '.'.repeat(len).split('');
  }

  /**
   * CLI shorthand: "LEN ANCHORS FLOATERS DUDS BAD [BAD...]"
   * @param str CLI string
   * @returns this
   */
  public cli(str : string) : Wordsy {
    const words = str.split(' ');
    if (words.length) {
      const lenWord = words.shift();
      if (!lenWord) {
        throw new Error('word len must be number 1-9');
      }
      this.len = Number.parseInt(lenWord);
    }
    if (words.length) {
      const anchWord = words.shift();
      if (!anchWord) {
        throw new Error('anchors must be an dots-alphas string');
      }
      this.setAnchors(anchWord);
    }
    if (words.length) {
      const floatWord = words.shift();
      if (!floatWord) {
        throw new Error('floaters must be an alphas string');
      }
      this.setFloaters(floatWord);
    }
    if (words.length) {
      const dudWord = words.shift();
      if (!dudWord) {
        throw new Error('duds must be an alphas string');
      }
      this.setDuds(dudWord);
    }
    // anything left is a list of bads in the form of pos,chrs [...]
    words.forEach(bad => {
      const badParts = bad.split(',');
      if (!badParts || badParts.length !== 2 || !badParts[0] || !badParts[1]) {
        throw new Error(`bad format for bad: ${bad}`);
      }
      const badPos = Number.parseInt(badParts[0]);
      this.addBad(badPos, badParts[1]);
    })
    return this;
  }

  public firstIsWild() : boolean {
    return this.anchors[0] === '.';
  }

  public assertSingleAlpha(chr : string, msg : string) : void {
    if (!chr || chr.length != 1 || !/^[a-z]$/i.test(chr)) {
      throw new Error(`${msg} may only be a single alpha char`);
    }
  }

  public assertPosBounds(pos: number, msg : string) : void {
    if (pos < 0 || pos >= this.len) {
      throw new Error(`${msg} pos must be between 0 and len`);
    }
  }

  public assertExactForm(str : string, msg : string) : void {
    if (!str) {
      throw new Error(`${msg} must be a string containing alphas or '.' exactly ${this.len} long`);
    }
    if (str.length !== this.len) {
      throw new Error(`${msg} len must be exactly ${this.len}`);
    }
    if (!str.match(/[a-z.]+/)) {
      throw new Error(`${msg} must be a string containing alphas or '.' exactly ${this.len} long`);
    }
  }

  public assertAlphas(str : string, msg : string) : void {
    if (!str || !/^[a-z]+$/i.test(str)) {
      throw new Error(`${msg} may only be string of alpha chars`);
    }
  }

  public setAnchors(str : string) : Wordsy  {
    this.assertExactForm(str, 'setAnchors');
    this.anchors = str.split('');
    return this;
  }

  public addAnchor(pos : number, chr : string) : Wordsy {
    this.assertSingleAlpha(chr, 'anchor');
    this.assertPosBounds(pos, 'anchor');
    this.anchors[pos] = chr;
    return this;
  }

  public addBad(pos : number, str : string) : Wordsy {
    this.assertAlphas(str, 'bad');
    this.assertPosBounds(pos, 'bad');
    if (str.length > 1) {
      // it's a character class
      str = `[${str}]`;
    }
    this.bads.push('^' + '.'.repeat(pos) + str + '.'.repeat(this.len - 1 - pos) + '$');
    return this;
  }

  public setFloaters(str : string) : Wordsy {
    this.assertAlphas(str, 'setFloaters');
    this.floaters = str.split('');
    return this;
  }

  public addFloater(chr : string) : Wordsy {
    this.assertSingleAlpha(chr, 'floater');
    this.floaters.push(chr);
    return this;
  }

  public setDuds(str : string) : Wordsy {
    this.assertAlphas(str, 'setDuds');
    this.duds = str.split('');
    return this;
  }

  public addDud(chr : string) : Wordsy {
    this.assertSingleAlpha(chr, 'dud');
    this.duds.push(chr);
    return this;
  }

  public shell() {
    const pipes : string[] = [];

    // firstAnchors
    pipes.push(this.firstIsWild()
      ? 'for f in `a-z`; do look $f'
      : `look ${this.anchors[0]}`
    );

    // anchors
    pipes.push(`egrep '^${this.anchors.join('')}$'`);

    // duds
    if (this.duds.length) {
      pipes.push(`egrep -v '[A-Z${this.duds.join('')}]'`);
    }

    // bad anchors
    if (this.bads.length) {
      pipes.push(`egrep -v '${this.bads.join('|')}'`);
    }

    // floaters
    this.floaters.forEach(f => {
      pipes.push(`egrep '${f}'`);
    });

    // done
    return pipes.join(' | ') + (this.firstIsWild() ? '; done' : '');
  }

}
