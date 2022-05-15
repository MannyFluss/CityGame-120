class Meteor extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,destructionDelay=5,tile)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setOrigin(.5, 1);
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
        this.boardRef;
        this.tileRef = tile;
        this.sceneRef = scene;

        this.warning = new Warning(scene,this.tileRef.x,this.tileRef.y,'warning',destructionDelay);
        this.warning.setWarningPlacement(this.tileRef);
        scene.time.delayedCall(destructionDelay * 1000,()=>{this.meteorExplosion();});
    }

    meteorExplosion()
    {
        
        let buildingOrNull = this.tileRef.getThisBuilding();
        if (buildingOrNull!=null)
        {   
            console.log('meteor has destroyed building')
            buildingOrNull.destroyThisBuilding();
        }
        let particles = this.sceneRef.add.particles('hotel-1');
        var emitter = particles.createEmitter
        ({
            x : this.tileRef.x,
            y : this.tileRef.y - 50,
            speed : {start : 100, end : 0},
            scale : {start : 0, end : .25},
            lifeSpan : 100
        })
        this.sceneRef.time.delayedCall(100,()=>{emitter.stop();},this);
    }


}