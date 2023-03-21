/**
 *
 */
export class Wordsy {
  len: number;
  anchors: string[] = [];
  duds: string[] = [];
  bads: string[] = [];
  floaters: string[] = [];

  /**
   * constructor only takes len, build up with action methods.
   * @param len
   */
  constructor(len = 5) {
    this.len = len;
    this.anchors = this.defaultWildcards();
  }

  /**
   * CLI shorthand: "LEN ANCHORS [FLOATERS [DUDS [BAD [BAD...]]]]"
   * LEN | ANCHORS where:
   *   LEN is a number, usually 5 (for wordle variants) or 6 (for scholardle)
   *   ANCHORS is either '-' or a regex of dots (wildcards) and alphas whose correct location is known e.g. '..z..'
   * FLOATERS is either '-' or string of alphas exist in solution but not at correct location yet e.g. nsto
   * DUDS is either '-' or string of alphas that do not exist in the solution e.g. nsto
   * each BAD is comma-separated tuple of 0-based index, string of alphas that are wrong location e.g. 0,et 4,zg
   * @param str CLI string
   * @returns this
   */
  public cli(argv: string | string[]): Wordsy {
    const args = typeof argv === 'string' ? argv.split(' ') : argv;
    if (args.length) {
      const lenOrAnchorsWord = args.shift();
      if (!lenOrAnchorsWord) {
        throw new Error('lenOrAnchors must be either a number or a regex');
      }
      this.setLenAndAnchors(lenOrAnchorsWord);
    }
    if (args.length) {
      const floatWord = args.shift();
      if (!floatWord) {
        throw new Error('floaters must be an alphas string');
      }
      if (floatWord !== '-') {
        this.setFloaters(floatWord);
      }
    }
    if (args.length) {
      const dudWord = args.shift();
      if (!dudWord) {
        throw new Error('duds must be an alphas string');
      }
      if (dudWord !== '-') {
        this.setDuds(dudWord);
      }
    }
    // anything left is a list of bads in the form of pos,chrs [...]
    args.forEach((bad) => {
      const badParts = bad.split(',');
      if (!badParts || badParts.length !== 2 || !badParts[0] || !badParts[1]) {
        throw new Error(`bad format for bad: ${bad}`);
      }
      const badPos = Number.parseInt(badParts[0]);
      this.addBad(badPos, badParts[1]);
    });
    return this;
  }

  /**
   * interpret arg as either a length: number or anchors : regex
   */
  public setLenAndAnchors(arg : string) : void {
    this.len = Number.parseInt(arg);
    if (!Number.isNaN(this.len)) {
      this.anchors = this.defaultWildcards();
    } else {
      this.len = arg.length;
      this.setAnchors(arg);
    }
  }

  public firstIsWild(): boolean {
    return this.anchors[0] === '.';
  }

  public assertSingleAlpha(chr: string, msg: string): void {
    if (!chr || chr.length != 1 || !/^[a-z]$/i.test(chr)) {
      throw new Error(`${msg} may only be a single alpha char`);
    }
  }

  public assertPosBounds(pos: number, msg: string): void {
    if (pos < 0 || pos >= this.len) {
      throw new Error(`${msg} pos must be between 0 and len`);
    }
  }

  public assertExactForm(str: string, msg: string): void {
    if (!str || !/^[a-z.]+$/i.test(str)) {
      throw new Error(
        `${msg} must be a string containing alphas or '.' exactly ${this.len} long`
      );
    }
  }

  public assertAlphas(str: string, msg: string): void {
    if (!str || !/^[a-z]+$/i.test(str)) {
      throw new Error(`${msg} may only be string of alpha chars`);
    }
  }

  public defaultWildcards(): string[] {
    return '.'.repeat(this.len).split('');
  }

  public setAnchors(str: string): Wordsy {
    this.assertExactForm(str, 'setAnchors');
    this.anchors = str === '-' ? this.defaultWildcards() : str.split('');
    return this;
  }

  public addAnchor(pos: number, chr: string): Wordsy {
    this.assertSingleAlpha(chr, 'anchor');
    this.assertPosBounds(pos, 'anchor');
    this.anchors[pos] = chr;
    return this;
  }

  public addBad(pos: number, str: string): Wordsy {
    this.assertAlphas(str, 'bad');
    this.assertPosBounds(pos, 'bad');
    if (str.length > 1) {
      // it's a character class
      str = `[${str}]`;
    }
    this.bads.push(
      '^' + '.'.repeat(pos) + str + '.'.repeat(this.len - 1 - pos) + '$'
    );
    return this;
  }

  public setFloaters(str: string): Wordsy {
    this.assertAlphas(str, 'setFloaters');
    this.floaters = str.split('');
    return this;
  }

  public addFloater(chr: string): Wordsy {
    this.assertSingleAlpha(chr, 'floater');
    this.floaters.push(chr);
    return this;
  }

  public setDuds(str: string): Wordsy {
    this.assertAlphas(str, 'setDuds');
    this.duds = str.split('');
    return this;
  }

  public addDud(chr: string): Wordsy {
    this.assertSingleAlpha(chr, 'dud');
    this.duds.push(chr);
    return this;
  }

  public shell() {
    const pipes: string[] = [];

    // firstAnchors
    pipes.push(
      this.firstIsWild()
        ? 'for f in `a-z`; do look $f'
        : `look ${this.anchors[0]}`
    );

    // anchors
    pipes.push(`egrep '^${this.anchors.join('')}$'`);

    // duds & bad anchors
    pipes.push(
      `egrep -v '[A-Z${this.duds.join('')}]${
        this.bads.length > 0 ? '|' : ''
      }${this.bads.join('|')}'`
    );

    // floaters
    this.floaters.forEach((f) => {
      pipes.push(`egrep '${f}'`);
    });

    // done
    return pipes.join(' | ') + (this.firstIsWild() ? '; done' : '');
  }
}
