class ShopSceneButton extends Phaser.GameObjects.Container
{
    
    constructor(scene,x,y, metadata = {})//['texture'],metadata['shopFunction'],curr['shopArguments']
    {
        super(scene,x,y);
        scene.add.existing(this);
        this.backgroundPanel = new Phaser.GameObjects.Sprite(scene,20,0,'outside-shop-button-ben');
        this.buildingIcon = new Phaser.GameObjects.Sprite(scene, -95 ,0 ,metadata['texture']);//edit
        this.buildingIcon.setDisplaySize(50,50);
        this.setSize(this.backgroundPanel.displayWidth,this.backgroundPanel.displayHeight);

        this.setInteractive({ useHandCursor: true });
        this.textIcon = scene.add.bitmapText(-30,-10,"Pixellari Blue",'sample text', 24);
        this.add([this.backgroundPanel,this.buildingIcon,this.textIcon]);
        this.sceneRef = scene;
        this.on('pointerup',()=>{this.executeFunction();})
        this.targetFunction = metadata['shopFunction'];//edit
        this.targetArguments = metadata['shopArguments'];//edit

        this.metadata = metadata;
        this.tweenNotPlayed = false;
    }

    executeFunction()
    {
        
        if (this.targetFunction==undefined)
        {
            console.log('button was never assigned function');
            return;
        }

        // try to execute, if successful remove option
        if (this.sceneRef.executeViaString(this.targetFunction,this.targetArguments))
        {
            let idx = shopSceneAvailableList.indexOf(this.metadata);
            shopSceneAvailableList.splice(idx,1);
            this.sceneRef.tweens.add({
                targets: this,
                alpha : 0,
                x : -300,
                duration : 1 *1000,

            })
        } else
        {
            if (!this.tweenNotPlayed)
            {
                this.cannotPurchase = this.sceneRef.tweens.add({
                    targets: this,
                    ease: Phaser.Math.Easing.Back.InOut(),
                    x : this.x + 10,
                    duration : 50,
                    repeat: 2,
                    yoyo: true,
                });
                this.tweenNotPlayed = true;
            } else if (!this.cannotPurchase.isPlaying())
            {
                this.cannotPurchase.play();
            }
        }
    }
}