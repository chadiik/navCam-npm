
class FlowCamera{
    constructor(container){
        FlowCamera.instance = this;

        const Scene = require('./Scene');
        
        this.camera = new THREE.PerspectiveCamera(45, 1, 1 * Scene.units, 2000 * Scene.units);
        this.camera.name = 'V3fCamera';
        this.camera.controller = this;
        console.log('Created ' + this.camera.name, this.camera);

        this.container = container;

        // controls
        this.controls = new THREE.OrbitControls(this.camera, this.container);
        this.controls.target = new THREE.Vector3();
        this.controls.userPan = false;
        this.controls.userPanSpeed = 0.0;
        this.controls.maxDistance = 5000.0;
        this.controls.maxPolarAngle = Math.PI * 0.895;
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 1.0;
        this.controls.enableKeys = false;
    }

    Unload(){
        this.controls.enabled = false;
    }

    Load(){
        this.controls.enabled = true;
    }

    Update(){
        this.controls.update();
    }

}

module.exports = FlowCamera;