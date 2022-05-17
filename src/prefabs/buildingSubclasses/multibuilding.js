//multi will be inserted with strings, left right up or down,
//based of the pivot the other tiles will be added,
//IE up up up creates a line block
//down right down creates the squiggle tetris, so on...

class MultiBuilding extends Building
{
    constructor(scene,x,y,texture,multi=['left'])
    {
        super(scene,x,y,texture);
        this.multi = multi;
        scene.add.existing(this);
        // console.log(this.getBoard())
        // console.log(this.tileX+" "+this.tileY);
        // console.log(this.ableToMove(this.tileX,this.tileY));
    }
    getBoard()//work around
    {
        return this.sceneRef.board;
    }

    ableToMove(x,y)
    {
        let board = this.getBoard();
        
        if (this.getBoard().checkValidTile(x,y) == false)
        {
            return false;
        }
        if (board.checkEmpty(x,y)==false)
        {
            if (board.getBuildingAt(x,y) != this)
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
                    break
            }
            if (this.getBoard().checkValidTile(x,y) == false)
            {
                return false;
            }
            if (board.checkEmpty(x,y)==false)
            {
                if (board.getBuildingAt(x,y) != this)
                {
                    return false;
                }
                
            }   
        }


        return true;
    }
    
    setPlacement(tile)//get the tile, set the tile position
    {

        
        this.x = tile.x;
        this.y = tile.y;
        this.tileParent = tile;
        //this might not be necessary
        
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
        console.log("Placing at", tile.tileX, tile.tileY);
        this.getBoard().objectArray[tile.tileX][tile.tileY] = this;
        let x = tile.tileX;
        let y = tile.tileY
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
                    break
            }
            this.getBoard().objectArray[x][y] = this;
        }
        

        this.placementParticles();
    }
    snapToTile() 
    {
        let boardRef = this.getBoard();
        boardRef.clearTile(this.tileX, this.tileY);

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
                    break
            }
            this.getBoard().clearTile(x,y);
        }

        let nearestTile = boardRef.getNearestTile(this.x, this.y);
        this.setPlacement(nearestTile);
    }

    validBuildSpot(x,y)
    {
        if (this.getBoard().checkValidTile(x,y)==false){return false;}
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
                    break
            }
            if (this.getBoard().checkValidTile(x,y)==false){return false;}
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