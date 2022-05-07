class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }
    preload()
    {
        this.load.image('tileSprite','./assets/tile.png');
        this.load.image('buildingImage','/assets/building.png');
        
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