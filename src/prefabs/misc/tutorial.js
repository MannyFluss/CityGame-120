class Tutorial extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='tutorialJohnson',type='play')
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setScale(2);

        this.playTutorial = 
        [
            "Welcome to Shuffle City! \n\n\n (Click this box to continue the tutorial.)", // click
            "Here in Shuffle City Civil Engineering School, you'll learn the basics of managing our great city!", //click
            "Lets start with giving you some much-needed finances!", // give player money
            "Now use that money to purchase a building by dragging it to an empty tile from the shop.", // place building
            "Good job! Take note that you can pick up and place these buildings back down at any time.", // click
            "Each building has its own unique effects. This apartment simply generates money overtime.", // click
            "As you already know, natural disasters are constantly putting our city in peril.",
            "It's our duty as Civil Engineers to protect our citizens!", // click
            "HOLY COW THERES A METEOR INCOMING! Denizen, this is way below my paygrade. Make sure the building doesn't get struck!",// wait for timer
            "Nice work! Well that's all for an education. Go on and complete your city-assigned task.", // click and finished
            "Oh no! Your building's been destroyed! Well...good luck completing your city-assigned task." // click and finished
        ];

        this.shopTutorial=
        [
            "Im back! Now I'm here to give you shop credentials!",//click
            "Firstly, let's get you some cash!",//click after click give cash
            "Now let's purchase a tile upgrade.",//wait until tile purchase
            "You can also purchase new buildings here. Let's buy a hotel for the city.",//purchase hotel
            "Congrats! With your purchases complete, my purpose as a tutorial building ceases to have purpose. Have fun in the city!",
        ];
        this.index = 0;
        this.boardRef = scene.board;//used to determine scene or not
        this.sceneRef = scene;
        this.economyRef = scene.economy;
        this.threatRef = scene.threatGen;

        this.config = {color : "#000000", 
        align: "left",
        wordWrap: { width: 300, useAdvancedWrap: true},
        fontSize: 25,
        };

        //this.threatRef = scene.threatGen;
        if(this.threatRef!=undefined)
        {
            this.threatRef.enabled = false;
        }
        this.speechBubble = new Phaser.GameObjects.Sprite(scene,this.x + 260 , this.y - 50,'speech-bubble');
        this.speechBubble.setInteractive();
        this.speechText = new Phaser.GameObjects.Text(scene,this.speechBubble.x,this.speechBubble.y+20,'',this.config);
        this.speechText.setFixedSize(300,200)
        this.speechText.setOrigin(.5,.5);
        this.speechBubble.setScale(1.5);
        scene.add.existing(this.speechBubble);
        scene.add.existing(this.speechText)
        if (type=='play')
        {
            this.playNext();
            
        }
        if (type=='shop')
        {
            this.shopNext();
            //this.speechBubble.on('pointerup',()=>{this.shopNext();})
        }
        this.economyRef.on('onMoneyChanged',(amount)=>{
            this.emit('tutorialMoneyChanged', this.index, amount);
        });
        this.on('tutorialMoneyChanged',(index, amount)=>{
            if(index==4 && type=='play' && amount==0)
            {
                this.playNext();
            }
        });
        this.speechBubble.on('pointerdown',()=>{
            if (type=='play' && !(this.index==4 || this.index==9))
            {
                this.playNext();
            } else if (type=='shop')
            {
                // this.shopNext();
            }
        });
    }

    shopNext()
    {
        if (this.index == this.shopTutorial.length)
        {
            this.finished();
            return;
        }
        this.speechText.text = this.shopTutorial[this.index]
        this.index += 1;
    }

    playNext()
    {
        if ((this.index == this.playTutorial.length) || this.index == 10)
        {
            this.sceneRef.initWinCondition();
            this.finished();
            return;
        }
        if (this.index==2)
        {
            this.sceneRef.tweens.add({
                targets: this.sceneRef.UImoney,
                ease: 'Sine.easeIn',
                x : this.sceneRef.UImoney.x - 100,
                duration : 500,
            });
            this.economyRef.currentMoney += 5;
        }
        if (this.index==3)
        {
            this.sceneRef.tweens.add({
                targets: this.sceneRef.shop,
                ease: 'Sine.easeIn',
                x : this.sceneRef.shop.x - 200,
                duration : 500,
            });
        }
        if (this.index==8)
        {
            for (let i=0; i<this.boardRef.boardX; i++)
            {
                for (let j=0; j<this.boardRef.boardY; j++)
                {
                    if(!this.boardRef.checkEmpty(i,j))
                    {
                        this.targTile = this.boardRef.getTile(i,j);
                    }
                }
            }
            this.threatRef.disasters.push(new Meteor(this.sceneRef,0,0,undefined,5,this.targTile));
            this.sceneRef.time.delayedCall(5500,()=>{this.playNext();});
        }
        if (this.index==9)
        {
            if(this.boardRef.checkBoardEmpty())
            {
                this.index = 10;
            }
        }
        this.speechText.text = this.playTutorial[this.index]
        this.index += 1;
        this.emit('indexChanged', this.index, this.economyRef.currentMoney);
    }



    finished()
    {
        this.destroy();
        this.speechBubble.destroy();
        this.speechText.destroy();
        this.economyRef.currentMoney = 5;
        this.threatRef.enabled = true;
    }
}