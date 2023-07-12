import * as p5 from 'p5';
import { Motion } from './motion';

export class Camera {
  position: any;
  constructor(p?: p5) {
    if (p) {
      this.position = p.createVector(0, 0, 1);
    }
  }

  // Set the position to centered upon the given `entity`
  // Position is inversed and scaled by proportionally to zoom.
  track(entity: Motion, p5: p5) {
    this.position.x = -entity.pos.x * this.position.z + p5.displayWidth / 2;
    this.position.y = -entity.pos.y * this.position.z + p5.displayHeight / 2;
  }

  // Translate & scale based on camera position and zoom
  draw(p: p5) {
    // Update
    if (p.keyIsDown(219)) this.position.z -= 0.01; // "["
    if (p.keyIsDown(221)) this.position.z += 0.01; // "]"

    // Draw
    p.translate(this.position.x, this.position.y);
    p.scale(this.position.z);
  }
}
