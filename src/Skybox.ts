import {
  BoxGeometry,
  MeshBasicMaterial,
  TextureLoader,
  DoubleSide,
  Mesh,
} from 'three';
import background from './assets/textures/8k_stars.jpg';

const texture = new TextureLoader().load(background);

const geometry = new BoxGeometry(10000, 10000, 10000);

const material = new MeshBasicMaterial({
  map: texture,
  side: DoubleSide,
});

const skybox = new Mesh(geometry, material);

export default skybox;
