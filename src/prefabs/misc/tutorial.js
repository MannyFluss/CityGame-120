class Tutorial extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='tutorialJohnson',type='play')
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setScale(2);

        this.playTutorial = 
        [
            "Welcome to Shuffle City Civil Engineering School! \n\n\n (click here to continue)",//click
            "Let's start by purchasing a building. Drag it from the Shop to the center area.",//place building
            "Take note, you can pick up and move those buildings at any time!",//click
            "Each building has unique effects. This apartment generates money over time.",
            "Natural disasters are constantly putting our city in peril. It's our duty as Civil Engineers to protect our citizens.",//click
            "HOLY COW THERE'S A METEOR INCOMING!! This is below my paygrade, make sure the building does not get struck!",//wait for timer
            "You are now ready to serve and maybe protect! Go on and complete the City Goal.",//click and finished
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

        this.threatRef = scene.threatGen;
        if(this.threatRef!=undefined)
        {
            this.threatRef.enabled = false;
        }
        this.speechBubble = new Phaser.GameObjects.Sprite(scene,this.x + 260 , this.y - 50,'speech-bubble');
        this.speechBubble.setInteractive();
        this.speechText = new Phaser.GameObjects.BitmapText(scene,this.speechBubble.x,this.speechBubble.y,"Pixellari",'',24).setMaxWidth(300);

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
        }
        this.speechBubble.on('pointerup',()=>{
            if (type=='play')
            {
                this.playNext();
            }else
            {
                this.shopNext();
            }
            })
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
        if (this.index == this.playTutorial.length)
        {
            this.sceneRef.initWinCondition();
            this.finished();
            return;
        }
        if (this.index==5)
        {
            this.threatRef.enabled = true;

            // this.threatRef.generateDisaster('meteor');   
        }
        this.speechText.text = this.playTutorial[this.index]
        this.index += 1;
        console.log('tutorialnext');
    }



    finished()
    {
        this.destroy();
        this.speechBubble.destroy();
        this.speechText.destroy();
    }
}