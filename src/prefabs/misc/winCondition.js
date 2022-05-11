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
    updateWinCondition(deltaTime)
    {
        switch(condition)
        {
            case 'timer':
                this.timePassed += deltaTime;
                if (this.timePassed >= this.survivalTime)
                {
                    this.conditionMet();
                }
                break;
            default:
                console.log('this should never be seen. like ever. something has bugged');
                break;
        }
    }
    
    conditionMet()
    {
        //create the win button and coffetti pops out from the sky
        console.log("condition met congrats");
    }
}