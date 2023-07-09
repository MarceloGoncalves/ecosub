import { Component, ElementRef } from '@angular/core';
import * as p5 from 'p5';
import { gradientBackground } from 'src/utils/algorithm/gradiente-back-ground';
import { Submarine } from 'src/utils/poligons-model/submarin';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  submarine: Submarine = new Submarine();
  peso = 0.005;
  gravidade = 0.001;

  resistance = 0.2;
  resistanceForce = this.submarine.motion.velocity
    .copy()
    .mult(-this.resistance);
  isLeftArrowPressed: any;
  isRightArrowPressed: any;
  isUpArrowPressed: any;
  isDownArrowPressed: any;

  constructor(private el: ElementRef) {}

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
    }, this.el.nativeElement);
  }

  setup(p: any) {
    const c = document.querySelector('#canvasContainer');
    p.createCanvas(p.displayWidth, p.displayHeight).parent(c);
    const INITPOS = this.getInitPos(p);
    const INITACC = new p5.Vector();
    const INITVEL = new p5.Vector();
    this.submarine = new Submarine(INITPOS, INITVEL, INITACC);

  }

  draw(p: p5) {
    //p.background(0, 0, 255);
    gradientBackground(p, p.displayWidth, p.displayHeight);
    this.submarine.display(p);
    this.submarine.update();
    this.submarine.checkEdges(p);
    // p.background(0, 25, 255, 100);
    this.accelerateToDirection(p);
  }

  private getInitPos(p: p5): p5.Vector {
    return new p5.Vector(p.displayWidth, 20);
  }

  accelerateToDirection(p: p5) {
    /*  this.submarine.applyForce(
      new p5.Vector(0, this.gravidade + this.peso).mult(p.deltaTime)
    ); */

    if (this.isLeftArrowPressed) {
      this.submarine.applyForce(new p5.Vector(-0.02, 0).mult(p.deltaTime));
      this.submarine.applyForce(this.resistanceForce.mult(p.deltaTime));
    }
    if (this.isRightArrowPressed) {
      this.submarine.applyForce(new p5.Vector(0.02, 0).mult(p.deltaTime));
      this.submarine.applyForce(this.resistanceForce.mult(p.deltaTime));
    }
    if (this.isUpArrowPressed) {
      this.submarine.applyForce(new p5.Vector(0, -0.02).mult(p.deltaTime));
      this.submarine.applyForce(this.resistanceForce.mult(p.deltaTime));
    }
    if (this.isDownArrowPressed) {
      this.submarine.applyForce(new p5.Vector(0, 0.02).mult(p.deltaTime));
      this.submarine.applyForce(this.resistanceForce.mult(p.deltaTime));
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
}
