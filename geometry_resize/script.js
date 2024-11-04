import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';



//Scene
const scene = new THREE.Scene();

//Sizes
const sizes = { width: window.innerWidth, height: window.innerHeight };




//Resize
window.addEventListener('resize', () => {

    //Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    //Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //accounts for when people move the window to a different screen.
});

//Listen for double click
window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {

        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }

    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.exitFullscreen();
        }
    }
});

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 2;
scene.add(camera);

//Renderer
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0x2b2d42); 


//Custom, random triangles using Buffer Geometry
const geometry = new THREE.BufferGeometry();

const count = 20; // Number of triangles
const positionsArray = new Float32Array(count * 3 * 3); // 3 vertices per triangle, 3 coordinates per vertex

// Randomly generate positions for each triangle
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
}

// Create a buffer attribute
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);

// Create a material
const material = new THREE.MeshBasicMaterial({ color: 0x04E762, wireframe: true });


// Define colors for each cube face
const faceColors = [
    0xc7f9cc, // Front face
    0xc7f9cc, // Back face
    0xc0fdff, // Top face
    0xc0fdff, // Bottom face
    0xb8f2e6, // Right face
    0xb8f2e6, // Left face
];


// Create an array of materials
const materials = faceColors.map(color => new THREE.MeshBasicMaterial({ color}));

// Create cube geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1);

// Assign materials to each face
/* for (let i = 0; i < geometry.groups.length; i++) {
    geometry.groups[i].materialIndex = i;
} */

// Create the mesh with the geometry and materials
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
camera.lookAt(mesh.position);

//Clock
const clock = new THREE.Clock();

// Animation
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    mesh.rotation.y = elapsedTime; //Rotate based on time
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

tick();