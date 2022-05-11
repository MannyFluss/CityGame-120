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
        this.load.image('tileSprite','./assets/tile.png');
        this.load.image('small-apartment-1','./assets/buildings/small-apartment-1.png');
        this.load.image('hotel-1','./assets/buildings/hotel-1.png');
        this.load.image('warning', './assets/warning.png');
        
        for (let i=0; i< this.songList.length; i++)//this can be unsafe
        {
            
            let x = this.load.audio(this.songList[i],'./assets/music/radioMusic/'+this.songList[i]);
        }
    }
    
    create()
    {
        this.test = new winState(this,"test");

        this.boardConfig={
            "sprite" : 'tileSprite',
        }
        this.board = new Board(this, game.config.width/2, 250, [], this.boardConfig);
        this.radio = new Radio(this,0,0,[],this.songList);
        this.shop = new Shop(this,0,0,[],this.board);


        this.warning = new Warning(this,0,0);
        this.warning.setWarningPlacement(this.board.getTile(0,0));

        
        this.initUI()
        //var spritetest = this.add.sprite(100,100,'tileSprite');
    }

    initUI()
    {
        this.UImoney = this.add.text(50, 50, money);
    }

    update()
    {
        this.UImoney.text = money;
        for(let x=0; x<this.board.boardX; x++) {
            for(let y=0; y<this.board.boardY; y++) {
                let building = this.board.objectArray[x][y];
                if(building != null) {
                    building.update();
                }
            }
        }

        this.warning.update();
    }
}