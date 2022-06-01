class WinmillBuilding extends Building
{
    static metaData = 
    {
        "texture" : 'small-windmill',
        "description" : "this building makes the refresh cost cheaper",
        "name" : 'Windmill',
        "shopCost" : 25,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [WinmillBuilding],
    };
    constructor(scene,board,x,y,texture='small-windmill')
    {
        super(scene,board,x,y,texture);
    }
}