import * as p5 from 'p5';
import { Submarine } from '../poligons-model/submarin';
import { Camera } from './camera2D';

export class HUD {
  cam: Camera;
  player: Submarine;
  constructor(cam: any, player: Submarine) {
    this.cam = cam;
    this.player = player;
  }

  draw(p: p5) {
    p.noStroke();
    p.fill(255, 0, 0);
    p.textSize(30);
    p.text('Camera X: ' + this.cam.position.x, 0, 30);
    p.text('Camera Y: ' + this.cam.position.y, 0, 60);
    p.text('Camera Z: ' + this.cam.position.z, 0, 90);
    p.text('Player X: ' + this.player.motion.pos.x, 0, 130);
    p.text('Player Y: ' + this.player.motion.pos.y, 0, 170);
  }
}
