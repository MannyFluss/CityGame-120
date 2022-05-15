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
        //console.log(this.getBoard())
    }
    getBoard()//work around
    {
        return this.sceneRef.board;
    }

    ableToMove(x,y)
    {
        let board = this.getBoard;
    


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