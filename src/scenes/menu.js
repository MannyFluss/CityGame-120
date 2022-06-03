class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.image('logo', './assets/promo/logo.png');
        this.load.image('tile','./assets/tile.png');
        this.load.image('small-apartment-1','./assets/buildings/small-apartment-1.png');
        this.load.image('pixel','./assets/other/pixel.png');
        this.load.image('credits-text','./assets/ui/credits-text.png');
        this.load.image('play-text','./assets/ui/play-text.png');
        this.load.image('drag-here','./assets/ui/drag-here.png');
        this.load.image('drag-arrow','./assets/ui/drag-arrow.png');

        this.load.audio('sfx_BuildingThump', './assets/sound/sfx/BuildingThump.wav')
    }

    create()
    {
        let tileOffset = 150;

        this.defaultTile = new Tile(this, config.width / 2, config.height/2, 'tile'); // y-value used to be 300
        
        this.playTile = new Tile(this, config.width / 2 - tileOffset, config.height/2 + tileOffset/2, 'tile'); // y-value used to be 450
        this.playText = new BasicSprite(this, config.width / 2 - tileOffset, config.height/2 + tileOffset/2 + 15, 'play-text').setOrigin(0.5, 0);

        this.creditsTile = new Tile(this, config.width / 2 + tileOffset, config.height/2 + tileOffset/2, 'tile'); // y-value used to be 450
        this.creditsText = new BasicSprite(this, config.width / 2 + tileOffset, config.height/2 + tileOffset/2 + 15, 'credits-text').setOrigin(0.5, 0);

        this.tileRow = [this.defaultTile, this.playTile, this.creditsTile];

        this.menuBuilding = new MenuBuilding(this, this.defaultTile.x, this.defaultTile.y, "small-apartment-1");
        this.menuBuilding.tileParent = this.defaultTile;

        this.menuBlocker = new BasicSprite(this, config.width/2, config.height/2, 'pixel').setScale(config.width);
        this.tweens.add({
            targets: this.menuBlocker,
            alpha: 0,
            ease: 'Power2',
            duration : 1000,
            delay: 2400,
        });

        let logoScale = .5;
        this.logo = this.add.image(config.width/2, config.height/2, 'logo').setOrigin(.5,0).setScale(0);

        // stage 1: logo zooms towards camera
        this.tweens.add({
            targets: this.logo,
            scale: 1,
            y: 40,
            ease: Phaser.Math.Easing.Quadratic.Out,
            duration : 1000,
        });

        // stage 2: logo goes right
        this.tweens.add({
            targets: this.logo,
            x : config.width - this.logo.width/2*logoScale,
            ease: Phaser.Math.Easing.Quadratic.InOut,
            duration : 1000,
            delay: 1800,
        });

        // stage 2: logo shrinks
        this.tweens.add({
            targets: this.logo,
            scale: .5,
            y: 0,
            ease: Phaser.Math.Easing.Quartic.InOut,
            duration : 1000,
            delay: 1800,
        });

        this.dragTooltip = new BasicSprite(this, config.width / 2 - tileOffset - 90, config.height/2 - 90, 'drag-here').setOrigin(0.5, 0.5).setScale(.5).setAlpha(0);
        this.dragArrow = new BasicSprite(this, config.width / 2 - tileOffset + 25, config.height/2 - 50, 'drag-arrow').setOrigin(0.5, 0.5).setAlpha(0);
        
        // stage 3: fade in the drag tooltip
        this.tweens.add({
            targets: [this.dragTooltip, this.dragArrow],
            alpha: 1,
            ease: Phaser.Math.Easing.Quartic.InOut,
            duration : 1300,
            delay: 3500,
        });

        // stage 4: softly flash the drag tooltip
        this.tweens.add({
            targets: [this.dragTooltip, this.dragArrow],
            alpha: .5,
            ease: Phaser.Math.Easing.Quadratic.In,
            duration : 800,
            delay: 4800,
            yoyo: true,
            repeat: -1,
        });

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