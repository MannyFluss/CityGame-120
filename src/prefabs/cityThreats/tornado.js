class Tornado extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture)
    {
        super(scene,x,y,texture='tornado');
        scene.add.existing(this);
        this.targetCount = 3;
        this.boardRef = scene.board;
        this.sceneRef = scene;
        this.targets = [];
        this.travelTime = 4;
        this.initialDelay = 6;
        this.targetCheck = new Phaser.Structs.Set();
        this.warnings = [];
        for(let i=0;i<this.targetCount;i++)
        {

            let curr = this.boardRef.getRandomTile();
            if (!this.targetCheck.contains(curr))
            {
                this.targetCheck.set(curr);
                this.targets.push(curr);
            }  
        }
        this.placeMarker(0);

        this.sceneRef.time.delayedCall(this.initialDelay * 1000, ()=>{this.destroyMarker(0);})

    }

    destroyMarker(index)
    {
        this.sceneRef.tweens.add({
            targets: this,
            x : this.targets[index].x,
            y : this.targets[index].y,
            duration : this.travelTime*1000,
        })

        index+=1;
        if (index < this.targets.length)
        {
            this.sceneRef.time.delayedCall(this.travelTime * 1000, ()=>{this.destroyMarker(index);})
        }else
        {
            this.sceneRef.time.delayedCall(this.travelTime * 1000, ()=>{this.customDestroy();})
        }

    }

    customDestroy()
    {
        this.destroy();
    }

    placeMarker(index)
    {
        this.warnings[index] = new Warning(this.scene,0,0,undefined,this.travelTime+this.initialDelay);
        this.warnings[index].setWarningPlacement(this.targets[index]);
        index += 1;
        if (index < this.targets.length)
        {
            this.sceneRef.time.delayedCall(this.travelTime * 1000, ()=>{this.placeMarker(index);})
        }
    }
}