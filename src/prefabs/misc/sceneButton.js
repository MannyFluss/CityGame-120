class SceneButton extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,targetSCN)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        let target = this.x;
        this.x -= 1000
        this.targetSCN = targetSCN;
        this.sceneRef = scene;
        this.setInteractive();
        this.on('pointerdown',()=>{
            this.clicked();
        });
        let tween = scene.tweens.add({
            targets: this,
            ease: 'Sine.easeInOut',
            duration : 1 * 1000, 
            x : target
        })
        
    }
    clicked()
    {
        this.sceneRef.scene.start(this.targetSCN);
        if (this.sceneRef.type == Play)
        {
            console.log('osss')
        }
    }

}