//the purpose of this class is to place a warning @ designated tile
//after some amount of time destroy the building @ tile if there is one there
//and place the building down
class BuildingDeployer extends Phaser.GameObjects.Sprite
{
    constructor(scene,tileX,tileY,texture,buildingToDeploy,destructionDelay,boardRef)
    {
        super(scene,0,0,texture);
        
        this.tileX=tileX
        this.tileY=tileY
        this.deployX = tileX;
        this.deployY = -600
        this.tileRef = boardRef.getTile(tileX,tileY);
        this.toDeploy = buildingToDeploy;
        this.sceneRef = scene;
        this.boardRef = boardRef;
        
        scene.time.delayedCall(destructionDelay * 1000,()=>{this.timeToPlaceBuilding();})
    }

    timeToPlaceBuilding()
    {
        console.log("second");
        let buildingOrNull = this.tileRef.getThisBuilding();
        if (buildingOrNull!=null)
        {
            buildingOrNull.destroyThisBuilding();
        }
        let newBuilding = new this.toDeploy(this.sceneRef,0,0,'small-apartment-1');
        this.boardRef.placeBuilding(newBuilding,this.tileX,this.tileY);
        
    }

}