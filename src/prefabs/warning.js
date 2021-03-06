class Warning extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='warning', time=3)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setOrigin(.5, 1);
        this.alpha = 0;
        this.tileX;
        this.tileY;
        this.parentTile;
        this.boardRef;
        this.tileObj;
        this.time = time;
        this.sfxWarning = scene.sound.add('sfx_warning');
        scene.time.delayedCall(time * 1000,()=>{this.warningDisappear();})
        
        scene.tweens.add({
            targets: this,
            alpha : 1,
            duration : 1 * 1000, 
            ease: 'Sine.easeInOut',
        })
    }

    warningDisappear()
    {
        this.destroy();
    }
    setWarningPlacement(tile)//get the tile, set the tile position
    {
        this.parentTile = tile;
        this.x = tile.x;
        this.y = tile.y;
        //this might not be necessary
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
        console.log("Placing warning at", tile.tileX, tile.tileY);
        this.sfxWarning.play();
        return this;
    }

    update() {
        this.setDepth(2 * (this.tileX + this.tileY) + 1);
    }
}