//the purpose of this class is to place a warning @ designated tile
//after some amount of time destroy the building @ tile if there is one there
//and place the building down
class BuildingDeployer extends Phaser.GameObjects.Sprite
{
    constructor(scene,boardRef,tileX,tileY,texture,buildingToDeploy,destructionDelay)
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
        new Warning(scene,this.tileRef.x,this.tileRef.y,undefined,destructionDelay)
        
        scene.time.delayedCall(destructionDelay * 1000,()=>{this.timeToPlaceBuilding();})
        //console.log(this.tileRef)

    }

    timeToPlaceBuilding()
    {
        let newBuilding = new this.toDeploy(this.sceneRef,this.boardRef,0,0);

        
        let buildingOrNull = this.tileRef.getThisBuilding();
        if (buildingOrNull!=null)
        {   
            console.log('destroying building in order to place');
            buildingOrNull.destroyThisBuilding();
        }
        let x = this.tileX;
        let y = this.tileY;
        for (let i=0;i<newBuilding.multi.length;i++)
        {
            switch(newBuilding.multi[i])
            {
                case 'up':
                    y-=1;
                    break;
                case 'down':
                    y +=1;
                    break;
                case 'left':
                    x-=1;
                    break;
                case 'right':
                    x+=1;
                    break;
                default:
                    console.log('error in multibuilding');
                    break
            }
            buildingOrNull = this.boardRef.getTile(x,y).getThisBuilding();
            if (buildingOrNull!=null)
            {
                buildingOrNull.destroyThisBuilding();
            }
        }
        this.boardRef.placeBuilding(newBuilding,this.tileX,this.tileY);

    }

}