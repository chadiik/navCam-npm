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