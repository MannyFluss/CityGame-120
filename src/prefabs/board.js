class Board extends Phaser.GameObjects.Container
{
    constructor(scene,x=0,y=0,objs=[],config={})
    {
        super(scene,x,y,objs);
        this.config = config; //temp config["sprite"] = texture
        this.sceneRef=scene;
        this.tileOffset = 30.0;
        this.tileArray = this.createArray(3,3);
        this.initalizeGrid();
    }

    initalizeGrid()
    {
        for(let x=0;x<3;x++)
        {
            let locX = -(x * this.tileOffset) + this.x;
            let locY = x * this.tileOffset + this.y;

            for(let y=0;y<3;y++)
            {
                this.tileArray[x][y] = this.sceneRef.add.sprite(locX,locY,'tileSprite');
                let temp = x+','+y;
                this.sceneRef.add.text(locX,locY,temp);
                
                locX += this.tileOffset;
                locY += this.tileOffset;   
            }
        }

    }
    createArray(length,width) {
        var arr = new Array(length);

        for (let i=0;i<length;i++)
        {
            arr[i] = new Array(width);
        }
    
        return arr;
    }
}