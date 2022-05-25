//multi will be inserted with strings, left right up or down,
//based of the pivot the other tiles will be added,
//IE up up up creates a line block
//down right down creates the squiggle tetris, so on...

class MultiBuilding extends Building
{
    static metaData = 
    {
        "texture" : 'large-apartment-1',
        "description" : "this building is epic and large",
        "name" : 'multibuilding',
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [MultiBuilding],
    };
    constructor(scene,board,x,y,texture='large-apartment-1',multi=['left'])
    {
        super(scene,board,x,y,texture);
        this.multi = multi;
        scene.add.existing(this);

        this.setOrigin(.725, 1);
        
        // temporary smaller collision radius - we really need 2 circles, one for each tile
        let collisionRadius = this.width/5;
        this.body.setCircle(collisionRadius);
        this.body.setOffset(this.width/2-collisionRadius, this.height-collisionRadius*2);
        this.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.body.onCollide = true;

        // console.log(this.board)
        // console.log(this.tileX+" "+this.tileY);
        // console.log(this.ableToMove(this.tileX,this.tileY));
    }

    onMove()
    {
        super.onMove();
    }

    ableToMove(x,y)
    {
        if (this.board.checkValidTile(x,y) == false)
        {
            return false;
        }
        if (this.board.checkEmpty(x,y)==false)
        {
            if (this.board.getBuildingAt(x,y) != this)
            {
                return false;
            }   
        }
        for (let i=0;i<this.multi.length;i++)
        {
            switch(this.multi[i])
            {
                case 'up':
                    y-=1;
                    break;
                case 'down':
                    y +=1;
                    break;
                case 'left':
                    x-=1;
                    break;
                case 'right':
                    x+=1;
                    break;
                default:
                    console.log('error in multibuilding');
                    break;
            }
            if (this.board.checkValidTile(x,y) == false)
            {
                return false;
            }
            if (this.board.checkEmpty(x,y)==false)
            {
                if (this.board.getBuildingAt(x,y) != this)
                {
                    return false;
                }
                
            }   
        }


        return true;
    }
    
    getSurroundoundingBuildings()
    {
        return super.getSurroundoundingBuildings();
    }

    setPlacement(tile)//get the tile, set the tile position
    {

        this.x = tile.x;
        this.y = tile.y;
        this.tileParent = tile;
        //this might not be necessary
        
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
        //console.log("Placing at", tile.tileX, tile.tileY);
        this.board.objectArray[tile.tileX][tile.tileY] = this;
        this.onMove();
        for (let i=0;i<this.multi.length;i++)
        {
            let x = tile.tileX;
            let y = tile.tileY;
            switch(this.multi[i])
            {
                case 'up':
                    y-=1;
                    break;
                case 'down':
                    y +=1;
                    break;
                case 'left':
                    x-=1;
                    break;
                case 'right':
                    x+=1;
                    break;
                default:
                    console.log('error in multibuilding');
                    break;
            }
            // this.board.objectArray[x][y] = this;
            this.board.addToObjectArray(this, x, y)
        }
        

        this.placementParticles();
    }
    snapToTile() 
    {
        this.board.clearTile(this.tileX, this.tileY);

        let x = this.tileX;
        let y = this.tileY;
        for (let i=0;i<this.multi.length;i++)
        {
            switch(this.multi[i])
            {
                case 'up':
                    y-=1;
                    break;
                case 'down':
                    y +=1;
                    break;
                case 'left':
                    x-=1;
                    break;
                case 'right':
                    x+=1;
                    break;
                default:
                    console.log('error in multibuilding');
                    break;
            }
            this.board.clearTile(x,y);
        }

        let nearestTile = this.board.getNearestTile(this.x, this.y);
        this.setPlacement(nearestTile);
    }

    validBuildSpot(x,y)
    {
        if (this.board.checkValidTile(x,y)==false){return false;}
        for (let i=0;i<this.multi.length;i++)
        {
            switch(this.multi[i])
            {
                case 'up':
                    y-=1;
                    break;
                case 'down':
                    y +=1;
                    break;
                case 'left':
                    x-=1;
                    break;
                case 'right':
                    x+=1;
                    break;
                default:
                    console.log('error in multibuilding');
                    break;
            }
            if (this.board.checkValidTile(x,y)==false){return false;}
        }

        return true;
    }
    

    // multiIterator()
    // {
    //     for (let i = 0; i < 5 ; i++)
    //     {
    //         yield i;
    //     }
    //     return;
    // }





}