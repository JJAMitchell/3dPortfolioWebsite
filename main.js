import './style.css'
import * as THREE from './node_modules/three';

//Scene setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,100);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.render(scene,camera);

//Torus's

const geometry1 = new THREE.TorusGeometry(10,1,10,100);
const material1 = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus1 = new THREE.Mesh(geometry1,material1);

torus1.position.set(2,0,-5);

scene.add(torus1);

const geometry2 = new THREE.TorusGeometry(13,1,10,100);
const material2 = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus2 = new THREE.Mesh(geometry2,material2);

torus2.position.set(2,0,-5);

scene.add(torus2);

//Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight,ambientLight);

//Debug and helpers
/*
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper);
*/

//Star function
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({color:0xffffff});
    const star = new THREE.Mesh(geometry,material);
  
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
  
    star.position.set(x,y,z);
    scene.add(star);
  }
  
Array(600).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar
const jordanTexture = new THREE.TextureLoader().load('jordan.jpg');

const jordan = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map:jordanTexture}),
);

jordan.position.set(2,0,-5);

scene.add(jordan);

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

moon.position.set(-15,1,29);

scene.add(moon);

//Move camera event
function moveCamera(){

    const t = document.body.getBoundingClientRect().top;

    jordan.rotation.y += 0.01;
    jordan.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera

//Animation function
function animate(){
    requestAnimationFrame(animate);

    torus1.rotation.x+=0.01;
    torus1.rotation.y+=0.02;
    torus1.rotation.z+=0.025;

    torus2.rotation.x+=0.02;
    torus2.rotation.y+=0.015;
    torus2.rotation.z+=0.01;

    moon.rotation.y+=0.005;
    moon.rotation.z+=0.002;

    renderer.render(scene,camera);
}

animate();