import * as THREE from './libs/three/three.module.js';
import { FBXLoader } from './libs/three/FBXLoader.js';
import { OrbitControls } from './libs/three/OrbitControls.js';

let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    const loader = new FBXLoader();
    loader.load('./model/your_model.fbx', function (object) {
        scene.add(object);
        object.position.set(0, 0, 0);
        object.scale.set(0.1, 0.1, 0.1); // Adjust the scale if needed
    });

    camera.position.z = 5;

    const animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
