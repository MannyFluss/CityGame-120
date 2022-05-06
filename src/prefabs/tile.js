class Tile extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,config={})
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.tileX
        this.tileY
        this.empty=true;
        this.tileObj;
    }
}