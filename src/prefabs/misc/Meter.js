class Meter extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, width, height, texture, frame) {
        super(scene, x, y, width, height, texture, frame);
        scene.add.existing(this);

        this.total = width;
    }

    // set the meter from 0 to 1
    set(value) {
        // Math.max prevents zero width error
        this.width = Math.max(value * this.total, 1);
    }
}