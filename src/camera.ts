import { PerspectiveCamera } from 'three';
// import gui from './gui';

export const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  100000,
);

// gui.add(camera.position, 'x', 0, 100);
// gui.add(camera.position, 'y', 0, 100);
// gui.add(camera.position, 'z', 0, 100);

// gui.add(camera.rotation, 'x', 0, Math.PI * 2);
// gui.add(camera.rotation, 'y', 0, Math.PI * 2);
// gui.add(camera.rotation, 'z', 0, Math.PI * 2);

camera.position.set(10, 10, 10);
camera.updateMatrix();

export default camera;
