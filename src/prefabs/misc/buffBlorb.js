class Blorb extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,target)
    {
        super(scene,x,y);
        this.x = x;
        this.y = y;
        scene.add.existing(this);

        let life = 1000;

        this.particles = scene.add.particles("particles");
        this.emitter = this.particles.createEmitter(
            {
                x : this.x,
                y : this.y,
                speed : 100,
                lifespan: 300,
                scale : {min:.1, max: 1.2}
                
            }
        )

        scene.time.delayedCall(life,()=>{this.finished();},this);
        scene.tweens.add({
            targets: this,
            ease: 'Sine.easeOut',
            y : target.y,
            x : target.x,
            duration : life,
        })
        this.timer = scene.time.addEvent({
            delay: 16,                // ms
            callback: this.timeElapsed,
            callbackScope : this,
            loop: true
        });
    }
    timeElapsed()
    {
        this.emitter.setPosition(this.x,this.y);
    }


    finished()
    {
        this.emitter.stop();
        this.destroy();
    }
}