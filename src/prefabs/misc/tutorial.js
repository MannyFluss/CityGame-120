class Tutorial extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='tutorialJohnson',type='play')
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setScale(2);

        this.playTutorial = 
        [
            "Welcome to Shuffle City! \n\n\n (click this box to continue tutorial)",//click
            "Here in Shuffle City Civil Engineering School you will learn the basics of managing our great city!",//click
            "Lets start by purchasing a building, here are some funds to do so!",//place building
            "Good job, take note you can pick up and place those buildings back down at any time",//click
            "Each building has its own unique effects this appartment simply generates money overtime",
            "As you already know, natural disasters are constantly putting our city in peril, its is our duty as "+
            "Civil Engineers to protect our citizens.",//click
            "HOLY COW THERES A METEOR INCOMING denizen this is below my paygrade, make sure the building does not get struck",//wait for timer
            "Well thats all for an education, you are now ready to serve and maybe protect, go on and complete the city assigned task",//click and finished
        ];

        this.shopTutorial=
        [
            "Im back!, now im here to give you shop credentials!",//click
            'firstly lets get you some cash!',//click after click give cash
            'now lets purchase a tile upgrade',//wait until tile purchase
            'you can also purchase new buildings here lets buy a hotel for the city',//purchase hotel
            'congrats with your purchases complete my purpose as a tutorial building ceases to have purpose have fun in the city!',
        ]
        this.index = 0;
        this.boardRef = scene.board;//used to determine scene or not
        this.sceneRef = scene;
        this.economyRef = scene.economy;
        this.threatRef = scene.threatGen;

        this.config = {color : "#000000", 
        align: "left",
        wordWrap: { width: 300, useAdvancedWrap: true }
        };

        this.threatRef = scene.threatGen;
        this.threatRef.enabled = false;
        this.speechBubble = new Phaser.GameObjects.Sprite(scene,this.x + 260 , this.y - 50,'speech-bubble');
        this.speechBubble.setInteractive();
        //let s = 'ssssssssssssssssssssssssssssssssssss\nsssssssssssssssssssssssssssssssssssssssssssssssssss';
        this.speechText = new Phaser.GameObjects.Text(scene,this.speechBubble.x,this.speechBubble.y,'',this.config);
        console.log(this.speechText);
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
        this.speechBubble.on('pointerup',()=>{this.playNext();})
    }

    playNext()
    {
        if (this.index == this.playTutorial.length)
        {
            this.finished();
            return;
        }
        if (this.index==6)
        {
            this.threatRef.enabled = true;
            this.threatRef.generateDisaster('meteor');   
        }
        this.speechText.text = this.playTutorial[this.index]
        this.index += 1;
    }
    
    finished()
    {
        this.destroy();
        this.speechBubble.destroy();
        this.speechText.destroy();
    }
}