export type Project = {
  title: string;
  description: string;
  link: string;
  lesson: number;
};

export const projects: Project[] = [
  {
    lesson: 1,
    title: "Creating the Scene",
    description: `Learned the basics of setting up a Three.js application by creating a scene, adding a cube with BoxGeometry and MeshBasicMaterial, configuring a PerspectiveCamera, setting up WebGLRenderer with an HTML canvas, and rendering my first 3D scene in the browser.`,
    link: "/src/page/first.html",
  },
  {
    lesson: 2,
    title: "Transforming Objects",
    description: `Learned how to organize scenes in Three.js using THREE.Group, apply object transformations like position, scale, and rotation, control cameras with lookAt(), explore vector operations, visualize coordinates with AxesHelper, and render a complete 3D scene using WebGLRenderer.`,
    link: "/src/page/second.html",
  },
  {
    lesson: 3,
    title: "Animations",
    description: `Learned the basics of animation with Three.js, installed and explored GSAP, and built a simple animated cube using sine and cosine for smooth motion. A great introduction to combining Three.js rendering with animation concepts.`,
    link: "/src/page/third.html",
  },
  {
    lesson: 4,
    title: "Understanding Cameras",
    description: `Today I learned about different camera types in Three.js, including Perspective and Orthographic cameras. I also explored custom camera controls and built-in OrbitControls with damping to create smooth, interactive 3D navigation.`,
    link: "/src/page/fourth.html",
  },
  {
    lesson: 5,
    title: "Full Screen And Resizing",
    description: `Learned how to make a Three.js scene responsive by handling window resizing, updating the camera and renderer, managing pixel ratios for better performance, and adding a double-click fullscreen toggle for an improved viewing experience.`,
    link: "/src/page/fifth.html",
  },
  {
    lesson: 6,
    title: "Different Geometries",
    description: `Learned how to create custom geometry in Three.js using BufferGeometry and Float32Array. Explored built-in geometries, defined vertex positions with BufferAttribute, and generated random vertices to build and render custom 3D shapes`,
    link: "/src/page/sixth.html",
  },
  {
    lesson: 7,
    title: "Debug UI",
    description: `Learned how to use lil-gui in Three.js to build a debugging UI, enabling real-time control of geometry, material, position, rotation, visibility, and animations. Also explored updating geometry dynamically while managing GPU memory efficiently.`,
    link: "/src/page/seventh.html",
  },
  {
    lesson: 8,
    title: "Understanding Textures",
    description: `Learned how to load and apply textures in Three.js using TextureLoader, manage asset loading with LoadingManager, and explored texture properties, filtering, mipmaps, and the role of UV unwrapping in mapping textures onto 3D models.`,
    link: "/src/page/eight.html",
  },
  {
    lesson: 9,
    title: "Understanding Materials",
    description: `Learned how Three.js materials work, exploring MeshBasic, Standard, Phong, Toon, and other material types. Experimented with textures, environment maps, lighting, and GUI controls to understand how material properties affect rendering.`,
    link: "/src/page/ninth.html",
  },
  {
    lesson: 10,
    title: "3D Text",
    description: `Learned how to create 3D text in Three.js using custom fonts and TextGeometry. Explored beveling, centering geometry, matcap materials, and built a scene with randomly placed 3D torus objects.`,
    link: "/src/page/tenth.html",
  },
  {
    lesson: 11,
    title: "Understanding Lights",
    description: `Learned how to use different Three.js lights, including Ambient, Directional, Hemisphere, Point, Spot, and Rect Area lights, and explored light helpers to visualize and debug light positions, directions, and behavior within a 3D scene.`,
    link: "/src/page/eleven.html",
  },
  {
    lesson: 12,
    title: "Understanding Shadows",
    description: ``,
    link: "/src/page/twelve.html",
  },
];

// {
//     lesson: ,
//     title: "",
//     description: ``,
//     link: "/src/page/",
//   },
