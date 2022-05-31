class Hotel extends Building
{
    static metaData = 
    {
        "texture" : 'hotel-1',
        "description" : "this building generates over time, makes less money for each housing unit nearby",
        "name" : "hotel",
        'tag' : 'hotel',
        'placeCost' : 30,
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [Hotel],
    };
    constructor(scene,board,x,y,texture='hotel-1')//this texture will always be hotel
    {
        
        super(scene,board,x,y,texture);
        this.counter = 0;
        this.earningInterval = 10 * 1000;
        this.tag = 'hotel';
           
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
            
            this.economyRef.earnMoney(bottomLine,this);
            this.counter = 0;
        }
    }
    onPlace()
    {
        this.economyRef.earnMoney(10,this);
    }
}


class Casino extends MultiBuilding
{
    static metaData = 
    {
        "texture" : 'casino',
        "description" : "this building generates extra income from hotels nearby,"+ 
        "additionally gambles part a part of your income any time it is moved",
        "name" : "casino",
        'placeCost' : 30,
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [Casino],
    };
    constructor(scene,board,x,y,texture=Casino.metaData['texture'])//this texture will always be hotel
    {

        super(scene,board,x,y,texture,['left']);
        this.counter = 0;
        this.earningInterval = 10 * 1000;
        this.tag = 'casino';

    }
    onTimeElapsed()
    {
        this.counter += 500;
        if (this.counter >= this.earningInterval)
        {
            let buildings = this.getSurroundoundingBuildings();
            let bottomLine = 1;
            console.log(buildings);
            for (let i=0;i<buildings.length;i++)
            {
                if (buildings[i] == null || buildings[i]==undefined){continue;}
                if (buildings[i].tag == 'hotel')
                {
                    bottomLine +=1;
                }
            }
            
            this.economyRef.earnMoney(bottomLine,this);
            this.counter = 0;
        }
    }
}