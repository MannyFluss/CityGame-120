class Tutorial extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='tutorialJohnson',type='play')
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setScale(2);

        this.playTutorial = 
        [
            "Welcome to Shuffle City! \n\n\n (click this box to continue the tutorial)",//click
            "Here in Shuffle City Civil Engineering School you will learn the basics of managing our great city!",//click
            "Let's start by purchasing a building. Here are some funds to do so!",//place building
            "Good job, take note you can pick up and move those buildings at any time!",//click
            "Each building has its own unique effects. This apartment simply generates money over time.",
            "As you already know, natural disasters are constantly putting our city in peril. It's our duty as "+
            "Civil Engineers to protect our citizens.",//click
            "HOLY COW THERE'S A METEOR INCOMING!! Denizen this is below my paygrade, make sure the building does not get struck!",//wait for timer
            "You are now ready to serve and maybe protect! Go on and complete the City Goal.",//click and finished
        ];

        this.shopTutorial=
        [
            "I'm back! Now I'm here to give you shop credentials!",//click
            "Firstly let's get you some cash!",//click after click give cash
            "Now lets purchase a tile upgrade to expand our city.",//wait until tile purchase
            "You can also purchase new buildings here. Let's buy a hotel for the city.",//purchase hotel
            "Congrats! With your purchases complete, my tenure as a tutorial building ceases to have purpose. Have fun in Shuffle City!",
        ]
        this.index = 0;
        this.boardRef = scene.board;//used to determine scene or not
        this.sceneRef = scene;
        this.economyRef = scene.economy;
        this.threatRef = scene.threatGen;

        this.config = {color : "#000000", 
        align: "left",
        wordWrap: { width: 300, useAdvancedWrap: true , fontSize: 42}
        };

        this.threatRef = scene.threatGen;
        if(this.threatRef!=undefined)
        {
            this.threatRef.enabled = false;
        }
        this.speechBubble = new Phaser.GameObjects.Sprite(scene,this.x + 260 , this.y - 50,'speech-bubble');
        this.speechBubble.setInteractive();
        //let s = 'ssssssssssssssssssssssssssssssssssss\nsssssssssssssssssssssssssssssssssssssssssssssssssss';
        this.speechText = new Phaser.GameObjects.Text(scene,this.speechBubble.x + 5,this.speechBubble.y+25,'',this.config);
        // console.log(this.speechText);
        this.speechText.setFixedSize(300,200)
        //this.speechText.setColor("#000000");
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
        if (this.index==6)
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