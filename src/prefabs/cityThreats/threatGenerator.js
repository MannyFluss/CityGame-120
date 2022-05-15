class ThreatGenerator extends Phaser.GameObjects.GameObject
{
    constructor(scene,x,y,boardRef)
    {
        super(scene,x,y);
        scene.add.existing(this);

        this.sceneRef = scene;
        this.boardRef = boardRef;
        this.timeUntilDisaster = 1000;

        this.timer = this.sceneRef.time.addEvent({
            delay: 500,                // ms
            callback: this.timePassed,
            args: [500],
            loop: true
        });
    }

    timePassed(delta)
    {
        
    }

}