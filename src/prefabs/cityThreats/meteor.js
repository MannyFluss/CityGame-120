class Meteor extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture = 'meteor',destructionDelay=5,tile)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setOrigin(.5, .5);
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
        this.boardRef = scene.board;
        this.tileRef = tile;
        this.sceneRef = scene;
        this.warning = new Warning(scene,this.tileRef.x,this.tileRef.y,'warning',destructionDelay);
        this.warning.setWarningPlacement(this.tileRef);
        scene.time.delayedCall(destructionDelay * 1000,()=>{this.meteorExplosion();});
        this.x = this.tileRef.x;
        this.y = this.tileRef.y - 800;
        this.sfxCrash = scene.sound.add('sfx_meteor', { volume:5 });

        this.setDepth(2 * (this.tileX + this.tileY));

        this.sceneRef.tweens.add({
            targets: this,
            ease: 'Sine.easeIn',
            y : this.tileRef.y - 50,
            duration : destructionDelay * 1000,
            angle : 1000,
        })

        let particles = this.sceneRef.add.particles('fireFX');
        particles.setDepth(this.depth-1);
        this.fireEmitter = particles.createEmitter({
            x : this.x,
            y : this.y - 20,
            speed : 50,
            alpha : {start : .5, end : 0},
            scale : {start : 3, end : 1.5},
            frequency : 1,
            blendMode : 'ADD',
            lifespan : 1000,
        });
    }

    meteorExplosion()
    {
        
        let buildingOrNull = this.tileRef.getThisBuilding();
        if (buildingOrNull!=null)
        {   
            console.log('meteor has destroyed building')
            this.boardRef.onBuildingDestroy(buildingOrNull);
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
        this.fireEmitter.stop();
        this.sfxCrash.play();
        this.destroy();
    }

    update()
    {
        this.warning.update();
        this.fireEmitter.setPosition(this.x, this.y);
    }

}
class Lightning extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture = 'meteor',destructionDelay=5,tile)
    {
        super(scene,x,y,texture);
        this.tileRef = tile;
        scene.add.existing(this);

        this.x = this.tileRef.x;
        this.y = this.tileRef.y - 800;
        this.sceneRef = scene;

        this.sceneRef.tweens.add({
            targets: this,
            ease: 'Sine.easeIn',
            y : this.tileRef.y - 50,
            duration : destructionDelay * 1000,
            angle : 1000,
        })
        this.setOrigin(.5, 1);
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
        this.setDepth(2 * (this.tileX + this.tileY));
        this.boardRef;

        this.warning = new Warning(scene,this.tileRef.x,this.tileRef.y,'warning',destructionDelay);
        this.warning.setWarningPlacement(this.tileRef);
        scene.time.delayedCall(destructionDelay * 1000,()=>{this.LightningStrike();});

        let particles = this.sceneRef.add.particles('fireFX');
        particles.setDepth(this.depth-1);
        this.fireEmitter = particles.createEmitter({
            x : this.x,
            y : this.y - 20,
            speed : 50,
            alpha : {start : .5, end : 0},
            scale : {start : 3, end : 1.5},
            frequency : 1,
            blendMode : 'ADD',
            lifespan : 1000,
        });
    }

    LightningStrike()
    {
        
        let buildingOrNull = this.tileRef.getThisBuilding();
        if (buildingOrNull!=null)
        {   
            console.log('lightning has destroyed this building');
            this.boardRef.onBuildingDestroy(buildingOrNull);
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
        this.fireEmitter.stop();
        this.destroy();
    }

    update()
    {
        this.warning.update();
        this.fireEmitter.setPosition(this.x, this.y);
    }

}

class Fog extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,destructionDelay=10)
    {
        super(scene,x,y,texture);
        let randX = Phaser.Math.Between(0,boardSize-2);
        let randY = Phaser.Math.Between(0,boardSize-2);
        this.boardRef = scene.board;
        
        let tile = this.boardRef.getTile(randX,randY);

        scene.add.existing(this);
//        this.setOrigin(.5, 1);
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
        this.sceneRef = scene;

        this.warnings = [];
        this.warnings[0] = new Warning(scene,0,0,'warning',destructionDelay).setWarningPlacement(this.boardRef.getTile(randX,randY));
        this.warnings[1] = new Warning(scene,0,0,'warning',destructionDelay).setWarningPlacement(this.boardRef.getTile(randX+1,randY));
        this.warnings[2] = new Warning(scene,0,0,'warning',destructionDelay).setWarningPlacement(this.boardRef.getTile(randX,randY+1));
        this.warnings[3] = new Warning(scene,0,0,'warning',destructionDelay).setWarningPlacement(this.boardRef.getTile(randX+1,randY+1));

        this.meteors = [];
        this.meteors[0] = new Meteor(scene,0,0,undefined,destructionDelay,this.boardRef.getTile(randX,randY));
        this.meteors[1] = new Meteor(scene,0,0,undefined,destructionDelay,this.boardRef.getTile(randX+1,randY));
        this.meteors[2] = new Meteor(scene,0,0,undefined,destructionDelay,this.boardRef.getTile(randX,randY+1));
        this.meteors[3] = new Meteor(scene,0,0,undefined,destructionDelay,this.boardRef.getTile(randX+1,randY+1));

        let particles = this.sceneRef.add.particles('fireFX');
        for (let i=0; i<this.meteors.length;i++)
        {
            particles.setDepth(this.meteors[i].depth-1);
            this.meteors[i].fireEmitter = particles.createEmitter({
                x : this.meteors[i].x,
                y : this.meteors[i].y - 20,
                speed : 50,
                alpha : {start : .5, end : 0},
                scale : {start : 3, end : 1.5},
                frequency : 1,
                blendMode : 'ADD',
                lifespan : 1000,
            });
        }
        //scene.time.delayedCall((destructionDelay * 1000)-5,()=>{this.fogDestruction();});
    }

    fogDestruction()
    {
        for(let i=0;i<this.warnings.length;i++)
        {
     //       console.log(this.warnings[i]);
            let x = this.warnings[i].tileX;
            let y = this.warnings[i].tileY;

            let buildingOrNull = this.boardRef.getBuildingAt(x,y);
            if (buildingOrNull != null)
            {
                this.boardRef.onBuildingDestroy(buildingOrNull);
                buildingOrNull.destroyThisBuilding();
            }

        }
        for (let i=0; i<this.meteors.length;i++)
        {
            this.meteors[i].fireEmitter.stop();
        }
        this.destroy();
    }

    update()
    {
        for (let i=0; i<this.meteors.length;i++)
        {
            this.warnings[i].update();
            this.meteors[i].fireEmitter.setPosition(this.meteors[i].x, this.meteors[i].y);
        }
    }

}





