class Hotel extends Building
{
    static textureName = 'hotel-1';
    static metaData = 
    {
        "texture" : 'hotel-1',
        "description" : "this building generates money when placed",
        "name" : "hotel",
        "shopCost" : 100,
        "shopFunction" : "addNewBuilding",
        "shopArguments" : [Hotel],
    };
    constructor(scene,board,x,y,texture='hotel-1')//this texture will always be hotel
    {
        super(scene,board,x,y,Hotel.textureName);
           
    }

    onPlace()
    {
        this.economyRef.earnMoney(10,this);
    }
}