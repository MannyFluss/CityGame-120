//multi will be inserted with strings, left right up or down,
//based of the pivot the other tiles will be added,
//IE up up up creates a line block
//down right down creates the squiggle tetris, so on...

class MultiBuilding extends Building
{
    constructor(scene,x,y,texture,multi = [])
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
            return false;
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
                return false;
            }   
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