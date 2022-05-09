class Tile extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,config={})
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.tileX;
        this.tileY;
        this.boardRef;
        this.tileObj;
    }
    checkEmpty() //true means empty
    {
        if (this.boardRef.objectArray[this.tileX][this.tileY]==null)
        {
            return true;
        }
        return false;
    }
    getThisBuilding()
    {
        if (!this.boardRef.checkValidTile(this.tileX,this.tileY))
        {
            console.log("invalid tile get");
            return;
        }
        return this.boardRef.objectArray[this.tileX][this.tileY];

    }
}