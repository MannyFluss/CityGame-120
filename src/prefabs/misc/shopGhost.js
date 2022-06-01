class ShopGhost extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,buildingType,shopRef,index=0)
    {
        super(scene,x,y,buildingType.metaData['texture']);
        scene.add.existing(this);
        this.setOrigin(.5,.9)
        this.buildingType = buildingType;
        //console.log(buildingType.metaData['texture']);
        this.setDepth(50);
        this.index = index
        this.alpha = .5;
        this.shopRef = shopRef;
        this.sceneRef = scene;
        this.setInteractive();
        this.timer = scene.time.addEvent({
            delay: 16,                // ms
            callback: this.timeElapsed,
            callbackScope : this,
            loop: true
        });
        this.on('pointerup',()=>{
            //attempt to deploy
            
            let board = scene.board;
            let tile = board.getNearestEmptyTile(this.x,this.y);
            let checkBuilding = new buildingType(this.sceneRef,board,0,0,'');    
            if (tile != null)
            {
                console.log('able 2 place');
                this.buildingDeployer = new BuildingDeployer(this.sceneRef,board, tile.tileX,tile.tileY,undefined,buildingType,0);

                scene.shop.buildingPlaced(index,buildingType);
                
                //build here
            }
            else
            {
                console.log('board full, cannot purchase building');
            }
            checkBuilding.destroyThisBuilding();
            this.destroy()
        })



    }


    timeElapsed()
    {
//        console.log('drag')   
        //console.log(this.scene.input)
        // let pointer = this.sceneRef.input.activePointer;
        let x = Math.floor(game.input.mousePointer.x);
        let y = Math.floor(game.input.mousePointer.y);
//        console.log(x+" "+y);
        this.x = x;
        this.y = y;

        
       // this.setPosition(x,y)
    }
}