class Credits extends Phaser.Scene
{
    constructor()
    {
        super("creditsScene");
    }

    preload()
    {
        this.load.image('hotel-1','./assets/buildings/hotel-1.png');
    }

    create()
    {
        this.defaultTile = new Tile(this, 250, 500, 'tile');

        this.menuTile = new Tile(this, 550, 500, 'tile');
        this.menuText = this.add.text(550, 500, 'MENU', { fontSize: 64 }).setOrigin(0.5, 0);

        this.creditsText = this.add.text(400, 50, 'Developed By:', { fontSize: 64 }).setOrigin(0.5, 0);
        this.benText = this.add.text(400, 100, 'Benjamin Paulsen', { fontSize: 64 }).setOrigin(0.5, 0);
        this.manasText = this.add.text(400, 150, 'Manas Sara', { fontSize: 64 }).setOrigin(0.5, 0);
        this.mannyText = this.add.text(400, 200, 'Manny Fluss', { fontSize: 64 }).setOrigin(0.5, 0);

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