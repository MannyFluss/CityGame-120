class ShopButton extends Phaser.GameObjects.Container
{
    constructor(scene,x,y)
    {
        super(scene,x,y);
        scene.add.existing(this);
        this.backgroundPanel = new Phaser.GameObjects.Sprite(scene,0,0,'shop-button-ben');
        this.buildingIcon = new Phaser.GameObjects.Sprite(scene, -30 ,0 ,'small-apartment-1');
        this.setSize(this.backgroundPanel.displayWidth,this.backgroundPanel.displayHeight);

        //this.buildingIcon.height = 50;
        this.textIcon = scene.add.bitmapText(35,3,"Pixellari", 'sample text', 32).setOrigin(.5,.5);
        this.textIcon.setFont("Pixellari Green");
        this.add([this.backgroundPanel,this.buildingIcon,this.textIcon]);
        this.sceneRef = scene;
        this.buildingCost = undefined;
        this.setInteractive({ useHandCursor:true });

        this.scene.economy.on('onMoneyChanged', (currentMoney) => {
            if (this.buildingCost != undefined) {
                if (currentMoney >= this.buildingCost)
                    this.textIcon.setFont("Pixellari Green");
                else
                    this.textIcon.setFont("Pixellari Red");
            }
        });
    }


    updateBuildings(building)
    {
        //let temp = new building(this.sceneRef,this.sceneRef.board,-500,-500);
        //console.log(temp.texture)
        this.buildingIcon.setTexture(building.metaData['texture']);

        // scale the building to fit inside the button
        this.buildingIcon.scale = 0;
        while (this.buildingIcon.displayHeight < this.backgroundPanel.height-35)
            this.buildingIcon.scale += .1;

        this.buildingCost = building.metaData["placeCost"];
        this.textIcon.setText("$" + this.buildingCost);
        //temp.destroyThisBu();
    }
}