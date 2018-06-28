/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./V3d.Navigation.js":
/*!***************************!*\
  !*** ./V3d.Navigation.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if(typeof V3d === "undefined"){V3d = {};}if(typeof V3d.Navigation === "undefined")V3d.Navigation={};V3d.Navigation.NavCam =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/navcam/NavCam.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/navcam/AreaCam.js":
/*!******************************!*\
  !*** ./js/navcam/AreaCam.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

class AreaCam {
    constructor(params){

        // OrthographicCamera( left, right, top, bottom, near, far )
        this.camera = new THREE.OrthographicCamera();
        this.camera.name = 'AreaCam_camera';

        this.params = params || {};
        if(this.params.resolution === undefined) this.params.resolution = new THREE.Vector2(64, 64);
        if(this.params.growth === undefined) this.params.growth = 1;
        if(this.params.wiggle === undefined) this.params.wiggle = .05;
        if(this.params.overrideMaterial === undefined) this.params.overrideMaterial = AreaCam.defaultMaterial;
        if(this.params.scene !== undefined) this.scene = this.params.scene;
        console.log(this.params.resolution, this.scene, this.params.overrideMaterial);

        this.renderer = new THREE.WebGLRenderer({
            preserveDrawingBuffer:true
        });
        this.renderer.autoClear = false;
        this.renderer.setSize(this.params.resolution.x, this.params.resolution.y);
        this.renderer.setClearColor(new THREE.Color(0x000000), 1);

        this.readFormat = THREE.RGBAFormat;
        this.readBuffer = new Uint8Array(this.params.resolution.x * this.params.resolution.y * 4);
        this.rtTexture = new THREE.WebGLRenderTarget(this.params.resolution.x, this.params.resolution.y, { 
                minFilter: THREE.NearestFilter, 
                magFilter: THREE.NearestFilter, 
                format: this.readFormat, 
                type: THREE.UnsignedByteType 
            }
        );
    }

    get debugView(){
        if(this._debugView === undefined) {
            this._debugView = new THREE.Object3D();
            this._debugView.name = 'AreaCam_debug';
        }
        return this._debugView;
    }

    SetRegion(left, right, top, bottom, low, high, direction, x, z){
        if(left !== undefined) this.camera.left = left;
        if(right !== undefined) this.camera.right = right;
        if(top !== undefined) this.camera.top = top;
        if(bottom !== undefined) this.camera.bottom = bottom;

        if(this.camera.left !== undefined && this.camera.right !== undefined && this.camera.top !== undefined && this.camera.bottom !== undefined){
            this.areaRatio = this.params.resolution.clone().divide(new THREE.Vector2(this.camera.right - this.camera.left, this.camera.top - this.camera.bottom));
        }
        
        if(low !== undefined && high !== undefined){
            this.low = low;
            this.high = high;

            this.camera.near = 0;
            this.camera.far = this.high - this.low;
        }

        if(direction !== undefined){
            this.direction = direction;
            this.camera.position.copy(this.direction.clone().normalize().multiplyScalar(-this.high));
            //this.camera.rotation.set(direction.x, direction.y, direction.z);
            this.camera.rotation.copy(new THREE.Euler().setFromRotationMatrix(
                new THREE.Matrix4().lookAt(this.camera.position, new THREE.Vector3(), new THREE.Vector3(0, 1, 0))
            ));
        }

        if(x !== undefined) this.camera.position.x = x;
        if(z !== undefined) this.camera.position.z = z;

        this.camera.updateProjectionMatrix();

        this.Snapshot();
    }

    Snapshot(){ 
        this.scene.overrideMaterial = this.params.overrideMaterial;
        this.renderer.clearColor();
        var rOffset = this.params.wiggle;
        //console.log("Performance capabilities strategy selection");
        if(false){}
        else if(false){ var ry, rx; }
        else{ // high end
            this.renderer.render(this.scene, this.camera, this.rtTexture, false);

            var rx = this.camera.rotation.x;
            var ry = this.camera.rotation.y;

            this.camera.rotation.x = rx + rOffset;
            this.renderer.render(this.scene, this.camera, this.rtTexture, false);
            
            this.camera.rotation.x = rx - rOffset;
            this.renderer.render(this.scene, this.camera, this.rtTexture, false);

            this.camera.rotation.x = rx;

            this.camera.rotation.y = ry - rOffset;
            this.renderer.render(this.scene, this.camera, this.rtTexture, false);

            this.camera.rotation.y = ry + rOffset;
            this.renderer.render(this.scene, this.camera, this.rtTexture, false);

            this.camera.rotation.y = ry;
        }
        this.scene.overrideMaterial = null;
        
        this.renderer.readRenderTargetPixels(this.rtTexture, 0, 0, this.params.resolution.x, this.params.resolution.y, this.readBuffer);
        
        if(this.params.debug){
            this.Helper(true);
            this.DebugTexture(true);
        }
    }

    CreateTextureFromBuffer(){
        var texture = new THREE.DataTexture(this.readBuffer, this.params.resolution.x, this.params.resolution.y, this.readFormat);
        texture.needsUpdate = true;
        return texture;
    }

    Uint8ToGraph(graphArray){
        var w = this.params.resolution.x,
            h = this.params.resolution.y;
        if(graphArray === undefined) graphArray = AreaCam.GraphArray(w, h);
        graphArray = AreaCam.Uint8ToGraph(this.readBuffer, w, h, graphArray, this.params.growth);
        return graphArray;
    }

    Helper(value){
        if(value){
            if(this._helper === undefined){
                this._helper = new THREE.CameraHelper(this.camera);
                this._helper.name = 'AreaCam_helper';
                this.debugView.add(this._helper);
            }
            this._helper.visible = true;
        }
        else if(this._helper !== undefined){
            this._helper.visible = false;
        }
    }

    DebugTexture(value){
        if(value){
            if(this._debugTexture === undefined){
                this._debugTexture = new THREE.Mesh(
                    new THREE.BoxGeometry(this.camera.right - this.camera.left, .1, this.camera.top - this.camera.bottom)
                );
                this._debugTexture.name = 'AreaCam_debugTexture';
                this.debugView.add(this._debugTexture);
                this._debugTexture.position.set(0, 0, 20);
            }
            this._debugTexture.material.map = this.CreateTextureFromBuffer();
            this._debugTexture.visible = true;
        }
        else if(this._debugTexture !== undefined){
            this._debugTexture.visible = false;
        }
    }

    static get defaultMaterial(){
        if(this._defaultMaterial === undefined){
            //var vertex = document.getElementById('vertexShader').textContent;
            //var fragment = document.getElementById('fragmentShader').textContent;
            var vertex = [
                'void main() {',
				    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
                '}'
            ].join('\n');
            var fragment = [
                'void main() {',
				    'gl_FragColor = vec4(1, 1, 1, 1.0);',
                '}'
            ].join('\n');
            this._defaultMaterial = new THREE.ShaderMaterial({
                name: 'NavCam.AreaCam.defaultMaterial',
                vertexShader: vertex,
                fragmentShader: fragment,
                side: THREE.DoubleSide,
                depthWrite: false,
                lights: false
            });
        }
        return this._defaultMaterial;
    }

    static GraphArray(w, h){
        var array = [];
        for(var x = 0; x < w; x++){
            var row = [];
            array.push(row);
            for(var y = 0; y < h; y++){
                row.push(0);
            }
        }
        return array;
    }

    static Uint8ToGraph(data, w, h, graphArray, growth){
        var wLess = w - 1;
        var hLess = h - 1;

        for(var x = 1; x < wLess; x++){
            for(var y = 1; y < hLess; y++){
                if(false){ var dataIndex; }
                else{
                    // cross neighbours
                    var valueCeil = 2;
                    var any = (data[(y * w + x) * 4] > valueCeil);

                    if(growth >= 1){
                        any = any || ( 
                            (data[((y - 1) * w + x) * 4] > valueCeil)
                            || (data[((y + 1) * w + x) * 4] > valueCeil)
                            || (data[(y * w + x - 1) * 4] > valueCeil)
                            || (data[(y * w + x + 1) * 4] > valueCeil)
                        );
                    }
                    
                    if(growth > 1){
                        any = any || ( 
                            (data[((y - 2) * w + x) * 4] > valueCeil)
                            || (data[((y + 2) * w + x) * 4] > valueCeil)
                            || (data[(y * w + x - 2) * 4] > valueCeil)
                            || (data[(y * w + x + 2) * 4] > valueCeil)
                        );
                    }

                    if(growth > 2){
                        any = any || ( 
                            (data[((y - 3) * w + x) * 4] > valueCeil)
                            || (data[((y + 3) * w + x) * 4] > valueCeil)
                            || (data[(y * w + x - 3) * 4] > valueCeil)
                            || (data[(y * w + x + 3) * 4] > valueCeil)

                            || (data[((y - 2) * w + x - 2) * 4] > valueCeil)
                            || (data[((y - 2) * w + x + 2) * 4] > valueCeil)
                            || (data[((y + 2) * w + x - 2) * 4] > valueCeil)
                            || (data[((y + 2) * w + x + 2) * 4] > valueCeil)
                        );
                    }

                    graphArray[x][y] = any ? 0 : 1;
                }
            }
        }
        return graphArray;
    }

    static MergeVertices(obj){
        obj.traverse(function(child){
            if(child instanceof THREE.Mesh){
				var tempGeo = new THREE.Geometry().fromBufferGeometry(child.geometry);
				tempGeo.mergeVertices();
				tempGeo.computeVertexNormals();
				tempGeo.computeFaceNormals();
				child.geometry = new THREE.BufferGeometry().fromGeometry(tempGeo);
            }
		});
    }
}

module.exports = AreaCam;

/***/ }),

/***/ "./js/navcam/NavCam.js":
/*!*****************************!*\
  !*** ./js/navcam/NavCam.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const AreaCam = __webpack_require__(/*! ./AreaCam */ "./js/navcam/AreaCam.js");
const Path = __webpack_require__(/*! ./Path */ "./js/navcam/Path.js");

class NavCam{

    constructor(params){

        this.areaCam = new AreaCam({
            resolution: params.resolution,
            growth: params.growth,
            wiggle: params.wiggle,
            overrideMaterial: params.overrideMaterial,
            scene: params.scene,
            debug: params.debug
        });

        this.pathfinder = new Path(this.areaCam, {
            arcLengthDivisions: params.arcLengthDivisions,
            smoothPath: params.smoothPath,
            tryGetRange: params.tryGetRange,
            debug: params.debug
        });
    }

    Update(){

        this.Snapshot();
    }

    Snapshot(){
        if(this.areaCam.params.debug) this.areaCam.debugView.visible = false;
        if(this.pathfinder.params.debug) this.pathfinder.debugView.visible = false;
        // Render with override material
        this.areaCam.Snapshot();

        if(this.areaCam.params.debug) this.areaCam.debugView.visible = true;
        if(this.pathfinder.params.debug) this.pathfinder.debugView.visible = true;
        
        // [0, 1] walkable/wall array
        this.graphArray = this.areaCam.Uint8ToGraph(this.graphArray);
    }

    Solve(worldStart, worldEnd, inserts){
        this.Snapshot();
        var worldPath = this.pathfinder.Solve(worldStart, worldEnd, this.graphArray, inserts);
        return worldPath;
    }

}

module.exports = NavCam;
module.exports.AreaCam = AreaCam;
module.exports.Path = Path;

/***/ }),

/***/ "./js/navcam/Path.js":
/*!***************************!*\
  !*** ./js/navcam/Path.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const astar = __webpack_require__(/*! ./lib/astar */ "./js/navcam/lib/astar.js");
const simplify = __webpack_require__(/*! ./lib/simplify */ "./js/navcam/lib/simplify.js");

var _gridResult, _graph, _graphStart, _options;

class Path{
    constructor(areaCam, params){
        this.areaCam = areaCam;

        this.params = params || {debug:false};
        if(this.params.arcLengthDivisions === undefined) this.params.arcLengthDivisions = 100;
        if(this.params.smoothPath === undefined) this.params.smoothPath = 2;
        if(this.params.tryGetRange === undefined) this.params.tryGetRange = 0;
    }

    get debugView(){
        if(this._debugView === undefined) {
            this._debugView = new THREE.Object3D();
            this._debugView.name = 'NavPath_debug';
        }
        return this._debugView;
    }

    ToGrid(world){
        var cam = this.areaCam.camera;
        var toCamX = cam.position.x - world.x,
            toCamY = cam.position.z - world.z;
        var gridX = (toCamX - cam.left) * this.areaCam.areaRatio.x,
            gridY = (toCamY - cam.bottom) * this.areaCam.areaRatio.y;
        gridX = THREE.Math.clamp(this.areaCam.params.resolution.x - Math.floor(gridX + .001), 0, this.areaCam.params.resolution.x - 1);
        gridY = THREE.Math.clamp(Math.floor(gridY + .001), 0, this.areaCam.params.resolution.y - 1);
        return new THREE.Vector2(gridX, gridY);
    }

    ToWorld(grid){
        var cam = this.areaCam.camera;
        var toCamX = grid.x / this.areaCam.areaRatio.x + cam.left;
        var toCamY = (this.areaCam.params.resolution.y - grid.y) / this.areaCam.areaRatio.y + cam.bottom;
        var worldX = toCamX + cam.position.x;
        var worldZ = toCamY + cam.position.z;
        return new THREE.Vector3(worldX, 0, worldZ);
    }

    Simplify(points, tolerance){
        if(tolerance === undefined) tolerance = 2.;
        var highQuality = true;
        var simplified = simplify(points, tolerance, highQuality);

        if(this.params.debug){
            //console.log('\tSimplified path:', points);
        }

        // Raycast check clear from point to point, remove unecessary points

        return simplified;
    }

    ToWorldResult(result){
        var worldResult = [];

        for(var i = 0, numResults = result.length; i < numResults; i++){
            var worldPos = this.ToWorld(result[i]);
            worldResult[i] = worldPos;
        }

        return worldResult;
    }

    Closest(graph, pt, testNode){
        var grid = graph.grid;
        var w = grid.length;
        if(w < 3 || grid[0].length < 3) return undefined;
        var h = grid[0].length;

        var x = THREE.Math.clamp(pt.x, 0, w - 1);
        var y = THREE.Math.clamp(pt.y, 0, h - 1);

        if(testNode(grid[x][y])) return grid[x][y];

        for(var iExpand = 1, numExpand = this.params.tryGetRange; iExpand < numExpand; iExpand++){
            var left = THREE.Math.clamp(x - iExpand, 0, w - 1),
                right = THREE.Math.clamp(x + iExpand + 1, left, w - 1),
                bottom = THREE.Math.clamp(y - iExpand, 0, h - 1),
                top = THREE.Math.clamp(y + iExpand + 1, bottom, h - 1);
            for(var iX = left; iX < right; iX ++){
                var skipY = iX === left || iX === right ? 1 : THREE.Math.clamp(top - bottom - 2, 1, iExpand * 2);
                for(var iY = bottom; iY < top; iY += skipY){
                    if(testNode(grid[iX][iY])){
                        return grid[iX][iY];
                    }
                }
            }
        }

        return undefined;
    }

    _ClosestDefaultTest(node){
        return !node.isWall()
    }

    _ClosestSearchTest(node){
        var notWall = !node.isWall();
        if(notWall) _gridResult = astar.search(_graph, _graphStart, node, _options);
        return _gridResult !== undefined && _gridResult.length > 1;
    }

    Search(graph, start, end, options){

        var graphStart = this.Closest(graph, start, this._ClosestDefaultTest);
        if(graphStart !== undefined){
            _gridResult = undefined;
            _graph = graph;
            _graphStart = graphStart;
            _options = options;
            if(this.params.tryGetRange > 0){
                this.Closest(graph, end, this._ClosestSearchTest);
            }
            else{
                var graphEnd = this.Closest(graph, end, this._ClosestDefaultTest);
                if(graphEnd !== undefined) _gridResult = astar.search(_graph, _graphStart, graphEnd, _options);
            }

            if(_gridResult !== undefined && _gridResult.length > 1) return _gridResult;
        }

        return undefined;
    }

    Solve(worldStart, worldEnd, graphArray, inserts){
        if(graphArray !== undefined) this.graph = new astar.Graph(graphArray, {diagonal:true});

        var start = this.ToGrid(worldStart),
            end = this.ToGrid(worldEnd);

        var gridResult = this.Search(this.graph, start, end, {heuristic:astar.heuristics.euclideanPreferStraight, diagonalWeight:1.3});
        if(gridResult !== undefined){
            var worldY = (worldStart.y + worldEnd.y) * .5;
            var worldResult = this.ToWorldResult(this.Simplify(gridResult, this.params.smoothPath), worldY);
            
            // inserts
            if(inserts !== undefined){
                for(var i = 0; i < inserts.length; i++){
                    var insert = inserts[i];
                    insert.position.y = 0;
                    worldResult.splice(insert.index, 0, insert.position);
                }
            }

            // interpolate y
            var dy = worldEnd.y - worldStart.y;
            for(var i = 0, numResults = worldResult.length; i < numResults; i++) worldResult[i].y = worldStart.y + dy * (i / numResults);
            if(worldResult !== undefined && worldResult.length > 1){
                worldResult[0] = worldStart;
                this.UpdateCurve(worldResult);
                
                if(this.params.debug){
                    var gridTexture = this.CreateTextureFromGrid(graphArray, start, end, gridResult);
                    this.DebugTexture(gridTexture);
                }

                return this.curve;
            }
        }

        if(this.curve !== undefined) this.UpdateCurve();
        return undefined;
    }

    UpdateCurve(positions){
        
        if(this.curve === undefined){
            this.curve = new THREE.CatmullRomCurve3(positions);
            this.curve.arcLengthDivisions = this.params.arcLengthDivisions;
            this.curve.type = 'centripetal';
            this.curve.tension = .5;

            this._tempCurvePoint = new THREE.Vector3();

            if(this.params.debug){
                var geometry = new THREE.Geometry();
                for (var i = 0; i < this.curve.arcLengthDivisions; i++){
                    geometry.vertices.push(new THREE.Vector3());
                }
            
                this.curve.mesh = new THREE.Line(geometry, 
                    new THREE.LineBasicMaterial({
                        color: 0x0000ff,
                        linewidth: 10
                    })
                );
                this.curve.mesh.name = 'NavPath_path';

                this.debugView.add(this.curve.mesh);
            }
        }

        if(positions === undefined){
            if(this._clearCurvePositions === undefined) this._clearCurvePositions = [new THREE.Vector3(), new THREE.Vector3()];
            this.curve.points = this._clearCurvePositions;
        }
        else{
            this.curve.points = positions;
        }
        this.curve.needsUpdate = true;

        if(this.params.debug && this.curve !== undefined){
            var divisions = this.curve.arcLengthDivisions;
            for (var i = 0; i < divisions; i ++){
                var p = this.curve.mesh.geometry.vertices[i];
                p.copy(this.curve.getPoint(i / (divisions - 1)));
            }
            this.curve.mesh.geometry.verticesNeedUpdate = true;
        }
    }

    GetAt(time){
        if(this.curve !== undefined){
            time = THREE.Math.clamp(time > 1 ? time % 1 : time, 0, 1);
            var point = this.curve.getPoint(time, this._tempCurvePoint);
            return point !== undefined ? point : undefined;
        }
    }

    CreateTextureFromGrid(grid, start, end, path){
        var w = this.areaCam.params.resolution.x,
            h = this.areaCam.params.resolution.y;
        var readBuffer = new Uint8Array(w * h * 4);
        for(var x = 0; x < w; x++){
            for(var y = 0; y < h; y++){
                var index = (y * w + x) * 4;
                var on = readBuffer[index] = grid[x][y] * 255;
                readBuffer[index + 1] = on;
                readBuffer[index + 2] = on;

                readBuffer[index + 3] = 255;
            }
        }

        var setPoint = function(v, r, g, b){
            var index = (v.y * w + v.x) * 4;
            readBuffer[index] = r;
            readBuffer[index + 1] = g;
            readBuffer[index + 2] = b;
        };

        for(var iPath = 0, numPath = path.length; iPath < numPath; iPath++){
            setPoint(path[iPath], 0, 255, 255);
        }

        setPoint(start, 100, 255, 100);
        setPoint(end, 100, 100, 255);

        var texture = new THREE.DataTexture(readBuffer, w, h, THREE.RGBAFormat);
        texture.needsUpdate = true;
        return texture;
    }

    DebugTexture(map){
        if(map){
            if(this._debugTexture === undefined){
                var cam = this.areaCam.camera;
                this._debugTexture = new THREE.Mesh(
                    new THREE.BoxGeometry(cam.right - cam.left, .1, cam.top - cam.bottom)
                );
                this._debugTexture.name = 'NavPath_debugTexture';
                this.debugView.add(this._debugTexture);
                this._debugTexture.position.set(-20, 0, 20);
            }
            this._debugTexture.material.map = map;
            this._debugTexture.visible = true;
        }
        else if(this._debugTexture !== undefined){
            this._debugTexture.visible = false;
        }
    }
}

module.exports = Path;

/***/ }),

/***/ "./js/navcam/lib/astar.js":
/*!********************************!*\
  !*** ./js/navcam/lib/astar.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// javascript-astar 0.4.1
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a Binary Heap.
// Includes Binary Heap (with modifications) from Marijn Haverbeke.
// http://eloquentjavascript.net/appendix2.html

function pathTo(node) {
  var curr = node;
  var path = [];
  while (curr.parent) {
    path.unshift(curr);
    curr = curr.parent;
  }
  return path;
}

function getHeap() {
  return new BinaryHeap(function(node) {
    return node.f;
  });
}

var astar = {
  /**
  * Perform an A* Search on a graph given a start and end node.
  * @param {Graph} graph
  * @param {GridNode} start
  * @param {GridNode} end
  * @param {Object} [options]
  * @param {bool} [options.closest] Specifies whether to return the
             path to the closest node if the target is unreachable.
  * @param {Function} [options.heuristic] Heuristic function (see
  *          astar.heuristics).
  */
  search: function(graph, start, end, options) {
    graph.cleanDirty();
    options = options || {};
    var heuristic = options.heuristic || astar.heuristics.manhattan;
    var diagonalWeight = options.diagonalWeight || 1.41421;
    var closest = options.closest || false;

    var openHeap = getHeap(),
        closestNode = start; // set the start node to be the closest if required
    var closedList = [];
    start.h = heuristic(start, end, start);

    openHeap.push(start);

    while(openHeap.size() > 0) {

        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        var currentNode = openHeap.pop();

        // End case -- result has been found, return the traced path.
        if(currentNode === end) {
            while(closedList.length>0)closedList.pop().closed = false;
            return pathTo(currentNode);
        }

        // Normal case -- move currentNode from open to closed, process each of its neighbors.
        currentNode.closed = true;
        closedList.push(currentNode);

        // Find all neighbors for the current node.
        var neighbors = graph.neighbors(currentNode);

        for (var i = 0, il = neighbors.length; i < il; ++i) {
            var neighbor = neighbors[i];

            if (neighbor.closed || neighbor.isWall()) {
                // Not a valid node to process, skip to next neighbor.
                continue;
            }

            // The g score is the shortest distance from start to current node.
            // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
            var gScore = currentNode.g + neighbor.getCost(currentNode, diagonalWeight),
                beenVisited = neighbor.visited;

            if (!beenVisited || gScore < neighbor.g) {

                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                neighbor.visited = true;
                neighbor.parent = currentNode;
                neighbor.h = neighbor.h || heuristic(neighbor, end, currentNode);
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
                graph.markDirty(neighbor);
                if (closest) {
                    // If the neighbour is closer than the current closestNode or if it's equally close but has
                    // a cheaper path than the current closest node then it becomes the closest node
                    if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
                        closestNode = neighbor;
                    }
                }

                if (!beenVisited) {
                    // Pushing to heap will put it in proper place based on the 'f' value.
                    openHeap.push(neighbor);
                }
                else {
                    // Already seen the node, but since it has been rescored we need to reorder it in the heap
                    openHeap.rescoreElement(neighbor);
                }
            }
        }
    }
    while(closedList.length>0)closedList.pop().closed = false;

    if (closest) {
        return pathTo(closestNode);
    }

    // No result was found - empty array signifies failure to find path.
    return [];
  },
  // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
  heuristics: {
      manhattan: function(pos0, pos1) {
          var d1 = Math.abs(pos1.x - pos0.x);
          var d2 = Math.abs(pos1.y - pos0.y);
          return d1 + d2;
      },
      diagonal: function(pos0, pos1) {
          var D = 1;
          var D2 = Math.sqrt(2);
          var d1 = Math.abs(pos1.x - pos0.x);
          var d2 = Math.abs(pos1.y - pos0.y);
          return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
      },
      euclidean: function(pos0, pos1) {
        var dx = pos1.x - pos0.x,
          dy = pos1.y - pos0.y;
        return Math.sqrt(dx * dx + dy * dy);
      },
      euclideanPreferStraight: function(pos0, pos1, current){
        var dx2 = pos0.x - pos1.x,
            dy2 = pos0.y - pos1.y;

        var dx1 = current.x - pos1.x,
            dy1 = current.y - pos1.y;

        var cross = Math.abs(dx1 * dy2 - dx2 * dy1)
        var heuristic = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        return heuristic + cross * 0.01;
      }
  },
  cleanNode:function(node){
      node.f = 0;
      node.g = 0;
      node.h = 0;
      node.visited = false;
      node.closed = false;
      node.parent = null;
  }
};

/**
 * A graph memory structure
 * @param {Array} gridIn 2D array of input weights
 * @param {Object} [options]
 * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
 */
function Graph(gridIn, options) {
  options = options || {};
  this.nodes = [];
  this.diagonal = !!options.diagonal;
  this.grid = [];
  for (var x = 0; x < gridIn.length; x++) {
    this.grid[x] = [];

    for (var y = 0, row = gridIn[x]; y < row.length; y++) {
      var node = new GridNode(x, y, row[y]);
      this.grid[x][y] = node;
      this.nodes.push(node);
    }
  }
  this.init();
}

Graph.prototype.init = function() {
  this.dirtyNodes = [];
  for (var i = 0; i < this.nodes.length; i++) {
    astar.cleanNode(this.nodes[i]);
  }
};

Graph.prototype.cleanDirty = function() {
  for (var i = 0; i < this.dirtyNodes.length; i++) {
    astar.cleanNode(this.dirtyNodes[i]);
  }
  this.dirtyNodes = [];
};

Graph.prototype.markDirty = function(node) {
  this.dirtyNodes.push(node);
};

Graph.prototype.neighbors = function(node) {
  var ret = [];
  var x = node.x;
  var y = node.y;
  var grid = this.grid;

  // West
  if (grid[x - 1] && grid[x - 1][y]) {
    ret.push(grid[x - 1][y]);
  }

  // East
  if (grid[x + 1] && grid[x + 1][y]) {
    ret.push(grid[x + 1][y]);
  }

  // South
  if (grid[x] && grid[x][y - 1]) {
    ret.push(grid[x][y - 1]);
  }

  // North
  if (grid[x] && grid[x][y + 1]) {
    ret.push(grid[x][y + 1]);
  }

  if (this.diagonal) {
    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1]) {
      ret.push(grid[x - 1][y - 1]);
    }

    // Southeast
    if (grid[x + 1] && grid[x + 1][y - 1]) {
      ret.push(grid[x + 1][y - 1]);
    }

    // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1]) {
      ret.push(grid[x - 1][y + 1]);
    }

    // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1]) {
      ret.push(grid[x + 1][y + 1]);
    }
  }

  return ret;
};

Graph.prototype.toString = function() {
  var graphString = [];
  var nodes = this.grid;
  for (var x = 0; x < nodes.length; x++) {
    var rowDebug = [];
    var row = nodes[x];
    for (var y = 0; y < row.length; y++) {
      rowDebug.push(row[y].weight);
    }
    graphString.push(rowDebug.join(" "));
  }
  return graphString.join("\n");
};

function GridNode(x, y, weight) {
  this.x = x;
  this.y = y;
  this.weight = weight;
}

GridNode.prototype.toString = function() {
  return "[" + this.x + " " + this.y + "]";
};

GridNode.prototype.getCost = function(fromNeighbor, diagonalWeight) {
  // Take diagonal weight into consideration.
  if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
    return this.weight * diagonalWeight;
  }
  return this.weight;
};

GridNode.prototype.isWall = function() {
  return this.weight === 0;
};

function BinaryHeap(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);

    // Allow it to sink down.
    this.sinkDown(this.content.length - 1);
  },
  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it bubble up.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.bubbleUp(0);
    }
    return result;
  },
  remove: function(node) {
    var i = this.content.indexOf(node);

    // When it is found, the process seen in 'pop' is repeated
    // to fill up the hole.
    var end = this.content.pop();

    if (i !== this.content.length - 1) {
      this.content[i] = end;

      if (this.scoreFunction(end) < this.scoreFunction(node)) {
        this.sinkDown(i);
      } else {
        this.bubbleUp(i);
      }
    }
  },
  size: function() {
    return this.content.length;
  },
  rescoreElement: function(node) {
    this.sinkDown(this.content.indexOf(node));
  },
  sinkDown: function(n) {
    // Fetch the element that has to be sunk.
    var element = this.content[n];

    // When at 0, an element can not sink any further.
    while (n > 0) {

      // Compute the parent element's index, and fetch it.
      var parentN = ((n + 1) >> 1) - 1;
      var parent = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        // Update 'n' to continue at the new position.
        n = parentN;
      }
      // Found a parent that is less, no need to sink any further.
      else {
        break;
      }
    }
  },
  bubbleUp: function(n) {
    // Look up the target element and its score.
    var length = this.content.length;
    var element = this.content[n];
    var elemScore = this.scoreFunction(element);

    while (true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) << 1;
      var child1N = child2N - 1;
      // This is used to store the new position of the element, if any.
      var swap = null;
      var child1Score;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N];
        child1Score = this.scoreFunction(child1);

        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N];
        var child2Score = this.scoreFunction(child2);
        if (child2Score < (swap === null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }

      // If the element needs to be moved, swap it, and continue.
      if (swap !== null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
      // Otherwise, we are done.
      else {
        break;
      }
    }
  }
};

module.exports = astar;
module.exports.Graph = Graph;

/***/ }),

/***/ "./js/navcam/lib/simplify.js":
/*!***********************************!*\
  !*** ./js/navcam/lib/simplify.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 (c) 2017, Vladimir Agafonkin
 Simplify.js, a high-performance JS polyline simplification library
 mourner.github.io/simplify-js
*/

(function () { 'use strict';

// to suit your point format, run search/replace for '.x' and '.y';
// for 3D version, see 3d branch (configurability would draw significant performance overhead)

// square distance between 2 points
function getSqDist(p1, p2) {

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y;

    return dx * dx + dy * dy;
}

// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {

    var x = p1.x,
        y = p1.y,
        dx = p2.x - x,
        dy = p2.y - y;

    if (dx !== 0 || dy !== 0) {

        var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

        if (t > 1) {
            x = p2.x;
            y = p2.y;

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }

    dx = p.x - x;
    dy = p.y - y;

    return dx * dx + dy * dy;
}
// rest of the code doesn't care about point format

// basic distance-based simplification
function simplifyRadialDist(points, sqTolerance) {

    var prevPoint = points[0],
        newPoints = [prevPoint],
        point;

    for (var i = 1, len = points.length; i < len; i++) {
        point = points[i];

        if (getSqDist(point, prevPoint) > sqTolerance) {
            newPoints.push(point);
            prevPoint = point;
        }
    }

    if (prevPoint !== point) newPoints.push(point);

    return newPoints;
}

function simplifyDPStep(points, first, last, sqTolerance, simplified) {
    var maxSqDist = sqTolerance,
        index;

    for (var i = first + 1; i < last; i++) {
        var sqDist = getSqSegDist(points[i], points[first], points[last]);

        if (sqDist > maxSqDist) {
            index = i;
            maxSqDist = sqDist;
        }
    }

    if (maxSqDist > sqTolerance) {
        if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
        simplified.push(points[index]);
        if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
    }
}

// simplification using Ramer-Douglas-Peucker algorithm
function simplifyDouglasPeucker(points, sqTolerance) {
    var last = points.length - 1;

    var simplified = [points[0]];
    simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);

    return simplified;
}

// both algorithms combined for awesome performance
function simplify(points, tolerance, highestQuality) {

    if (points.length <= 2) return points;

    var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
    points = simplifyDouglasPeucker(points, sqTolerance);

    return points;
}

// export as AMD module / Node module / browser or worker variable
if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return simplify; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
else {}

})();


/***/ })

/******/ });
//# sourceMappingURL=V3d.Navigation.js.map

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
// npx webpack-cli ./index.js --output ./bundle.js --mode development

/*require('./js/lib/three/three');
require('./js/lib/three/controls/OrbitControls');
require('./js/lib/three/loaders/OBJLoader');*/

global.App = __webpack_require__(/*! ./js/App */ "./js/App.js")();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./js/App.js":
/*!*******************!*\
  !*** ./js/App.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const Stats = __webpack_require__(/*! ./lib/stats.min */ "./js/lib/stats.min.js");

const Scene = __webpack_require__(/*! ./Scene */ "./js/Scene.js");
var input = __webpack_require__(/*! ./Input */ "./js/Input.js");

//V3d = {Navigation:{NavCam:(require('./navcam/NavCam'))}};
__webpack_require__(/*! ../V3d.Navigation */ "./V3d.Navigation.js");

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

/***/ }),

/***/ "./js/FlowCamera.js":
/*!**************************!*\
  !*** ./js/FlowCamera.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


class FlowCamera{
    constructor(container){
        FlowCamera.instance = this;

        const Scene = __webpack_require__(/*! ./Scene */ "./js/Scene.js");
        
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

/***/ }),

/***/ "./js/Input.js":
/*!*********************!*\
  !*** ./js/Input.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const Scene = __webpack_require__(/*! ./Scene */ "./js/Scene.js");
const keypress = __webpack_require__(/*! ./lib/keypress */ "./js/lib/keypress.js");
const getAbsoluteBoundingRect = __webpack_require__(/*! ./lib/getAbsoluteBoundingRect */ "./js/lib/getAbsoluteBoundingRect.js");

class RaycastGroup{
    constructor(items, callback, collectionQuery, recursive){
        this.items = items;
        this.callback = callback;
        this.recursive = recursive !== undefined ? recursive : false;

        if(collectionQuery === undefined){
            this.raycastItems = this.items;
        }
        else{
            this.raycastItems = [];
            this.collectionQuery = collectionQuery;
            this.GetRaycastItems(this.collectionQuery);
        }
    }

    GetRaycastItems(collectionQuery){
        for(var iItem = 0, numItems = this.items.length; iItem < numItems; iItem++){
            this.raycastItems.push(collectionQuery(this.items[iItem]));
        }
    }

    UpdateItems(items, collectionQuery){
        collectionQuery = collectionQuery !== undefined ? collectionQuery : this.collectionQuery;
        this.raycastItems.length;
        this.GetRaycastItems(collectionQuery);
    }

    Raycast(raycaster){
        var intersects = raycaster.intersectObjects(this.raycastItems, this.recursive);
        var numIntersects = intersects.length;
        if (numIntersects > 0) {
            for(var iIntersect = 0; iIntersect < numIntersects; iIntersect++){
                var targetObject3d = intersects[0].object;
                var targetAsset = undefined;//CK.Helpers3d.FindPropertyInParents('asset', targetObject3d);
                if(targetAsset !== undefined) this.callback(targetAsset.sceneItem, intersects[0]);
            }
        }
    }
}

class Input{

    static get camera(){
        return Scene.instance.camera;
    }

    static Init(camera, domContainer){
        this.domContainer = domContainer;

        this._mouse = {x:0, y:0};
        this.mouseScreen = new THREE.Vector2();
        this.mouseViewport = new THREE.Vector2();
        this.lastMouseDownTime = 0;
	    this.screen = getAbsoluteBoundingRect(this.domContainer);

        this.raycaster = new THREE.Raycaster();

        this.clock = new THREE.Clock();
        this.clock.start();

        this._raycastGroups = {Update:{}, OnMouseDown:{}, OnDoubleClick:{}, OnMouseUp:{}, OnRightClick:{}};
        this.fireOnce = [];

        this.onEnterFrame = [];
        this.onMouseDown = [];
        this.onMouseUp = [];
        this.onRightClick = [];
        this.onDoubleClick = [];
        
        document.addEventListener('mousedown', this.OnMouseDown.bind(this));
        document.addEventListener('mouseup', this.OnMouseUp.bind(this));
        document.addEventListener('contextmenu', this.OnRightClick.bind(this));
        document.addEventListener('mousemove', this.OnMouseMove.bind(this), false);

        this.screenNeedsUpdate = true;
        window.addEventListener('scroll', this.OnScroll.bind(this));

        this.cameraNeedsUpdate = true;
        this.onResize = [];
        window.addEventListener('resize', this.OnResize.bind(this));

        this.keyboard = new keypress.Listener();
        this.keyboard.on = this.keyboard.simple_combo;
    }

    static OnMouseDown(mouseEvent){
        if(mouseEvent.button === 0){
            var now = this.clock.getElapsedTime();
            if(now - this.lastMouseDownTime < .2){
                this.OnDoubleClick(mouseEvent);
                return;
            }

            this.lastMouseDownTime = now;

            for(var i = 0; i < this.onMouseDown.length; i++){
                this.onMouseDown[i](mouseEvent);
            }

            this.UpdateRaycast('OnMouseDown');
        }
    }

    static OnDoubleClick(mouseEvent){
        for(var i = 0; i < this.onDoubleClick.length; i++){
            this.onDoubleClick[i](mouseEvent);
        }

        this.UpdateRaycast('OnDoubleClick');
    }

    static OnMouseUp(mouseEvent){
        if(mouseEvent.button === 0){
            for(var i = 0; i < this.onMouseUp.length; i++){
                this.onMouseUp[i](mouseEvent);
            }

            this.UpdateRaycast('OnMouseUp');
        }
    }

    static OnRightClick(mouseEvent){
        event.preventDefault();
        for(var i = 0; i < this.onRightClick.length; i++){
            this.onRightClick[i](mouseEvent);
        }

        this.UpdateRaycast('OnRightClick');
    }

    static OnMouseMove(mouseEvent){
        this._mouse.x = mouseEvent.clientX - this.screen.left;
        this._mouse.y = mouseEvent.clientY - this.screen.top;
    }

    static OnScroll(event){
        this.screenNeedsUpdate = true;
    }

    static OnResize(event) {
        this.screenNeedsUpdate = true;
        this.cameraNeedsUpdate = true;
    }

    static RemoveEventCallback(eventType, callback){
        var callbacks = this[eventType];
        for(var iCallback = 0; iCallback < callbacks.length; iCallback++){
            if(callbacks[iCallback] === callback){
                callbacks.splice(iCallback, 1);
            }
        }
    }

    static Update(){
        this.UpdateScreenAndMouse();

        this.FireOnce();

        for(var iFrame = 0; iFrame < this.onEnterFrame.length; iFrame++) this.onEnterFrame[iFrame]();

        this.UpdateRaycast('Update');
    }

    static FireOnce(){
        var numCallbacks = this.fireOnce.length;
        for(var iCallback = numCallbacks; iCallback-- > 0;){
            this.fireOnce[iCallback]();
            this.fireOnce.splice(iCallback, 1);
        }
    }

    static DelayedAction(action, delay){
        var drid = window.setInterval(function(){
            action();
            window.clearInterval(drid);
        }, delay);
    }

    static Repeat(action, interval){
        if(this._repeats === undefined) this._repeats = [];
        var drid = window.setInterval(function(){
            action();
        }, interval);
        this._repeats.push({action:action, drid:drid});
        return drid;
    }

    static StopRepeat(action){
        if(this._repeats === undefined) return;

        if(typeof action === 'number'){
            window.clearInterval(action);
            return;
        }

        for(var i = 0; i < this._repeats.length; i++){
            if(this._repeats[i].action === action){
                window.clearInterval(this._repeats[i].drid);
                this._repeats.splice(i, 1);
                return;
            }
        }
    }

    static UpdateScreenAndMouse(){
        if(this.screenNeedsUpdate) {
            //this.screen = getAbsoluteBoundingRect(this.domContainer);
            this.screen = this.domContainer.getBoundingClientRect();
            this.screenNeedsUpdate = false;
        }
        if(this.cameraNeedsUpdate) {
            for(var i = 0; i < this.onResize.length; i++){
                this.onResize[i](this.screen);
            }
            this.cameraNeedsUpdate = false;
        }

        this.mouseScreen.x = this._mouse.x;
        this.mouseScreen.y = this._mouse.y;

        this.mouseViewport.x = this._mouse.x / this.screen.width * 2 - 1;
        this.mouseViewport.y = -this._mouse.y / this.screen.height * 2 + 1;
    }

    static EnableSceneControls(value){
        this.camera.controller.controls.enabled = value;
    }

    static RaycastTest(objects, recursive){
        this.UpdateRaycaster();
        recursive = recursive !== undefined ? recursive : false;
        var intersects = objects instanceof Array ? this.raycaster.intersectObjects(objects, recursive) : this.raycaster.intersectObject(objects, recursive);
        if (intersects.length > 0) {
            return intersects[0];
        }
        return undefined;
    }

    static AddRaycastGroup(event, groupID, group){
        this._raycastGroups[event][groupID] = group;
    }

    static RemoveRaycastGroup(event, groupID){
        delete this._raycastGroups[event][groupID];
    }

    static UpdateRaycaster(){
        this.camera.updateMatrixWorld();
        this.raycaster.setFromCamera(this.mouseViewport, this.camera);
    }

    static UpdateRaycast(event){
        var raycastGroupsKeys = Object.keys(this._raycastGroups[event]);
        var numRaycastGroups = raycastGroupsKeys.length;
        if(numRaycastGroups > 0){
            this.UpdateRaycaster();
            for(var iGroup = 0; iGroup < numRaycastGroups; iGroup++){
                var key = raycastGroupsKeys[iGroup];
                this._raycastGroups[event][key].Raycast(this.raycaster);
            }
        }
    }
}

module.exports = Input;
module.exports.RaycastGroup = RaycastGroup;

/***/ }),

/***/ "./js/Scene.js":
/*!*********************!*\
  !*** ./js/Scene.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
const FlowCamera = __webpack_require__(/*! ./FlowCamera */ "./js/FlowCamera.js");

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
        if(false){ var view; }
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./js/lib/getAbsoluteBoundingRect.js":
/*!*******************************************!*\
  !*** ./js/lib/getAbsoluteBoundingRect.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
@author rgrove
https://gist.github.com/rgrove/5463265
Returns a bounding rect for _el_ with absolute coordinates corrected for
scroll positions.

The native `getBoundingClientRect()` returns coordinates for an element's
visual position relative to the top left of the viewport, so if the element
is part of a scrollable region that has been scrolled, its coordinates will
be different than if the region hadn't been scrolled.

This method corrects for scroll offsets all the way up the node tree, so the
returned bounding rect will represent an absolute position on a virtual
canvas, regardless of scrolling.

@method getAbsoluteBoundingRect
@param {HTMLElement} el HTML element.
@return {Object} Absolute bounding rect for _el_.
**/

function getAbsoluteBoundingRect (el) {
    var doc  = document,
        win  = window,
        body = doc.body,

        // pageXOffset and pageYOffset work everywhere except IE <9.
        offsetX = win.pageXOffset !== undefined ? win.pageXOffset :
            (doc.documentElement || body.parentNode || body).scrollLeft,
        offsetY = win.pageYOffset !== undefined ? win.pageYOffset :
            (doc.documentElement || body.parentNode || body).scrollTop,

        rect = el.getBoundingClientRect();

    if (el !== body) {
        var parent = el.parentNode;

        // The element's rect will be affected by the scroll positions of
        // *all* of its scrollable parents, not just the window, so we have
        // to walk up the tree and collect every scroll offset. Good times.
        while (parent !== body && parent !== null) {
            offsetX += parent.scrollLeft;
            offsetY += parent.scrollTop;
            parent   = parent.parentNode;
        }
    }

    return {
        bottom: rect.bottom + offsetY,
        height: rect.height,
        left  : rect.left + offsetX,
        right : rect.right + offsetX,
        top   : rect.top + offsetY,
        width : rect.width
    };
}

module.exports = getAbsoluteBoundingRect;

/***/ }),

/***/ "./js/lib/keypress.js":
/*!****************************!*\
  !*** ./js/lib/keypress.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.8.0

/*
Copyright 2014 David Mauro

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Keypress is a robust keyboard input capturing Javascript utility
focused on input for games.

version 2.1.3
 */


/*
Combo options available and their defaults:
    keys            : []            - An array of the keys pressed together to activate combo.
    count           : 0             - The number of times a counting combo has been pressed. Reset on release.
    is_unordered    : false         - Unless this is set to true, the keys can be pressed down in any order.
    is_counting     : false         - Makes this a counting combo (see documentation).
    is_exclusive    : false         - This combo will replace other exclusive combos when true.
    is_solitary     : false         - This combo will only fire if ONLY it's keys are pressed down.
    is_sequence     : false         - Rather than a key combo, this is an ordered key sequence.
    prevent_default : false         - Prevent default behavior for all component key keypresses.
    prevent_repeat  : false         - Prevent the combo from repeating when keydown is held.
    on_keydown      : null          - A function that is called when the combo is pressed.
    on_keyup        : null          - A function that is called when the combo is released.
    on_release      : null          - A function that is called when all keys in the combo are released.
    this            : undefined     - Defines the scope for your callback functions.
 */

(function() {
  var Combo, keypress, _change_keycodes_by_browser, _compare_arrays, _compare_arrays_sorted, _convert_key_to_readable, _convert_to_shifted_key, _decide_meta_key, _factory_defaults, _filter_array, _index_of_in_array, _is_array_in_array, _is_array_in_array_sorted, _key_is_valid, _keycode_alternate_names, _keycode_dictionary, _keycode_shifted_keys, _log_error, _metakey, _modifier_event_mapping, _modifier_keys, _validate_combo,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _factory_defaults = {
    is_unordered: false,
    is_counting: false,
    is_exclusive: false,
    is_solitary: false,
    prevent_default: false,
    prevent_repeat: false
  };

  _modifier_keys = ["meta", "alt", "option", "ctrl", "shift", "cmd"];

  _metakey = "ctrl";

  keypress = {};

  keypress.debug = false;

  Combo = (function() {
    function Combo(dictionary) {
      var property, value;
      for (property in dictionary) {
        if (!__hasProp.call(dictionary, property)) continue;
        value = dictionary[property];
        if (value !== false) {
          this[property] = value;
        }
      }
      this.keys = this.keys || [];
      this.count = this.count || 0;
    }

    Combo.prototype.allows_key_repeat = function() {
      return !this.prevent_repeat && typeof this.on_keydown === "function";
    };

    Combo.prototype.reset = function() {
      this.count = 0;
      return this.keyup_fired = null;
    };

    return Combo;

  })();

  keypress.Listener = (function() {
    function Listener(element, defaults) {
      var attach_handler, property, value;
      if ((typeof jQuery !== "undefined" && jQuery !== null) && element instanceof jQuery) {
        if (element.length !== 1) {
          _log_error("Warning: your jQuery selector should have exactly one object.");
        }
        element = element[0];
      }
      this.should_suppress_event_defaults = false;
      this.should_force_event_defaults = false;
      this.sequence_delay = 800;
      this._registered_combos = [];
      this._keys_down = [];
      this._active_combos = [];
      this._sequence = [];
      this._sequence_timer = null;
      this._prevent_capture = false;
      this._defaults = defaults || {};
      for (property in _factory_defaults) {
        if (!__hasProp.call(_factory_defaults, property)) continue;
        value = _factory_defaults[property];
        this._defaults[property] = this._defaults[property] || value;
      }
      this.element = element || document.body;
      attach_handler = function(target, event, handler) {
        if (target.addEventListener) {
          target.addEventListener(event, handler);
        } else if (target.attachEvent) {
          target.attachEvent("on" + event, handler);
        }
        return handler;
      };
      this.keydown_event = attach_handler(this.element, "keydown", (function(_this) {
        return function(e) {
          e = e || window.event;
          _this._receive_input(e, true);
          return _this._bug_catcher(e);
        };
      })(this));
      this.keyup_event = attach_handler(this.element, "keyup", (function(_this) {
        return function(e) {
          e = e || window.event;
          return _this._receive_input(e, false);
        };
      })(this));
      this.blur_event = attach_handler(window, "blur", (function(_this) {
        return function() {
          var key, _i, _len, _ref;
          _ref = _this._keys_down;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            _this._key_up(key, {});
          }
          return _this._keys_down = [];
        };
      })(this));
    }

    Listener.prototype.destroy = function() {
      var remove_handler;
      remove_handler = function(target, event, handler) {
        if (target.removeEventListener != null) {
          return target.removeEventListener(event, handler);
        } else if (target.removeEvent != null) {
          return target.removeEvent("on" + event, handler);
        }
      };
      remove_handler(this.element, "keydown", this.keydown_event);
      remove_handler(this.element, "keyup", this.keyup_event);
      return remove_handler(window, "blur", this.blur_event);
    };

    Listener.prototype._bug_catcher = function(e) {
      var _ref, _ref1;
      if (_metakey === "cmd" && __indexOf.call(this._keys_down, "cmd") >= 0 && ((_ref = _convert_key_to_readable((_ref1 = e.keyCode) != null ? _ref1 : e.key)) !== "cmd" && _ref !== "shift" && _ref !== "alt" && _ref !== "caps" && _ref !== "tab")) {
        return this._receive_input(e, false);
      }
    };

    Listener.prototype._cmd_bug_check = function(combo_keys) {
      if (_metakey === "cmd" && __indexOf.call(this._keys_down, "cmd") >= 0 && __indexOf.call(combo_keys, "cmd") < 0) {
        return false;
      }
      return true;
    };

    Listener.prototype._prevent_default = function(e, should_prevent) {
      if ((should_prevent || this.should_suppress_event_defaults) && !this.should_force_event_defaults) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
        if (e.stopPropagation) {
          return e.stopPropagation();
        }
      }
    };

    Listener.prototype._get_active_combos = function(key) {
      var active_combos, keys_down;
      active_combos = [];
      keys_down = _filter_array(this._keys_down, function(down_key) {
        return down_key !== key;
      });
      keys_down.push(key);
      this._match_combo_arrays(keys_down, (function(_this) {
        return function(match) {
          if (_this._cmd_bug_check(match.keys)) {
            return active_combos.push(match);
          }
        };
      })(this));
      this._fuzzy_match_combo_arrays(keys_down, (function(_this) {
        return function(match) {
          if (__indexOf.call(active_combos, match) >= 0) {
            return;
          }
          if (!(match.is_solitary || !_this._cmd_bug_check(match.keys))) {
            return active_combos.push(match);
          }
        };
      })(this));
      return active_combos;
    };

    Listener.prototype._get_potential_combos = function(key) {
      var combo, potentials, _i, _len, _ref;
      potentials = [];
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        combo = _ref[_i];
        if (combo.is_sequence) {
          continue;
        }
        if (__indexOf.call(combo.keys, key) >= 0 && this._cmd_bug_check(combo.keys)) {
          potentials.push(combo);
        }
      }
      return potentials;
    };

    Listener.prototype._add_to_active_combos = function(combo) {
      var active_combo, active_key, active_keys, already_replaced, combo_key, i, should_prepend, should_replace, _i, _j, _k, _len, _len1, _ref, _ref1;
      should_replace = false;
      should_prepend = true;
      already_replaced = false;
      if (__indexOf.call(this._active_combos, combo) >= 0) {
        return true;
      } else if (this._active_combos.length) {
        for (i = _i = 0, _ref = this._active_combos.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          active_combo = this._active_combos[i];
          if (!(active_combo && active_combo.is_exclusive && combo.is_exclusive)) {
            continue;
          }
          active_keys = active_combo.keys;
          if (!should_replace) {
            for (_j = 0, _len = active_keys.length; _j < _len; _j++) {
              active_key = active_keys[_j];
              should_replace = true;
              if (__indexOf.call(combo.keys, active_key) < 0) {
                should_replace = false;
                break;
              }
            }
          }
          if (should_prepend && !should_replace) {
            _ref1 = combo.keys;
            for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
              combo_key = _ref1[_k];
              should_prepend = false;
              if (__indexOf.call(active_keys, combo_key) < 0) {
                should_prepend = true;
                break;
              }
            }
          }
          if (should_replace) {
            if (already_replaced) {
              active_combo = this._active_combos.splice(i, 1)[0];
              if (active_combo != null) {
                active_combo.reset();
              }
            } else {
              active_combo = this._active_combos.splice(i, 1, combo)[0];
              if (active_combo != null) {
                active_combo.reset();
              }
              already_replaced = true;
            }
            should_prepend = false;
          }
        }
      }
      if (should_prepend) {
        this._active_combos.unshift(combo);
      }
      return should_replace || should_prepend;
    };

    Listener.prototype._remove_from_active_combos = function(combo) {
      var active_combo, i, _i, _ref;
      for (i = _i = 0, _ref = this._active_combos.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        active_combo = this._active_combos[i];
        if (active_combo === combo) {
          combo = this._active_combos.splice(i, 1)[0];
          combo.reset();
          break;
        }
      }
    };

    Listener.prototype._get_possible_sequences = function() {
      var combo, i, j, match, matches, sequence, _i, _j, _k, _len, _ref, _ref1, _ref2;
      matches = [];
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        combo = _ref[_i];
        for (j = _j = 1, _ref1 = this._sequence.length; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 1 <= _ref1 ? ++_j : --_j) {
          sequence = this._sequence.slice(-j);
          if (!combo.is_sequence) {
            continue;
          }
          if (__indexOf.call(combo.keys, "shift") < 0) {
            sequence = _filter_array(sequence, function(key) {
              return key !== "shift";
            });
            if (!sequence.length) {
              continue;
            }
          }
          for (i = _k = 0, _ref2 = sequence.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
            if (combo.keys[i] === sequence[i]) {
              match = true;
            } else {
              match = false;
              break;
            }
          }
          if (match) {
            matches.push(combo);
          }
        }
      }
      return matches;
    };

    Listener.prototype._add_key_to_sequence = function(key, e) {
      var combo, sequence_combos, _i, _len;
      this._sequence.push(key);
      sequence_combos = this._get_possible_sequences();
      if (sequence_combos.length) {
        for (_i = 0, _len = sequence_combos.length; _i < _len; _i++) {
          combo = sequence_combos[_i];
          this._prevent_default(e, combo.prevent_default);
        }
        if (this._sequence_timer) {
          clearTimeout(this._sequence_timer);
        }
        if (this.sequence_delay > -1) {
          this._sequence_timer = setTimeout(function() {
            return this._sequence = [];
          }, this.sequence_delay);
        }
      } else {
        this._sequence = [];
      }
    };

    Listener.prototype._get_sequence = function(key) {
      var combo, i, j, match, seq_key, sequence, _i, _j, _k, _len, _ref, _ref1, _ref2;
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        combo = _ref[_i];
        if (!combo.is_sequence) {
          continue;
        }
        for (j = _j = 1, _ref1 = this._sequence.length; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 1 <= _ref1 ? ++_j : --_j) {
          sequence = (_filter_array(this._sequence, function(seq_key) {
            if (__indexOf.call(combo.keys, "shift") >= 0) {
              return true;
            }
            return seq_key !== "shift";
          })).slice(-j);
          if (combo.keys.length !== sequence.length) {
            continue;
          }
          for (i = _k = 0, _ref2 = sequence.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
            seq_key = sequence[i];
            if (__indexOf.call(combo.keys, "shift") < 0) {
              if (seq_key === "shift") {
                continue;
              }
            }
            if (key === "shift" && __indexOf.call(combo.keys, "shift") < 0) {
              continue;
            }
            if (combo.keys[i] === seq_key) {
              match = true;
            } else {
              match = false;
              break;
            }
          }
        }
        if (match) {
          if (combo.is_exclusive) {
            this._sequence = [];
          }
          return combo;
        }
      }
      return false;
    };

    Listener.prototype._receive_input = function(e, is_keydown) {
      var key, _ref;
      if (this._prevent_capture) {
        if (this._keys_down.length) {
          this._keys_down = [];
        }
        return;
      }
      key = _convert_key_to_readable((_ref = e.keyCode) != null ? _ref : e.key);
      if (!is_keydown && !this._keys_down.length && (key === "alt" || key === _metakey)) {
        return;
      }
      if (!key) {
        return;
      }
      if (is_keydown) {
        return this._key_down(key, e);
      } else {
        return this._key_up(key, e);
      }
    };

    Listener.prototype._fire = function(event, combo, key_event, is_autorepeat) {
      if (typeof combo["on_" + event] === "function") {
        this._prevent_default(key_event, combo["on_" + event].call(combo["this"], key_event, combo.count, is_autorepeat) !== true);
      }
      if (event === "release") {
        combo.count = 0;
      }
      if (event === "keyup") {
        return combo.keyup_fired = true;
      }
    };

    Listener.prototype._match_combo_arrays = function(potential_match, match_handler) {
      var source_combo, _i, _len, _ref;
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        source_combo = _ref[_i];
        if ((!source_combo.is_unordered && _compare_arrays_sorted(potential_match, source_combo.keys)) || (source_combo.is_unordered && _compare_arrays(potential_match, source_combo.keys))) {
          match_handler(source_combo);
        }
      }
    };

    Listener.prototype._fuzzy_match_combo_arrays = function(potential_match, match_handler) {
      var source_combo, _i, _len, _ref;
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        source_combo = _ref[_i];
        if ((!source_combo.is_unordered && _is_array_in_array_sorted(source_combo.keys, potential_match)) || (source_combo.is_unordered && _is_array_in_array(source_combo.keys, potential_match))) {
          match_handler(source_combo);
        }
      }
    };

    Listener.prototype._keys_remain = function(combo) {
      var key, keys_remain, _i, _len, _ref;
      _ref = combo.keys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (__indexOf.call(this._keys_down, key) >= 0) {
          keys_remain = true;
          break;
        }
      }
      return keys_remain;
    };

    Listener.prototype._key_down = function(key, e) {
      var combo, combos, event_mod, i, mod, potential, potential_combos, sequence_combo, shifted_key, _i, _j, _k, _len, _len1, _ref;
      shifted_key = _convert_to_shifted_key(key, e);
      if (shifted_key) {
        key = shifted_key;
      }
      this._add_key_to_sequence(key, e);
      sequence_combo = this._get_sequence(key);
      if (sequence_combo) {
        this._fire("keydown", sequence_combo, e);
      }
      for (mod in _modifier_event_mapping) {
        event_mod = _modifier_event_mapping[mod];
        if (!e[event_mod]) {
          continue;
        }
        if (mod === key || __indexOf.call(this._keys_down, mod) >= 0) {
          continue;
        }
        this._keys_down.push(mod);
      }
      for (mod in _modifier_event_mapping) {
        event_mod = _modifier_event_mapping[mod];
        if (mod === key) {
          continue;
        }
        if (__indexOf.call(this._keys_down, mod) >= 0 && !e[event_mod]) {
          if (mod === "cmd" && _metakey !== "cmd") {
            continue;
          }
          for (i = _i = 0, _ref = this._keys_down.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (this._keys_down[i] === mod) {
              this._keys_down.splice(i, 1);
            }
          }
        }
      }
      combos = this._get_active_combos(key);
      potential_combos = this._get_potential_combos(key);
      for (_j = 0, _len = combos.length; _j < _len; _j++) {
        combo = combos[_j];
        this._handle_combo_down(combo, potential_combos, key, e);
      }
      if (potential_combos.length) {
        for (_k = 0, _len1 = potential_combos.length; _k < _len1; _k++) {
          potential = potential_combos[_k];
          this._prevent_default(e, potential.prevent_default);
        }
      }
      if (__indexOf.call(this._keys_down, key) < 0) {
        this._keys_down.push(key);
      }
    };

    Listener.prototype._handle_combo_down = function(combo, potential_combos, key, e) {
      var is_autorepeat, is_other_exclusive, potential_combo, result, _i, _len;
      if (__indexOf.call(combo.keys, key) < 0) {
        return false;
      }
      this._prevent_default(e, combo && combo.prevent_default);
      is_autorepeat = false;
      if (__indexOf.call(this._keys_down, key) >= 0) {
        is_autorepeat = true;
        if (!combo.allows_key_repeat()) {
          return false;
        }
      }
      result = this._add_to_active_combos(combo, key);
      combo.keyup_fired = false;
      is_other_exclusive = false;
      if (combo.is_exclusive) {
        for (_i = 0, _len = potential_combos.length; _i < _len; _i++) {
          potential_combo = potential_combos[_i];
          if (potential_combo.is_exclusive && potential_combo.keys.length > combo.keys.length) {
            is_other_exclusive = true;
            break;
          }
        }
      }
      if (!is_other_exclusive) {
        if (combo.is_counting && typeof combo.on_keydown === "function") {
          combo.count += 1;
        }
        if (result) {
          return this._fire("keydown", combo, e, is_autorepeat);
        }
      }
    };

    Listener.prototype._key_up = function(key, e) {
      var active_combo, active_combos_length, combo, combos, i, sequence_combo, shifted_key, unshifted_key, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      unshifted_key = key;
      shifted_key = _convert_to_shifted_key(key, e);
      if (shifted_key) {
        key = shifted_key;
      }
      shifted_key = _keycode_shifted_keys[unshifted_key];
      if (e.shiftKey) {
        if (!(shifted_key && __indexOf.call(this._keys_down, shifted_key) >= 0)) {
          key = unshifted_key;
        }
      } else {
        if (!(unshifted_key && __indexOf.call(this._keys_down, unshifted_key) >= 0)) {
          key = shifted_key;
        }
      }
      sequence_combo = this._get_sequence(key);
      if (sequence_combo) {
        this._fire("keyup", sequence_combo, e);
      }
      if (__indexOf.call(this._keys_down, key) < 0) {
        return false;
      }
      for (i = _i = 0, _ref = this._keys_down.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if ((_ref1 = this._keys_down[i]) === key || _ref1 === shifted_key || _ref1 === unshifted_key) {
          this._keys_down.splice(i, 1);
          break;
        }
      }
      active_combos_length = this._active_combos.length;
      combos = [];
      _ref2 = this._active_combos;
      for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
        active_combo = _ref2[_j];
        if (__indexOf.call(active_combo.keys, key) >= 0) {
          combos.push(active_combo);
        }
      }
      for (_k = 0, _len1 = combos.length; _k < _len1; _k++) {
        combo = combos[_k];
        this._handle_combo_up(combo, e, key);
      }
      if (active_combos_length > 1) {
        _ref3 = this._active_combos;
        for (_l = 0, _len2 = _ref3.length; _l < _len2; _l++) {
          active_combo = _ref3[_l];
          if (active_combo === void 0 || __indexOf.call(combos, active_combo) >= 0) {
            continue;
          }
          if (!this._keys_remain(active_combo)) {
            this._remove_from_active_combos(active_combo);
          }
        }
      }
    };

    Listener.prototype._handle_combo_up = function(combo, e, key) {
      var keys_down, keys_remaining;
      this._prevent_default(e, combo && combo.prevent_default);
      keys_remaining = this._keys_remain(combo);
      if (!combo.keyup_fired) {
        keys_down = this._keys_down.slice();
        keys_down.push(key);
        if (!combo.is_solitary || _compare_arrays(keys_down, combo.keys)) {
          this._fire("keyup", combo, e);
          if (combo.is_counting && typeof combo.on_keyup === "function" && typeof combo.on_keydown !== "function") {
            combo.count += 1;
          }
        }
      }
      if (!keys_remaining) {
        this._fire("release", combo, e);
        this._remove_from_active_combos(combo);
      }
    };

    Listener.prototype.simple_combo = function(keys, callback) {
      return this.register_combo({
        keys: keys,
        on_keydown: callback
      });
    };

    Listener.prototype.counting_combo = function(keys, count_callback) {
      return this.register_combo({
        keys: keys,
        is_counting: true,
        is_unordered: false,
        on_keydown: count_callback
      });
    };

    Listener.prototype.sequence_combo = function(keys, callback) {
      return this.register_combo({
        keys: keys,
        on_keydown: callback,
        is_sequence: true,
        is_exclusive: true
      });
    };

    Listener.prototype.register_combo = function(combo_dictionary) {
      var combo, property, value, _ref;
      if (typeof combo_dictionary["keys"] === "string") {
        combo_dictionary["keys"] = combo_dictionary["keys"].split(" ");
      }
      _ref = this._defaults;
      for (property in _ref) {
        if (!__hasProp.call(_ref, property)) continue;
        value = _ref[property];
        if (combo_dictionary[property] === void 0) {
          combo_dictionary[property] = value;
        }
      }
      combo = new Combo(combo_dictionary);
      if (_validate_combo(combo)) {
        this._registered_combos.push(combo);
        return combo;
      }
    };

    Listener.prototype.register_many = function(combo_array) {
      var combo, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = combo_array.length; _i < _len; _i++) {
        combo = combo_array[_i];
        _results.push(this.register_combo(combo));
      }
      return _results;
    };

    Listener.prototype.unregister_combo = function(keys_or_combo) {
      var combo, unregister_combo, _i, _len, _ref, _results;
      if (!keys_or_combo) {
        return false;
      }
      unregister_combo = (function(_this) {
        return function(combo) {
          var i, _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = _this._registered_combos.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (combo === _this._registered_combos[i]) {
              _this._registered_combos.splice(i, 1);
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this);
      if (keys_or_combo instanceof Combo) {
        return unregister_combo(keys_or_combo);
      } else {
        if (typeof keys_or_combo === "string") {
          keys_or_combo = keys_or_combo.split(" ");
        }
        _ref = this._registered_combos;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          combo = _ref[_i];
          if (combo == null) {
            continue;
          }
          if ((combo.is_unordered && _compare_arrays(keys_or_combo, combo.keys)) || (!combo.is_unordered && _compare_arrays_sorted(keys_or_combo, combo.keys))) {
            _results.push(unregister_combo(combo));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    Listener.prototype.unregister_many = function(combo_array) {
      var combo, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = combo_array.length; _i < _len; _i++) {
        combo = combo_array[_i];
        _results.push(this.unregister_combo(combo));
      }
      return _results;
    };

    Listener.prototype.get_registered_combos = function() {
      return this._registered_combos;
    };

    Listener.prototype.reset = function() {
      return this._registered_combos = [];
    };

    Listener.prototype.listen = function() {
      return this._prevent_capture = false;
    };

    Listener.prototype.stop_listening = function() {
      return this._prevent_capture = true;
    };

    Listener.prototype.get_meta_key = function() {
      return _metakey;
    };

    return Listener;

  })();

  _decide_meta_key = function() {
    if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
      _metakey = "cmd";
    }
  };

  _change_keycodes_by_browser = function() {
    if (navigator.userAgent.indexOf("Opera") !== -1) {
      _keycode_dictionary["17"] = "cmd";
    }
  };

  _convert_key_to_readable = function(k) {
    return _keycode_dictionary[k];
  };

  _filter_array = function(array, callback) {
    var element;
    if (array.filter) {
      return array.filter(callback);
    } else {
      return (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          element = array[_i];
          if (callback(element)) {
            _results.push(element);
          }
        }
        return _results;
      })();
    }
  };

  _compare_arrays = function(a1, a2) {
    var item, _i, _len;
    if (a1.length !== a2.length) {
      return false;
    }
    for (_i = 0, _len = a1.length; _i < _len; _i++) {
      item = a1[_i];
      if (__indexOf.call(a2, item) >= 0) {
        continue;
      }
      return false;
    }
    return true;
  };

  _compare_arrays_sorted = function(a1, a2) {
    var i, _i, _ref;
    if (a1.length !== a2.length) {
      return false;
    }
    for (i = _i = 0, _ref = a1.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (a1[i] !== a2[i]) {
        return false;
      }
    }
    return true;
  };

  _is_array_in_array = function(a1, a2) {
    var item, _i, _len;
    for (_i = 0, _len = a1.length; _i < _len; _i++) {
      item = a1[_i];
      if (__indexOf.call(a2, item) < 0) {
        return false;
      }
    }
    return true;
  };

  _index_of_in_array = Array.prototype.indexOf || function(a, item) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = a.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (a[i] === item) {
        return i;
      }
    }
    return -1;
  };

  _is_array_in_array_sorted = function(a1, a2) {
    var index, item, prev, _i, _len;
    prev = 0;
    for (_i = 0, _len = a1.length; _i < _len; _i++) {
      item = a1[_i];
      index = _index_of_in_array.call(a2, item);
      if (index >= prev) {
        prev = index;
      } else {
        return false;
      }
    }
    return true;
  };

  _log_error = function() {
    if (keypress.debug) {
      return console.log.apply(console, arguments);
    }
  };

  _key_is_valid = function(key) {
    var valid, valid_key, _;
    valid = false;
    for (_ in _keycode_dictionary) {
      valid_key = _keycode_dictionary[_];
      if (key === valid_key) {
        valid = true;
        break;
      }
    }
    if (!valid) {
      for (_ in _keycode_shifted_keys) {
        valid_key = _keycode_shifted_keys[_];
        if (key === valid_key) {
          valid = true;
          break;
        }
      }
    }
    return valid;
  };

  _validate_combo = function(combo) {
    var alt_name, i, key, mod_key, non_modifier_keys, property, validated, value, _i, _j, _k, _len, _len1, _ref, _ref1;
    validated = true;
    if (!combo.keys.length) {
      _log_error("You're trying to bind a combo with no keys:", combo);
    }
    for (i = _i = 0, _ref = combo.keys.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      key = combo.keys[i];
      alt_name = _keycode_alternate_names[key];
      if (alt_name) {
        key = combo.keys[i] = alt_name;
      }
      if (key === "meta") {
        combo.keys.splice(i, 1, _metakey);
      }
      if (key === "cmd") {
        _log_error("Warning: use the \"meta\" key rather than \"cmd\" for Windows compatibility");
      }
    }
    _ref1 = combo.keys;
    for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
      key = _ref1[_j];
      if (!_key_is_valid(key)) {
        _log_error("Do not recognize the key \"" + key + "\"");
        validated = false;
      }
    }
    if (__indexOf.call(combo.keys, "meta") >= 0 || __indexOf.call(combo.keys, "cmd") >= 0) {
      non_modifier_keys = combo.keys.slice();
      for (_k = 0, _len1 = _modifier_keys.length; _k < _len1; _k++) {
        mod_key = _modifier_keys[_k];
        if ((i = _index_of_in_array.call(non_modifier_keys, mod_key)) > -1) {
          non_modifier_keys.splice(i, 1);
        }
      }
      if (non_modifier_keys.length > 1) {
        _log_error("META and CMD key combos cannot have more than 1 non-modifier keys", combo, non_modifier_keys);
        validated = false;
      }
    }
    for (property in combo) {
      value = combo[property];
      if (_factory_defaults[property] === "undefined") {
        _log_error("The property " + property + " is not a valid combo property. Your combo has still been registered.");
      }
    }
    return validated;
  };

  _convert_to_shifted_key = function(key, e) {
    var k;
    if (!e.shiftKey) {
      return false;
    }
    k = _keycode_shifted_keys[key];
    if (k != null) {
      return k;
    }
    return false;
  };

  _modifier_event_mapping = {
    "cmd": "metaKey",
    "ctrl": "ctrlKey",
    "shift": "shiftKey",
    "alt": "altKey"
  };

  _keycode_alternate_names = {
    "escape": "esc",
    "control": "ctrl",
    "command": "cmd",
    "break": "pause",
    "windows": "cmd",
    "option": "alt",
    "caps_lock": "caps",
    "apostrophe": "\'",
    "semicolon": ";",
    "tilde": "~",
    "accent": "`",
    "scroll_lock": "scroll",
    "num_lock": "num"
  };

  _keycode_shifted_keys = {
    "/": "?",
    ".": ">",
    ",": "<",
    "\'": "\"",
    ";": ":",
    "[": "{",
    "]": "}",
    "\\": "|",
    "`": "~",
    "=": "+",
    "-": "_",
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
    "7": "&",
    "8": "*",
    "9": "(",
    "0": ")"
  };

  _keycode_dictionary = {
    0: "\\",
    8: "backspace",
    9: "tab",
    12: "num",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "caps",
    27: "esc",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    44: "print",
    45: "insert",
    46: "delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    91: "cmd",
    92: "cmd",
    93: "cmd",
    96: "num_0",
    97: "num_1",
    98: "num_2",
    99: "num_3",
    100: "num_4",
    101: "num_5",
    102: "num_6",
    103: "num_7",
    104: "num_8",
    105: "num_9",
    106: "num_multiply",
    107: "num_add",
    108: "num_enter",
    109: "num_subtract",
    110: "num_decimal",
    111: "num_divide",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    124: "print",
    144: "num",
    145: "scroll",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "\'",
    223: "`",
    224: "cmd",
    225: "alt",
    57392: "ctrl",
    63289: "num",
    59: ";",
    61: "=",
    173: "-"
  };

  keypress._keycode_dictionary = _keycode_dictionary;

  keypress._is_array_in_array_sorted = _is_array_in_array_sorted;

  _decide_meta_key();

  _change_keycodes_by_browser();

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return keypress;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}).call(this);


/***/ }),

/***/ "./js/lib/stats.min.js":
/*!*****************************!*\
  !*** ./js/lib/stats.min.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};"object"===typeof module&&(module.exports=Stats);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map