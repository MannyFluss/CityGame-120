class ShopSceneButtons extends Phaser.GameObjects.Container
{
    constructor(scene,x,y, targetFunction=undefined, targetArguments=undefined)
    {
        super(scene,x,y);
        scene.add.existing(this);
        this.backgroundPanel = new Phaser.GameObjects.Sprite(scene,0,0,'shop-button-temp');
        this.buildingIcon = new Phaser.GameObjects.Sprite(scene, -80 ,0 ,'small-apartment-1');
        this.buildingIcon.setDisplaySize(50,50);
        this.setSize(this.backgroundPanel.displayWidth,this.backgroundPanel.displayHeight);

        this.setInteractive();
        //this.buildingIcon.height = 50;
        this.textIcon = scene.add.text(40,0,'sample text');
        this.add([this.backgroundPanel,this.buildingIcon,this.textIcon]);
        this.sceneRef = scene;
        this.on('pointerdown',()=>{this.executeFunction();})
        this.targetFunction = targetFunction;
        this.targetArguments = targetArguments;
    }

    executeFunction()
    {
        if (this.targetFunction==undefined)
        {
            console.log('button was never assigned function');
            return;
        }

        this.sceneRef.executeViaString(this.targetFunction);

        // this.sceneRef.add.
        // this.sceneRef.targetFunction;
        

    }
}