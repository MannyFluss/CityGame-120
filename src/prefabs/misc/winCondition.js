
class winState extends Phaser.GameObjects.GameObject
{
    constructor(scene, condition="timer",config={})//config optionally messes with vars
    {
        super(scene);
        this.condition = condition;
        this.sceneRef = scene;
        this.boardRef = scene.board;
        this.workingVariables = {};
        this.workingVariables['objectiveMessage'] = 'default objective message';
        this.config = config;
        this.objectiveComplete = false;
        this.progressText = this.sceneRef.add.text(game.canvas.width/2,20,'progress goes here').setOrigin(.5,.5); 

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
                this.progressText.text = this.workingVariables["timePassed"] + ' / ' + this.workingVariables["survivalTime"];
                //configure goes here
                break;
            case 'building':
                this.workingVariables['buildingsBuilt'] = 0;
                this.workingVariables['totalBuildings'] = 0;
                this.workingVariables['buildingType'] = possibleBuildingList[Phaser.Math.Between(0,possibleBuildingList.length-1)];
                this.boardRef.on('newBuildingPlaced',(buildingType)=>{
                    this.buildingUpdateWinCondition(buildingType);
                });
                this.progressText.text = 'building time';

            default:
                console.log('win condition failed to setup');
                //goto win condition
                break;
        }
        this.showGoal();
        //have message popup here about objective
        this.workingVariables = this.combineDict(this.workingVariables,this.config);
        
    }


    buildingUpdateWinCondition(type)
    {
        if (type == this.workingVariables['buildingType'])
        {
            this.workingVariables['buildingsBuilt'] += 1;
        }
        if (this.workingVariables['buildingsBuilt'] >= this.workingVariables['totalBuildings'])
        {
            this.conditionMet();
        }
    }



    updateWinCondition(deltaTime)
    {
        
        switch(this.condition)
        {
            case 'timer':
                this.workingVariables["timePassed"] += deltaTime;
                //update objective here
                this.progressText.text = this.workingVariables["timePassed"] + ' / ' + this.workingVariables["survivalTime"];
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
    
    showGoal(customMessage=undefined)
    {
        let style = {
            'background-color': 'lime',
            'width': '220px',
            'height': '100px',
            'font': '48px Arial',
            'font-weight': 'bold',
            'background-color' : '#0000FF'
        };
        
        let currText = this.workingVariables['objectiveMessage'];
        if (customMessage!=undefined)
        {
            currText=customMessage;
        }
        //let displayMessage = new Phaser.GameObjects.Text(this.sceneRef,300,300,currText);
        let text = this.sceneRef.add.text(game.canvas.width/2,game.canvas.height/2,currText,style).setOrigin(.5,.5);
        text.setDepth(55);
        let tween = this.sceneRef.tweens.add({
            targets: text,
            alpha : 0,
            duration : 5 * 1000, 
        })
    }

    conditionMet()
    {

        if (this.objectiveComplete){return;}
        this.objectiveComplete = true;
        //create the win button and coffetti pops out from the sky
        this.showGoal('city-goals met!')
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