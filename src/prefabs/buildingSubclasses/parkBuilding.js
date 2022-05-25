//does not work rn
class ParkBuilding extends Building
{
    static metaData = 
    {
        "texture" : 'small-park',
        "description" : "this building increases the amount of money adjacent buildings make",
        "name" : 'Park',
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [ParkBuilding],
    };
    constructor(scene,board,x,y,texture=ParkBuilding.metaData['texture'])
    {
        super(scene,board,x,y,texture);
        this.collisionSet = new Phaser.Structs.Set();
        //this.emit(,this.objectArray);
        this.board.on('boardStateChanged', (object)=>{this.checkBoard(object);})
    }

    objOrNULL(objectArray,x,y)
    {
        if ((this.boardX > x && this.boardY > y ) && (x>=0 && y>= 0))
        {
            return objectArray[x][y];
        }
        return null;
    }

    checkBoard(objectArr)
    {
        console.log('checking the board on PARK')
        let buildings = [this.objOrNULL(objectArr,this.tileX+1,this.tileY),this.objOrNULL(objectArr,this.tileX-1,this.tileY),
            this.objOrNULL(objectArr,this.tileX,this.tileY-1),this.objOrNULL(objectArr,this.tileX,this.tileY+1)];
        console.log(buildings);
        let new_set = new Phaser.Structs.Set();
        for (let i=0;i<buildings.length;i++)
        {
            if(buildings[i]==null || buildings[i]==undefined){continue;}
            if(this.collisionSet.contains(buildings[i]))
            {
                new_set.set(buildings[i]);
                continue;
            }
            if (this.collisionSet.contains(buildings[i])==false)
            {
                //emit signal
                new_set.set(buildings[i]);
                this.buildingEnteredArea(buildings[i]);
            }
        }
        let remaining_buildings = this.collisionSet.difference(this.new_set);
        //console.log(new_set.diff);
        //console.log(this.collisionSet);
        for (let i=0;i<remaining_buildings.length;i++)
        {
            this.buildingExitedArea(remaining_buildings[i]);
            //console.log(remaining_buildings[i]);
        }
        //console.log(remaining_buildings);

    }

    buildingEnteredArea(buiding)
    {
        console.log("building " + buiding + "has entered the area.");
    }

    buildingExitedArea(building)
    {
        console.log("building " + buiding + "has exited the area.");
    }

    setPlacement(tile)//get the tile, set the tile position
    {
        let buildings = this.getSurroundoundingBuildings();
        for (let i=0;i<buildings.length;i++)
        {
            if (buildings[i!=null])
            {
                buildings[i].resourceMultiplier = 1;
            }
            
        }
        
        this.x = tile.x;
        this.y = tile.y;
        this.tileParent = tile;
        //this might not be necessary
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
        console.log("Placing at", tile.tileX, tile.tileY);
        this.board.objectArray[tile.tileX][tile.tileY] = this;
        this.placementParticles();

        buildings = this.getSurroundoundingBuildings();
        for (let i=0;i<buildings.length;i++)
        {
            if (buildings[i!=null])
            {
                buildings[i].resourceMultiplier = 1.5;
            }
        }

    }

}

