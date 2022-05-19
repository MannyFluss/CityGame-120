class ShopGhost extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,buildingType,shopRef)
    {
        super(scene,x,y);
        scene.add.existing(this);
        this.buildingType = buildingType;
        //console.log(buildingType.metaData['texture']);
        this.sprite = new Phaser.GameObjects.Sprite(scene,0,0,buildingType.metaData['texture']);
        this.sprite.alpha = .5;
        this.setDepth(50);
        this.add([this.sprite]);
        console.log(this.list)
        this.shopRef = shopRef;
        this.setSize(this.sprite.width,this.sprite.height);
        this.sceneRef = scene;
        this.setInteractive();
        this.timer = scene.time.addEvent({
            delay: 16,                // ms
            callback: this.timeElapsed,
            loop: true
        });
        this.on('pointerup',()=>{
            //attempt to deploy


            this.destroy()
        })

    }
    timeElapsed()
    {
//        console.log('drag')   
        //console.log(this.scene.input)
        // let pointer = this.sceneRef.input.activePointer;
        
        this.sprite.x = game.input.mousePointer.x;
        this.sprite.y = game.input.mousePointer.y;
        
    }
}