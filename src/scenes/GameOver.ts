import Phaser from 'phaser'

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
        this.add.bitmapText(150,50, "pixelFont", "GAME OVER", 30);
        this.add.bitmapText(150,120, "pixelFont", "Try again?", 30);


        var sadSound = this.sound.add('sad'); 

        var yesButton = this.physics.add.sprite(120,200,'yesNoButton', 0);
        yesButton.setInteractive().setImmovable(true);
        yesButton.body.setSize(96,35);


        var noButton = this.add.sprite(280,200,'yesNoButton', 2);
        noButton.setInteractive();
        //have a button for yes
            //when clicked, make duck switch frame to happy and start scene according to this.level number
        //have a button for no
            //when clicked, do some sad duck noise and this.scene.start('title');
        yesButton.on('pointerout', (pointer) => {
            yesButton.setFrame(0);
        }, this);
        yesButton.on('pointerup', (pointer) => {
            yesButton.setFrame(1);
            noButton.disableInteractive;
            yesButton.disableInteractive();
            if(this.level == 1)
            {
                this.scene.stop();
                //this.scene.start('game1');
                var theOtherScene = this.scene.get('game1');
                theOtherScene.registry.destroy();
                theOtherScene.events.off();
                theOtherScene.scene.restart();
            }
            else if(this.level ==2)
            {
                this.scene.start('game2');
            }
            else
            {
                this.scene.start('game3');
            }
            
        });
        noButton.on('pointerout', (pointer) => {
            noButton.setFrame(2);
        }, this);

        noButton.on('pointerup', (pointer) => {
            noButton.setFrame(3);
            sadSound.play();
            noButton.disableInteractive();
            yesButton.disableInteractive();
            this.time.addEvent({
                delay: 3000, 
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
        if(this.level == 1)
        { 
            this.scene.stop('game1');

        }
        else if(this.level ==2)
        {
            this.scene.stop('game2');
        }
        else
        {
            this.scene.stop('game3'); 
        }
        this.scene.stop();
        this.scene.start('title');
        
    }

}