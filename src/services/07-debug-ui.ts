import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { gsap } from "gsap";

// Debug
const gui = new GUI();

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

const debugProperties = {
  radius: 1,
  height: 2,
  radialSegments: 7,
  heightSegments: 2,
  openEnded: false,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
  spin: () => {
    gsap.to(cone.rotation, {
      duration: 2,
      y: "+=" + Math.PI * 2,
    });
  },
};

const geometry = new THREE.ConeGeometry(
  debugProperties.radius,
  debugProperties.height,
  debugProperties.radialSegments,
  debugProperties.heightSegments,
  debugProperties.openEnded,
  debugProperties.thetaStart,
  debugProperties.thetaLength,
);
const material = new THREE.MeshBasicMaterial({
  color: "#d2112b",
  wireframe: true,
});
const cone = new THREE.Mesh(geometry, material);
scene.add(cone);

gui.add(debugProperties, "spin");

gui.add(material, "wireframe");
gui.addColor(material, "color");

gui.add(cone, "visible");

const updateGeometry = function (): void {
  cone.geometry.dispose(); // Free GPU Memory

  cone.geometry = new THREE.ConeGeometry(
    debugProperties.radius,
    debugProperties.height,
    debugProperties.radialSegments,
    debugProperties.heightSegments,
    debugProperties.openEnded,
    debugProperties.thetaStart,
    debugProperties.thetaLength,
  );
};

// Geometry GUI
const geoFolder = gui.addFolder("Geometry");
geoFolder
  .add(debugProperties, "radius", 0.1, 3, 0.1)
  .name("Radius")
  .onChange(updateGeometry);

geoFolder
  .add(debugProperties, "height", 0.1, 3, 0.1)
  .name("Height")
  .onChange(updateGeometry);

geoFolder
  .add(debugProperties, "radialSegments", 3, 64, 1)
  .name("Radial Segments")
  .onChange(updateGeometry);

geoFolder
  .add(debugProperties, "heightSegments", 1, 20, 1)
  .name("Height Segments")
  .onChange(updateGeometry);

geoFolder
  .add(debugProperties, "openEnded")
  .name("Open Ended")
  .onChange(updateGeometry);

geoFolder
  .add(debugProperties, "thetaStart", 0, Math.PI * 2, 0.01)
  .name("Theta Start")
  .onChange(updateGeometry);

geoFolder
  .add(debugProperties, "thetaLength", 0, Math.PI * 2, 0.01)
  .name("Theta Length")
  .onChange(updateGeometry);

const positionFolder = gui.addFolder("Position");
positionFolder.add(cone.position, "x").min(-1).max(1).step(0.01);
positionFolder.add(cone.position, "y").min(-1).max(1).step(0.01);
positionFolder.add(cone.position, "z").min(-1).max(1).step(0.01);

const rotationFolder = gui.addFolder("Rotation");
rotationFolder.add(cone.rotation, "x").min(-1).max(1).step(0.01);
rotationFolder.add(cone.rotation, "y").min(-1).max(1).step(0.01);
rotationFolder.add(cone.rotation, "z").min(-1).max(1).step(0.01);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.z = 4;
scene.add(camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const animate = (): void => {
  window.requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
};

animate();
