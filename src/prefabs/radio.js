class Radio extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,objs=[],songNames=[])
    {
        super(scene,x,y,objs);
        this.songsArr = songNames;
        this.currentIndex = 0;
        this.currentlyPlaying = songNames[0];
        this.shuffleType = "none";
        this.sceneRef = scene; //need to know when music is playing/stopping
        
        
    }

    playFirst()
    {

    }
    playNext()
    {

    }
    playPrevious()
    {

    }
    pausePlayToggle()
    {

    }
    shuffleToggle()
    {

    }
}