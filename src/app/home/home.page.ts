import { Component, ElementRef } from '@angular/core';
import * as p5 from 'p5';
import { gradientBackground } from 'src/utils/algorithm/gradiente-back-ground';
import { Particle } from 'src/utils/algorithm/particles';
import { Submarine } from 'src/utils/poligons-model/submarin';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLeftArrowPressed: any;
  isRightArrowPressed: any;
  isUpArrowPressed: any;
  isDownArrowPressed: any;

  particles: Particle[] = [];
  num = 10000;
  noiseScale = 0.01 / 2;
  submarine: any;
  peso: number;
  gravidade: number;
  resistance: number;
  resistanceForce: p5.Vector = new p5.Vector();

  cam: p5.Camera = new p5.Camera();

  constructor(private el: ElementRef) {
    this.peso = 0.005;
    this.gravidade = 0.001;
    this.resistance = 0.2;
  }

  ngOnInit() {
    new p5((p: p5) => {
      p.setup = () => {
        this.setup(p);
      };
      p.draw = () => {
        this.draw(p);
      };
      p.keyPressed = () => {
        this.keyPressed(p);
      };
      p.keyReleased = () => {
        this.keyReleased(p);
      };
      p.mouseReleased = () => {
        this.mouseReleased(p);
      };
    }, this.el.nativeElement);
  }

  setup(p: any) {
    const c = document.querySelector('#canvasContainer');
    p.createCanvas(p.displayWidth, 1800).parent(c);
    const INITPOS = this.getInitPos(p);
    const INITACC = new p5.Vector();
    const INITVEL = new p5.Vector();
    this.submarine = new Submarine(INITPOS, INITVEL, INITACC, p);
    this.resistanceForce = this.submarine.motion.velocity
      .copy()
      .mult(-this.resistance);
  }

  draw(p: any) {
    p.push();
    gradientBackground(p, p.displayWidth, p.displayHeight);
    this.submarine.display(p);
    this.submarine.update();
    //this.submarine.checkEdges(p);
    this.accelerateToDirection(p);
    p.pop();
  }

  private getInitPos(p: p5): p5.Vector {
    return new p5.Vector(p.displayWidth / 2, 20);
  }

  mouseReleased(p: p5) {
    p.noiseSeed(p.millis());
  }

  accelerateToDirection(p: p5) {
    let particleDirectionX: number = p.random(-1, 1);
    let particleDirectionY: number = p.random(-1, 1);

    this.submarine.applyForce(
      new p5.Vector(0, this.gravidade + this.peso).mult(p.deltaTime)
    );

    if (this.isLeftArrowPressed) {
      this.submarine.applyForce(new p5.Vector(-0.02, 0).mult(p.deltaTime));
      this.submarine.applyForce(this.resistanceForce.mult(p.deltaTime));
      particleDirectionX = p.random(2, 6);
      particleDirectionY = p.random(-1, 1);
    }
    if (this.isRightArrowPressed) {
      this.submarine.applyForce(new p5.Vector(0.02, 0).mult(p.deltaTime));
      this.submarine.applyForce(this.resistanceForce.mult(p.deltaTime));

      particleDirectionX = p.random(-2, -6);
      particleDirectionY = p.random(1, -1);
    }
    if (this.isUpArrowPressed) {
      this.submarine.applyForce(new p5.Vector(0, -0.02).mult(p.deltaTime));
      this.submarine.applyForce(this.resistanceForce.mult(p.deltaTime));

      particleDirectionX = p.random(1, -1);
      particleDirectionY = p.random(2, 6);
    }
    if (this.isDownArrowPressed) {
      this.submarine.applyForce(new p5.Vector(0, 0.02).mult(p.deltaTime));
      this.submarine.applyForce(this.resistanceForce.mult(p.deltaTime));
      particleDirectionX = p.random(1, -1);
      particleDirectionY = p.random(-2, -8);
    }

    if (
      this.isLeftArrowPressed ||
      this.isRightArrowPressed ||
      this.isUpArrowPressed ||
      this.isDownArrowPressed
    ) {
      for (let i = 0; i < 5; i++) {
        let part = new Particle(
          this.submarine.motion.pos.x,
          this.submarine.motion.pos.y,
          particleDirectionX,
          particleDirectionY
        );
        this.particles.push(part);
      }
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      this.particles[i].show(p);
      if (this.particles[i].finished()) {
        // remove this particle
        this.particles.splice(i, 1);
      }
    }
  }

  keyPressed(p: p5) {
    if (p.keyCode === p.LEFT_ARROW) {
      this.isLeftArrowPressed = true;
    } else if (p.keyCode === p.RIGHT_ARROW) {
      this.isRightArrowPressed = true;
    } else if (p.keyCode === p.UP_ARROW) {
      this.isUpArrowPressed = true;
    } else if (p.keyCode === p.DOWN_ARROW) {
      this.isDownArrowPressed = true;
    }
  }
  keyReleased(p: p5) {
    if (p.keyCode === p.LEFT_ARROW) {
      this.isLeftArrowPressed = false;
    } else if (p.keyCode === p.RIGHT_ARROW) {
      this.isRightArrowPressed = false;
    } else if (p.keyCode === p.UP_ARROW) {
      this.isUpArrowPressed = false;
    } else if (p.keyCode === p.DOWN_ARROW) {
      this.isDownArrowPressed = false;
    }
  }
  mousePressed(p: p5) {
    p.noiseSeed(p.millis());
  }
}
