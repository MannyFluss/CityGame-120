class Building extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,frame)
    {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.setOrigin(.5, .5);

        this.setInteractive({
            draggable: true,
            useHandCursor: true
        });

        this.on('drag', (pointer, dragX, dragY) => {
            this.x = dragX;
            this.y = dragY;
        });

        this.on('dragend', (pointer, dragX, dragY) => {
            this.snapToTile();
        });
        
        this.tileX;
        this.tileY;
        this.tileParent;
        this.setScale(.1);
        this.state = "idle";

        this.timer = scene.time.addEvent({
            delay: 500,                // ms
            callback: this.timeElapsed,
            args: [500],
            loop: true
        });
    }

    timeElapsed(delta)
    {
        money += 1;
        switch(this.state)
        {
            case 'idle':
                //look for input
                break;
            default:
                break;
        }

    }

    getBoard()
    {
        return this.tileParent.boardRef;
    }

    destroyThisBuilding()
    {
        //clear the obj array @ this buildings coordinates of board.js
        this.boardRef.clearTile(this.tileX,this.tileY);
        this.destroy();
    }
    
    setPlacement(tile)//get the tile, set the tile position
    {
        this.x = tile.x;
        this.y = tile.y;
        this.tileParent = tile;
        //this might not be necessary
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
    }

    moveBuilding(command="none")
    {
        let brd = this.getBoard();
        switch(command)
        {
            case 'up':
                if (this.ableToMove(this.tileX,this.tileY-1))
                {
                    this.setPlacement(brd.getTile(this.tileX,this.tileY-1));
                }
                break;
            case 'down':
                if (this.ableToMove(this.tileX,this.tileY+1))
                {
                    this.setPlacement(brd.getTile(this.tileX,this.tileY+1));
                }
                break;
            case 'left':
                if (this.ableToMove(this.tileX-1,this.tileY))
                {
                    this.setPlacement(brd.getTile(this.tileX-1,this.tileY));
                }
                break;
            case 'right':
                if (this.ableToMove(this.tileX+1,this.tileY))
                {
                    this.setPlacement(brd.getTile(this.tileX+1,this.tileY));
                }
                break;
            default:
                break
            //check if up,d,l,r
        }
    }
    
    ableToMove(x,y)//function to check if you are able to move to x,y
    {
        let boardRef = this.getBoard();
        if (boardRef.checkValidTile(x,y))
        {
            if (boardRef.getTile(x,y).checkEmpty())
            {
                
                return true;
            }
        }
        return false;
        
    }

    snapToTile() 
    {
        let boardRef = this.getBoard();
        boardRef.removeBuilding(this.tileX, this.tileY);
        let nearestTile = boardRef.getNearestTile(this.x, this.y);
        this.setPlacement(nearestTile);
    }

    update()
    {

    }
}