let canvasStyle = " \
border-radius: 10px; \
"

let config = {
    type: Phaser.CANVAS,
    width: 800, // street.png width * export resize factor
    height: 600,
    scene : [Play],
    backgroundColor : "#393457",
    canvasStyle: canvasStyle
    
}

// declare keys
let keyLEFT, keyRIGHT, keySTART;

let radioPause,radioFFWD, radioFBWD,radioSHUFFLE;

// set UI sizes
let game = new Phaser.Game(config);

let possibleBuildingList = 
[
    Building
]

let highScore = 0;

let money = 0;

//global variables, see accessed in play.js
