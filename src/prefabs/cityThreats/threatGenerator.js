class ThreatGenerator extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,boardRef)
    {
        super(scene,x,y);
        scene.add.existing(this);

        this.sceneRef = scene;
        this.boardRef = boardRef;
        this.timeUntilDisaster = 1000;
        this.timeReset = 12 * 1000;

        this.timer = this.sceneRef.time.addEvent({
            delay: 500,                // ms
            callback: this.timePassed,
            args: [500],
            loop: true,
            callbackScope : this
        });
        
    }

    timePassed(delta)
    {
        //console.log(this.timeUntilDisaster)
        this.timeUntilDisaster -= delta;
        if (this.timeUntilDisaster <= 0)
        {
            this.generateDisaster();
            this.timeUntilDisaster = this.timeReset;
        }

    }

    generateDisaster()
    {
        console.log('disastertime')
        let targTile = this.boardRef.getRandomTile();
        new Meteor(this.sceneRef,0,0,'',5,targTile);

    }

}