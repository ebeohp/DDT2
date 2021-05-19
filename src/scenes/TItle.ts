import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    spacebar: Phaser.Input.Keyboard.Key;
    button: Phaser.GameObjects.Sprite;
    titlemusic: Phaser.Sound.BaseSound;
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
       this.titlemusic = this.sound.add("titlemusic");  
       this.titlemusic.play();
       var title = this.add.sprite(200,100, 'title');
       title.play('title_anim').setScale(0.5);
       this.add.bitmapText(150,210, "pixelFont", "PRESS SPACE TO PLAY!", 16);
       this.button = this.add.sprite(200,190,'redButton');
    }
    update()
    {
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.button.play('red_button_press');
            this.time.addEvent({
                delay: 1000,
                callback: this.startGame,
                callbackScope: this,
                loop: false,
              });
        }
    }
    howToPlay()
    {

    }
    startGame()
    {
        this.titlemusic.stop();
        this.scene.start('game1'); 
    }
}