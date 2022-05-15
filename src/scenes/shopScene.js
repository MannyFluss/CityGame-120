class ShopScene extends Phaser.Scene
{
    constructor()
    {
        super('shopScene');
    }

    preload()
    {
        this.load.image('submit-button','./assets/tempArt/check.png');
    }
    create()
    {
        this.addNewBuilding(Hotel);
        this.increaseBoardSize();
        new SceneButton(this,50,50,'submit-button','playScene');


    }

    

    increaseBoardSize()
    {
        if (boardSize < 4)
        {
            boardSize += 1;
        }
        
    }

    addNewBuilding(building)
    {
        if (!possibleBuildingList.includes(building))
        {
            possibleBuildingList[possibleBuildingList.length]=building;
        }
    }
}