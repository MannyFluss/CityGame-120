class Tile extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,config={})
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.x
        this.y
        this.empty=true;
        this.tileObj;
    }
}