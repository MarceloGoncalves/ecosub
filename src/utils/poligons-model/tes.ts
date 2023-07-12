import * as p5 from 'p5';

class V2d {
  coordX: number;
  coordY: number;
  constructor(x: number, y: number) {
    this.coordX = x;
    this.coordY = y;
  }
}

class Circulo {
  pos: V2d;
  radius: number;

  constructor(pos: V2d, radius: number) {
    this.pos = pos;
    this.radius = radius;
  }

  display(p: p5) {
    p.circle(this.pos.coordX, this.pos.coordY, this.radius * 2);
  }
}
