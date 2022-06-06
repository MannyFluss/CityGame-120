class Tutorial extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='tutorialJohnson',type='play')
    {
        super(scene,x,game.canvas.height+160,texture);
        scene.add.existing(this);
        this.setScale(2);

        this.playTutorial = 
        [     
            "Welcome to Shuffle City Civil Engineering School! \n\n\n (click here to continue)",//click
            "Let's start by purchasing a building. Drag it from the Shop to the center area.",//place building
            "Take note, you can pick up and move those buildings at any time!",//click
            "Each building has unique effects. This apartment generates money over time.",
            "Natural disasters are constantly putting our city in peril. It's our duty as Civil Engineers to protect our citizens.",//click
            "HOLY COW THERE'S A METEOR INCOMING!! This is above my paygrade, make sure the building does not get struck!",//wait for timer
            "Nice work! Well that's all for an education. Go on and complete the City Goal.",//click and finished
            "Oh no! Your building's been destroyed! Well...good luck completing your City Goal." // click and finished
        ];

        this.shopTutorial=
        [
            "I'm back! Now I'm here to give you shop credentials!",//click
            "The cash you earn in each level lets you buy upgrades here!",//wait until tile purchase
            "First let's purchase a tile upgrade to expand our city.",//click after click give cash
            "You can also purchase new buildings here. Let's buy a hotel!",//purchase hotel
            "Congrats! With your purchases complete, my tenure as a tutorial building ceases to have purpose. Have fun in Shuffle City!",
        ]
        this.index = 0;
        this.boardRef = scene.board;//used to determine scene or not
        this.sceneRef = scene;
        this.economyRef = scene.economy;
        this.threatRef = scene.threatGen;
        this.type = type;
        this.isFinished = false;

        if(this.threatRef!=undefined)
        {
            this.threatRef.enabled = false;
        }
        this.speechBubble = new Phaser.GameObjects.Sprite(scene,this.x + 320, this.y,'ben-speech-bubble');
        this.speechBubble.setInteractive({useHandCursor: true});
        this.speechText = new Phaser.GameObjects.BitmapText(scene, this.speechBubble.x - 135, this.speechBubble.y-70, "Pixellari",'',24).setMaxWidth(300);

        scene.add.existing(this.speechBubble);
        scene.add.existing(this.speechText)
        if (type=='play')
        {
            this.playNext();
        }
        if (type=='shop')
        {
            this.shopNext();
        }
        this.economyRef.on('onMoneyChanged',(amount)=>{
            this.emit('tutorialMoneyChanged', this.index, amount);
        });
        this.on('tutorialMoneyChanged',(index, amount)=>{
            if(index==2 && type=='play')
            {
                this.playNext();
            } else if (type=='shop' && (index==3 || index==4))
            {
                this.shopNext();
            }
        });
        this.speechBubble.on('pointerdown',()=>{
            if (type=='play' && !(this.index==2 || this.index==6))
            {
                this.playNext();
            } else if (type=='shop' && !(this.index==3 || this.index==4))
            {
                this.shopNext();
            }
        });

        this.sceneRef.tweens.add({
            targets: this,
            y : y,
            ease: Phaser.Math.Easing.Back.InOut,
            duration : 1200,
            delay: 50
        });
        this.sceneRef.tweens.add({
            targets: this.speechBubble,
            y : y+30,
            ease: Phaser.Math.Easing.Back.InOut,
            duration : 1200,
            delay: 100
        });
        this.sceneRef.tweens.add({
            targets: this.speechText,
            y : y+30-70,
            ease: Phaser.Math.Easing.Back.InOut,
            duration : 1200,
            delay: 100
        });
    }

    shopNext()
    {
        if (this.done) return;
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
        if (this.isFinished)
            return;
        if ((this.index == this.playTutorial.length) || this.index == 7)
        {
            this.finished();
            this.sceneRef.initWinCondition();
            return;
        }
        if (this.index==0)
        {
            this.economyRef.currentMoney = 5;
        }
        if (this.index==1)
        {
            this.sceneRef.tweens.add({
                targets: this.sceneRef.shop,
                ease: Phaser.Math.Easing.Back.InOut,
                x : this.sceneRef.shop.x - 205,
                duration : 500,
            });
        }
        if (this.index==5)
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
        if (this.index==6)
        {
            if(this.boardRef.checkBoardEmpty())
            {
                this.index = 7;
            }
        }
        this.speechText.text = this.playTutorial[this.index]
        this.index += 1;
        this.emit('indexChanged', this.index, this.economyRef.currentMoney);
    }



    finished()
    {
        if(this.type=="play")
        {
            this.economyRef.currentMoney = 5;
            this.threatRef.enabled = true;
        } else if (this.type=="shop")
        {
            this.sceneRef.tweens.add({
                targets: this.sceneRef.sceneButton,
                ease: 'Sine.easeInOut',
                duration : 1 * 1000, 
                x: this.sceneRef.sceneButton.x + 1500,
            });
        }
        this.isFinished=true;
        this.sceneRef.tweens.add({
            targets: this,
            y : game.canvas.height+170,
            ease: Phaser.Math.Easing.Back.InOut,
            duration : 1200,
            delay: 50
        });
        this.sceneRef.tweens.add({
            targets: this.speechBubble,
            y : game.canvas.height+170+30,
            ease: Phaser.Math.Easing.Back.InOut,
            duration : 1200,
            delay: 100
        });
        this.sceneRef.tweens.add({
            targets: this.speechText,
            y : game.canvas.height+170+30-70,
            ease: Phaser.Math.Easing.Back.InOut,
            duration : 1200,
            delay: 100
        });
        this.sceneRef.time.delayedCall(1200+100,()=>{
            this.speechText.destroy();
            this.speechBubble.destroy();
            this.destroy();
        });
    }
}