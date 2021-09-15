import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js"

//Basic propertires of canvas
const canvas = document.getElementById('c');
let width, height;
if (window.matchMedia("(max-width: 812px)").matches) {
    width = window.innerWidth;
    height = window.innerHeight * 0.6;
} else {
    width = window.innerWidth / 2;
    height = window.innerHeight;
}



//Init render
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(0, 0, 8);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(width, height);

//Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 10);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(2, 2, -5);
scene.add(light);
const light3 = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light3);

//Scene background
const textureloader = new THREE.TextureLoader();
textureloader.load('/assets/backgroundcanvas.jfif', function(texture) {
        scene.background = texture;
    }, undefined,
    function(error) {
        console.log(error);
    }
);

//Controls
const constrols = new OrbitControls(camera, renderer.domElement);
constrols.update();

//Texture of skate
let textureSkate;
textureloader.load('/assets/not.jpg', function(texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.offset.x = 0.2;
            texture.offset.y = 0.0;
            textureSkate = texture;
        }, undefined,
        function(error) {
            console.log(error);
        }
    )
    //Load model
let skateModel;
const gltfloader = new GLTFLoader();
gltfloader.load('/assets/skateboard/scene.gltf', async function(model) {
        skateModel = model.scene;
        skateModel.position.set(0, 1, 0);
        skateModel.rotation.x = 3 * Math.PI / 2;
        skateModel.rotation.y = -Math.PI / 2;
        skateModel.children[0].children[0].children[0].children[9].children[0].material.map = textureSkate;
        scene.add(skateModel);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.log('An error happened');
    })


function animation() {
    renderer.render(scene, camera);


    requestAnimationFrame(animation);
}

animation();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    if (window.matchMedia("(max-width: 812px)").matches) {
        width = window.innerWidth;
        height = window.innerHeight * 0.6;
    } else {
        width = window.innerWidth / 2;
        height = window.innerHeight;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}


const wheelPicker = document.getElementById("wheel");
wheelPicker.addEventListener('change', function() {
    skateModel.children[0].children[0].children[0].children[4].children[0].material.color.set(this.value);
});

const truckPicker = document.getElementById("truck");
truckPicker.addEventListener('change', function() {
    skateModel.children[0].children[0].children[0].children[7].children[0].material.color.set(this.value);
});


const nutPicker = document.getElementById("nut");
nutPicker.addEventListener('change', function() {
    skateModel.children[0].children[0].children[0].children[5].children[0].material.color.set(this.value);
});

const screwPicker = document.getElementById("screw");
screwPicker.addEventListener('change', function() {
    skateModel.children[0].children[0].children[0].children[0].children[0].material.color.set(this.value);
});

const rubberPicker = document.getElementById("rubber");
rubberPicker.addEventListener('change', function() {
    skateModel.children[0].children[0].children[0].children[2].children[0].material.color.set(this.value);
});

const valeroPicker = document.getElementById("valero");
valeroPicker.addEventListener('change', function() {
    skateModel.children[0].children[0].children[0].children[6].children[0].material.color.set(this.value);
});

const imgpicker = document.getElementById('img');
imgpicker.addEventListener('change', function(e) {
    const userImage = e.target.files[0];
    const userImageURL = URL.createObjectURL(userImage);
    textureloader.setCrossOrigin("");
    textureloader.load(userImageURL, function(texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.offset.x = 0.2;
            texture.offset.y = 0.0;
            textureSkate = texture;
            skateModel.children[0].children[0].children[0].children[9].children[0].material.map = textureSkate;
        }, undefined,
        function(error) {
            console.log(error);
        }
    )
});

const offsetX = document.getElementById("offsetX")
offsetX.addEventListener('change', function(e) {
    textureSkate.offset.x = e.target.value / 50;

});

const offsetY = document.getElementById("offsetY")
offsetY.addEventListener('change', function(e) {
    textureSkate.offset.y = e.target.value / 50;
});