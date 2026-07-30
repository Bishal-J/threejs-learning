import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import GUI from "lil-gui";

const gui = new GUI();

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

const boxGeometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);
const planeGeometry = new THREE.PlaneGeometry(10, 10);

const cube = new THREE.Mesh(boxGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);
const torus = new THREE.Mesh(torusGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);

sphere.position.x = -1.5;
torus.position.x = 1.5;

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(cube, sphere, torus, plane);

// ==== Lights
// 1. Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
ambientLight.intensity = 0.5;
scene.add(ambientLight);

// 2. Directional Light
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

// 3. Hemisphere Light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

// 4. Point Light
const pointLight = new THREE.PointLight(0xff9000, 0.1);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

// 5. Rect Area Light - Works only with Mesh Standard Material and Mesh Physical Material
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

// 6. Spot Light
const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5,
  10,
  Math.PI * 0.1,
  0.25,
  1,
);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

spotLight.target.position.x = -1.5;
scene.add(spotLight.target);

// Performace Tips
// 1. Add as few lights as possible

// Minimal Cost => Ambient Light, Hemisphere Light
// Moderate Cost => Directional Light, Point Light
// High Cost => Spot Light, Rect Area Light

// Baking - Instead of actual light use 3D software to bake shadows to the models

// Helpers
// HemisphereLightHelper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2,
);
scene.add(hemisphereLightHelper);

// DirectionalLightHelper
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2,
);
scene.add(directionalLightHelper);

// PointLightHelper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

// SpotLightHelper
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// RectAreaLightHelper
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setSize(sizes.width, sizes.height);
});

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);

camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;

gui.add(camera.position, "x", 0, 3, 0.001);
gui.add(camera.position, "y", 0, 3, 0.001);
gui.add(camera.position, "z", 0, 6, 0.001);

scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const timer = new THREE.Timer();
timer.connect(document);

const animate = (): void => {
  window.requestAnimationFrame(animate);

  const elapsedTime = timer.getElapsed();
  timer.update();

  // Animate
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  controls.update();

  renderer.render(scene, camera);
};

animate();
