class SmallApartment extends Building
{
    static metaData = 
    {
        "texture" : 'small-apartment-1',
        "description" : "this building generates money when placed",
        "name" : 'Small Apartment',
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [SmallApartment],
    };
    constructor(scene,board,x,y,texture='small-apartment-1')
    {
        super(scene,board,x,y,texture);
    }

    onTimeElapsed(delta)
    {
        money += 1 * this.resourceMultiplier;
    }
}