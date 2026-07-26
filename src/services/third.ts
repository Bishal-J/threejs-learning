import * as THREE from "three";
import { gsap } from "gsap";

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "#d2112b",
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const sizes = {
  width: 800,
  height: 600,
};

const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animations
const timer = new THREE.Timer();
timer.connect(document);

gsap.to(cube.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(cube.position, { duration: 1, delay: 3, x: -2 });

const animate = () => {
  window.requestAnimationFrame(animate);

  // Time
  timer.update();
  const elapsed = timer.getElapsed();

  // Update Objects
  cube.position.x = Math.sin(elapsed);
  cube.position.y = Math.cos(elapsed);

  // Render
  renderer.render(scene, camera);
};

animate();
