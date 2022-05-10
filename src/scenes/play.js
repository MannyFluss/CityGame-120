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
        this.load.image('small-apartment-1','/assets/small-apartment-1.png');
        
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
        this.radio = new Radio(this,0,0,[],this.songList);
        this.shop = new Shop(this,0,0,[],this.board);

        
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
    }
}