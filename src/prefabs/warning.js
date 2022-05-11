class Warning extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='warning')
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
    }

    update() {
        this.setDepth(2 * (this.tileX + this.tileY) + 1);
    }
}