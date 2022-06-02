class Radio extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,objs=[],songNames=[])
    {
        super(scene,x,y,objs);
        scene.add.existing(this);
        this.songsArr = songNames;
        this.currentIndex = undefined;
        this.currentlyPlaying;
        this.shuffleType = "none";
        this.sceneRef = scene; //need to know when music is playing/stopping
        
        this.music;
        this.playNext();

        this.radioConsole = new Phaser.GameObjects.Sprite(scene,0,0,'radio-temp');
        this.playToggle = new Phaser.GameObjects.Sprite(scene,-90,0,'temp-button').setInteractive();
        this.playPreviousSong = new Phaser.GameObjects.Sprite(scene,-50,0,'temp-button').setInteractive();
        this.playNextSong = new Phaser.GameObjects.Sprite(scene,50,0,'temp-button').setInteractive();
        this.shuffleToggleButton  = new Phaser.GameObjects.Sprite(scene,90,0,'temp-button').setInteractive();
        this.playToggle.on('pointerdown',()=>{this.handleInput('i')});
        this.playPreviousSong.on('pointerdown',()=>{this.handleInput('u')});
        this.playNextSong.on('pointerdown',()=>{this.handleInput('o')});
        this.shuffleToggleButton.on('pointerdown',()=>{this.handleInput('p')});


        this.add([this.radioConsole,this.playToggle,this.playPreviousSong,this.playNextSong,this.shuffleToggleButton]);

        scene.input.keyboard.on('keydown', (event) => {
            this.handleInput(event.key);
        });
    }

    handleInput(key)
    {
        switch (key)
        {
            case 'u':
                this.playPrevious();
                break;
            case 'i':
                this.pausePlayToggle();
                break;
            case 'o':
                this.playNext();
                break;
            case 'p':
                this.shuffleToggle();
                break;
            default:
                break;
        }
    }

    playNext(forward=1)
    {
        if (this.music != undefined)
        {
            if (this.music.isPlaying)
            {
                this.music.stop();
            }
        }
        if (this.currentIndex==undefined)
        {
            this.currentIndex = 0;
        }else
        {
            if (this.shuffleType == 'shuffle')
            {
                forward = Phaser.Math.Between(0,512);
            }
            if(this.shuffleType == 'loop')
            {
                forward = 0;
            }
            this.currentIndex = (this.currentIndex+forward)%this.songsArr.length;
            if (this.currentIndex < 0)
            {
                this.currentIndex = this.songsArr.length-1;
            }
        }
        this.currentlyPlaying = this.songsArr[this.currentIndex];
        console.log(this.currentIndex);
        this.music = this.sceneRef.sound.add(this.currentlyPlaying);
        this.music.play();
        this.music.once('complete',()=>{
            this.playNext();
        });//thank god it works

    }

    
    playPrevious()
    {
        this.playNext(-1);
    }
    pausePlayToggle()
    {
        if (this.music.isPlaying)
        {
            this.music.pause();
        }else
        {
            this.music.resume();
        }
    }
    killMusic()
    {
        this.music.pause();
        this.destroy();
    }
    shuffleToggle()
    {
        switch(this.shuffleType)
        {
            case 'none':
                this.shuffleType = 'shuffle';
                break;
            case 'shuffle':
                this.shuffleType = 'loop';
                break;
            case 'loop':
                this.shuffleType = 'none';
                break;
            default:
                break;
        }
    }
}