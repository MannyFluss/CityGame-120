class KingRay extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='koth-marker')
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        //place me on random tile
        this.tileX;
        this.tileY;
        this.setScale(3);
        this.setOrigin(.5, 1);
        this.boardRef = scene.board;
        this.setPlacement();
        this.timer = scene.time.addEvent({
            delay: 1000,                // ms
            callback: this.checkPlacement,
            loop: true,
            callbackScope : this
        });

        this.anotherTimer = scene.time.addEvent({
            delay: 15 * 1000,                // ms
            callback: this.setPlacement,
            loop: true,
            callbackScope : this
        });


    }

    
    customDestroy()
    {
        this.timer.destroy();
        this.anotherTimer.destroy();
        this.destroy();
    }
    checkPlacement()
    {
        if (this.boardRef.checkEmpty(this.tileX,this.tiley)==false)
        {
            this.emit('onKothTick');
        }
    }

    setPlacement()
    {
        //get random tile do the thing
        let tile = this.boardRef.getRandomTile()
        this.x = tile.x;
        this.y = tile.y;
        this.tileX = tile.tileX;
        this.tiley = tile.tileY;

    
        //set thi


    }

}