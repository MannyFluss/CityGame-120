class Tutorial extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='tutorialJohnson')
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setScale(2);
        this.sceneRef = scene;
        this.economyRef = scene.economy;
        this.threatRef = scene.threatGen;
        this.speechBubble = new Phaser.GameObjects.Sprite(scene,this.x + 260 , this.y - 50,'speech-bubble');
        this.speechText = new Phaser.GameObjects.Text(scene,this.speechBubble.x,this.speechBubble.y,'sample text');
        this.speechText.setColor('#FFFFFF')
        this.speechText.setOrigin(.5,.5);
        this.speechBubble.setScale(1.5);
        scene.add.existing(this.speechBubble);
        scene.add.existing(this.speechText)
    }

}