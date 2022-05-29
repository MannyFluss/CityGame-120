class ShopButton extends Phaser.GameObjects.Container
{
    constructor(scene,x,y)
    {
        super(scene,x,y);
        scene.add.existing(this);
        this.backgroundPanel = new Phaser.GameObjects.Sprite(scene,0,0,'shop-button-temp');
        this.buildingIcon = new Phaser.GameObjects.Sprite(scene, -80 ,0 ,'small-apartment-1');
        this.buildingIcon.setDisplaySize(50,50);
        this.setSize(this.backgroundPanel.displayWidth,this.backgroundPanel.displayHeight);

        this.setInteractive();
        //this.buildingIcon.height = 50;
        this.textIcon = scene.add.text(40,0,'sample text', { fontSize: 32 });
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