//does not work rn
class ParkBuilding extends Building
{
    static metaData = 
    {
        "texture" : 'small-park',
        "description" : "this building increases the amount of money adjacent buildings make",
        "name" : 'Park',
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [ParkBuilding],
    };
    constructor(scene,board,x,y,texture=ParkBuilding.metaData['texture'])
    {
        super(scene,board,x,y,texture);
    }

    setPlacement(tile)//get the tile, set the tile position
    {
        let buildings = this.getSurroundoundingBuildings();
        for (let i=0;i<buildings.length;i++)
        {
            if (buildings[i!=null])
            {
                buildings[i].resourceMultiplier = 1;
            }
            
        }
        
        this.x = tile.x;
        this.y = tile.y;
        this.tileParent = tile;
        //this might not be necessary
        this.tileX = tile.tileX;
        this.tileY = tile.tileY;
        console.log("Placing at", tile.tileX, tile.tileY);
        this.board.objectArray[tile.tileX][tile.tileY] = this;
        this.placementParticles();

        buildings = this.getSurroundoundingBuildings();
        for (let i=0;i<buildings.length;i++)
        {
            if (buildings[i!=null])
            {
                buildings[i].resourceMultiplier = 1.5;
            }
        }

    }

}

