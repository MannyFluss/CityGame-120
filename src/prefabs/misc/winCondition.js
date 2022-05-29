
class winState extends Phaser.GameObjects.GameObject
{
    constructor(scene, condition="timer",config={})//config optionally messes with vars
    {
        super(scene);
        this.condition = condition;
        this.sceneRef = scene;
        this.boardRef = scene.board;
        this.economyRef = scene.economy;
        this.workingVariables = {};
        this.workingVariables['objectiveMessage'] = 'default objective message';
        this.config = config;
        this.objectiveComplete = false;
        this.progressText = this.sceneRef.add.text(game.canvas.width/2,20,'progress goes here').setOrigin(.5,.5); 

        this.initializeWinCondition();
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
                break;
            case 'disasters':
                this.workingVariables['disastersEndured'] = 0;
                this.workingVariables['totalDisasters'] = 0;
                this.boardRef.on('onDisaster',()=>{
                    this.disasterUpdates();
                })    
                break;
            case 'capitalism':
                this.workingVariables['moneyEarned'] = 0;
                this.workingVariables['moneyTotal'] = 0;
                this.economyRef.on('onMoneyMade',(amount)=>{
                    this.capitalismUpdate(amount);
                })
            case 'koth':
                this.workingVariables['kothEarned'] = 0;
                this.workingVariables['kothTotal'] = 0;
                this.koth = new KingRay(this.sceneRef,0,0,undefined);

                this.koth.on('onKothTick',()=>{
                    this.updateKoth();
                })

            default:
                console.log('win condition failed to setup');
                //goto win condition
                break;
        }
        this.showGoal();
        //have message popup here about objective
        this.workingVariables = this.combineDict(this.workingVariables,this.config);
        
    }
    updateKoth()
    {
        this.workingVariables['kothEarned'] += 1;
        //this.workingVariables['kothTotal'] = 0; 
        if (this.workingVariables['kothEarned'] >= this.workingVariables['kothTotal'])
        {
            this.conditionMet();
            this.koth.customDestroy();
        }  
    }
    capitalismUpdate(amount)
    {
        this.workingVariables['moneyEarned'] += amount;
        //this.workingVariables['moneyTotal'] = 0;
        if (this.workingVariables['moneyEarned'] >= this.workingVariables['moneyTotal'])
        {
            this.conditionMet();    
        }
    }

    disasterUpdates()
    {
        this.workingVariables['disastersEndured']+=1;
        //this.workingVariables['totalDisasters'] = 0;
        if (this.workingVariables['disastersEndured']>=this.workingVariables['totalDisasters'])
        {
            this.conditionMet();
        }

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
            case 'building':
                break;
            default:
               // console.log('this should never be seen. like ever. something has bugged');
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

        //'pink','red','yellow','green','blue'

        let particles = this.sceneRef.add.particles("particles");
        
        this.emitter = particles.createEmitter({

            x : game.canvas.width/2,
            y : -50,
            frame : ['pink.png','red.png','yellow.png','blue.png','green.png'],
            scale : {min : .5, max : 2 },
            speed : {min : 100, max : 200},
            lifespan : 10 * 1000,
            gravityY : 100, 


        });
        this.sceneRef.time.delayedCall(7 * 1000,()=>{this.emitter.stop();},this);
        //this.emitter.x = game.canvas.width/2;
        this.objectiveComplete = true;
        //create the win button and coffetti pops out from the sky
        this.showGoal('city-goals met!')
        new SceneButton(this.sceneRef,20,game.config.height-20,'submit-button','shopScene').setOrigin(0, 1);
        
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