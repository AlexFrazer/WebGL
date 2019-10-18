import {
  BoxGeometry,
  MeshBasicMaterial,
  TextureLoader,
  DoubleSide,
  Mesh,
} from 'three';
// eslint-disable-next-line
// @ts-ignore
import background from './assets/textures/8k_stars.jpg';

const texture = new TextureLoader().load(background);
const geometry = new BoxGeometry(1000, 1000, 1000);

const skybox = new Mesh(geometry, [
  new MeshBasicMaterial({
    map: texture,
    side: DoubleSide,
  }),
  new MeshBasicMaterial({
    map: texture,
    side: DoubleSide,
  }),
  new MeshBasicMaterial({
    map: texture,
    side: DoubleSide,
  }),
  new MeshBasicMaterial({
    map: texture,
    side: DoubleSide,
  }),
  new MeshBasicMaterial({
    map: texture,
    side: DoubleSide,
  }),
  new MeshBasicMaterial({
    map: texture,
    side: DoubleSide,
  }),
]);

export default skybox;
