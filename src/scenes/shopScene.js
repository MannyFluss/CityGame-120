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
        //this.increaseBoardSize();
        new SceneButton(this,50,50,'submit-button','playScene');

        new ShopSceneButtons(this,100,100,'increaseBoardSize');

    }

    executeViaString(func='',args=[])
    {
        switch(func)
        {
            case "increaseBoardSize":
                this.increaseBoardSize();
                break

            default:
                console.log('shop given invalid execution string');
                break;
        }
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