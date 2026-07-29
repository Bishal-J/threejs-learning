import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const gui = new GUI();

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

// Galaxy
const parameters = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};

let geometry: THREE.BufferGeometry | null = null;
let material: THREE.PointsMaterial | null = null;
let points: THREE.Points | null = null;

const generateGalaxy = () => {
  // Destroy Old Galaxy
  if (points) {
    scene.remove(points);
  }

  if (geometry) {
    geometry.dispose();
  }

  if (material) {
    material.dispose();
  }

  geometry = new THREE.BufferGeometry();
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spin;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = 0 + randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  points = new THREE.Points(geometry, material);

  scene.add(points);
};

generateGalaxy();

// Debug
const galaxyGui = gui.addFolder("Galaxy");
galaxyGui
  .add(parameters, "count", 10000, 200000, 100)
  .onFinishChange(() => generateGalaxy());
galaxyGui
  .add(parameters, "size", 0.01, 0.03, 0.001)
  .onFinishChange(() => generateGalaxy());
galaxyGui
  .add(parameters, "radius", 0.01, 20, 0.01)
  .onFinishChange(() => generateGalaxy());
galaxyGui
  .add(parameters, "branches", 2, 20, 1)
  .onFinishChange(() => generateGalaxy());
galaxyGui
  .add(parameters, "spin", -5, 5, 0.001)
  .onFinishChange(() => generateGalaxy());
galaxyGui
  .add(parameters, "randomness", 0, 2, 0.001)
  .onFinishChange(() => generateGalaxy());
galaxyGui
  .add(parameters, "randomnessPower", 1, 10, 0.01)
  .onFinishChange(() => generateGalaxy());
galaxyGui
  .addColor(parameters, "insideColor")
  .onFinishChange(() => generateGalaxy());
galaxyGui
  .addColor(parameters, "outsideColor")
  .onFinishChange(() => generateGalaxy());

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

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

const animate = () => {
  window.requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
};

animate();
