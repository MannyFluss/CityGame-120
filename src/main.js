let canvasStyle = " \
border-radius: 10px; \
"

let config = {
    type: Phaser.CANVAS,
    width: 800, // street.png width * export resize factor
    height: 600,
    scene : [Play,ShopScene],
    backgroundColor : "#393457",
    canvasStyle: canvasStyle,
    physics: {
        default: 'arcade',
        // arcade: {
        //     debug: true
        // }
    },
    resolution: window.devicePixelRatio,
}

// declare keys
let keyLEFT, keyRIGHT, keySTART;

let radioPause,radioFFWD, radioFBWD,radioSHUFFLE;

// set UI sizes
let game = new Phaser.Game(config);

let possibleBuildingList = 
[
    SmallApartment
    // MultiBuilding
];

let shopSceneAvailableList = //this is an array filled with the METADATA for the shop
[
    ShopEntries.tilePurchase1,Hotel.metaData, MultiBuilding.metaData,
    Casino.metaData, RepairCrew.metaData,
    ShopEntries.tilePurchase2,

//    SmallFactory.metaData,ParkBuilding.metaData,WinmillBuilding.metaData,
];
let sceneInitMoney = 10;
let highScore = 0;
let boardSize = 2;
let money = 0;



//global variables, see accessed in play.js
// {
//     "texture" : 'hotel-1',
//     "description" : "this building generates money when placed",
//     "name" : "hotel",
//     "shopCost" : 100,
//     "shopFunction" : "addNewBuilding",
//     "shopArguments" : [Hotel],
// };

