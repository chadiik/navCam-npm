
const astar = require('./lib/astar');
const simplify = require('./lib/simplify');

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