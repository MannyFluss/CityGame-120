class Hotel extends Building
{
    constructor(scene,x,y,texture='hotel-1')//this texture will always be hotel
    {
        
        super(scene,x,y,texture);
        
    }

    onPlace()
    {
        money += 10;
    }
}