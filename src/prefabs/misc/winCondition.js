class winState extends Phaser.GameObjects.GameObject
{
    constructor(scene, condition="timer",config={})//config optionally messes with vars
    {
        super(scene);
        this.condition = condition;
        this.sceneRef = scene;
        this.workingVariables = {}
        this.config = config;
        this.initializeWinCondition()
        this.timer = scene.time.addEvent({
            delay: 500,                // ms
            callback: this.updateWinCondition,
            args: [500],
            loop: true,
            callbackScope : this
        });
        
        
        
    }
    initializeWinCondition()
    {

        switch(this.condition)
        {
            case 'timer':
                this.workingVariables["timePassed"] = 0;
                this.workingVariables["survivalTime"] = 0;
                
                //configure goes here
                break;
            default:
                console.log('win condition failed to setup');
                //goto win condition
                break;
        }
        this.workingVariables = this.combineDict(this.workingVariables,this.config);
        
    }
    updateWinCondition(deltaTime)
    {
        
        switch(this.condition)
        {
            case 'timer':
                this.workingVariables["timePassed"] += deltaTime;
                if (this.workingVariables["timePassed"] >= this.workingVariables["survivalTime"])
                {
                    this.conditionMet();
                }
                break;
            default:
                console.log('this should never be seen. like ever. something has bugged');
                break;
        }
        //go through each key

    }
    
    conditionMet()
    {
        //create the win button and coffetti pops out from the sky

        new SceneButton(this.sceneRef,150,500,'submit-button','shopScene');
        
    }
    //combine dictionaries from stack overflow
    //https://stackoverflow.com/questions/43449788/how-do-i-merge-two-dictionaries-in-javascript 

    combineDict(obj1, obj2){//obj 2 overwrites obj1
        var food = {};
        for (var i in obj1) {
          food[i] = obj1[i];
        }
        for (var j in obj2) {
          food[j] = obj2[j];
        }
        return food;
    }
}