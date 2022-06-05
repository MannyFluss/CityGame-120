let canvasStyle = " \
border-radius: 10px; \
"

let config = {
    type: Phaser.CANVAS,
    width: 1300,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fullscreen: true,
    },
    scene : [Menu, Credits, Play, ShopScene],
    backgroundColor : "#393457",
    // canvasStyle: canvasStyle,
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
let availableThreats = 
[
    'meteor'
];

let shopSceneAvailableList = //this is an array filled with the METADATA for the shop
[
    
    ShopEntries.tilePurchase1,Hotel.metaData, LargeApartment.metaData,
    Casino.metaData, RepairCrew.metaData,
    ShopEntries.tilePurchase2,

//    SmallFactory.metaData,ParkBuilding.metaData,WinmillBuilding.metaData,
];
let moneyMultiplier = 1;
let sceneInitMoney = 5;
let highScore = 0;
let boardSize = 2;
let money = 0;
let level = 0;