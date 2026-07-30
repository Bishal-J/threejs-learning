import * as THREE from "three";

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();

// Scene Graph -> Group -> Add multiple object to a group and move them together
const group = new THREE.Group();
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "royalblue",
});

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  cubeMaterial,
);
cube1.position.x = -1;
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.3, 0.3),
  cubeMaterial,
);
cube2.position.x = 0;
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.7, 0.7, 0.7),
  cubeMaterial,
);
cube3.position.x = 1;

group.add(cube1, cube2, cube3);
group.position.y = -1;
group.position.z = 0.5;
group.scale.y = 2;

scene.add(group);

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "#d2112b",
});

// Object Transformation
const cube = new THREE.Mesh(geometry, material);
// ==== Position

cube.position.x = 0.7;
cube.position.y = -0.6;
cube.position.z = 1;
// cube.position.set(0.7, -0.6, 1);

// ==== Scale
cube.scale.x = 1.75;
cube.scale.y = 0.2;
cube.scale.z = 1.2;
// cube.scale.set(1.75, 0.2, 1.2);

// ==== Rotation
cube.rotation.reorder("ZYX");
cube.rotation.x = Math.PI;
cube.rotation.y = 0.314;
cube.rotation.z = 1.12;
// cube.rotation.set(Math.PI, 0.314, 1.12);

scene.add(cube);

// Camera
const sizes = {
  width: 800,
  height: 600,
};
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 3;

// Look At
camera.lookAt(cube.position);

scene.add(camera);

// DistanceTo, Length, Normalize
console.log("Length: ", cube.position.length());
console.log("DistanceTo: ", cube.position.distanceTo(camera.position));
console.log("Normalize: ", cube.position.normalize());

// Axes Helper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
