class SmallApartment extends Building
{
    constructor(scene,board,x,y,texture='small-apartment-1')
    {
        super(scene,board,x,y,texture);
    }

    onTimeElapsed()
    {
        money += 1;
    }
}