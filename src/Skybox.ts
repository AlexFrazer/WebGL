import {
  BoxGeometry,
  MeshBasicMaterial,
  TextureLoader,
  DoubleSide,
  Mesh,
} from 'three';
import background from './assets/textures/8k_stars_milky_way.jpg';

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
