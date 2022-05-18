class ShopScene extends Phaser.Scene
{
    constructor()
    {
        super('shopScene');
    }

    preload()
    {
        this.load.image('submit-button','./assets/tempArt/check.png');
        this.load.image('temp-background','./assets/tempArt/shopPrev.png');
    }
    create()
    {
        this.addNewBuilding(Hotel);
        //this.increaseBoardSize();
        new SceneButton(this,50,50,'submit-button','playScene');

        new ShopSceneButtons(this,100,100,'increaseBoardSize');

        this.previewBackground = this.add.sprite(0,0,'temp-background');
        this.previewIcon = this.add.sprite(0,-100,'small-apartment-1').setDisplaySize(100,100);
        this.costText = this.add.text(0,20,'sample cost text').setOrigin(.5,.5);
        this.descriptText = this.add.text(0,60,'sample description text').setOrigin(.5,.5);
        this.shopPreview = this.add.container(this.game.canvas.width/2,this.game.canvas.height/2,[this.previewBackground,this.previewIcon,this.costText,this.descriptText]);


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