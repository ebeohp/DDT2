import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    spacebar: Phaser.Input.Keyboard.Key;
    button: Phaser.GameObjects.Sprite;
    titlemusic: Phaser.Sound.BaseSound;
    background: Phaser.GameObjects.TileSprite;
    title: any;
    text: Phaser.GameObjects.BitmapText;
    constructor()
    {
        super('title')
    }
    preload()
    {
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    create()
    {
        //this.background = this.add.tileSprite(0,0, 400, 400, 'titlemap'); //TileSprite is different from images!
        //this.background.setOrigin(0,0);

        var duckie = this.physics.add.sprite(20,20, 'duckie', 4);
        duckie.setCollideWorldBounds(true);
        duckie.setVelocity(80,80);
        duckie.setBounce(1).setScale(2);

        this.titlemusic = this.sound.add("titlemusic");  
        var musicConfig = 
        {
            mute: false,
            volume: 0.8,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
       this.titlemusic.play(musicConfig);
       this. title = this.add.sprite(200,100, 'title');
       this.title.play('title_anim').setScale(0.5);
       this.text = this.add.bitmapText(150,210, "pixelFont", "PRESS SPACE TO PLAY!", 16);
       this.button = this.add.sprite(200,190,'redButton');
    }
    update()
    {
        //this.background.tilePositionY-= 0.5;
        //this.background.tilePositionX-= 0.5;
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.button.play('red_button_press');
            this.time.addEvent({
                delay: 1500,
                callback: this.fade,
                callbackScope: this,
                loop: false,
            });
            this.tweens.add({
                targets:  this.titlemusic,
                volume:   0,
                duration: 1000
            });

            
        }
    }
    howToPlay()
    {

    }
    fade()
    {
        this.cameras.main.fadeOut(1000);
        this.tweens.add({
            targets: this.title,
            alpha: { from: 1, to: 0 },
            repeat: 0,
            ease: 'Power2',
            duration: 1500,
            onComplete: function(){
                this.startGame();
            },
            callbackScope: this
        }); 
        this.tweens.add({
            targets: this.text,
            alpha: { from: 1, to: 0 },
            repeat: 0,
            ease: 'Power2',
            duration: 1000,
            callbackScope: this
        }); 
        this.tweens.add({
            targets: this.button,
            alpha: { from: 1, to: 0 },
            repeat: 0,
            ease: 'Power2',
            duration: 1000,
            callbackScope: this
        }); 
        
    }
    startGame()
    {
        this.titlemusic.stop();
        this.scene.stop();
        this.scene.start('game1'); 
    }
}