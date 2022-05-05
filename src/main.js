let canvasStyle = " \
border-radius: 10px; \
"

let config = {
    type: Phaser.CANVAS,
    width: 768, // street.png width * export resize factor
    height: 432,
    scene : [Play],
    backgroundColor : "#1982FC",
    canvasStyle: canvasStyle
}

// declare keys
let keyLEFT, keyRIGHT, keySTART;

// set UI sizes
let game = new Phaser.Game(config);

let highScore = 0;

//global variables, see accessed in play.js
