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
                this.costText.text = "$" + curr['shopCost'];
                if (this.economy.checkSpendMoney(curr['shopCost']))
                    this.costText.setFont("Pixellari Green");
                else
                    this.costText.setFont("Pixellari Red");
                this.descriptText.text = curr['description'];
                this.previewName.text = curr['name'];
            })
            y += 100;
        }

    }


    initPreview()
    {
        let wordWrap = 400;

        this.previewBackground = this.add.sprite(0,0,'outsideShopBg');
        this.previewName = this.add.bitmapText(0,-160,"Pixellari Blue", 'sample text', 50).setOrigin(.5,.5).setMaxWidth(wordWrap);
        this.previewIcon = this.add.sprite(0,-55,'small-apartment-1').setDisplaySize(100,100);
        this.costText = this.add.bitmapText(0,55,"Pixellari Green", 'sample cost text', 42).setOrigin(.5,.5).setMaxWidth(wordWrap);
        this.descriptText = this.add.bitmapText(0,95,"Pixellari Blue", 'sample description text', 24).setOrigin(.5,0).setMaxWidth(wordWrap);


        this.shopPreview = this.add.container(this.game.canvas.width/2 + 50,this.game.canvas.height/2 - 50,
            [this.previewBackground,this.previewIcon,this.costText,this.descriptText,this.previewName]);
        this.shopPreview.alpha = 0;
    }

    initMoneyUI()
    {
        this.UImoney = this.add.bitmapText(game.config.width - 50, 50, "Pixellari White", "$" + this.economy.getCurrMoney()).setOrigin(1,0);
    }

    executeViaString(func='',args=[])
    {
        switch(func)
        {
            case "increaseBoardSize":
                if (args.length == 0){console.log('error with exec via str no args prov');break;}
                return this.increaseBoardSize(args[0]);
            case "addNewBuilding":
                if (args.length == 0){console.log('error with exec via str no args prov');break;}
                return this.purchaseBuilding(args[0]);
            default:
                console.log('shop given invalid execution string');
                break;
        }
    }

    increaseBoardSize(tileCost)
    {
        if (boardSize < 4 && this.economy.checkSpendMoney(tileCost))
        {
            this.economy.spendMoney(tileCost);
            boardSize += 1;
            return true;
        }
        return false;
    }

    purchaseBuilding(building)
    {
        if (this.economy.checkSpendMoney(building.metaData['shopCost']))
        {
            this.economy.spendMoney(building.metaData['shopCost']);
            this.addNewBuilding(building);
            return true;
        }
        return false;
    }

    addNewBuilding(building)
    {
        if (!possibleBuildingList.includes(building))
        {
            possibleBuildingList[possibleBuildingList.length]=building;
        }
    }

    update()
    {
        this.UImoney.setText("$" + this.economy.getCurrMoney());
    }
}