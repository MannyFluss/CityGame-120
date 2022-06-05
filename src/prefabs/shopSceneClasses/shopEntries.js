class ShopEntries
{
    static tilePurchase1 = 
    {
    "texture" : 'tileSprite',
    "description" : "Expand the size of the city!",
    "name" : "Tile Upgrade #1",
    "shopCost" : 5,
    "shopFunction" : "increaseBoardSize",
    "shopArguments" : [5], // must be the same as shopCost
    }
    static tilePurchase2 = 
    {
    "texture" : 'tileSprite',
    "description" : "Expand the size of the city even further!",
    "name" : "Tile Upgrade #2",
    "shopCost" : 35,
    "shopFunction" : "increaseBoardSize",
    "shopArguments" : [35], // must be the same as shopCost
    }
}