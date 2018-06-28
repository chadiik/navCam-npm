
const AreaCam = require('./AreaCam');
const Path = require('./Path');

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