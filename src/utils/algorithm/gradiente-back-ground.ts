import * as p5 from 'p5';

export function gradientBackground(p: p5, width: number, height: number) {
  const c1 = p.color(10,20,25);
  const c2 = p.color(0, 0, 255);


  p.push()
  for (let y = 0; y < height; y++) {
    let n = p.map(y, 0, height, 0, 8);
    let newc = p.lerpColor(c1, c2, n);
    p.stroke(newc);
    p.line(0, y, width, y);
  }
  p.pop()
}
