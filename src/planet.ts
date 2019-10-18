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
import EventEmitter from 'eventemitter3';
import { controls } from './renderer';
import camera from './camera';

@Model
export default class Planet extends EventEmitter {
  public mesh: Mesh;
  // public label:
  private focused = false;
  private prevCameraPosition?: Vector3;

  constructor() {
    super();
    this.mesh = new Mesh(
      new SphereGeometry(5, 32, 32),
      new MeshPhongMaterial({
        map: new TextureLoader().load(texture),
      }),
    );
    // this.label = new Mesh();
    scene.add(this.mesh);
    window.addEventListener('click', this.onClick);
  }

  private onFocus(): void {
    console.log('You have focused');
    this.focused = true;
    controls.enabled = false;
    window.removeEventListener('click', this.onClick);
    window.addEventListener('keyup', this.onKeyUp);
    this.emit('focus');
  }

  private onBlur(): void {
    this.focused = false;
    controls.enabled = true;
    window.addEventListener('click', this.onClick);
    window.removeEventListener('keyup', this.onKeyUp);
    this.emit('blur');
  }

  private onKeyUp = ({ key }: KeyboardEvent): void => {
    if (key === 'Escape') {
      this.onBlur();
      this.returnCameraToOriginalPosition();
    }
  };

  private returnCameraToOriginalPosition(): void {
    if (this.prevCameraPosition) {
      tweenCamera({
        x: this.prevCameraPosition.x,
        y: this.prevCameraPosition.y,
        z: this.prevCameraPosition.z,
      });
    }
  }

  private onClick = (): void => {
    if (collides(this.mesh)) {
      this.prevCameraPosition = new Vector3(
        camera.position.x,
        camera.position.y,
        camera.position.z,
      );
      tweenCamera({
        x: this.mesh.position.x,
        y: this.mesh.position.y,
        z: this.mesh.position.z - 10,
      });
      this.onFocus();
    }
  };

  render(): void {
    if (!collides(this.mesh)) {
      this.mesh.rotation.y += Math.PI / 10000;
    }
  }
}
