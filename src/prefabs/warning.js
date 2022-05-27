class Warning extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='warning', time=3)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setOrigin(.5, 1);
        this.tileX;
        this.tileY;
        this.parentTile;
        this.boardRef;
        this.tileObj;
        this.setScale(3);
        this.time = time;
        scene.time.delayedCall(time * 1000,()=>{this.warningDissapear();})
    }

    warningDissapear()
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
        return this;
        console.log("Placing warning at", tile.tileX, tile.tileY);
    }

    update() {
        this.setDepth(2 * (this.tileX + this.tileY) + 1);
    }
}