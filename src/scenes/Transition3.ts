import Phaser from 'phaser'
import GameLvl1 from './GameLvl1';
import GameLvl2 from './GameLvl2';
import GameLvl3 from './GameLvl3';
import Preloader from './Preloader';
import Title from './Title';

export default class Transition3 extends Phaser.Scene
{
    level: any;
    beep: boolean;
    trees: any;
    stars: any;
    timeTaken: any;
    decision: string;
    number: number;
    countDown: Phaser.GameObjects.BitmapText;
    constructor()
    {
        super('transition3')
    }
    init(data)
    {
        this.level = data.level;
        this.stars = data.stars;
        this.trees = data.trees;
        this.timeTaken = data.timeTaken;
    }
    create()
    {
        this.add.bitmapText(150,40, "pixelFont", "Level 3 Stats", 30);
        this.decision = "";

        if(this.stars == 29 && this.trees == 6)
        {
            this.decision = "Level Complete!";
        }
        if(this.stars != 29 || this.trees != 6)
        {
            this.decision = "Level Failed! :("
        }

        
        this.time.addEvent({
            delay: 500,
            callback: this.treeStats,
            callbackScope: this,
            loop: false
        });
        this.time.addEvent({
            delay: 1000,
            callback: this.starStats,
            callbackScope: this,
            loop: false
        });
        this.time.addEvent({
            delay: 1500,
            callback: this.timeStats,
            callbackScope: this,
            loop: false
        });
        this.time.addEvent({
            delay: 2000,
            callback: this.giveDecision,
            callbackScope: this,
            loop: false
        });
    }
    treeStats()
    {
        this.add.bitmapText(150,80, "pixelFont", "Trees Restored: " + this.trees + "/6", 15);
    }
    starStats()
    {
        this.add.bitmapText(150,100, "pixelFont", "Stars Collected: " + this.stars + "/29", 15);
    }
    timeStats()
    {
        this.add.bitmapText(150,120, "pixelFont", "Time Taken: " + this.timeTaken, 15);
    }
    giveDecision()
    {
        this.add.bitmapText(150,150, "pixelFont", this.decision, 20)

        if(this.decision == "Level Failed! :(")
        {
            this.time.addEvent({
                delay: 1500,
                callback: this.gameOver,
                callbackScope: this,
                loop: false
            });
        }
        if(this.decision == "Level Complete!")
        {
            this.cameras.main.fadeOut(2000);
            this.time.addEvent({
                delay: 2000,
                callback: this.nextLevel,
                callbackScope: this,
                loop: false
            });
        }
    }

    nextLevel()
    {
        this.scene.stop;
        this.scene.start('winGame');
    }
    gameOver()
    {
        this.scene.stop();
        this.scene.start('gameover', {level: 3});
    }

    

}