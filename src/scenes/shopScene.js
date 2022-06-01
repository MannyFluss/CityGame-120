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
        //this.addNewBuilding(Hotel);
        //this.increaseBoardSize();
        new SceneButton(this,game.config.width-20,game.config.height-20,'submit-button','playScene').setOrigin(1, 1);
        this.initPreview();
        this.initPurchases();
        if (boardSize==2)
        {
            this.initTutorial();
        }
        // static metaData = 
        // {
        //     "texture" : 'small-apartment-1',
        //     "description" : "this building generates money when placed",
    
        //     "shopCost" : 100,
        //     "shopFunction" : "addNewBuilding",
        //     "shopArguments" : [Building],
        // };


    }

    initTutorial()
    {
        new Tutorial(this,300,800,undefined,'shop');
    }

    initPurchases()
    {
        let x = 200;
        let y = 100;
        let buttonCount = 4;
        if (shopSceneAvailableList.length < buttonCount){buttonCount=shopSceneAvailableList.length;}

        for (let i = 0; i<buttonCount;i++)
        {
            let curr = shopSceneAvailableList[i];
            let newButton = new ShopSceneButton(this,x,y,curr);
            newButton.on('pointerover',()=>{
                this.previewIcon.setTexture(curr['texture']);
                this.costText.text = curr['shopCost'];
                this.descriptText.text = curr['description'];
                this.previewName.text = curr['name'];
            })
            y += 100;
        }

    }


    initPreview()
    {
        this.previewBackground = this.add.sprite(0,0,'temp-background');
        this.previewName = this.add.text(0,-170,'sample text').setOrigin(.5,.5);
        this.previewIcon = this.add.sprite(0,-100,'small-apartment-1').setDisplaySize(100,100);
        this.costText = this.add.text(0,20,'sample cost text').setOrigin(.5,.5);
        this.descriptText = this.add.text(0,60,'sample description text').setOrigin(.5,.5);
        this.shopPreview = this.add.container(this.game.canvas.width/2,this.game.canvas.height/2,
            [this.previewBackground,this.previewIcon,this.costText,this.descriptText,this.previewName]);
    }
    executeViaString(func='',args=[])
    {
        switch(func)
        {
            case "increaseBoardSize":
                this.increaseBoardSize();
                break
            case "addNewBuilding":
                if (args.length == 0){console.log('error with exec via str no args prov');break;}
                this.addNewBuilding(args[0]);
                break;
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