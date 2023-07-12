import { Vector } from 'p5';
import { Motion } from '../algorithm/motion';
import * as p5 from 'p5';

export class Turbine {
  motion: Motion;
  size: number;
  constructor(
    pos: Vector = new Vector(),
    vel: Vector = new Vector(),
    acc: Vector = new Vector(),
    size: number = 10
  ) {
    this.motion = new Motion(pos, vel, acc);
    this.size = size;
  }
  update() {
    this.motion.update();
  }

  display(p: p5) {
    p.push();
    p.translate(this.motion.pos.x, this.motion.pos.y);
    p.fill(200);
    p.strokeWeight(1 * this.size);
    p.stroke('#BFBFBF');
    p.beginShape(p.TRIANGLES);
    p.vertex(0, 0);
    p.vertex(10, 0);
    p.vertex(0, 10);
    p.endShape(p.CLOSE);
    p.pop();
  }
}
