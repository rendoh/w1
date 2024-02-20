import 'the-new-css-reset';

import { clock } from './core/clock';
import { renderer } from './core/renderer';
import { sizes } from './core/sizes';
import { Star } from './star';

const star = new Star();
renderer.scene.add(star.mesh);

function resize() {
  renderer.resize();
}

function update() {
  star.update();
  renderer.update();
}

sizes.addEventListener('resize', resize);
clock.addEventListener('tick', update);
