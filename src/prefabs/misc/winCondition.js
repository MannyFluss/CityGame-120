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
        this.progressText = new BasicSprite(this.sceneRef, game.canvas.width/2, 15, 'goal-progress-text').setOrigin(.5, 0); 

        this.initializeWinCondition();
        this.timer = scene.time.addEvent({
            delay: 500,                // ms
            callback: this.updateWinCondition,
            args: [500],
            loop: true,
            callbackScope : this
        });
        
        this.sfxGoalAchieved = scene.sound.add('sfx_GoalAchieved');
        
    }

    initializeWinCondition()
    {
        this.createProgressMeter();
        switch(this.condition)
        {
            case 'timer':
                this.workingVariables["timePassed"] = 0;
                this.workingVariables["survivalTime"] = 0;
                this.progressText.text = this.workingVariables["timePassed"] + ' / ' + this.workingVariables["survivalTime"];
                this.updateProgressMeter(this.workingVariables['timePassed'], this.config['survivalTime']);
                //configure goes here
                break;
            case 'building':
                this.workingVariables['buildingsBuilt'] = 0;
                this.workingVariables['totalBuildings'] = 0;
                this.workingVariables['buildingType'] = possibleBuildingList[Phaser.Math.Between(0,possibleBuildingList.length-1)];
                this.updateProgressMeter(this.workingVariables['buildingsBuilt'], this.config['totalBuildings']);
                this.boardRef.on('newBuildingPlaced',(buildingType)=>{
                    this.buildingUpdateWinCondition(buildingType);
                });
                this.progressText.text = 'building time';
                break;
            case 'disasters':
                this.workingVariables['disastersEndured'] = 0;
                this.workingVariables['totalDisasters'] = 0;
                this.updateProgressMeter(this.workingVariables['disastersEndured'], this.config['totalDisasters']);
                this.boardRef.on('onDisaster',()=>{
                    this.disasterUpdates();
                })    
                break;
            case 'capitalism':
                this.workingVariables['moneyEarned'] = 0;
                this.workingVariables['moneyTotal'] = 0;
                this.workingVariables['objectiveMessage'] = 'Goal: Earn $' + this.config['moneyTotal'];
                this.updateProgressMeter(this.sceneRef.economy.getCurrMoney(), this.config['moneyTotal']);
                this.economyRef.on('onMoneyChanged',(amount)=>{
                    this.capitalismUpdate(amount);
                });
                break;
            case 'koth':
                this.workingVariables['kothEarned'] = 0;
                this.workingVariables['kothTotal'] = 0;
                this.updateProgressMeter(this.workingVariables['kothEarned'], this.config['kothTotal']);
                this.koth = new KingRay(this.sceneRef,0,0,undefined);

                this.koth.on('onKothTick',()=>{
                    this.updateKoth();
                })
                break;
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

        // update progress meter
        this.updateProgressMeter(this.workingVariables['kothEarned'], this.workingVariables['kothTotal']);
    }

    capitalismUpdate(amount)
    {
        this.workingVariables['moneyEarned'] = amount;
        //this.workingVariables['moneyTotal'] = 0;
        if (this.workingVariables['moneyEarned'] >= this.workingVariables['moneyTotal'])
        {
            this.conditionMet();    
        }

        // update progress meter
        this.updateProgressMeter(this.workingVariables['moneyEarned'], this.workingVariables['moneyTotal']);
    }

    disasterUpdates()
    {
        this.workingVariables['disastersEndured']+=1;
        //this.workingVariables['totalDisasters'] = 0;
        if (this.workingVariables['disastersEndured']>=this.workingVariables['totalDisasters'])
        {
            this.conditionMet();
        }

        // update progress meter
        this.updateProgressMeter(this.workingVariables['disastersEndured'], this.workingVariables['totalDisasters']);
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

        // update progress meter
        this.updateProgressMeter(this.workingVariables['buildingsBuilt'], this.workingVariables['totalBuildings']);
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
                // update progress meter
                this.updateProgressMeter(this.workingVariables['timePassed'], this.workingVariables['survivalTime']);
                break;
            case 'building':
                break;
            default:
               // console.log('this should never be seen. like ever. something has bugged');
                break;
        }
        //go through each key

    }

    createProgressMeter()
    {
        let width = 120*3;
        let height = 10*3;
        let yOffset = 50;
        new BasicSprite(this.sceneRef, game.config.width/2-width/2, height + yOffset, 'progress-frame').setOrigin(0,0);
        this.progressMeter = new Meter(this.sceneRef, game.config.width/2-width/2, height + yOffset, width, height, 'progress-measure').setOrigin(0,0);
    }

    updateProgressMeter(progress, max) 
    {
        this.progressMeter.set(Math.min(progress, max)/max);
    }
    
    showGoal(customMessage=undefined)
    {
        let style = {
            'background-color': 'lime',
            'width': '220px',
            'height': '100px',
            'font': '48px Press Start 2P',
            'font-weight': 'bold',
            'background-color' : '#0000FF'
        };
        
        let currText = this.workingVariables['objectiveMessage'];
        if (customMessage!=undefined)
        {
            currText=customMessage;
        }
        //let displayMessage = new Phaser.GameObjects.Text(this.sceneRef,300,300,currText);
        let text = this.sceneRef.add.text(game.canvas.width/2,game.canvas.height+1,currText,style).setOrigin(.5,0);
        text.setDepth(55);
        this.sceneRef.tweens.add({
            targets: text,
            y : game.canvas.height-200,
            ease: Phaser.Math.Easing.Back.InOut,
            duration : 1200,
            delay: 500,
        });
        this.sceneRef.tweens.add({
            targets: text,
            y : game.canvas.height+1,
            ease: Phaser.Math.Easing.Back.InOut,
            duration : 1200, 
            delay: 6000,
        });
        
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
        this.sfxGoalAchieved.play();
        new FinishButton(this.sceneRef,20,game.config.height-20,'submit-button','shopScene').setOrigin(0, 1);
        
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