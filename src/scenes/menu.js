class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.image('tile','./assets/tile.png');
        this.load.image('small-apartment-1','./assets/buildings/small-apartment-1.png');
    }

    create()
    {
        this.defaultTile = new Tile(this, 400, 300, 'tile');
        
        this.playTile = new Tile(this, 250, 450, 'tile');
        this.playText = this.add.text(250, 450, 'PLAY', { fontSize: 64 }).setOrigin(0.5, 0);

        this.creditsTile = new Tile(this, 550, 450, 'tile');
        this.creditsText = this.add.text(550, 450, 'CREDITS', { fontSize: 64 }).setOrigin(0.5, 0);

        this.tileRow = [this.defaultTile, this.playTile, this.creditsTile];

        this.menuBuilding = new MenuBuilding(this, this.defaultTile.x, this.defaultTile.y, "small-apartment-1");
        this.menuBuilding.tileParent = this.defaultTile;

        this.emitter = new Phaser.Events.EventEmitter();
        this.emitter.on("sceneSelected", this.selectScene);

        this.cameras.main.fadeIn(500, 57, 52, 87);
    }

    update()
    {
        if(this.menuBuilding.tileParent == this.playTile)
        {
            this.emitter.emit('sceneSelected', this.cameras.main, 1000);
            this.menuBuilding.tileParent = this.defaultTile;
            this.time.delayedCall(1000, () => {
                this.scene.start('playScene');
            });
        }
        if(this.menuBuilding.tileParent == this.creditsTile)
        {
            this.emitter.emit('sceneSelected', this.cameras.main, 500);
            this.menuBuilding.tileParent = this.defaultTile;
            this.time.delayedCall(500, () => {
                this.scene.start('creditsScene');
            });
        }
    }

    selectScene(camera, fadeTime)
    {
        camera.fadeOut(fadeTime,57,52,87);
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