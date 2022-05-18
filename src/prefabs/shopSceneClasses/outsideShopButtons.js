class ShopSceneButton extends Phaser.GameObjects.Container
{
    
    constructor(scene,x,y, metadata = {})//['texture'],metadata['shopFunction'],curr['shopArguments']
    {
        super(scene,x,y);
        scene.add.existing(this);
        this.backgroundPanel = new Phaser.GameObjects.Sprite(scene,0,0,'shop-button-temp');
        this.buildingIcon = new Phaser.GameObjects.Sprite(scene, -80 ,0 ,metadata['texture']);//edit
        this.buildingIcon.setDisplaySize(50,50);
        this.setSize(this.backgroundPanel.displayWidth,this.backgroundPanel.displayHeight);

        this.setInteractive();
        //this.buildingIcon.height = 50;
        this.textIcon = scene.add.text(40,0,'sample text');
        this.add([this.backgroundPanel,this.buildingIcon,this.textIcon]);
        this.sceneRef = scene;
        this.on('pointerup',()=>{this.executeFunction();})
        this.targetFunction = metadata['shopFunction'];//edit
        this.targetArguments = metadata['shopArguments'];//edit

        this.metadata = metadata
        

    }

    executeFunction()
    {
        
        if (this.targetFunction==undefined)
        {
            console.log('button was never assigned function');
            return;
        }

        this.sceneRef.executeViaString(this.targetFunction,this.targetArguments);
        let idx = shopSceneAvailableList.indexOf(this.metadata);
        shopSceneAvailableList.splice(idx,1);
        this.sceneRef.tweens.add({
            targets: this,
            alpha : 0,
            x : -300,
            duration : 1 *1000,

        })
        // this.sceneRef.add.
        // this.sceneRef.targetFunction;
        

    }
}