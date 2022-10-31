export class Wordsy {
  len : number;
  firstAnchor : string | undefined = undefined;
  anchors : string[] = [];
  duds : string[] = [];
  badAnchors : string[] = [];
  floaters : string[] = [];

  constructor (len = 5) {
    this.len = len;
  }

  public shell() {
    const pipes : string[] = [];

    // firstAnchors
    pipes.push(this.firstAnchor
      ? `look ${this.firstAnchor}`
      : 'for f in `a-z`; do look $f');

    // anchors
    pipes.push(!this.anchors.length
      ? `egrep '^.....$'`
      : `egrep '${this.anchors.join('|')}`);

    // duds
    const duds = `egrep -v "[A-Z${this.duds.join()}]`

    // bad anchors
    const badanchors = this.badAnchors.length
        ? `egrep -v '${this.badAnchors.join('|')}'`
        : '';

    // floaters
    if (this.floaters.length) {
      pipes.push(`egrep -v '${this.floaters.join('|')}'`);
    }

    // done
    return pipes.join(' | ') + (!this.firstAnchor ? '; done' : '');
  }
}