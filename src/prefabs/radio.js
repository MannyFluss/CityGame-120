class Radio extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,objs=[],songNames=[])
    {
        super(scene,x,y,objs);
        this.songsArr = songNames;
        this.currentIndex = undefined;
        this.currentlyPlaying;
        this.shuffleType = "none";
        this.sceneRef = scene; //need to know when music is playing/stopping

        this.music;
        this.playNext();
    }

    playNext()
    {
        if (this.currentIndex==undefined)
        {
            this.currentIndex = 0;
        }else
        {
            this.currentIndex = (this.currentIndex+1)%this.songsArr.length;
        }
        
        this.currentlyPlaying = this.songsArr[this.currentIndex];
        console.log(this.currentIndex);
        this.music = this.sceneRef.sound.add(this.currentlyPlaying);
        
        this.music.once('complete',this.musicComplete(this.music)
        {
            console.log()
        });

    }

    musicComplete(music)
    {
        console.log("done");
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