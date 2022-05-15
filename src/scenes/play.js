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
        this.load.audio('sfx_buildingThump', './assets/sound/sfx/BuildingThump.wav');
        this.load.audio('sfx_meteor', './assets/sound/sfx/Meteor.wav');
        this.load.audio('sfx_warning', './assets/sound/sfx/Warning.wav');

        this.load.image('tileSprite','./assets/tile.png');
        this.load.image('small-apartment-1','./assets/buildings/small-apartment-1.png');
        this.load.image('hotel-1','./assets/buildings/hotel-1.png');
        this.load.image('warning', './assets/warning.png');
        
        for (let i=0; i< this.songList.length; i++)//this can be unsafe
        {
            
            let x = this.load.audio(this.songList[i],'./assets/sound/radioMusic/'+this.songList[i]);
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

        this.warningTimer = 0; // Timer until next warning spawn
        this.warningLength = 10000; // Time until next warning spawn

        this.warnings = []; // Array of current warnings
        this.disasters = []; // Array of current disaster timers

        this.disasterLength = 5000; // Time between warning spawn and disaster
        
        this.initUI()

        this.sfx_buildingThump = this.sound.add('sfx_buildingThump');
        this.sfx_meteor = this.sound.add('sfx_meteor');
        this.sfx_warning = this.sound.add('sfx_warning');
        this.sfx_warning.setVolume(1.5);
        this.sfx_meteor.setVolume(1.5);
    }

    initUI()
    {
        this.UImoney = this.add.text(50, 50, money);
    }

    update(timer, delta)
    {
        this.warningTimer += delta;
        if (this.warningTimer >= this.warningLength) {
            this.spawnWarning();
            this.warningTimer = 0;
        }

        this.UImoney.text = money;
        for(let x=0; x<this.board.boardX; x++) {
            for(let y=0; y<this.board.boardY; y++) {
                let building = this.board.objectArray[x][y];
                if(building != null) {
                    building.update();
                }
            }
        }

        for(let i=0; i < this.warnings.length; i++) {
            this.warnings[i].update();
            this.disasters[i] += delta;
            if(this.disasters[i] >= this.disasterLength) {
                let warning = this.warnings.shift();
                let disaster = this.disasters.shift();
                console.log("Disaster happening at (" + warning.tileX + ", " + warning.tileY + ")!");
                this.board.destroyBuilding(warning.tileX, warning.tileY);
                this.sfx_meteor.play();
                warning.destroy();
                disaster = null;
            }
        }

    }

    spawnWarning() {
        let warning = new Warning(this,0,0);
        this.warnings.push(warning);
        this.sfx_warning.play();
        let disaster = 0;
        this.disasters.push(disaster);
        let warningX = Phaser.Math.Between(0, this.board.boardX - 1);
        let warningY = Phaser.Math.Between(0, this.board.boardY - 1);
        warning.setWarningPlacement(this.board.getTile(warningX,warningY));
    }
}