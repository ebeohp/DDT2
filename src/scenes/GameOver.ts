import Phaser from 'phaser'
import Preloader from './Preloader'
import GameLvl1 from './GameLvl1'
import GameLvl2 from './GameLvl2'
import GameLvl3 from './GameLvl3'
import Title from './Title'
import Transition1 from './Transition1'
import Transition2 from './Transition2'
import Transition3 from './Transition3'
import WinGame from './WinGame'

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
        this.add.bitmapText(150,100, "pixelFont", "GAME OVER", 30);

        var duckie = this.physics.add.sprite(80,20, 'duckie', 5);
        duckie.body.gravity.y = 800;
        duckie.body.setBounce(0,0.5);

        var sadSound = this.sound.add('sad'); 

        var yesButton = this.physics.add.sprite(120,200,'yesNoButton', 0);
        yesButton.setInteractive().setImmovable(true);
        yesButton.body.setSize(96,35);

        var collider = this.physics.add.collider(duckie, yesButton, this.tryAgain, null, this);

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
                this.scene.add('game1', GameLvl1, true);
                
            }
            else if(this.level ==2)
            {
                this.scene.stop();
                this.scene.add('game2', GameLvl2, true);
            }
            else
            {
                this.scene.stop();
                this.scene.add('game3', GameLvl3, true);
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
        //Completely restart the game
        this.sys.game.destroy(true);

        new Phaser.Game({

            type: Phaser.AUTO,
            width: 400, //Width of game canvas
            height: 250, //Height of game canvas
            physics: { //Physics configuration for game
                default: 'arcade', //Using arcade physics
                arcade: {
                    debug: true,
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