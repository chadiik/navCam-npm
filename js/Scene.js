
const FlowCamera = require('./FlowCamera');

class Scene{

    static get units(){ return 1; }

    constructor(){
        Scene.instance = this;
    
        this._camera, this.scene, this.renderer;
    
        this.itemsContainer = new THREE.Object3D();
        this.itemsContainer.name = "itemsContainer";
        this.miscContainer = new THREE.Object3D();
        this.miscContainer.name = "miscContainer";
        this.ambientContainer = new THREE.Object3D();
        this.ambientContainer.name = "ambientContainer";
    
        this.defaults = new THREE.Object3D();
        this.defaults.name = "defaults";
        
        this.items = [];
    
        this.stack = [];

        this.postRender = [];
    }
    
    get camera(){
        return this._camera;
    }
    set camera(value){
        this._camera = value;
    }
    
    ShowItems3DHelpers(value){
        for(var i = 0, len = this.items.length; i < len; i++){
            this.items[i].ShowItems3DHelpers(value);
        }
    }
    
    Push(){
        this.stack.push(this.Snapshot());
        this.Reset();
    }
    
    Pop(){
        this.LoadSnapshot(this.stack.pop());
    }
    
    Snapshot(){
        var snapshot = {};
        
        snapshot.camera = {position: this.camera.position.clone(), rotation: this.camera.rotation.clone()};
        
        snapshot.items = this.items;
        
        snapshot.itemsContainer = this.itemsContainer;
        snapshot.miscContainer = this.miscContainer;
        snapshot.ambientContainer = this.ambientContainer;
        
        return snapshot;
    }
    
    LoadSnapshot(snapshot){
        this.Clear();
    
        this.camera.position.copy(snapshot.camera.position);
        this.camera.rotation.copy(snapshot.camera.rotation);
        
        this.items = snapshot.items;
    
        this.itemsContainer = snapshot.itemsContainer;
        this.miscContainer = snapshot.miscContainer;
        this.ambientContainer = snapshot.ambientContainer;
    
        // Setup rest
        this.scene.add(this.itemsContainer);
        this.scene.add(this.miscContainer);
        this.scene.add(this.ambientContainer);
    }
    
    Clear(){
        this.scene.remove(this.itemsContainer, this.miscContainer, this.ambientContainer);
    }
    
    Reset(){
        
        this.items = [];
    
        this.Clear();
    
        this.itemsContainer = new THREE.Object3D();
        this.itemsContainer.name = "itemsContainer";
        this.miscContainer = new THREE.Object3D();
        this.miscContainer.name = "miscContainer";
        this.ambientContainer = new THREE.Object3D();
        this.ambientContainer.name = "ambientContainer";
    
        // Setup rest
        this.scene.add(this.itemsContainer);
        this.scene.add(this.miscContainer);
        this.scene.add(this.ambientContainer);
    }
    
    Init(container){
        // Camera
        this.camera = new FlowCamera(container).camera;
        //else this.camera = new THREE.PerspectiveCamera(45, 1, 1 * Scene.units, 2000 * Scene.units);
        
        // Scene
        this.scene = new THREE.Scene();
        window.scene = this.scene;
    
        // Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor(new THREE.Color(0x323232), 1);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
        this.renderer.physicallyCorrectLights = true;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        
        // Fill lights
        this.DefaultLights();
    
        // Setup rest
        this.scene.add(this.itemsContainer);
        this.scene.add(this.miscContainer);
        this.scene.add(this.ambientContainer);
        this.scene.add(this.defaults);
    }
    
    Add(object){
        if(false){
            var view = object.view;
    
            this.items.push(object);
            this.itemsContainer.add(view);
    
            object.ShowItems3DHelpers();
        }
        else {
            this.miscContainer.add(object);
        }
    }
    
    AddDefault(object){
        this.defaults.add(object);
    }
    
    Remove(object){
        if(typeof object === 'string'){
            var objName = object;
            object = this.itemsContainer.getObjectByName(objName);
            if(object !== undefined) object = this.miscContainer.getObjectByName(objName);
            if(object === undefined) return;
        }
        this.itemsContainer.remove(object);
        this.miscContainer.remove(object);
    }
    
    DefaultLights(){
        var ambient = new THREE.AmbientLight( 0x404040 );
    
        var directionalLight = new THREE.DirectionalLight(0xfeeedd);
        directionalLight.position.set(7 * Scene.units, 15 * Scene.units, 30 * Scene.units);
    /*
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = .5 * Scene.units;
        directionalLight.shadow.camera.far = 100 * Scene.units;
        directionalLight.shadow.camera.bottom = directionalLight.shadow.camera.left = -50 * Scene.units;
        directionalLight.shadow.camera.top = directionalLight.shadow.camera.right = 50 * Scene.units;
        directionalLight.shadow.camera.updateProjectionMatrix();
        
        var shadowCamerHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
        this.ambientContainer.add(shadowCamerHelper);*/
        
        this.ambientContainer.add(ambient);
        this.ambientContainer.add(directionalLight);
    }
    
    SceneLight(light){
        if(light === undefined){
            light = new THREE.PointLight(0xffee88, 3, 10 * Scene.units, 2);
            light.position.set(4 * Scene.units, 4 * Scene.units, 0);
            light.castShadow = true;
            light.power = 3.4;
        }
    
        this.ambientContainer.add(light);
    
        if(typeof V3f !== 'undefined' && V3f.LightsEditor !== undefined){
            V3f.LightsEditor.Add(light);
        }
    }
    
    FindSection(sectionID){
        for(var iItem = 0, numItems = this.items.length; iItem < numItems; iItem++){
            var item = this.items[iItem];
            if(item !== undefined && item.sov !== undefined && item.sov.GetValue('s') === sectionID){
                return item;
            }
        }
        return undefined;
    }
    
    Update(){
        this.camera.controller.Update();
        this.Render();
    }
    
    Render() {
        this.renderer.render(this.scene, this.camera);

        for(var iPR = 0; iPR < this.postRender.length; iPR++) this.postRender[iPR]();
    }
    
    ReconfigureViewport(screen){
        this.camera.aspect = screen.width / screen.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(screen.width, screen.height);
    }
    
    static LightFromJSON(data){
        var light;
    
        switch(data.type){
            case 'PointLight':
            light = new THREE.PointLight(data.colorHex, data.intensity, data.distance, data.decay);
            light.name = data.name;
            light.power = data.power;
            light.castShadow = data.castShadow;
            light.position.set(data.position.x, data.position.y, data.position.z);
            break;
        }
    
        return light;
    }
}

global.Scene = Scene;
module.exports = Scene;