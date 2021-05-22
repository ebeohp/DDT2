import Phaser from 'phaser'
import Preloader from './Preloader'
import GameLvl1 from './GameLvl1'
import GameLvl2 from './GameLvl2'
import GameLvl3 from './GameLvl3'
import Title from './Title'
import GameOver from './GameOver'
import Transition1 from './Transition1'
import Transition2 from './Transition2'
import Transition3 from './Transition3'

export default class WinGame extends Phaser.Scene
{
    spacebar: Phaser.Input.Keyboard.Key;
    constructor()
    {
        super('winGame')
    }
    preload()
    {   
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    create()
    {
        var fanfare = this.sound.add('fanfare'); 
        fanfare.play(); 

        var ella = this.add.sprite(200,80,'ella');
        ella.setScale(3).play('ella_dance');
        var monke = this.add.sprite(140,80,'monke');
        monke.setScale(3).play('monke_dance');
        var tiger = this.add.sprite(260,80,'tiger');
        tiger.setScale(3).play('tiger_dance');

        var duckie = this.add.sprite(200, 150, 'duckie', 4);
        duckie.setScale(2);

        var text = this.add.bitmapText(150,80, "pixelFont", "YOU WON!", 30);
        text.setAlpha(0);
        this.tweens.add({
            targets: text,
            alpha: { from: 0, to: 1 },
            y: 100,
            ease: 'Linear',
            duration: 1000,
            callbackScope: this
        });  

        this.time.addEvent({
            delay:2000,
            callback: this.pressSpaceText,
            callbackScope: this,
            loop: false
        });
        
        var text2 = this.add.bitmapText(50,190, "pixelFont", "The next level is for you to find ways you can \n make a positive difference for our environment! \n Duckie believes in you. :) ", 16, 1);
    }
    pressSpaceText()
    {
        this.add.bitmapText(110,20, "pixelFont", "[Press SPACE to return to title scene]", 14);
    }
    update()
    {
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.fadeOut();
        }
    }
    fadeOut()
    {
        this.cameras.main.fadeOut(2000);
        this.time.addEvent({
            delay:2000,
            callback: this.returnHome,
            callbackScope: this,
            loop: false
        });
    }
    returnHome()
    {
        this.scene.stop();
        this.sys.game.destroy(true);

        new Phaser.Game({

            type: Phaser.AUTO,
            width: 400, //Width of game canvas
            height: 250, //Height of game canvas
            physics: { //Physics configuration for game
                default: 'arcade', //Using arcade physics
                arcade: {
                    debug: false,
                    gravity: { y: 0 } //No gravity for a top down game
                }
            },
            scene: [Preloader, Title, GameLvl1, GameLvl2, GameLvl3, Transition1, Transition2, Transition3, GameOver, WinGame], //Has the scenes in order they should go
            scale: {
                zoom: 2 //Scales up all images 2 times
            }
        
        })
    }
}