import {
  Mesh,
  SphereGeometry,
  MeshPhongMaterial,
  TextureLoader,
  Vector3,
} from 'three';
import { collides } from './raycaster';
import texture from './assets/textures/4k_eris_fictional.jpg';
import scene from './scene';
import { Model } from '~utils';
import { tweenCamera } from './utils';

@Model
export default class Planet {
  public mesh: Mesh;
  // public label:
  private focused = false;

  constructor() {
    this.mesh = new Mesh(
      new SphereGeometry(5, 32, 32),
      new MeshPhongMaterial({
        map: new TextureLoader().load(texture),
      }),
    );
    // this.label = new Mesh();
    scene.add(this.mesh);
    window.addEventListener('click', this.onWindowClick);
  }

  private onWindowClick = (): void => {
    if (collides(this.mesh)) {
      tweenCamera({
        x: this.mesh.position.x,
        y: this.mesh.position.y,
        z: this.mesh.position.z - 10,
      });
    }
  };

  render(): void {
    if (!collides(this.mesh)) {
      this.mesh.rotation.y += Math.PI / 10000;
    }
  }
}
