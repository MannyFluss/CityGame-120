class Building extends Phaser.Physics.Matter.Sprite
{
    constructor(scene,x,y,texture,options, board)
    {
        super(scene.matter.world,x,y,texture,options);
        scene.add.existing(this);
        this.setOrigin(.5, 1);

        // the fromVerts solution lets us define custom points, but idk how to change the center of gravity and also the points are placing in a way i don't understand for the life of me
        let bodyConfig = {
            // type: "fromVerts",
            // verts: [{x:20, y:180}, {x:100, y:120}, {x:150, y:100}, {x:90, y:220}],
            // xOffset: 10,
            // yOffset: 0.15
        };

        // this makes the building be still rather than pushing each other, but also makes it so we can't drag it...
        let bodyOptions = {
            // isStatic: true,
        }
        this.setBody(bodyConfig, bodyOptions);
        
        // physics settings
        // let collisionWidth = 126;
        // let collisionHeight = 69;
        // this.body.setSize(collisionWidth, collisionHeight);
        // this.body.setOffset(0, this.height-collisionHeight);
        // this.setCollideWorldBounds(true);
        // this.body.setImmovable(true);
        // this.body.onCollide = true;

        // debug
        // this.setDebugBodyColor(0xFF0000);
        
        // this.setInteractive({
        //     draggable: true,
        //     useHandCursor: true
        // });
        
        this.board = board;
        this.tileX;
        this.tileY;
        this.tileParent;
        this.setScale(1);
        this.state = "idle";

        this.timer = scene.time.addEvent({
            delay: 500,                // ms
            callback: this.timeElapsed,
            args: [500],
            loop: true
        });

        // scene.physics.world.on('collide', (obj1, obj2, body1, body2)=>{
        //     console.log(`${obj1.texture.key} is colliding with ${obj2.texture.key} body`);
        // });

        // // define events
        // this.on('drag', (pointer, dragX, dragY) => {
        //     if(this.state == "idle") {
        //         console.log("start dragging");
        //     }
            
        //     this.state = "dragging";
        //     this.setDepth(10);

        //     // this.x = dragX;
        //     // this.y = dragY;
            
        // });

        // this.on('dragend', (pointer, dragX, dragY) => {
        //     console.log("done dragging");
        //     if (this.getBoard().getNearestTile(this.x,this.y).checkEmpty()) {
        //         this.snapToTile();
        //         this.state = "idle";
        //     } else {
        //         this.x = this.tileParent.x;
        //         this.y = this.tileParent.y;
        //         this.state = "idle";
        //     }
        // });
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
        this.getBoard().clearTile(this.tileX,this.tileY);
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
    }

    snapToTile() 
    {
        let boardRef = this.getBoard();
        boardRef.clearTile(this.tileX, this.tileY);
        let nearestTile = boardRef.getNearestTile(this.x, this.y);
        this.setPlacement(nearestTile);
        this.board.addToObjectArray(this, this.tileX, this.tileY);
    }

    update()
    {
        if(this.state == "idle") {
            this.setDepth(2 * (this.tileX + this.tileY));
        }
    }
}