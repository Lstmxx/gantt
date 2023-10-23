function dpr() {
  return window.devicePixelRatio || 1;
}

function npx(px: number) {
  return parseInt((px * dpr()).toString(), 10);
}

function npxLine(px: number) {
  const n = npx(px);
  return n > 0 ? n - 0.5 : 0.5;
}

export class Draw {
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(el: HTMLCanvasElement, width: number, height: number) {
    this.el = el;
    this.ctx = el.getContext('2d')!;
    this.resize(width, height);
  }

  attr(options: Record<string, unknown>) {
    Object.assign(this.ctx, options);
    return this;
  }

  resize(width: number, height: number) {
    this.el.style.width = `${width}px`;
    this.el.style.height = `${height}px`;
    this.el.width = npx(width);
    this.el.height = npx(height);
  }

  save() {
    this.ctx.save();
    this.ctx.beginPath();
    return this;
  }

  restore() {
    this.ctx.restore();
    return this;
  }

  translate(x: number, y: number) {
    this.ctx.translate(npx(x), npx(y));
    return this;
  }
  beginPath() {
    this.ctx.beginPath();
    return this;
  }
  clearRect(x: number, y: number, w: number, h: number) {
    this.ctx.clearRect(x, y, w, h);
    return this;
  }

  fillRect(x: number, y: number, w: number, h: number) {
    this.ctx.fillRect(npx(x) - 0.5, npx(y) - 0.5, npx(w), npx(h));
    return this;
  }

  fillText(text: string, x: number, y: number) {
    this.ctx.fillText(text, npx(x), npx(y));
    return this;
  }

  line(...xys: number[][]) {
    const { ctx } = this;
    if (xys.length > 1) {
      ctx.beginPath();
      const [x, y] = xys[0];
      ctx.moveTo(npxLine(x), npxLine(y));
      for (let i = 1; i < xys.length; i += 1) {
        const [x1, y1] = xys[i];
        ctx.lineTo(npxLine(x1), npxLine(y1));
      }
      ctx.stroke();
    }
    return this;
  }
}
