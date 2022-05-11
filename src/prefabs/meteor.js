class Meteor extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setOrigin(.5, 1);
        this.tileX;
        this.tileY;
        this.boardRef;
        this.tileObj;
    }
}