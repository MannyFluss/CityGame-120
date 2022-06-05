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
        this.economy = new PlayEconomy(this, money);
        
        new SceneButton(this,game.config.width-20,game.config.height-20,'submit-button','playScene').setOrigin(1, 1);
        
        this.initPreview();
        this.initPurchases();
        this.initMoneyUI();

        if (level==1)
            this.initTutorial();
    }

    initTutorial()
    {
        new Tutorial(this,150,game.config.height - 150,undefined,'shop');
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
            newButton.textIcon.setText(curr['name']);
            newButton.on('pointerover',()=>{
                this.shopPreview.alpha = 1;
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
        let style = {
            'color' : '#393457', 
            wordWrap: { width: 300, useAdvancedWrap: true , fontSize: 42},
            
        };

        this.previewBackground = this.add.sprite(0,0,'win-background');
        this.previewName = this.add.text(0,-170,'sample text', style).setOrigin(.5,.5);
        this.previewIcon = this.add.sprite(0,-80,'small-apartment-1').setDisplaySize(100,100);
        this.costText = this.add.text(0,20,'sample cost text', style).setOrigin(.5,.5);
        this.descriptText = this.add.text(0,60,'sample description text', style).setOrigin(.5,.5);
        this.shopPreview = this.add.container(this.game.canvas.width/2,this.game.canvas.height/2,
            [this.previewBackground,this.previewIcon,this.costText,this.descriptText,this.previewName]);
        this.shopPreview.alpha = 0;
    }

    initMoneyUI()
    {
        this.UImoney = this.add.text(game.config.width - 50, 50, "$" + this.economy.getCurrMoney(), {font: "42px 'Press Start 2P'"}).setOrigin(1,0);
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