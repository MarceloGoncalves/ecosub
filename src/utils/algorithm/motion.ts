import { Vector } from 'p5';

export class Motion {
  pos: Vector;
  velocity: Vector;
  acceleration: Vector;
  drag: number;

  constructor(
    pos: Vector,
    vel: Vector,
    acceleration: Vector,
    drag: number = 0.09
  ) {
    this.pos = pos;
    this.velocity = vel;
    this.acceleration = acceleration;
    this.drag = drag;
  }

  update() {
    this.velocity.add(this.acceleration.mult(1).mult(this.drag));
    this.pos.add(this.velocity);
  }
  show() {}
}
