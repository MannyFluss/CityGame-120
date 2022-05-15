class SceneButton extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,targetSCN)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.targetSCN = targetSCN;
        this.sceneRef = scene;
        this.setInteractive();
        this.on('pointerdown',()=>{
            this.clicked();
        });
        
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