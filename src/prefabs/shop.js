class Shop extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,containerItems,boardRef)
    {
        //possible buiding list will be global var
        super(scene,x,y,containerItems);
        this.sceneRef = scene;
        this.boardRef = boardRef; //we need access to the board within the shop
        this.availableBuildings = [undefined,undefined,undefined];   
        this.refreshShop();
        this.purchaseBuilding(2);
    }
    refreshShop()
    {
        for (let i = 0; i<3 ;i++)
        {
            this.availableBuildings[i] = possibleBuildingList[Phaser.Math.Between(0,possibleBuildingList.length-1)];

            //add cosmetic refresh here

            //console.log(this.availableBuildings[i]);
        }
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

        //let toAdd = new this.availableBuildings[index](this.sceneRef,0,0,'buildingImage');

        let toAdd = this.availableBuildings[index];
        let randX= Phaser.Math.Between(0,this.boardRef.boardX-1);
        let randY= Phaser.Math.Between(0,this.boardRef.boardY-1);
        console.log(randX + " " + randY);
        this.buildingDeployer = new BuildingDeployer(this.sceneRef,0,2,'buildingImage',toAdd ,4,this.boardRef);

        //insert animation here to slide button away
        this.availableBuildings[index]=undefined;
        //this.boardRef.placeBuilding(toAdd,randX,randY);

    }

}