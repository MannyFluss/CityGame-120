class Board extends Phaser.GameObjects.Container
{
    constructor(scene,x=0,y=0,objs=[],config={})
    {
        super(scene,x,y,objs);
        this.config = config; //temp config["sprite"] = texture will be edited to make better boards easily
        this.sceneRef=scene;
        this.tileXOffset = 100;
        this.tileYOffset = this.tileXOffset/2;
        this.boardX= boardSize;//max size x and y
        this.boardY= boardSize;
        this.tileArray = this.createArray(this.boardX,this.boardY); //this is where the board
        this.objectArray = this.createArray(this.boardX,this.boardY);
        this.initalizeGrid();

        
        
        //this.placeBuilding(new Building(this.sceneRef,0,0,'hotel-1'), 1, 0);
        // retBuilding.moveBuilding('down');
        // retBuilding.moveBuilding('left');
    }

    getRandomTile()
    {
        return this.getTile(Phaser.Math.Between(0,this.boardX-1),Phaser.Math.Between(0,this.boardY-1))
    }
    createBuilding()//temporary building function
    {
        retBuilding = new Building(this.sceneRef,0,0,'small-apartment-1');

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

    clearTile(x,y)
    {
        if (!this.checkValidTile(x,y))
        {
            console.log("invalid tile get");
            return;
        }
        this.objectArray[x][y]=null;
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

        /*
        let toAdd = building;
        this.objectArray[x][y] = toAdd;
        */

        //let toTest = this.sceneRef.add.sprite(200,200,'small-apartment-1');//building isnt showing in front
        building.setPlacement(currTile);
    }

    // possibly temporary - maybe change to use the standard building remover
    removeBuilding(x, y) {
        this.objectArray[x][y] = null;
    }

    initalizeGrid()
    {
        for(let y=0;y<this.boardY;y++)
        {
            let locX = -(y * this.tileXOffset) + this.x;
            let locY = y * this.tileYOffset + this.y;

            for(let x=0;x<this.boardX;x++)
            {

                const toAdd = new Tile(this.sceneRef,locX,locY,'tileSprite');//this can be cleaned up
                this.tileArray[x][y] = toAdd;
                toAdd.x = locX;
                toAdd.y = locY;
                toAdd.tileX = x;
                toAdd.tileY = y;
                toAdd.boardRef = this;
                let temp = x+','+y;
                this.sceneRef.add.text(locX,locY,temp);

                locX += this.tileXOffset;
                locY += this.tileYOffset;   
            }
        }
    }

    createArray(length,width) 
    {
        var arr = new Array(length);

        for (let i=0;i<length;i++)
        {
            arr[i] = new Array(width);
        }
    
        return arr;
    }

    getNearestTile(worldX, worldY) 
    {
        let nearestTile;
        let nearestDist = Infinity;
        for (let tileRow of this.tileArray) {
            for (let tile of tileRow) {
                let distance = Math.pow(tile.x - worldX, 2) + Math.pow(tile.y - worldY, 2);
                if (distance < nearestDist) {
                    nearestDist = distance;
                    nearestTile = tile;
                }
            }
        }
        return nearestTile;
    }
}