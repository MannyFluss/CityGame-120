class SceneButton extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,targetSCN)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        let target = this.x;
        this.x -= 1500;
        this.targetSCN = targetSCN;
        this.sceneRef = scene;
        this.setInteractive({ useHandCursor:true });
        this.on('pointerdown',()=>{
            this.clicked();
        });
        if (!(level==1) || this.scene.type==Play)
        {
            scene.tweens.add({
                targets: this,
                ease: 'Sine.easeInOut',
                duration : 1 * 1000, 
                x : target,
            });
        }
        
    }
    clicked()
    {
        // transfer money to next scene
        this.sceneRef.economy.sceneEnd();
        // begin next scene
        this.sceneRef.scene.start(this.targetSCN);

        if (this.sceneRef.radio != undefined)
        {
            this.sceneRef.radio.killMusic();
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
        this.x -= 1000;
        this.targetSCN = targetSCN;
        this.sceneRef = scene;
        this.setInteractive({useHandCursor: true});
        this.on('pointerdown',()=>{
            this.clicked();
        });
        scene.tweens.add({
            targets: this,
            ease: 'Sine.easeInOut',
            duration : 1 * 1000, 
            x : target,
        });
        
    }
    clicked()
    {
        this.destroy();

        //insert the thing here
        new economyPanel(this.sceneRef,game.canvas.width/2,game.canvas.height/2)

        new SceneButton(this.sceneRef,20,game.config.height-20,'submit-button','shopScene').setOrigin(0, 1);
        //this.sceneRef.scene.start(this.targetSCN);
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
        this.background = new Phaser.GameObjects.Sprite(scene,0,0,'win-background').setInteractive();
        this.background.on('pointerdown',()=>{
            this.destroy();
        })

        this.add(this.background);
        this.texts = [];

        this.texts[0] = new Phaser.GameObjects.BitmapText(scene, 0, -120, "Pixellari Green", 'City Successfully Built!', 32);
        this.texts[1] = new Phaser.GameObjects.BitmapText(scene, 0, -80 , "Pixellari Blue", 'Stats:', 24);
        this.texts[2] = new Phaser.GameObjects.BitmapText(scene, 0, -40, "Pixellari Blue", 'Disasters Endured: ' + this.economyRef.disastersEndured, 24);
        this.texts[3] = new Phaser.GameObjects.BitmapText(scene, 0, -15, "Pixellari Blue", 'Time Spent: ' + this.economyRef.timeSpent, 24);
        this.texts[4] = new Phaser.GameObjects.BitmapText(scene, 0, 10, "Pixellari Blue", 'Money Earned: ' + this.economyRef.currentMoney, 24);
        this.texts[5] = new Phaser.GameObjects.BitmapText(scene, 0, 35, "Pixellari Blue", 'Current Money Multiplier: ' + moneyMultiplier + 'x', 24);
        let temp = (moneyMultiplier*this.economyRef.currentMoney);
        this.texts[6] = new Phaser.GameObjects.BitmapText(scene, 0, 60, "Pixellari Blue", 'Total Money Earned: ' + temp, 24);
        this.texts[7] = new Phaser.GameObjects.BitmapText(scene, 0, 85, "Pixellari Blue", 'New City-wide Budget: ' + (temp + money), 24);//global money
        for (let i=0; i<this.texts.length;i++)
        {
            this.texts[i].setOrigin(.5,.5);
        }

        this.add(this.texts);

    }
}