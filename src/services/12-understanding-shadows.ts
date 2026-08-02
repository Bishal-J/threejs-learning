import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const gui = new GUI();

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

// Loading Texture
const textureLoader = new THREE.TextureLoader();
// const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

const planeGeometry = new THREE.PlaneGeometry(5, 5);

const sphere = new THREE.Mesh(sphereGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);
// Adding Baked Shadow
// const plane = new THREE.Mesh(
//   planeGeometry,
//   new THREE.MeshBasicMaterial({
//     map: bakedShadow,
//   }),
// );

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere, plane);

// ==== Adding a baked shadow alternative
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x222222,
    alphaMap: simpleShadow,
    transparent: true,
  }),
);
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01;
scene.add(sphereShadow);

// ==== Lights
// 1. Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// 2. Directional Light - Shadow -> Camera - Similar to Orthographic Camera
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(2, 2, -1);
const dlLightGui = gui.addFolder("Directional Light").close();
dlLightGui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
dlLightGui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
dlLightGui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
dlLightGui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

// 3. Spot Light - Shadow -> Camera - Similar to Perspective Camera
const spotLight = new THREE.SpotLight(0xffffff, 0.3, 10, Math.PI * 0.3);
spotLight.castShadow = false;
spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target);

// 4. Point Light - Shadow -> Camera - Similar to Perspective Camera
const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.castShadow = false;
pointLight.position.set(-1, 1, 0);
scene.add(pointLight);

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

const cameraGui = gui.addFolder("Camera").close();
cameraGui.add(camera.position, "x", 0, 3, 0.001);
cameraGui.add(camera.position, "y", 0, 3, 0.001);
cameraGui.add(camera.position, "z", 0, 6, 0.001);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

// ==== Shadows
// Below are the steps to add shadows
// 1. Enable shadow map for the renderer
renderer.shadowMap.enabled = false;

// 2. Mark all the objects that should receive or cast shadow
sphere.castShadow = true;
plane.receiveShadow = true;

// 3. Olny - Point Light, Directional Light and Spot Light Cast Shadow
// Enable those light to cast shadow
directionalLight.castShadow = false;

// ==== Optimizing Shadows
// 1. Shadow Mapsize - Keep it a power of 2 i.e 2, 4, 8, 16
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

// 2. Top, Bottom, Right, Left, Near, Far, Blur
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
// directionalLight.shadow.radius = 10;

// Shadow Map - TYPE => PCFShadowMap(Default), PCFShoftShadowMap, BasicShadowMap, VSMShadowMap
renderer.shadowMap.type = THREE.PCFShadowMap;

// ==== Spot Light Optimization
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

// Amplitude
spotLight.shadow.camera.fov = 30;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;

// ==== Point Light Optimization
pointLight.shadow.camera.near = 1;
pointLight.shadow.camera.far = 5;

// ==== Camera Helper
// 1. Directional Light Camera Helper
const dlCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
dlCameraHelper.visible = false;
scene.add(dlCameraHelper);

// 2. Spot Light Camera Helper
const slCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
slCameraHelper.visible = false;
scene.add(slCameraHelper);

// 3. Point Light Camera Helper
const plCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
plCameraHelper.visible = false;
scene.add(plCameraHelper);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const timer = new THREE.Timer();
timer.connect(document);

const animate = (): void => {
  window.requestAnimationFrame(animate);

  const elapsedTime = timer.getElapsed();
  timer.update();

  // Animate the sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.5;

  controls.update();

  renderer.render(scene, camera);
};

animate();
