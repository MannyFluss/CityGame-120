class Building extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,texture,board,frame)
    {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(.5, 1);
        
        // physics settings
        let collisionWidth = 126;
        let collisionHeight = 69;
        this.body.setSize(collisionWidth, collisionHeight);
        this.body.setOffset(0, this.height-collisionHeight);
        this.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.body.onCollide = true;

        // debug
        this.setDebugBodyColor(0xFF0000);
        
        this.setInteractive({
            draggable: true,
            useHandCursor: true
        });
        
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

        scene.physics.world.on('collide', (obj1, obj2, body1, body2)=>{
            console.log(`${obj1.texture.key} is colliding with ${obj2.texture.key} body`);
        });

        // define events
        this.on('drag', (pointer, dragX, dragY) => {
            if(this.state == "idle") {
                console.log("start dragging");
            }
            this.setDepth(10);
            this.x = dragX;
            this.y = dragY;
            this.state = "dragging";

            // check collision with other buildings
            for (let row of this.board.objectArray) {
                for (let building of row) {
                    if (building != null) {
                        this.scene.physics.collide(this, building);
                        console.log("collide!")
                    }
                }
            }
        });

        this.on('dragend', (pointer, dragX, dragY) => {
            console.log("done dragging");
            if (this.getBoard().getNearestTile(this.x,this.y).checkEmpty()) {
                this.snapToTile();
                this.state = "idle";
                this.sfx_buildingThump.play();
            } else {
                this.x = this.tileParent.x;
                this.y = this.tileParent.y;
                this.state = "idle";
            }
        });

        this.sfx_buildingThump = scene.sound.add('sfx_buildingThump');
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
        this.sfx_buildingThump.play();
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