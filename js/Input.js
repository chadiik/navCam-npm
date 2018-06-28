
const Scene = require('./Scene');
const keypress = require('./lib/keypress');
const getAbsoluteBoundingRect = require('./lib/getAbsoluteBoundingRect');

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