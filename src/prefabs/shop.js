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
        
        this.shopConsole = new Phaser.GameObjects.Sprite(scene,0,0,'shop-console-ben');

        this.economyRef = scene.economy;
        this.purchase = [];
        this.purchase[0] = new ShopButton(scene,0,20);
        this.purchase[1] = new ShopButton(scene,0,115);
        this.purchase[2] = new ShopButton(scene,0,210);
        
        this.purchase[0].on('pointerdown',()=>{this.purchaseBuilding(0);});
        this.purchase[1].on('pointerdown',()=>{this.purchaseBuilding(1);});
        this.purchase[2].on('pointerdown',()=>{this.purchaseBuilding(2);});
        this.add(this.shopConsole);
        this.add(this.purchase);


        this.refreshShop(false);

    }
    refreshShop(delayed = true)
    {
        if (this.boardRef.checkForBuildingType(WinmillBuilding))
        {
            console.log('windmill alert');
        }
        
        for (let i = 0; i<3 ;i++)
        {
            this.availableBuildings[i] = possibleBuildingList[Phaser.Math.Between(0,possibleBuildingList.length-1)];
            let delay = delayed ? .25*1000 + i*100 : 0;
            this.sceneRef.time.delayedCall(delay, () => {this.purchase[i].updateBuildings(this.availableBuildings[i])});
            this.sceneRef.tweens.add({
                targets: this.purchase[i],
                alpha : 1,
                x : 0,
                ease: 'Sine.easeInOut',
                duration : .25 *1000,
                delay: .25*1000 + i*100,
            })
            //this.purchase[i];
            //add cosmetic refresh here
            //console.log(this.availableBuildings[i]);
        }
    }
    buildingPlaced(index, buildingType)
    {
        //takes ur monies here
        this.availableBuildings[index] = undefined;

        this.economyRef.spendMoney(buildingType.metaData['placeCost']);

        for (let i = 0; i<3 ;i++)
        {
            this.sceneRef.tweens.add({
                targets: this.purchase[i],
                alpha : 0,
                x : 100,
                ease: 'Sine.easeInOut',
                duration : .25 *1000,
                delay: i*100,
            });
        }

        this.refreshShop();
    }

    purchaseBuilding(index = 0)//currently unsafe, can place on a already existing building w/o destroying it
    {
        if (this.availableBuildings[index]==undefined)
        {
            console.log('invalid shop index chosen');
            return;
        }
        console.log(this.availableBuildings[index].metaData['placeCost']);
        if (this.economyRef.checkSpendMoney(this.availableBuildings[index].metaData['placeCost'])==false)
        {
            console.log('not enough money')
            
            return; //not enough money
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