import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");

// Particles
// const particlesGeometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
const particlesGeometry = new THREE.BufferGeometry();

const count = 5000;

const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3),
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  color: "#d1212b",
  // map: particleTexture,
  transparent: true,
  alphaMap: particleTexture,
  depthTest: false,
});

// Points
const points = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(points);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const animate = () => {
  window.requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
};

animate();
