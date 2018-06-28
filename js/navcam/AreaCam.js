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
        if(false){
            this.renderer.render(this.scene, this.camera, this.rtTexture, false);
        }
        else if(false){ // Low end
            this.renderer.render(this.scene, this.camera, this.rtTexture, false);

            var rx = this.camera.rotation.x;
            var ry = this.camera.rotation.y;

            this.camera.rotation.x = rx + rOffset;
            this.camera.rotation.y = ry + rOffset;
            this.renderer.render(this.scene, this.camera, this.rtTexture, false);

            this.camera.rotation.x = rx - rOffset;
            this.camera.rotation.y = ry - rOffset;
            this.renderer.render(this.scene, this.camera, this.rtTexture, false);
            
            this.camera.rotation.x = rx;
            this.camera.rotation.y = ry;
        }
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
                if(false){ //regular
                    var dataIndex = (y * w + x) * 4; //regular
                    graphArray[x][y] = data[dataIndex] < 2 ? 1 : 0; //regular
                }
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