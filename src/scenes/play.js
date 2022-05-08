class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
        this.songList = //name of each of the songs
        [
            "song1",
            "song2"
        ];

    }
    preload()
    {
        this.load.image('tileSprite','./assets/tile.png');
        this.load.image('buildingImage','/assets/building.png');
        
        for (let i=0; i< this.songList.length; i++)//this can be unsafe
        {
            this.load.audio(this.songList[i],'./assets/music/radioMusic/'+this.songList[i]);
            
        }
    }
    
    create()
    {
        this.boardConfig={
            "sprite" : 'tileSprite',
        }
        this.board = new Board(this,200,200,[],this.boardConfig);

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