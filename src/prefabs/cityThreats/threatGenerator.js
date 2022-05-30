class ThreatGenerator extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,boardRef)
    {
        super(scene,x,y);
        scene.add.existing(this);

        this.economyRef = scene.economy;
        this.sceneRef = scene;
        this.boardRef = boardRef;
        this.timeUntilDisaster = 1000;
        this.timeReset = 12 * 1000;
        this.disasters = [];

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
        this.boardRef.emit('onDisaster');
        this.economyRef += 1;
        let decision = availableThreats[Phaser.Math.Between(0,availableThreats.length - 1)];

        switch (decision)
        {
            case 'meteor':
                this.meteorChosen();
                break;
            case 'tornado':
                this.tornadoChosen();
            case 'fog' : 
                this.fogChosen();
                break;
            case 'lightning': 
                this.lightningChosen();
                break;
            default:
                break;
        }


    }
    lightningChosen()
    {
        let targTile = this.boardRef.getRandomTile();
        this.disasters.push(new Lightning(this.sceneRef,0,0,undefined,5,targTile));        
    }
    fogChosen()
    {
        new Fog(this.sceneRef,0,0,undefined);
    }
    tornadoChosen()
    {
        this.disasters.push(new Tornado(this.sceneRef,0,0,undefined));
    }

    meteorChosen()
    {        
        let targTile = this.boardRef.getRandomTile();
        this.disasters.push(new Meteor(this.sceneRef,0,0,undefined,5,targTile));

    }
    update()
    {
        for(let i=0; i<this.disasters.length; i++) {
            this.disasters[i].update();
        }
    }

}