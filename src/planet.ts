import { Mesh, SphereGeometry, MeshPhongMaterial, TextureLoader } from 'three';
import { collides } from './raycaster';
import texture from './assets/textures/4k_eris_fictional.jpg';
import scene from './scene';
import camera from './camera';
import { Model } from '~utils';
import Tween from '@tweenjs/tween.js';

@Model
export default class Planet {
  public mesh: Mesh;

  constructor() {
    this.mesh = new Mesh(
      new SphereGeometry(5, 32, 32),
      new MeshPhongMaterial({
        map: new TextureLoader().load(texture),
      }),
    );
    scene.add(this.mesh);
    window.addEventListener('click', this.onWindowClick);
    this.tweenUpdate();
  }

  private onWindowClick = (): void => {
    if (collides(this.mesh)) {
      const {
        position: { x: targetX, y: targetY, z: targetZ },
      } = this.mesh;
      const {
        position: { x: originX, y: originY, z: originZ },
      } = camera;
      new Tween.Tween({
        x: originX,
        y: originY,
        z: originZ,
      })
        .to(
          {
            x: targetX,
            y: targetY,
            z: targetZ - 10,
          },
          1000,
        )
        .easing(Tween.Easing.Quadratic.Out)
        .onUpdate(({ x, y, z }) => {
          camera.position.x = x;
          camera.position.y = y;
          camera.position.z = z;
        })
        .start();
    }
  };

  tweenUpdate = (time: number): void => {
    window.requestAnimationFrame(this.tweenUpdate);
    Tween.update(time);
  };

  render(): void {
    if (!collides(this.mesh)) {
      this.mesh.rotation.y += Math.PI / 10000;
    }
  }
}
