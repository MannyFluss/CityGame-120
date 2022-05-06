class Building extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,frame)
    {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        
        this.tileX;
        this.tileY;
        this.tileParent;
        this.setScale(.1);
    }

    setPlacement(tile)
    {
        this.x = tile.x;
        this.y = tile.y;
        this.tileParent = tile;
        //this might not be necessary
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
        console.log("building at "+this.x+" "+this.y);
    }
}