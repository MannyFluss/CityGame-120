class ShopScene extends Phaser.Scene
{
    constructor()
    {
        super('shopScene');
    }

    preload()
    {
        this.load.image('submit-button','./assets/tempArt/check.png');
    }
    create()
    {

        
        new SceneButton(this,50,50,'submit-button','playScene');


    }
}