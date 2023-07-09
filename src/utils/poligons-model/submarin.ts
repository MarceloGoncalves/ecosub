import { Vector } from 'p5';
import { Motion } from '../algorithm/motion';
import * as p5 from 'p5';

export class Submarine {
  motion: Motion;
  size: number;

  engine: boolean = false;
  engineForce: number = 0.1;
  engineForceMax: number = 0.5;
  engineForceMin: number = 0.1;

  battery: number = 100;
  batteryMax: number = 100;
  batteryMin: number = 0;
  batteryCharge: number = 0.1;
  batteryDischarge: number = 0.1;

  light: boolean = false;
  lightConsumption: number = 0.1;

  constructor(
    pos: Vector = new Vector(),
    vel: Vector = new Vector(),
    acc: Vector = new Vector(),
    size: number = 1
  ) {
    this.motion = new Motion(pos, vel, acc);
    this.size = size;
  }

  applyForce(force: Vector) {
    // Aplica a força à aceleração do objeto
    this.motion.acceleration.add(force);
  }

  display(p: p5) {
    this.leftToRight(p);
  }

  update() {
    this.motion.update();
  }

  checkEdges(p: p5): boolean {
    const leftToRightWidth = 90 * this.size;
    const leftToRightHeight = 40 * this.size;

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

  private leftToRight(p: p5) {
    // Calda
    p.push();
    p.fill(255);
    p.noStroke();
    p.beginShape();
    p.vertex(this.motion.pos.x - 20 * this.size, this.motion.pos.y);
    p.bezierVertex(
      this.motion.pos.x - 10 * this.size,
      this.motion.pos.y + 6 * this.size,
      this.motion.pos.x + 10 * this.size,
      this.motion.pos.y + 43 * this.size,
      this.motion.pos.x + 3 * this.size,
      this.motion.pos.y + 30 * this.size
    );
    p.vertex(this.motion.pos.x + 20 * this.size, this.motion.pos.y);
    p.endShape(p.CLOSE);
    p.pop();

    // corpo
    p.push();
    p.beginShape();
    p.fill(255);
    p.noStroke();
    p.rect(
      this.motion.pos.x,
      this.motion.pos.y,
      90 * this.size,
      40 * this.size,
      20 * this.size
    );
    p.pop();

    // Janela
    p.strokeWeight(0.1 * this.size);
    p.fill('#88d2f7');
    p.circle(
      this.motion.pos.x + 88 * this.size,
      this.motion.pos.y + 20 * this.size,
      15 * this.size
    );

    // Aro da Janela de Observação

    p.beginShape();
    p.fill('#BFBFBF');
    p.strokeWeight(0.5 * this.size);
    p.stroke('black');
    p.vertex(
      this.motion.pos.x + 88 * this.size,
      this.motion.pos.y + 11 * this.size
    );
    p.vertex(
      this.motion.pos.x + 88 * this.size,
      this.motion.pos.y + 29 * this.size
    );
    p.vertex(
      this.motion.pos.x + 90 * this.size,
      this.motion.pos.y + 27 * this.size
    );
    p.vertex(
      this.motion.pos.x + 90 * this.size,
      this.motion.pos.y + 13 * this.size
    );
    p.endShape(p.CLOSE);

    //Parte metálica da Janela de Observação
    p.beginShape();
    p.rect(
      this.motion.pos.x + 55 * this.size,
      this.motion.pos.y,
      34 * this.size,
      40 * this.size,
      20 * this.size
    );
    p.endShape();

    p.push();
    //cobertura branca da parte metálica da Janela de Observação
    p.beginShape();
    p.fill(255);
    p.noStroke();
    p.rect(
      this.motion.pos.x + 52 * this.size,
      this.motion.pos.y - 1 + this.size,
      19 * this.size,
      39 * this.size
    );
    p.endShape();
    p.pop();

    //Suporte de Carregamento de Peso\\
    p.push();
    p.fill('#BFBFBF');
    p.strokeWeight(0.5 * this.size);
    p.stroke('black');

    p.beginShape();
    //ASTE DIREITA
    p.rect(
      this.motion.pos.x + 67.5 * this.size,
      this.motion.pos.y,
      3 * this.size,
      55 * this.size
    );
    p.endShape();

    p.beginShape();
    //ASTE ESQUERDA
    p.rect(
      this.motion.pos.x + 20 * this.size,
      this.motion.pos.y,
      3 * this.size,
      55 * this.size
    );
    p.endShape();

    p.beginShape();
    //ASTE INFERIOR
    p.rect(
      this.motion.pos.x + 15 * this.size,
      this.motion.pos.y + 55 * this.size,
      60 * this.size,
      3 * this.size,
      20 * this.size
    );
    p.endShape();
    p.pop();

    p.push();
    //Motor Vertical
    p.fill(200);
    p.strokeWeight(1 * this.size);
    p.stroke('#BFBFBF');

    p.beginShape();
    p.vertex(this.motion.pos.x, this.motion.pos.y);
    p.bezierVertex(
      this.motion.pos.x + 2 * this.size,
      this.motion.pos.y,
      this.motion.pos.x + 7 * this.size,
      this.motion.pos.y,
      this.motion.pos.x + 9 * this.size,
      this.motion.pos.y + 2 * this.size
    );
    p.bezierVertex(
      this.motion.pos.x + 9 * this.size,
      this.motion.pos.y + 2 * this.size,
      this.motion.pos.x + 9 * this.size,
      this.motion.pos.y + 4 * this.size,
      this.motion.pos.x + 7 * this.size,
      this.motion.pos.y + 4 * this.size
    );
    p.bezierVertex(
      this.motion.pos.x + 7 * this.size,
      this.motion.pos.y + 4 * this.size,
      this.motion.pos.x + 2 * this.size,
      this.motion.pos.y + 4 * this.size,
      this.motion.pos.x,
      this.motion.pos.y + 4 * this.size
    );
    p.bezierVertex(
      this.motion.pos.x,
      this.motion.pos.y + 4 * this.size,
      this.motion.pos.x,
      this.motion.pos.y + 2 * this.size,
      this.motion.pos.x,
      this.motion.pos.y
    );
    p.endShape(p.CLOSE);
    p.pop();

    p.beginShape();
    //ASTE ESQUERDA
    p.rect(
      this.motion.pos.x + 20 * this.size,
      this.motion.pos.y,
      3 * this.size,
      55 * this.size
    );
    p.endShape();

    p.push();

    //Antena
    p.noStroke();
    p.fill(p.random(255),0,0);
    p.rect(
      this.motion.pos.x,
      this.motion.pos.y - 15 * this.size,
      2 * this.size,
      15 * this.size
    );
    p.fill(p.random(255), 0, 0);
    p.rect(
      this.motion.pos.x,
      this.motion.pos.y - 15 * this.size,
      2 * this.size,
      2 * this.size
    );
    p.pop();

    p.push();

    //PESO
    p.beginShape();
    p.fill('#BFBFBF');
    p.strokeWeight(0.5 * this.size);
    p.stroke('black');
    p.circle(
      this.motion.pos.x + 31 * this.size,
      this.motion.pos.y + 48 * this.size,
      14 * this.size
    );
    p.circle(
      this.motion.pos.x + 48 * this.size,
      this.motion.pos.y + 48 * this.size,
      14 * this.size
    );
    p.endShape();
    p.pop();

    p.push();
    p.noStroke();
    p.textSize(9 * this.size);
    p.fill('#88d2f7');
    p.text(
      'TITAN',
      this.motion.pos.x - 8 * this.size,
      this.motion.pos.y + 12 * this.size
    );
    p.pop();
  }

  /* private rightToLeft(p: p5) {
    p.fill(255);
    p.beginShape();
    p.vertex(this.motion.pos.x + 20 * this.size, this.motion.pos.y);
    p.vertex(
      this.motion.pos.x - 3 * this.size,
      this.motion.pos.y + 30 * this.size
    );
    p.vertex(this.motion.pos.x - 20 * this.size, this.motion.pos.y);
    p.endShape(p.CLOSE);

    // corpo
    p.rect(
      this.motion.pos.x - 90 * this.size,
      this.motion.pos.y,
      90 * this.size,
      40 * this.size,
      20 * this.size
    );

    // Janela
    p.fill('#88d2f7');
    p.circle(
      this.motion.pos.x - 90 * this.size,
      this.motion.pos.y + 20 * this.size,
      13 * this.size
    );

    p.fill('#BFBFBF');
    p.strokeWeight(0.5 * this.size);
    p.stroke('black');

    p.beginShape();
    p.vertex(
      this.motion.pos.x - 88 * this.size,
      this.motion.pos.y + 13 * this.size
    );
    p.vertex(
      this.motion.pos.x - 88 * this.size,
      this.motion.pos.y + 27 * this.size
    );
    p.vertex(
      this.motion.pos.x - 93 * this.size,
      this.motion.pos.y + 27 * this.size
    );
    p.vertex(
      this.motion.pos.x - 93 * this.size,
      this.motion.pos.y + 13 * this.size
    );
    p.endShape(p.CLOSE);

    p.rect(
      this.motion.pos.x - 55 * this.size,
      this.motion.pos.y,
      34 * this.size,
      40 * this.size,
      20 * this.size
    );

    p.fill(255);
    p.noStroke();
    p.rect(
      this.motion.pos.x - 52 * this.size,
      this.motion.pos.y + this.size,
      15 * this.size,
      38 * this.size
    );

    p.fill('#BFBFBF');
    p.rect(
      this.motion.pos.x - 63 * this.size,
      this.motion.pos.y,
      3 * this.size,
      60 * this.size
    );
    p.rect(
      this.motion.pos.x - 20 * this.size,
      this.motion.pos.y,
      3 * this.size,
      60 * this.size
    );
    p.rect(
      this.motion.pos.x - 10 * this.size,
      this.motion.pos.y + 58 * this.size,
      66 * this.size,
      3 * this.size
    );

    p.noStroke();
    p.fill(255);
    p.rect(
      this.motion.pos.x,
      this.motion.pos.y - 15 * this.size,
      2 * this.size,
      15 * this.size
    );
    p.fill(255, 0, 0);
    p.rect(
      this.motion.pos.x,
      this.motion.pos.y - 15 * this.size,
      2 * this.size,
      2 * this.size
    );

    p.fill('#BFBFBF');
    p.circle(
      this.motion.pos.x - 31 * this.size,
      this.motion.pos.y + 50 * this.size,
      15 * this.size
    );

    p.noStroke();
    p.textSize(9 * this.size);
    p.fill('#88d2f7');
    p.text(
      'TITAN',
      this.motion.pos.x + 8 * this.size,
      this.motion.pos.y + 12 * this.size
    );
  } */
}
