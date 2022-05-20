class Shop extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,containerItems,boardRef)
    {
        //possible buiding list will be global var
        super(scene,x,y,containerItems);
        scene.add.existing(this)
        this.sceneRef = scene;
        this.boardRef = boardRef; //we need access to the board within the shop
        this.availableBuildings = [undefined,undefined,undefined];   
        

        this.shopConsole = new Phaser.GameObjects.Sprite(scene,0,0,'shop-temp');

        this.refreshButton = new Phaser.GameObjects.Sprite(scene,80,-160,'temp-button').setInteractive();

        this.purchase = [];
        this.purchase[0] = new ShopButton(scene,0,-80);
        this.purchase[1] = new ShopButton(scene,0,0);
        this.purchase[2] = new ShopButton(scene,0,80);
        
        this.refreshButton.on('pointerup',()=>{this.refreshShop();});
        this.purchase[0].on('pointerdown',()=>{this.purchaseBuilding(0);});
        this.purchase[1].on('pointerdown',()=>{this.purchaseBuilding(1);});
        this.purchase[2].on('pointerdown',()=>{this.purchaseBuilding(2);});
        this.add([this.shopConsole,this.refreshButton]);
        this.add(this.purchase);


        this.refreshShop();

    }
    refreshShop()
    {
        if (this.boardRef.checkForBuildingType(WinmillBuilding))
        {
            console.log('windmill alert');
        }
        
        for (let i = 0; i<3 ;i++)
        {
            this.availableBuildings[i] = possibleBuildingList[Phaser.Math.Between(0,possibleBuildingList.length-1)];
            this.purchase[i].updateIcons(this.availableBuildings[i]);
            let tween = this.sceneRef.tweens.add({
                targets: this.purchase[i],
                alpha : 1,
                x : 0,
                duration : 1 *1000,
    
            })
            //this.purchase[i];
            //add cosmetic refresh here
            //console.log(this.availableBuildings[i]);
        }
    }
    buildingPlaced(index)
    {
        //takes ur monies here

        let tween = this.sceneRef.tweens.add({
            targets: this.purchase[index],
            alpha : 0,
            x : 100,
            duration : 1 *1000,
        })     

    }
    test()
    {
        console.log('test');
    }

    purchaseBuilding(index = 0)//currently unsafe, can place on a already existing building w/o destroying it
    {
        if (this.availableBuildings[index]==undefined)
        {
            console.log('invalid shop index chosen');
            return;
        }
        
        //create new building
        //place on random spot on board
        //in future make it so that a seperate meteor like object spawns buildings in

        //let toAdd = new this.availableBuildings[index](this.sceneRef,this.boardRef,0,0,'small-apartment-1');
        

        let toAdd = this.availableBuildings[index];
        let buildingGhost = new ShopGhost(this.sceneRef,this.x,this.y,toAdd,this,index);

        //insert animation here to slide button away
        
        //this.boardRef.placeBuilding(toAdd,randX,randY);

    }

}