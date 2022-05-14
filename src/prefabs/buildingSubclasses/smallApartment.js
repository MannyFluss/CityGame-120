class SmallApartment extends Building
{
    constructor(scene,x,y,texture='small-apartment-1')
    {
        super(scene,x,y,texture);
    }

    onTimeElapsed()
    {
        money += 1;
        console.log('mny');
    }
}