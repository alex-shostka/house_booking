import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Capsule } from 'three/examples/jsm/math/Capsule';
import { Octree } from 'three/examples/jsm/math/Octree.js';

@Component({
  selector: 'app-living-quarter-view-page',
  templateUrl: './living-quarter-view-page.component.html',
  styleUrls: ['./living-quarter-view-page.component.css'],
})
export class LivingQuarterViewPageComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef;

  private renderer: any;

  private scene: any;

  private camera: any;

  private controls: any;

  private keyStates = {};

  private playerVelocity = new THREE.Vector3();

  private playerDirection = new THREE.Vector3();

  private worldOctree = new Octree();

  private playerCollider = new Capsule(
    new THREE.Vector3(0, 0.35, 0),
    new THREE.Vector3(0, 1, 0),
    0.35,
  );

  private playerOnFloor = false;

  private clock = new THREE.Clock();

  private STEPS_PER_FRAME = 5;

  private GRAVITY = 30;

  private calculateAspectRatio(): number {
    const height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      1000,
    );
    this.renderer = new THREE.WebGLRenderer();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.configScene();
    this.configPerspectiveCamera();
    this.configRenderer();
    this.configControls();
    this.configLight();
    this.onWindowResize();
    this.loadOBJFiles();
    this.animate();
  }

  configScene() {
    const gridHelper = new THREE.GridHelper(1000, 500);
    this.scene.add(gridHelper);
    this.scene.add(new THREE.AxesHelper(100)); //ось
    this.scene.background = new THREE.Color(0xdddddd);
  }

  configPerspectiveCamera() {
    this.camera.aspect = this.calculateAspectRatio();
    this.camera.updateProjectionMatrix();
    this.camera.position.set(-100, 50, 100);
    this.camera.lookAt(this.scene.position);
  }

  configRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true, // Сглаживание
      alpha: true, // Прозрачность. Чтобы канвас был прозрачным.
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  configControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.autoRotate = false;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    // this.controls.enableDamping = false;
    // this.controls.maxDistance = 90;
    this.controls.enableRotate = false;
    this.controls.maxPolarAngle = Math.PI / 2.1;
    this.controls.update();
  }

  configLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  onWindowResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  loadOBJFiles() {
    const mtlLoader = new MTLLoader();
    mtlLoader.setResourcePath('assets/living_quarter/');
    mtlLoader.setPath('assets/living_quarter/');
    mtlLoader.load('square_skin-v.0.2.mtl', (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('assets/living_quarter/');
      objLoader.load('square_model-v.0.2.obj', (object) => {
        // what about scale? why is it so big and how to do correct
        object.scale.set(0.001, 0.001, 0.001);
        this.scene.add(object);
      });
    });
  }

  keyControls(deltaTime: any) {
    const speedDelta = deltaTime * (this.playerOnFloor ? 25 : 8);
    // @ts-ignore
    if (this.keyStates.KeyW) {
      this.playerVelocity.add(this.getForwardVector().multiplyScalar(speedDelta));
    }
    // @ts-ignore
    if (this.keyStates.KeyS) {
      this.playerVelocity.add(this.getForwardVector().multiplyScalar(-speedDelta));
    }
    // @ts-ignore
    if (this.keyStates.KeyA) {
      this.playerVelocity.add(this.getSideVector().multiplyScalar(-speedDelta));
    }
    // @ts-ignore
    if (this.keyStates.KeyD) {
      this.playerVelocity.add(this.getSideVector().multiplyScalar(speedDelta));
    }

    if (this.playerOnFloor) {
      // @ts-ignore
      if (this.keyStates.Space) {
        this.playerVelocity.y = 15;
      }
    }
  }

  getForwardVector() {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    return this.playerDirection;
  }

  getSideVector() {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    this.playerDirection.cross(this.camera.up);
    return this.playerDirection;
  }

  updatePlayer(deltaTime: any) {
    let damping = Math.exp(-4 * deltaTime) - 1;

    if (!this.playerOnFloor) {
      this.playerVelocity.y -= this.GRAVITY * deltaTime;

      // small air resistance
      damping *= 0.1;
    }

    this.playerVelocity.addScaledVector(this.playerVelocity, damping);

    const deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime);
    this.playerCollider.translate(deltaPosition);

    this.playerCollisions();

    this.camera.position.copy(this.playerCollider.end);
  }

  playerCollisions() {
    const result = this.worldOctree.capsuleIntersect(this.playerCollider);

    this.playerOnFloor = false;

    if (result) {
      this.playerOnFloor = result.normal.y > 0;

      if (!this.playerOnFloor) {
        this.playerVelocity.addScaledVector(result.normal, -result.normal.dot(this.playerVelocity));
      }

      this.playerCollider.translate(result.normal.multiplyScalar(result.depth));
    }
  }

  animate() {
    const deltaTime = Math.min(0.05, this.clock.getDelta()) / this.STEPS_PER_FRAME;

    for (let i = 0; i < this.STEPS_PER_FRAME; i++) {
      this.keyControls(deltaTime);
      this.updatePlayer(deltaTime);
    }

    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
