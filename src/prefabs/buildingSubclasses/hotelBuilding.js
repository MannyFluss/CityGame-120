class Hotel extends Building
{
    static textureName = 'hotel-1';
    static metaData = 
    {
        "texture" : 'hotel-1',
        "description" : "this building generates money when placed",
        "name" : "hotel",
        'tag' : 'hotel',
        'placeCost' : 30,
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [Hotel],
    };
    constructor(scene,board,x,y,texture='hotel-1')//this texture will always be hotel
    {
        super(scene,board,x,y,Hotel.textureName);
        this.counter = 0;
        this.earningInterval = 10 * 1000;
           
    }

    onTimeElapsed()
    {
        this.counter += 500;
        if (this.counter >= this.earningInterval)
        {
            let buildings = this.getSurroundoundingBuildings();
            let bottomLine = 4;
            console.log(buildings);
            for (let i=0;i<buildings.length;i++)
            {
                if (buildings[i]==null || buildings[i]==undefined){continue;}
                if (buildings[i].tag == 'housing')
                {
                    bottomLine -=1;
                }
            }
            console.log('earning this much ' + bottomLine)
            this.economyRef.earnMoney(bottomLine,this);
            this.counter = 0;
        }
    }
    onPlace()
    {
        this.economyRef.earnMoney(10,this);
    }
}