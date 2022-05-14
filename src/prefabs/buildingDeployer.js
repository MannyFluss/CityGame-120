//the purpose of this class is to place a warning @ designated tile
//after some amount of time destroy the building @ tile if there is one there
//and place the building down
class BuildingDeployer extends Phaser.GameObjects.Sprite
{
    constructor(scene,tileX,tileY,texture,buildingToDeploy,destructionDelay,boardRef)
    {
        //texture may be uneccessary how do i spell that word idk
        super(scene,0,0,texture);
        this.boardRef = boardRef;
        this.tileX=tileX
        this.tileY=tileY
        this.deployX = tileX;
        this.deployY = -600
        this.tileRef = boardRef.getTile(tileX,tileY);
        this.toDeploy = buildingToDeploy;
        this.sceneRef = scene;
        //console.log(this.tileRef)
        this.warning = new Warning(scene,this.tileRef.x,this.tileRef.y,'warning',destructionDelay);
        this.warning.setWarningPlacement(this.tileRef);

        scene.time.delayedCall(destructionDelay * 1000,()=>{this.timeToPlaceBuilding();})
    }

    timeToPlaceBuilding()
    {
        
        let buildingOrNull = this.tileRef.getThisBuilding();
        if (buildingOrNull!=null)
        {   
            console.log('destroying building in order to place');
            buildingOrNull.destroyThisBuilding();
        }
        let newBuilding = new this.toDeploy(this.sceneRef,0,0,undefined);
        this.boardRef.placeBuilding(newBuilding,this.tileX,this.tileY);

    }

}