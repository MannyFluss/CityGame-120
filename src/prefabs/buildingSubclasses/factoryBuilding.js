class SmallFactory extends Building
{
    static metaData = 
    {
        "texture" : 'small-factory',
        "description" : "This building generates money based on how many buildings are next to it.",
        "name" : 'Factory',
        "shopCost" : 20,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [SmallFactory],
    };
    constructor(scene,board,x,y,texture=SmallFactory.metaData['texture'])
    {
        super(scene,board,x,y,texture);
        this.timeOut = 1 * 1000;//every ten seconds generate income
        this.counter = 0;
    }

    onTimeElapsed()
    {
        this.counter += 250;
        console.log(this.counter)
        if (this.counter >= this.timeOut)
        {
            this.counter = 0;
            let buildings = this.getSurroundoundingBuildings();
            //console.log(this.getSurroundoundingBuildings());
            //let buildings = []
            let count = 0;
            for (let i=0;i<buildings.length;i++)
            {
                if (buildings[i]!=null)
                {
                    count+=1;
                }
            }
            console.log(buildings);
            this.economyRef.earnMoney(count * 2,this);
            //checksurroundingbuildings
        }
    }
}