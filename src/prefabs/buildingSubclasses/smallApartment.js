class SmallApartment extends Building
{
    static metaData = 
    {
        "texture" : 'small-apartment-1',
        "description" : "This building generates a low amount of money periodically.",
        "name" : 'Small Apartment',
        "placeCost" : 5,
        "shopCost" : 5,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [SmallApartment],
        "tag" : "housing",
    };
    constructor(scene,board,x,y,texture='small-apartment-1')
    {
        super(scene,board,x,y,texture);
        this.counter = 0;
        this.earningInterval = 2.2 * 1000;
        this.tag = 'housing';
    }

    onTimeElapsed(delta)
    {
        //money += 1 * this.resourceMultiplier;
        this.counter += 250;
        if (this.counter >= this.earningInterval)
        {
            this.economyRef.earnMoney(1,this);
            this.counter = 0
        }
    }
}

class LargeApartment extends MultiBuilding
{
    static metaData = 
    {
        "texture" : 'large-apartment-1',//all buildings currentl will be small-apartment textures
        "description" : "This building earns more than double that of a Small Apartment!",
        "name" : 'Large Apartment',
        "placeCost" : 9,

        "shopCost" : 10,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [LargeApartment],
        "tag" : "housing",
    };
    constructor(scene,board,x,y,texture='large-apartment-1')
    {
        super(scene,board,x,y,texture,['left']);
        this.counter = 0;
        this.earningInterval = 1 * 1000;
        this.tag = 'housing';
    }

    onTimeElapsed(delta)
    {
        //money += 1 * this.resourceMultiplier;
        this.counter += 250;
        if (this.counter >= this.earningInterval)
        {
            this.economyRef.earnMoney(1,this);
            this.counter = 0
        }
    }
}