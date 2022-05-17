class Hotel extends Building
{
    constructor(scene,board,x,y,texture='hotel-1')//this texture will always be hotel
    {
        super(scene,board,x,y,texture);
           
    }

    onPlace()
    {
        money += 10;
    }
}