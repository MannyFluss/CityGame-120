class winState extends Phaser.GameObjects.GameObject
{
    constructor(scene, condition="timer",config={})//config optionally messes with vars
    {
        super(scene);
        this.winCondition = condition;
        


        this.timer = scene.time.addEvent({
            delay: 500,                // ms
            callback: this.updateWinCondition,
            args: [500],
            loop: true
        });
        this.initializeWinCondition()
        
    }
    initializeWinCondition()
    {
        switch(condition)
        {
            case 'timer':
                this.timePassed = 0;
                this.survivalTime = 60000;
                //configure goes here
                break;
            default:
                console.log('win condition failed to setup');
                //goto win condition
                break;
        }
    }
    updateWinCondition()
    {

    }
    
    conditionMet()
    {
        //create the win button and coffetti pops out from the sky
    }
}