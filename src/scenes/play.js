class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
        this.songList = //name of each of the songs
        [
            "omygodv2.mp3",
            "mannymoemnt.mp3",
        ];

    }

    preload()
    {
        //particles 
        this.load.image('pink','./assets/particles/pink.png');
        this.load.image('blue','./assets/particles/blue.png');
        this.load.image('green','./assets/particles/green.png');
        this.load.image('red','./assets/particles/red.png');
        this.load.image('yellow','./assets/particles/yellow.png');
        this.load.image('temp-background','./assets/tempArt/shopPrev.png');
        this.load.image('win-background','./assets/ui/win-background.png');
        
        this.load.image('shop-console','./assets/ui/shopOutline.png');
        this.load.image('shop-console-ben','./assets/ui/shopOutlineBen.png');
        this.load.image('shop-button','./assets/ui/shopButton.png');
        this.load.image('shop-button-ben','./assets/ui/shopButtonBen.png');
        this.load.image('outside-shop-button-ben','./assets/ui/outside-shop-button-ben.png');
        this.load.image('outsideShopBg','./assets/ui/outsideShopBg.png');
        this.load.image('refresh','./assets/ui/refresh.png');
        this.load.image('tutorialJohnson', './assets/other/tutorialJohnson.png');
        this.load.image('speech-bubble','./assets/ui/speechBubble.png');
        this.load.image('ben-speech-bubble','./assets/ui/ben-speech-bubble.png');

        this.load.atlas('particles','./assets/particles/spritesheet.png','./assets/particles/spritesheet.json');

        this.load.image('money','./assets/ui/dollar-sign.png');
        this.load.image('meteor','./assets/other/meteor.png');
        this.load.image('fireFX','./assets/other/fireFX.png');
        this.load.image("koth-marker",'./assets/goodwarning.png');
        this.load.image('tornado','./assets/tempArt/bad-tornado.png');
        this.load.image('small-factory','./assets/buildings/small-factory.png');
        this.load.image('small-windmill','./assets/buildings/small-windmill.png');
        this.load.image('repair-crew-1','./assets/buildings/repair-crew-1.png');
        this.load.image('small-park','./assets/buildings/small-park.png');
        this.load.image('submit-button','./assets/ui/finish-button.png');
        this.load.image('progress-frame','./assets/ui/progress-frame.png');
        this.load.image('progress-measure','./assets/ui/progress-measure.png');
        this.load.image('goal-progress-text','./assets/ui/goal-progress-text.png');
        this.load.image('tileSprite','./assets/tile.png');
        this.load.image('small-apartment-1','./assets/buildings/small-apartment-1.png');
        this.load.image('insurance-1','./assets/buildings/insurance-1.png');
        this.load.image('hotel-1','./assets/buildings/hotel-1.png');
        this.load.image('large-apartment-1','./assets/buildings/large-apartment-1.png');
        this.load.image('casino','./assets/buildings/casino.png');
        this.load.image('shop-1','./assets/buildings/shop-1.png');
        this.load.image('warning', './assets/warning.png');
        this.load.image('temp-button','./assets/tempArt/buttonz.png');
        this.load.image('radio-temp','./assets/tempArt/radioConsole.png');
        this.load.image('shop-temp','./assets/tempArt/shopConsole.png');
        //this.load.image('shop-button-temp','./assets/tempArt/shopButton.png');

        // Pixellari font has a 100% free license
        // https://www.dafont.com/pixellari.font
        // by Zacchary Dempsey-Plante
        this.load.bitmapFont('Pixellari',       'assets/ui/Pixellari/Pixellari.png',        'assets/ui/Pixellari/Pixellari.xml');
        this.load.bitmapFont('Pixellari White', 'assets/ui/Pixellari/PixellariWhite.png',   'assets/ui/Pixellari/PixellariWhite.xml');
        this.load.bitmapFont('Pixellari Red',   'assets/ui/Pixellari/PixellariRed.png',     'assets/ui/Pixellari/PixellariRed.xml');
        this.load.bitmapFont('Pixellari Green', 'assets/ui/Pixellari/PixellariGreen.png',   'assets/ui/Pixellari/PixellariGreen.xml');
        this.load.bitmapFont('Pixellari Blue', 'assets/ui/Pixellari/PixellariBlue.png',   'assets/ui/Pixellari/PixellariBlue.xml');

        this.load.audio('sfx_BuildingThump', './assets/sound/sfx/BuildingThump.wav');
        this.load.audio('sfx_warning', './assets/sound/sfx/Warning.wav');
        this.load.audio('sfx_meteor', './assets/sound/sfx/Meteor.wav');
        this.load.audio('sfx_ButtonPress', './assets/sound/sfx/ButtonPress.wav');
        this.load.audio('sfx_GoalAchieved', './assets/sound/sfx/GoalAchieved.wav');
        
        for (let i=0; i< this.songList.length; i++)//this can be unsafe
        {
            let x = this.load.audio(this.songList[i],'./assets/music/radioMusic/'+this.songList[i]);
        }

        // advance to the next level
        level += 1;
    }
    
    create()
    {
        
        this.boardConfig={
            "sprite" : 'tileSprite',
        }
        
        this.board = new Board(this, game.config.width/2, game.config.height/2, [], this.boardConfig);
        this.economy = new PlayEconomy(this, sceneInitMoney);
        this.radio = new Radio(this,-200,100,[],this.songList);
        this.shop = new Shop(this,game.config.width-120,game.config.height/2-100,[],this.board);
        
        this.threatGen = new ThreatGenerator(this,0,0,this.board);

        if (level == 1)
            this.initTutorial();
        else
        {
            if (level == 3)
                availableThreats.push('fog');
            if (level == 5)
                availableThreats.push('lightning');
                
            this.initWinCondition();
            this.board.placeBuilding(new SmallApartment(this,this.board,0,0), 0, 0);
        }

        this.initUI();
        
        this.cameras.main.fadeIn(1000, 57, 52, 87);
    }

    initTutorial()
    {
        new Tutorial(this,150,game.config.height - 180);
    }


    initWinCondition()
    {
        switch (level)
        {
            case 1:
                this.winCondition = new winState(this, "capitalism", {'moneyTotal' : 20});
                break;
            case 2:
                this.winCondition = new winState(this, "capitalism", {'moneyTotal' : 50});
                break;
            default:
                this.winCondition = new winState(this, "capitalism", {'moneyTotal' : level*150-200});
                break;
        }


        //new Meteor(this,0,0,'',5,this.board.getTile(0,0))

        //this.warning = new Warning(this,0,0);
        
        //this.warning.setWarningPlacement(this.board.getTile(0,0));

        //var spritetest = this.add.sprite(100,100,'tileSprite');
    }

    initUI()
    {
        this.UImoney = this.add.bitmapText(game.config.width - 50, 50, "Pixellari White", "$" + this.economy.getCurrMoney()).setOrigin(1,0);
    }

    update()
    {
        this.UImoney.setText("$" + this.economy.getCurrMoney());

        for(let x=0; x<this.board.boardX; x++) {
            for(let y=0; y<this.board.boardY; y++) {
                let building = this.board.objectArray[x][y];
                if(building != null) {
                    building.update();
                }
            }
        }

        this.threatGen.update();
    }
}