class Pipe {
  static getRandom(width, height, maxSize, maxSpeed) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * maxSize;
    const vx = 2 * (Math.random() - 0.5) * maxSpeed;
    const vy =
      Math.sqrt(maxSpeed ** 2 - vx ** 2) * (Math.random() > 0.5 ? 1 : -1);
    const color = this.getRandomHexColor();

    return new Pipe(x, y, size, vx, vy, color);
  }

  static getRandomHexColor() {
    const r = this.getRandom255Hex();
    const g = this.getRandom255Hex();
    const b = this.getRandom255Hex();

    return "#" + r + g + b;
  }

  static getRandom255Hex() {
    const r = Math.floor(Math.random() * 255);

    let hex = r.toString(16);

    if (hex.length === 1) {
      hex = "0" + hex;
    }

    return hex;
  }

  constructor(x = 0, y = 0, size = 1, vx = 0, vy = 0, color = "#000000") {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
  }
}
