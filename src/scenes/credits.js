class Credits extends Phaser.Scene
{
    constructor()
    {
        super("creditsScene");
    }

    preload()
    {
        this.load.image('hotel-1','./assets/buildings/hotel-1.png');
        this.load.image('ben-paulsen','./assets/ui/ben-paulsen.png');
        this.load.image('manny-fluss','./assets/ui/manny-fluss.png');
        this.load.image('manas-sara','./assets/ui/manas-sara.png');
        this.load.image('liam-fahey','./assets/ui/liam-fahey.png');
        this.load.image('menu-text','./assets/ui/menu-text.png');
    }

    create()
    {
        let tileOffset = 150;
        this.defaultTile = new Tile(this, game.config.width/2-tileOffset, 700, 'tile');

        this.menuTile = new Tile(this, game.config.width/2+tileOffset, 675, 'tile');
        this.menuText = this.add.sprite(game.config.width/2+tileOffset, 700, 'menu-text').setOrigin(0.5, 0);

        this.benText = this.add.sprite(game.config.width/2, 50, 'ben-paulsen').setOrigin(0.5, 0);
        this.mannyText = this.add.sprite(game.config.width/2, 150, 'manny-fluss').setOrigin(0.5, 0);
        this.manasText = this.add.sprite(game.config.width/2, 250, 'manas-sara').setOrigin(0.5, 0);
        this.liamText = this.add.sprite(game.config.width/2, 350, 'liam-fahey').setOrigin(0.5, 0);

        this.tileRow = [this.defaultTile, this.menuTile];

        this.menuBuilding = new MenuBuilding(this, this.defaultTile.x, this.defaultTile.y, "hotel-1");
        this.menuBuilding.tileParent = this.defaultTile;

        this.emitter = new Phaser.Events.EventEmitter();
        this.emitter.on("sceneSelected", this.selectScene);

        this.cameras.main.fadeIn(500, 57, 52, 87);
    }

    update()
    {
        if(this.menuBuilding.tileParent == this.menuTile)
        {
            this.emitter.emit('sceneSelected', this.cameras.main, 500);
            this.menuBuilding.tileParent = this.defaultTile;
            this.time.delayedCall(500, () => {
                this.scene.start('menuScene');
            });
        }
    }

    selectScene(camera, fadeTime)
    {
        camera.fadeOut(fadeTime, 57,52,87);
    }

    getNearestTile(worldX, worldY) 
    {
        let nearestTile;
        let nearestDist = Infinity;
        for (let tile of this.tileRow) {
            let distance = Math.pow(tile.x - worldX, 2) + Math.pow(tile.y - worldY, 2);
            if (distance < nearestDist) {
                nearestDist = distance;
                nearestTile = tile;
            }
        }
        return nearestTile;
    }
}