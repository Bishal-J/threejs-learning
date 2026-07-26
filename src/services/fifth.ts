import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "#d2112b",
  wireframe: false,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Resizing
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update Renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Timer
const timer = new THREE.Timer();
timer.connect(document);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.update();
controls.enableDamping = true;

const animate = () => {
  window.requestAnimationFrame(animate);

  const elapsed = timer.getElapsed();
  timer.update();
  cube.rotation.y = elapsed;

  controls.update();

  renderer.render(scene, camera);
};

animate();
