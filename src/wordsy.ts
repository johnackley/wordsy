
export class Wordsy {
  len : number;
  anchors : string[] = [];
  duds : string[] = [];
  bads : string[] = [];
  floaters : string[] = [];

  constructor (len = 5) {
    this.len = len;
    for (let n = 0; n < this.len; n++) {
      this.anchors[n] = '.';
    }
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
    if (!str || str.length > 0 || !/^[a-z]+$/i.test(str)) {
      throw new Error(`${msg} may only be string of alpha chars`);
    }
  }

  public setAnchors(str : string) : Wordsy  {
    this.assertExactForm(str, 'setAnchors');
    for (let i = 0; i < this.len; i++) {
      this.anchors[i] = str.charAt(i);
    }
    return this;
  }

  public addAnchor(pos : number, chr : string) : Wordsy {
    this.assertSingleAlpha(chr, 'anchor');
    this.assertPosBounds(pos, 'anchor');
    this.anchors[pos] = chr;
    return this;
  }

  public addBad(pos : number, chr : string) : Wordsy {
    this.assertSingleAlpha(chr, 'bad');
    this.assertPosBounds(pos, 'bad');
    this.bads.push('^' + '.'.repeat(pos) + chr + '.'.repeat(this.len - 1 - pos) + '$');
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
