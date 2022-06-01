class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
        this.songList = //name of each of the songs
        [
            "mannymoemnt.mp3",
            "omygodv2.mp3"
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
        this.load.image('tileSprite','./assets/tile.png');
        this.load.image('small-apartment-1','./assets/buildings/small-apartment-1.png');
        this.load.image('hotel-1','./assets/buildings/hotel-1.png');
        this.load.image('large-apartment-1','./assets/buildings/large-apartment-1.png');
        this.load.image('casino','./assets/buildings/casino.png');
        this.load.image('shop-1','./assets/buildings/shop-1.png');
        this.load.image('dollar-sign','./assets/ui/dollar-sign.png');
        this.load.image('warning', './assets/warning.png');
        this.load.image('temp-button','./assets/tempArt/buttonz.png');
        this.load.image('radio-temp','./assets/tempArt/radioConsole.png');
        this.load.image('shop-temp','./assets/tempArt/shopConsole.png');
        this.load.image('shop-button-temp','./assets/tempArt/shopButton.png');

        this.load.audio('sfx_BuildingThump', './assets/sound/sfx/BuildingThump.wav');
        this.load.audio('sfx_warning', './assets/sound/sfx/Warning.wav');
        this.load.audio('sfx_meteor', './assets/sound/sfx/Meteor.wav');
        this.load.audio('sfx_ButtonPress', './assets/sound/sfx/ButtonPress.wav');
        this.load.audio('sfx_GoalAchieved', './assets/sound/sfx/GoalAchieved.wav');
        
        for (let i=0; i< this.songList.length; i++)//this can be unsafe
        {
            let x = this.load.audio(this.songList[i],'./assets/music/radioMusic/'+this.songList[i]);
        }
    }
    
    create()
    {
        
        this.boardConfig={
            "sprite" : 'tileSprite',
        }
        
        this.board = new Board(this, game.config.width/2, 250, [], this.boardConfig);
        this.economy = new PlayEconomy(this);
        this.radio = new Radio(this,100,100,[],this.songList);
        this.shop = new Shop(this,700,400,[],this.board).setScale(.5);
        
        this.initWinCondition();
        this.threatGen = new ThreatGenerator(this,0,0,this.board);
        this.board.placeBuilding(new SmallApartment(this,this.board,0,0), 0, 0);
        this.initUI();
    }

    initWinCondition()
    {
        
        this.winCondition = new winState(this,"capitalism",{'moneyTotal' : 15});


        //new Meteor(this,0,0,'',5,this.board.getTile(0,0))

        //this.warning = new Warning(this,0,0);
        
        //this.warning.setWarningPlacement(this.board.getTile(0,0));

        
        this.initUI()
        //var spritetest = this.add.sprite(100,100,'tileSprite');

        this.cameras.main.fadeIn(1000, 57, 52, 87);
    }

    initUI()
    {
        this.UImoney = this.add.text(50, 50, this.economy.getCurrMoney());
    }

    update()
    {
        this.UImoney.text = this.economy.getCurrMoney();
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