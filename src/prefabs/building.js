//these should not be manually added, this is extended upon by other buildings

class Building extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,frame)
    {
        if (texture==undefined)
        {
            texture = "small-apartment-1";
        }
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.setOrigin(.5, 1);

        this.setInteractive({
            draggable: true,
            useHandCursor: true
        });

        this.on('drag', (pointer, dragX, dragY) => {
            if(this.state == "idle") {
                console.log("start dragging");
            }
            this.setDepth(10);
            this.x = dragX;
            this.y = dragY;
            this.state = "dragging";
        });

        this.on('dragend', (pointer, dragX, dragY) => {
            //building never clears?
            console.log("done dragging");
            let tile = this.getBoard().getNearestTile(this.x,this.y);
            if (this.ableToMove(tile.tileX,tile.tileY)) {//check  if able to move
                this.snapToTile();
                this.state = "idle";
            } else {
                this.x = this.tileParent.x;
                this.y = this.tileParent.y;
                this.state = "idle";
            }
        });
        
        this.tileX;
        this.tileY;
        this.tileParent;
        this.setScale(1);
        this.state = "idle";
        this.sceneRef = scene;
        this.eventEmitter = new Phaser.Events.EventEmitter();
        

        //scene.time.delayedCall(1000,()=>{this.testFunc()})

        //this.eventEmitter.emit('buildingPlaced')
     this.setupSignals(); 
    }

    setupSignals()
    {
        this.eventEmitter.on('buildingPlaced',this.onPlace,this); //events are not working
        this.eventEmitter.emit('buildingPlaced');
        this.eventEmitter.on('timePassed',this.onTimeElapsed,this); //events are not working

        this.timer = this.sceneRef.time.addEvent({
            delay: 500,                // ms
            callback: ()=>{this.eventEmitter.emit('timePassed')},
            args: [500],
            loop: true
        });
    }

    onTimeElapsed(delta){};
    onPlace(){};

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
        this.getBoard().clearTile(this.tileX,this.tileY);
        this.timer.destroy();
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
        console.log("Placing at", tile.tileX, tile.tileY);
        this.getBoard().objectArray[tile.tileX][tile.tileY] = this;
        this.placementParticles();
    }

    placementParticles()
    {
        let particles = this.sceneRef.add.particles('small-apartment-1');
        let test = particles.createEmitter(
            {
                x : this.x,
                y : this.y - 50,
                speed : {start :300, end:0},
                count : 100,
                lifespan: 300,
                scale : {start:.5, end: 0}
            }
        )
        this.sceneRef.time.delayedCall(100,()=>{test.stop();},this);

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
        boardRef.clearTile(this.tileX, this.tileY);
        let nearestTile = boardRef.getNearestTile(this.x, this.y);
        this.setPlacement(nearestTile);
    }

    update()
    {
        if(this.state == "idle") {
            this.setDepth(2 * (this.tileX + this.tileY));
        }
        
    }
}