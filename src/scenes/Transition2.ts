import Phaser from 'phaser'

export default class Transition2 extends Phaser.Scene
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
        super('transition2')
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
        this.add.bitmapText(150,40, "pixelFont", "Level 2 Stats", 30);
        this.decision = "";

        if(this.stars == 27 && this.trees == 7)
        {
            this.decision = "Level Complete!";
        }
        if(this.stars != 27 || this.trees != 7)
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
        this.add.bitmapText(150,80, "pixelFont", "Trees Restored: " + this.trees + "/7", 15);
    }
    starStats()
    {
        this.add.bitmapText(150,100, "pixelFont", "Stars Collected: " + this.stars + "/27", 15);
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
            this.number = 3;
            this.countDown= this.add.bitmapText(100,170, "pixelFont", "Starting next level in " + this.number + " seconds", 20)
            this.cameras.main.fadeOut(3000);
            this.time.addEvent({
                delay: 1000,
                callback: this.timer,
                callbackScope: this,
                loop: true
            });
            this.time.addEvent({
                delay: 3000,
                callback: this.nextLevel,
                callbackScope: this,
                loop: false
            });
        }
    }
    timer()
    {
        this.number -= 1;
        this.countDown.text = "Starting next level in " + this.number + " seconds";
    }
    nextLevel()
    {
        this.scene.stop;
        this.scene.start('game3');
    }
    gameOver()
    {
        this.scene.stop();
        this.scene.start('gameover', {level: 2});
    }

    

}