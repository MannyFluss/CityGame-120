class Board extends Phaser.GameObjects.Container
{
    constructor(scene,x=0,y=0,objs=[],config={})
    {
        super(scene,x,y,objs);
        this.config = config; //temp config["sprite"] = texture will be edited to make better boards easily
        this.sceneRef=scene;
        this.tileOffset = 30.0;
        this.boardX=3;//max size x and y
        this.boardY=3;
        this.tileArray = this.createArray(this.boardX,this.boardY); //this is where the board
        this.objectArray = this.createArray(this.boardX,this.boardY);
        this.initalizeGrid();

        this.placeBuilding(this.createBuilding,1,1);
    }

    createBuilding()//temporary building function
    {
        retBuilding = new Building(this.sceneRef,0,0,'buildingImage');

        return retBuilding;
    }    
    checkValidTile(x,y)//true = in range false = not in range
    {
        if (this.boardX > x && this.boardY > y)
        {
            return true;
        }
        return false;
    }
    getTile(x,y)//any interaction start @ 0,0
    {
        if (!this.checkValidTile(x,y))
        {
            console.log("invalid tile get")
            return null;
        }
        return this.tileArray[x][y];
    }
    placeBuilding(building,x,y)
    {
        if (!this.checkValidTile(x,y))
        {
            console.log("invalid tile placement");
            return;
        }
        let currTile = this.getTile(x,y);
        const toAdd = new Building(this.sceneRef,x,y,'buildingImage');//building isnt showing in front
        toAdd.setPlacement(currTile);
    }

    initalizeGrid()//test
    {
        for(let x=0;x<this.boardX;x++)
        {
            let locX = -(x * this.tileOffset) + this.x;
            let locY = x * this.tileOffset + this.y;

            for(let y=0;y<this.boardY;y++)
            {

                const toAdd = new Tile(this.sceneRef,locX,locY,'tileSprite');
                this.tileArray[x][y] = toAdd;
                toAdd.x = locX;
                toAdd.y = locY;
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