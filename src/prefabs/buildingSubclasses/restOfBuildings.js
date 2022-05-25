class RepairCrew extends Building
{    
    static metaData = 
    {
        "texture" : 'small-apartment-1',
        "description" : "protects adjacent buildings from threats",
        "name" : 'Repair Crew',
        "placeCost" : 10,
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [RepairCrew],
        "tag" : "housing",
    };
    constructor(scene,x,y,texture = RepairCrew.metaData['texture'])
    {
        super(scene,x,y,texture);
        this.protectionCount = 3;
        this.tag = 'repair-crew';
    }
}

class InsuranceCo extends Building
{    
    static metaData = 
    {
        "texture" : 'small-apartment-1',
        "description" : "gives you money whenever a building is destroyed",
        "name" : 'Insurance Company',
        "placeCost" : 12,
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [InsuranceCo],
    };
    constructor(scene,x,y,texture = InsuranceCo.metaData['texture'])
    {
        super(scene,x,y,texture);
        this.money2Earn = 5;
        //this.protectionCount = 3;
        //this.tag = 'repair-crew';
        this.board.on('onBuildingDestroy',()=>{
            this.economyRef.earnMoney(this.money2Earn);
        })
    }
}
class Garden extends Building
{    
    static metaData = 
    {
        "texture" : 'small-apartment-1',
        "description" : "gives you money based on how many building types surround it",
        "name" : 'Insurance Company',
        "placeCost" : 18,
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [Garden],
    };
    constructor(scene,x,y,texture = Garden.metaData['texture'])
    {
        super(scene,x,y,texture);
        this.counter = 0;
        this.earningInterval = 10 * 1000;
    }

    onTimeElapsed(delta)
    {
        //money += 1 * this.resourceMultiplier;
        this.counter += 500;
        if (this.counter >= this.earningInterval)
        {
            //this.economyRef.earnMoney(1,this);
            let buildings = this.getSurroundoundingBuildings();
            let types = new Phaser.Structs.Set();
            for (let i=0;i<buildings.length;i++)
            {
                if (buildings[i]==undefined || buildings[i]==null){continue;}
                types.set(buildings[i].name);
            }

            this.economyRef.earnMoney(types.size, this);
            this.counter = 0;
        }
    }
}
class Mine extends MultiBuilding
{    
    static metaData = 
    {
        "texture" : 'small-apartment-1',
        "description" : "generates lots of money!",
        "name" : 'Mine',
        "placeCost" : 40,
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [Mine],
    };
    constructor(scene,x,y,texture = Mine.metaData['texture'])
    {
        super(scene,x,y,texture,['left','down','right']);
        this.counter = 0;
        this.earningInterval = 2 * 1000;
        this.immovable = true;
    }

    onTimeElapsed(delta)
    {
        //money += 1 * this.resourceMultiplier;
        this.counter += 500;
        if (this.counter >= this.earningInterval)
        {
            this.economyRef.earnMoney(1,this);
        }
    }
}
