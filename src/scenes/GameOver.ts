import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';

export default class GameOver extends Phaser.Scene
{
    level: any;
    beep: boolean;
    constructor()
    {
        super('gameover')
    }
    init(data)
    {
        this.level = data.level;
    }
    preload()
    {
       
    }
    create()
    {
        this.add.bitmapText(150,90, "pixelFont", "GAME OVER", 30);

        var duckie = this.physics.add.sprite(80,20, 'duckie', 5);
        duckie.body.gravity.y = 800;
        duckie.body.setBounce(0,0.5);

        var sadSound = this.sound.add('sad'); 

        var yesButton = this.physics.add.sprite(120,180,'yesNoButton', 0);
        yesButton.setInteractive().setImmovable(true);
        yesButton.body.setSize(96,35);

        var collider = this.physics.add.collider(duckie, yesButton, this.tryAgain, null, this);

        var noButton = this.add.sprite(270,180,'yesNoButton', 2);
        noButton.setInteractive();
        //have a button for yes
            //when clicked, make duck switch frame to happy and start scene according to this.level number
        //have a button for no
            //when clicked, do some sad duck noise and this.scene.start('title');
        yesButton.on('pointerout', function (pointer) {
            yesButton.setFrame(0);
        }, this);
        yesButton.on('pointerup', function (pointer) {
            yesButton.setFrame(1);
            noButton.disableInteractive;
            yesButton.disableInteractive();
        });
        noButton.on('pointerout', function (pointer) {
            noButton.setFrame(2);
        }, this);

        noButton.on('pointerup', function (pointer) {
            noButton.setFrame(3);
            sadSound.play();
            noButton.disableInteractive();
            yesButton.disableInteractive();
            this.time.addEvent({
                delay: 500, 
                callback: this.endGame,
                callbackScope: this,
                loop: false
            });
        });

        
    }

    tryAgain()
    {
        this.add.bitmapText(180,120, "pixelFont", "Try again?", 15);
    }

    endGame()
    {
        this.scene.start('title');
    }

}