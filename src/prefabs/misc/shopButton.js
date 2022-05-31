class ShopButton extends Phaser.GameObjects.Container
{
    constructor(scene,x,y)
    {
        super(scene,x,y);
        scene.add.existing(this);
        this.backgroundPanel = new Phaser.GameObjects.Sprite(scene,0,0,'shop-button');
        this.buildingIcon = new Phaser.GameObjects.Sprite(scene, -20 ,0 ,'small-apartment-1');
        this.buildingIcon.setDisplaySize(20,20);
        this.setSize(this.backgroundPanel.displayWidth,this.backgroundPanel.displayHeight);

        this.setInteractive();
        //this.buildingIcon.height = 50;
        this.textIcon = scene.add.text(20,0,'sample text', { fontSize: 24 }).setOrigin(.5,.5);
        this.add([this.backgroundPanel,this.buildingIcon,this.textIcon]);
        this.sceneRef = scene;
    }


    updateBuildings(building)
    {
        //let temp = new building(this.sceneRef,this.sceneRef.board,-500,-500);
        //console.log(temp.texture)
        this.buildingIcon.setTexture(building.metaData['texture']);
        this.textIcon.setText(building.metaData["placeCost"]);
        //temp.destroyThisBu();
    }
}