import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

const loadingManager = new THREE.LoadingManager();

loadingManager.onError = () => {
  console.log("Error");
};

// Texture Loader
const textureLoader = new THREE.TextureLoader(loadingManager);
const matcapTextue = textureLoader.load("/textures/matcaps/4.png");

// Font Loader
const fontLoader = new FontLoader(loadingManager);
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Bishal", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTextue });
  const text = new THREE.Mesh(textGeometry, material);

  // To get the bounding box - that is the imaginary box outside out object
  // textGeometry.computeBoundingBox();
  // if (textGeometry.boundingBox?.max) {
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox?.max.x - 0.2) * 0.5,
  //     -(textGeometry.boundingBox?.max.y - 0.2) * 0.5,
  //     -(textGeometry.boundingBox?.max.z - 0.3) * 0.5,
  //   );
  // }
  // textGeometry.computeBoundingBox();
  // console.log(textGeometry.boundingBox);

  textGeometry.center();
  scene.add(text);

  // Adding Donuts
  const geometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 100; i++) {
    const torus = new THREE.Mesh(geometry, material);
    torus.position.x = (Math.random() - 0.5) * 10;
    torus.position.y = (Math.random() - 0.5) * 10;
    torus.position.z = (Math.random() - 0.5) * 10;

    torus.rotation.x = Math.PI * Math.random();
    torus.rotation.y = Math.PI * Math.random();

    const randomScaleSize = Math.random();
    torus.scale.set(randomScaleSize, randomScaleSize, randomScaleSize);
    scene.add(torus);
  }
});

const axisHelper = new THREE.AxesHelper();
axisHelper.visible = false;
scene.add(axisHelper);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

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
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

const animate = (): void => {
  window.requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
};

animate();
