class SmallApartment extends Building
{
    static metaData = 
    {
        "texture" : 'small-apartment-1',
        "description" : "this building generates money when placed",
        "name" : 'Small Apartment',
        "placeCost" : 10,
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [SmallApartment],
        "tag" : "housing",
    };
    constructor(scene,board,x,y,texture='small-apartment-1')
    {
        super(scene,board,x,y,texture);
        this.counter = 0;
        this.earningInterval = 10 * 1000;
        this.tag = 'housing';
    }

    onTimeElapsed(delta)
    {
        //money += 1 * this.resourceMultiplier;
        this.counter += 500;
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
        "texture" : 'small-apartment-1',//all buildings currentl will be small-apartment textures
        "description" : "this building passively generates income",
        "name" : 'Large Apartment',
        "placeCost" : 18,

        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [LargeApartment],
        "tag" : "housing",
    };
    constructor(scene,board,x,y,texture='small-apartment-1')
    {
        super(scene,board,x,y,texture,['left']);
        this.counter = 0;
        this.earningInterval = 5 * 1000;
        this.tag = 'housing';
    }

    onTimeElapsed(delta)
    {
        //money += 1 * this.resourceMultiplier;
        this.counter += 500;
        if (this.counter >= this.earningInterval)
        {
            this.economyRef.earnMoney(1,this);
            this.counter = 0
        }
    }
}