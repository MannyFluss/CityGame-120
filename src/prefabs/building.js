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

        for (let row of this.board.objectArray)
            for (let building of row)
                if (building != null) {
                    console.log("adding collider")
                    scene.physics.add.collider(this, building);
                }

        scene.physics.world.on('collide', (obj1, obj2, body1, body2)=>{
            console.log(`${obj1.texture.key} is colliding with ${obj2.texture.key} body`);
            
            // body1.touching = true;
            if (obj1.state === "dragging") {
                if (obj2.x < obj1.x) { // blocked on left 
                    obj1.x += 1;
                    this.body.blocked.left = true;
                }
                if (obj2.x > obj1.x) { // blocked on right
                    obj1.x -= 1;
                    this.body.blocked.right = true;
                }
                if (obj2.y < obj1.y) { // blocked on top
                    obj1.y += 1;
                    this.body.blocked.top = true;
                }
                if (obj2.y > obj1.y) { // blocked on bottom
                    obj1.y -= 1;
                    this.body.blocked.bottom = true;
                }

            }

        });
        
        // define events
        this.on('drag', (pointer, dragX, dragY) => {
            if(this.state == "idle") {
                console.log("start dragging");
            }
            this.state = "dragging";
            
            this.body.blocked.left = false;
            this.body.blocked.right = false;
            this.body.blocked.top = false;
            this.body.blocked.bottom = false;
            
            // this.body.touching = false;
            // if (pointer)
            
            // check collision with other buildings
            for (let row of this.board.objectArray) {
                for (let building of row) {
                    if (building != null) {
                        this.scene.physics.collide(this, building);
                        console.log("collide!");
                    }
                }
            }
            
            // if (!this.body.touching){
                // this.x = dragX;
                // this.y = dragY;
                // }
                
                // this.body.setVelocity(dragX - this.x, dragY - this.y);
                
                // this.x += xDistance/2;
                // this.y += yDistance/2;
                
                
                this.setDepth(10);
                
                if (this.body.blocked.left && dragX < this.x) {
                    this.y = dragY;
                    return;
                } else if (this.body.blocked.right && dragX > this.x){
                    this.y = dragY;
                    return;
                } else if (this.body.blocked.top && dragY < this.y) {
                    this.x = dragX;
                    return;
                } else if (this.body.blocked.bottom && dragY > this.y){
                    this.x = dragX;
                    return;
                } 
                
                this.setPosition(dragX, dragY);

        });

        this.on('dragend', (pointer, dragX, dragY) => {
            console.log("done dragging");
            if (this.getBoard().getNearestTile(this.x,this.y).checkEmpty()) {
                this.snapToTile();
                this.state = "idle";
            } else {
                this.x = this.tileParent.x;
                this.y = this.tileParent.y;
                this.state = "idle";
            }
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