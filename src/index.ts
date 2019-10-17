import { init, animate } from './renderer';
import scene from './scene';
import Planet from './planet';
import { AmbientLight } from 'three';

document.addEventListener('DOMContentLoaded', () => {
  init();
  const light = new AmbientLight(0x404040, 1);
  const planet = new Planet();
  scene.add(planet.mesh);
  scene.add(light);
  animate();
});
