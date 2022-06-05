class Building extends Phaser.Physics.Arcade.Sprite
{

    static metaData = 
    {
        "texture" : 'small-apartment-1',
        "description" : "this building generates money when placed",
        "name" : 'default building',
        "tag" : undefined,
        "placeCost" : 5,
        "shopCost" : 5,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [Building],
        
    };
    constructor(scene,board,x,y,texture)
    {
        
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(.5, 1);
        this.buildingDescription = 'default building description'; //this should always be overwritten.       
        // physics settings
        this.tag = 'none';
        let collisionRadius = this.width/2.5;
        this.sfxBuildingThump = scene.sound.add('sfx_BuildingThump');
        this.economyRef = scene.economy;
        this.body.setCircle(collisionRadius);
        this.body.setOffset(this.width/2-collisionRadius, this.height-collisionRadius*2);
        this.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.body.onCollide = true;
        this.name = this.constructor.name;//identifier
        console.log(this.name);
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
        this.resourceMultiplier = 1;
        this.timer = scene.time.addEvent({
            delay: 250,                // ms
            callback: this.timeElapsed,
            args: [250],
            loop: true
        });

        scene.physics.world.on('collide', (obj1, obj2, body1, body2)=>{
            console.log(`${obj1.texture.key} is colliding with ${obj2.texture.key} body`);
        });

        // define events
        this.immovable = false;
        this.on('drag', (pointer, dragX, dragY) => {
            if(this.state == "idle") {
                console.log("start dragging");
                this.afterimage = scene.add.sprite(this.tileParent.x, this.tileParent.y, texture).setOrigin(0.5, 1).setAlpha(0.5);
            }
            this.setDepth(10);
            this.x = dragX;
            this.y = dragY;
            
            // must be made movable to collide correctly
            this.body.setImmovable(false);

            this.state = "dragging";
        });

        this.on('dragend', (pointer, dragX, dragY) => {
            //building never clears?
            console.log("done dragging");

            // must be made immovable to collide correctly
            this.body.setImmovable(true);
            this.afterimage.destroy();
            let tile = this.board.getNearestTile(this.x,this.y)
            if (this.ableToMove(tile.tileX,tile.tileY) && this.immovable == false) {// ithink this needs to be changed to able to move
                this.snapToTile();
            } else {
                this.x = this.tileParent.x;
                this.y = this.tileParent.y;
            }
            this.state = "idle";
        });

        this.multi = [];//this will always be [] for a default building
        this.sceneRef = scene;
        this.eventEmitter = new Phaser.Events.EventEmitter();
        

        //scene.time.delayedCall(1000,()=>{this.testFunc()})

        //this.eventEmitter.emit('buildingPlaced')
        this.setupSignals(); 
    }

    placementAnimation()
    {
        let amount = 40
        let dur = .15 * 1000;
        this.y = this.y -amount;
        this.sceneRef.tweens.add({
            targets: this,
            ease: 'Sine.easeIn',
//            scale : {start : 2, end : 1.5},
            y : this.y + amount,
            duration : dur,
        })
        this.sceneRef.time.delayedCall(dur,()=>{this.placementParticles();},this);
        
    }

    validBuildSpot(x,y)
    {
        return this.board.checkValidTile(x,y);
    }

    setupSignals()
    {
        this.eventEmitter.on('buildingPlaced',this.onPlace,this); //events are not working
        this.eventEmitter.emit('buildingPlaced');
        this.eventEmitter.on('timePassed',this.onTimeElapsed,this); //events are not working

        this.timer = this.sceneRef.time.addEvent({
            delay: 250,                // ms
            callback: ()=>{this.eventEmitter.emit('timePassed')},
            args: [250],
            loop: true
        });
    }



    getSurroundoundingBuildings(x=this.tileX,y=this.tileY)//gets buildings in a + shape
    {
        if (this.board==undefined)
        {
            return [];
        }
        let board = this.board;
        
        let to_return = [board.getBuildingAt(x+1,y),board.getBuildingAt(x-1,y),board.getBuildingAt(x,y+1),board.getBuildingAt(x,y-1)];
        
        return to_return;
    }
    onTimeElapsed(delta){};
    onPlace(){};

    timeElapsed(delta)
    {
        
        switch(this.state)
        {
            case 'idle':
                //look for input
                break;
            default:
                break;
        }

    }

    destroyThisBuilding()
    {
        let buildingsCheck = this.getSurroundoundingBuildings();
        for (let i=0;i<buildingsCheck.length;i++)
        {
            if (buildingsCheck[i]==null || buildingsCheck[i]==undefined){continue;}
            if (buildingsCheck[i].tag == 'repair-crew')
            {

                let curr = buildingsCheck[i];
                if (curr.protectionCount > 0)
                {
                    new Blorb(this.sceneRef,curr.x,curr.y,this);
                    curr.protectionCount -= 1;
                    return;
                }
            }
        }
        //if its made it past here it is getting destroyed()
        //clear the obj array @ this buildings coordinates of board.js

        this.board.clearTile(this.tileX,this.tileY);
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

        if(this.afterimage != null) {
            this.afterimage.destroy();
        }
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
        this.board.objectArray[tile.tileX][tile.tileY] = this;
        this.placementAnimation();
        this.sfxBuildingThump.play();
        
        this.onMove();
        this.board.emit('boardStateChanged',this.board.objectArray);
    }

    onMove(){//this is a horrible solution to my problem but idc
        console.log(this.tag)
        if (this.tag == 'casino')
        {
            let toGamble = this.economyRef.getCurrMoney() * 0.05;
            let random = Phaser.Math.FloatBetween(0.0 , 2.5);
            let value = Math.round(toGamble * random);

            if (Phaser.Math.Between(0,1)==0)
            {
                this.economyRef.earnMoney(value);
            }else
            {
                this.economyRef.spendMoney(value);
            }
            console.log('gambled solution: ' + value)
        }
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
        let brd = this.board;
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
                break;
            //check if up,d,l,r
        }
    }
    
    ableToMove(x,y)//function to check if you are able to move to x,y
    {
        if (this.board.checkValidTile(x,y))
        {
            if (this.board.getTile(x,y).checkEmpty())
            {
                
                return true;
            }
        }
        return false;
    }



    snapToTile() 
    {
        this.board.clearTile(this.tileX, this.tileY);
        let nearestTile = this.board.getNearestTile(this.x, this.y);
        this.setPlacement(nearestTile);
        this.board.addToObjectArray(this, this.tileX, this.tileY);
    }

    update()
    {
        if(this.state == "idle") {
            this.setDepth(2 * (this.tileX + this.tileY));
        }

        // check collision with other buildings every frame
        // MUST be in update for collision to work
        for (let row of this.board.objectArray) {
            for (let building of row) {
                if (building != null) {
                    this.scene.physics.collide(this, building);
                }
            }
        }
    }
}