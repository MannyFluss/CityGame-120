class Board extends Phaser.GameObjects.Container
{
    constructor(scene,x=0,y=0,objs=[],config={})
    {
        super(scene,x,y,objs);
        this.config = config; //temp config["sprite"] = texture will be edited to make better boards easily
        this.sceneRef=scene;
        this.tileXOffset = 102;
        this.tileYOffset = this.tileXOffset/2;
        this.boardX= boardSize;//max size x and y
        this.boardY= boardSize;
        this.tileArray = this.createArray(this.boardX,this.boardY); //this is where the board
        this.objectArray = this.createArray(this.boardX,this.boardY);
        this.initalizeGrid();
    }

    getRandomTile()
    {
        return this.getTile(Phaser.Math.Between(0,this.boardX-1),Phaser.Math.Between(0,this.boardY-1))
    }

    createBuilding()//temporary building function
    {
        retBuilding = new Building(this.sceneRef,this,0,0,'small-apartment-1');

        return retBuilding;
    }

    checkValidTile(x,y)//true = in range false = not in range
    {
        if ((this.boardX > x && this.boardY > y ) && (x>=0 && y>= 0))
        {
            return true;
        }
        return false;
    }

    checkBoardEmpty()
    {
        for (let i=0; i<this.boardX; i++)
        {
            for (let j=0; j<this.boardY; j++)
            {
                if(!this.checkEmpty(i,j))
                {
                    return false;
                }
            }
        }
        return true;
    }

    checkEmpty(x,y)
    {
        if (this.objectArray[x][y]==null)
        {
            return true;
        }
        return false;
    }
    checkForBuildingType(type)
    {

        for (let x=0;x<this.boardX;x++)
        {
            for(let y=0;y<this.boardY;y++)
            {
                if (this.getBuildingAt(x,y)==null){continue;}
                if (this.getBuildingAt(x,y).constructor.name == type.name){return true;}
            }
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
        this.emit('boardStateChanged',this.objectArray);
    }
    getBuildingAt(x,y)
    {
        if (!this.checkValidTile(x,y))
        {
            //console.log("invalid tile get")
            return null;
        }
        return this.objectArray[x][y];        
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
        this.emit('fortniteBattlePass');
        if (!this.checkValidTile(x,y))
        {
            console.log("invalid tile placement");
            return;
        }
        let currTile = this.getTile(x,y);

        building.setPlacement(currTile);
        this.addToObjectArray(building, x, y);
        this.emit('boardStateChanged',this.objectArray);
    }

    addToObjectArray(object, x, y) {
        this.objectArray[x][y] = object;
    }

    onBuildingDestroy(building = undefined)
    {
        this.emit('onBuildingDestroy',[building]);
    }

    initalizeGrid()
    {
        for(let y=0;y<this.boardY;y++)
        {
            let locX = -(y * this.tileXOffset) + this.x;
            let locY = y * this.tileYOffset + this.y;

            for(let x=0;x<this.boardX;x++)
            {

                const toAdd = new Tile(this.sceneRef,locX,locY + 400,'tileSprite');//this can be cleaned up
                let randTemp = Phaser.Math.Between(900,1100);

                this.sceneRef.tweens.add({
                    targets: toAdd,
                    ease: Phaser.Math.Easing.Back.InOut,
//                    duration : 1200,
//                    delay: 50
        //            scale : {start : 2, end : 1.5},
                    y : locY,
                    duration : randTemp,
                });

                this.tileArray[x][y] = toAdd;
                toAdd.x = locX;
                // toAdd.y = locY;
                toAdd.tileX = x;
                toAdd.tileY = y;
                toAdd.boardRef = this;
                let temp = x+','+y;

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

    getNearestEmptyTile(worldX, worldY) 
    {
        let nearestTile = null;
        let nearestDist = Infinity;
        for (let tileRow of this.tileArray) {
            for (let tile of tileRow) {
                let distance = Math.pow(tile.x - worldX, 2) + Math.pow(tile.y - worldY, 2);
                if (distance < nearestDist && this.checkEmpty(tile.tileX, tile.tileY)) {
                    nearestDist = distance;
                    nearestTile = tile;
                }
            }
        }
        return nearestTile;
    }
}