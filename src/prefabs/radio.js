class Radio extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,objs=[],songNames=[])
    {
        super(scene,50,y,objs);
        scene.add.existing(this);
        this.songsArr = songNames;
        this.currentIndex = undefined;
        this.currentlyPlaying;
        this.shuffleType = "loop";
        this.sceneRef = scene; //need to know when music is playing/stopping
        this.expandedX = x;
        
        this.music;
        this.playNext();

        this.musicNote = new Phaser.GameObjects.Sprite(scene, 10,y-80,'music-note').setInteractive({useHandCursor: true});

        let buttonsY = -10;
        let buttonsX = -162;
        let buttonSpacing = 50;
        this.radioConsole = new Phaser.GameObjects.Sprite(scene,-160,100,'radio-bg');
        this.backButton = new Phaser.GameObjects.Sprite(scene,buttonsX,buttonsY,'back-button').setInteractive({useHandCursor: true});
        this.playPreviousSong = new Phaser.GameObjects.Sprite(scene,buttonsX,buttonSpacing+buttonsY,'previous-song').setInteractive({useHandCursor: true});
        this.playToggle = new Phaser.GameObjects.Sprite(scene,buttonsX,buttonSpacing*2+buttonsY,'play-pause').setInteractive({useHandCursor: true});
        this.playNextSong = new Phaser.GameObjects.Sprite(scene,buttonsX,buttonSpacing*3+buttonsY,'next-song').setInteractive({useHandCursor: true});
        this.shuffleToggleButton  = new Phaser.GameObjects.Sprite(scene,buttonsX,buttonSpacing*4+buttonsY,'loop').setInteractive({useHandCursor: true});
        this.playToggle.on('pointerdown',()=>{this.handleInput('i')});
        this.playPreviousSong.on('pointerdown',()=>{this.handleInput('u')});
        this.playNextSong.on('pointerdown',()=>{this.handleInput('o')});
        this.shuffleToggleButton.on('pointerdown',()=>{this.handleInput('p')});

        this.musicNote.on('pointerdown',()=>{
            this.sceneRef.tweens.add({
                targets: this,
                x : x,
                ease: Phaser.Math.Easing.Back.InOut,
                duration : 1200,
            });
            this.sceneRef.tweens.add({
                targets: this.musicNote,
                x : -300,
                ease: Phaser.Math.Easing.Back.InOut,
                duration : 1200,
            });
        });

        this.backButton.on('pointerdown',()=>{
            this.sceneRef.tweens.add({
                targets: this,
                x : 50,
                ease: Phaser.Math.Easing.Back.InOut,
                duration : 1200,
            });
            this.sceneRef.tweens.add({
                targets: this.musicNote,
                x : 10,
                ease: Phaser.Math.Easing.Back.InOut,
                duration : 1200,
            });
        });

        this.add([this.radioConsole,this.playToggle,this.playPreviousSong,this.playNextSong,this.shuffleToggleButton, this.musicNote, this.backButton]);

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
                forward = Phaser.Math.Between(1,this.songsArr.length-1);
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
            case 'shuffle':
                this.shuffleType = 'loop';
                this.shuffleToggleButton.setTexture('loop');
                break;
            case 'loop':
                this.shuffleType = 'shuffle';
                this.shuffleToggleButton.setTexture('shuffle');
                break;
            default:
                break;
        }
    }
}