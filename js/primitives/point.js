class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(point) {
    return this.x === point.x && this.y === point.y;
  }

  draw(ctx, { size = 18, color = 'black', outline = false, fill = false } = {}) {
    const rad = size / 2;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, rad, 0, 2 * Math.PI);
    ctx.fill();
    if (outline) {
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, rad * 0.6, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if (fill) {
      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(this.x, this.y, rad * 0.4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}
