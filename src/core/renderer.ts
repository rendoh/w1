import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { camera } from './camera';
import { sizes } from './sizes';

class Renderer {
  public readonly canvas = document.createElement('canvas');
  private renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
  private controls = new OrbitControls(camera.camera, this.canvas);
  public readonly scene = new THREE.Scene();

  constructor() {
    this.initCanvas();
    this.controls.enableDamping = true;
    this.controls.maxDistance = 1500;
    this.controls.minDistance = 750;
    this.controls.enablePan = false;
    this.controls.maxPolarAngle = Math.PI * (3 / 4);
    this.controls.minPolarAngle = Math.PI / 4;
    this.controls.maxAzimuthAngle = Math.PI / 4;
    this.controls.minAzimuthAngle = -Math.PI / 4;

    this.resize();
  }

  private initCanvas() {
    this.canvas.style.display = 'block';
    document.body.appendChild(this.canvas);
  }

  public resize() {
    camera.resize();
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(sizes.pixelRatio);
  }

  public update() {
    this.controls.update();
    this.renderer.render(this.scene, camera.camera);
  }

  public dispose() {
    this.controls.dispose();
    this.renderer.dispose();
    this.canvas.remove();
  }
}

export const renderer = new Renderer();
