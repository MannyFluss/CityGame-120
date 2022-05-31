class Meter extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, width, height, texture, frame) {
        super(scene, x, y, width, height, texture, frame);
        scene.add.existing(this);
        this.scene = scene;

        this.total = width;
        this.width = 1;
    }

    // set the meter from 0 to 1
    set(value) {
        if (this.width != this.total) 
        {
            // Math.max prevents zero width error
            let newWidth = Math.max(value * this.total, 1);
    
            this.scene.tweens.add({
                targets: this,
                width: newWidth,
                duration: 200,
                ease: 'Power2',
            });
        }
    }
}