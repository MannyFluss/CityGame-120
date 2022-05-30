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

class FinishButton extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture='submit-button',targetSCN)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.economyRef = scene.economy;
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
        this.destroy();

        //insert the thing here
        new economyPanel(this.sceneRef,game.canvas.width/2,game.canvas.height/2)

        new SceneButton(this.sceneRef,20,game.config.height-20,'submit-button','shopScene').setOrigin(0, 1);
        //this.sceneRef.scene.start(this.targetSCN);
        if (this.sceneRef.type == Play)
        {
            console.log('osss')
        }
    }

}

class economyPanel extends Phaser.GameObjects.Container
{
    constructor(scene,x,y)
    {
        super(scene,x,y);
        this.economyRef = scene.economy;
        this.setDepth(100);
        scene.add.existing(this);
        this.background = new Phaser.GameObjects.Sprite(scene,0,0,'temp-background').setInteractive();
        this.background.on('pointerdown',()=>{
            this.destroy();
        })

        this.add(this.background);
        this.texts = [];
        this.texts[0] = new Phaser.GameObjects.Text(scene, 0 ,-80, 'City Successfully Built!');
        this.texts[1] = new Phaser.GameObjects.Text(scene, 0 , - 60 , 'Stats:');
        this.texts[2] = new Phaser.GameObjects.Text(scene, 0 ,-45, 'Disasters Endured: ' + this.economyRef.disastersEndured);
        this.texts[3] = new Phaser.GameObjects.Text(scene, 0 ,-30, 'Time Spent: ' + this.economyRef.timeSpent);
        this.texts[4] = new Phaser.GameObjects.Text(scene, 0 ,-15, 'Money Earned: ' + this.economyRef.currentMoney);
        this.texts[5] = new Phaser.GameObjects.Text(scene, 0 ,0, 'Current Money Multiplier: ' + moneyMultiplier + 'x');
        let temp = (moneyMultiplier*this.economyRef.currentMoney);
        this.texts[6] = new Phaser.GameObjects.Text(scene, 0 , 15, 'Total Money Earned: ' + temp);
        this.texts[7] = new Phaser.GameObjects.Text(scene, 0 ,30, 'New City-wide Budget: ' + (temp + money));//global money
        for (let i=0; i<this.texts.length;i++)
        {
            this.texts[i].setOrigin(.5,.5);
        }

        this.add(this.texts);

    }
}