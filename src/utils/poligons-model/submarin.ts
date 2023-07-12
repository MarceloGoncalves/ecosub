import { Vector } from 'p5';
import { Motion } from '../algorithm/motion';
import * as p5 from 'p5';

export class Submarine {
  scale: number;
  width: number;
  higth: number;
  motion: Motion;
  imagem: any;
  isFaceToRight = true;

  testMode = false;

  constructor(
    pos: Vector = new Vector(),
    vel: Vector = new Vector(),
    acc: Vector = new Vector(),
    p5: p5,
    scale: number = 1,
    width: number = 80,
    higth: number = 50
  ) {
    this.motion = new Motion(pos, vel, acc);
    this.scale = scale;
    this.width = width;
    this.higth = higth;
    this.preloadImgSub(p5);
  }

  applyForce(force: Vector) {
    // Aplica a força à aceleração do objeto
    this.motion.acceleration.add(force);
  }

  display(p: p5) {
    p.push();
    this.imgSubmarine(p);
    p.pop();
  }

  update() {
    this.motion.update();
  }

  imgSubmarine(p: p5) {
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);
    p.imageMode(p.CENTER);
    p.translate(0, 0);
    p.rotate(this.motion.acceleration.x * 0.1);

    if (p.keyIsDown(p.RIGHT_ARROW) && !p.keyIsDown(p.LEFT_ARROW)) {
      this.isFaceToRight = true;
    }

    if (p.keyIsDown(p.LEFT_ARROW) && !p.keyIsDown(p.RIGHT_ARROW)) {
      this.isFaceToRight = false;
    }

    if (this.isFaceToRight) {
      this.drawSubFaceToRight(p);
    } else {
      this.drawSubFaceToLeft(p);
    }

    if (this.testMode) {
      p.push();
      p.fill(255, 0, 0);
      p.circle(this.motion.pos.x, this.motion.pos.y, 10);
      p.pop();
      p.push();
      p.translate(0, 0);
      p.noFill();
      p.stroke(255, 0, 0);
      p.strokeWeight(1);
      p.rect(this.motion.pos.x, this.motion.pos.y, 61, 35);
      p.pop();
    }
  }

  checkEdges(p: p5): boolean {
    const leftToRightWidth = 80 * this.scale;
    const leftToRightHeight = 50 * this.scale;
    const submarineLeft = this.motion.pos.x;
    const submarineRight = this.motion.pos.x + leftToRightWidth;
    const submarineTop = this.motion.pos.y;
    const submarineBottom = this.motion.pos.y + leftToRightHeight;
    let collision = false;

    if (submarineLeft < 0) {
      this.motion.pos.x = submarineLeft;
      this.motion.velocity.x *= -0.5; // Inverte a direção da velocidade no eixo x
      collision = true;
    } else if (submarineRight > p.width) {
      this.motion.pos.x = p.width - leftToRightWidth;
      this.motion.velocity.x *= -0.5; // Inverte a direção da velocidade no eixo x
      collision = true;
    }

    if (submarineTop < 0) {
      this.motion.pos.y = 0;
      this.motion.velocity.y *= -0.5; // Inverte a direção da velocidade no eixo y
      collision = true;
    } else if (submarineBottom > p.height) {
      this.motion.pos.y = p.height - leftToRightHeight;
      this.motion.velocity.y *= -0.5; // Inverte a direção da velocidade no eixo y
      collision = true;
    }
    return collision;
  }

  private preloadImgSub(p: p5) {
    this.imagem = p.loadImage('../assets/img/titanModelROTATE.png');
  }

  private drawSubFaceToLeft(p: p5) {
    p.push();
    p.image(
      this.imagem,
      this.motion.pos.x,
      this.motion.pos.y,
      80 * this.scale,
      50 * this.scale
    );
    p.pop();
  }

  private drawSubFaceToRight(p: p5) {
    p.push();
    p.scale(-1, 1);
    p.image(
      this.imagem,
      -this.motion.pos.x,
      this.motion.pos.y,
      80 * this.scale,
      50 * this.scale
    );
    p.pop();
  }
}
