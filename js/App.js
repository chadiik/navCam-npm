
const Stats = require('./lib/stats.min');

const Scene = require('./Scene');
var input = require('./Input');

//V3d = {Navigation:{NavCam:(require('./navcam/NavCam'))}};
require('../V3d.Navigation');

function ViewportToWorldPlane(viewportPoint, camera){
    // Ref: WestLangley https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z
    //var vector = new THREE.Vector3();
    /*vector.set(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5 );*/
    /*viewportPoint.x = viewportPoint.x * 2 - 1;
    viewportPoint.y = -viewportPoint.y * 2 + 1;*/
    viewportPoint = viewportPoint.clone();
    viewportPoint.z = 0.5;
    viewportPoint.unproject(camera);
    var dir = viewportPoint.sub(camera.position).normalize();
    var distance = -camera.position.y / dir.y;
    var worldPos = camera.position.clone().add(dir.multiplyScalar(distance));
    return worldPos;
}

function SceneSetup(){
    var container = document.getElementById("viewerGL");
    scene = new Scene();

    scene.Init(container);

    scene.DefaultLights();

    input.Init(scene.camera, container);
    input.onResize.push(scene.ReconfigureViewport.bind(scene));
    container.appendChild(scene.renderer.domElement);

    // Camera move
    //scene.camera.position.x += 60 * Scene.units;
    scene.camera.position.y += 150 * Scene.units;
    //scene.camera.position.z += 50 * Scene.units;

    if (options.debug == true) {
        stats = new Stats();
        container.appendChild(stats.dom);
        stats.dom.style.margin = '20px';
    }

    Update();
}

var navCam;
var scene, options;
var helper, stats;

function Update(){
    requestAnimationFrame(Update);

    input.Update();
    scene.Update();

    if(stats !== undefined){
        stats.update();
    }
}

function Run(){
    options = {
        debug: true
    };

    SceneSetup();
    input.keyboard.on('control', function(){
        scene.Render();
    });

    scene.camera.controller.controls.target.set(-40, 10, 20);

    // Grid
    var gridHelper = new THREE.GridHelper(200 * Scene.units, 200, 0x606060, 0x000000);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = .2;
	gridHelper.position.set(0, -1, 0);
	scene.AddDefault(gridHelper);

	// Ground helper
	helper = new THREE.AxisHelper(5);
    scene.Add(helper);
    
    // Viz sphere
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(.5), new THREE.MeshBasicMaterial({color: 0x000000}));
    scene.Add(sphere);

    // Dynamic viz
    var cubeLow = new THREE.Mesh(new THREE.CubeGeometry(2, 4, 1), new THREE.MeshBasicMaterial({color: 0x000000}));
    var cubeCenter1 = new THREE.Mesh(new THREE.CubeGeometry(2, 5, 1), new THREE.MeshBasicMaterial({color: 0xff0000}));
    var cubeCenter2 = new THREE.Mesh(new THREE.CubeGeometry(1, 5, 2), new THREE.MeshBasicMaterial({color: 0xff0000}));
    scene.Add(cubeLow);
    scene.Add(cubeCenter1);
    scene.Add(cubeCenter2);
    cubeLow.position.y = 0;
    cubeCenter1.position.y = 4;
    cubeCenter2.position.y = 6;

    cubeLow.position.z = 20;
    cubeCenter1.position.z = 20;
    cubeCenter2.position.x = 20;

    var obstaclesClock = new THREE.Clock();
    obstaclesClock.start();
    var obstacles = function(){
        var t = obstaclesClock.getElapsedTime();
        var speed = .5;
        cubeLow.position.x = 20 + Math.sin(t * speed) * 8;
        cubeCenter1.position.x = 20 + Math.sin(t * speed + 2) * 8;
        cubeCenter2.position.z = 20 + Math.cos(t * speed + 1) * 8;
    };

    input.Repeat(obstacles, 45);

    // View camera

    var viewCamera = new THREE.PerspectiveCamera(45, 1, .1, 100 * Scene.units);
    var view = {
        left: 0.0,
		top: 0.7,
		width: 0.3,
        height: 0.3,
        background: 0xffffff
    };
    window.viewCamera = viewCamera;
    var updateViewCamera = function(position, lookAt){

        var clearColor = scene.renderer.getClearColor().getHex();

        var left   = Math.floor( input.screen.width  * view.left );
        var top    = Math.floor( input.screen.height * view.top );
        var width  = Math.floor( input.screen.width  * view.width );
        var height = Math.floor( input.screen.height * view.height );

        scene.renderer.setViewport( left, top, width, height );
        scene.renderer.setScissor( left, top, width, height );
        scene.renderer.setScissorTest( true );
        scene.renderer.setClearColor( view.background );

        viewCamera.position.copy(position);
        viewCamera.lookAt(lookAt);
        viewCamera.aspect = width / height;
        viewCamera.updateProjectionMatrix();

        var opacity = modelMaterial.opacity;
        modelMaterial.opacity = 1;
        scene.renderer.render( scene.scene, viewCamera );
        modelMaterial.opacity = opacity;

        var left   = 0;
        var top    = 0;
        var width  = Math.floor( input.screen.width );
        var height = Math.floor( input.screen.height );

        scene.renderer.setViewport( left, top, width, height );
        scene.renderer.setScissor( left, top, width, height );
        scene.renderer.setClearColor( clearColor );
    };

    var postRender = function(){};
    scene.postRender.push(function(){postRender();});

    // Assets
    var modelMaterial = new THREE.MeshLambertMaterial({color:0x909090, transparent:true, opacity:0.6});
    var objLoader = new THREE.OBJLoader();
	objLoader.load('assets/Room.obj', function (obj){
        obj.traverse(function(child){
            if(child instanceof THREE.Mesh){
				child.material = modelMaterial;
            }
		});

        scene.Add(obj);
    });

    
    // NavCam
    var debug = true;
    navCam = new V3d.Navigation.NavCam({
        scene: scene.scene,
        resolution: new THREE.Vector2(128, 128),
        growth: 1,

        arcLengthDivisions: 60,
        smoothPath: 3,
        tryGetRange: 4,

        debug: debug
    });
    //scene.Add(navCam.areaCam.camera);
    if(debug) scene.Add(navCam.areaCam.debugView);
    if(debug) scene.Add(navCam.pathfinder.debugView);

    var down = new THREE.Vector3(0, -1, 0);
    navCam.areaCam.SetRegion(-10, 10, 10, -10, 5, 8, down, 20, 20);
    //navCam.areaCam.camera.position.x = navCam.areaCam.camera.position.z = 20;
    //navCam.areaCam.camera.rotation.x += .01;
    //navCam.areaCam.camera.rotation.y += .01;

	// events
    input.keyboard.on('space', function(){
        navCam.Update();
        //obj.position.x += 1;
    });
    
    var gotoIndex = 0;
    var goto = [];
    var clock = new THREE.Clock();
    var draw = function(){
        //console.log('draw');
        var mv = input.mouseViewport;
        var viewportPoint = new THREE.Vector3(mv.x, mv.y, 0);
        var worldPos = ViewportToWorldPlane(viewportPoint, input.camera);
        worldPos.y = 6;
        helper.position.copy(worldPos);
        goto[gotoIndex] = worldPos.clone();

        helper.visible = false;
        sphere.visible = false;
        if(goto[0] !== undefined && goto[1] !== undefined){
            var curve = navCam.Solve(goto[0], goto[1]);
            if(curve !== undefined){
                var t = clock.getElapsedTime();
                var tCurve = t / Math.min(2, (curve.points.length / 2));
                var modT = tCurve % 1;
                var pointAtTime = navCam.pathfinder.GetAt(modT).clone();
                if(pointAtTime !== undefined) sphere.position.copy(pointAtTime);

                var pointAhead = navCam.pathfinder.GetAt((modT + .5) % 1).clone();
                postRender = function(){
                    updateViewCamera(pointAtTime, pointAhead);
                };
            }
        }
        helper.visible = true;
        sphere.visible = true;
    };
    
    var scope = this;
	input.onMouseDown.push(function(mouseEvent){
        //console.log('onMouseDown');
		if(mouseEvent.ctrlKey){
            input.EnableSceneControls(false);
            gotoIndex = 0;
            draw();
            gotoIndex = 1;
            input.Repeat(draw, 45);
            clock.start();
		}
    });

    input.onMouseUp.push(function(e){
        input.StopRepeat(draw);
        input.EnableSceneControls(true);
        sphere.position.set(0, 0, 0);
        clock.stop();
    });

    //this.input.RemoveEventCallback('onMouseDown', onMouseDown);
    
    return {navCam, scene, input};
}

module.exports = Run;