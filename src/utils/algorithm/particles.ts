import * as p5 from 'p5';

export class Particle {
  x: number;
  y: number;
  vx: any;
  vy: any;
  alpha: number;

  constructor(posX: number, posY: number, vx: number, vy: number) {
    this.x = posX;
    this.y = posY;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show(p5: p5) {
    //p5.noFill();
    p5.fill(255, this.alpha);
    p5.strokeWeight(0.8);
    p5.stroke(200, this.alpha);
    p5.ellipse(this.x + p5.random(-1, 1), this.y - p5.random(-1, 1), 6);
  }
}
