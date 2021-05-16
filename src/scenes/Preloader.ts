import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }
    preload()
    {
        //For the progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0xff0000, 0.8);
        progressBox.fillRect(45, 180, 320, 30);
        
        this.load.bitmapFont("pixelFont", "font/font.png", "font/font.xml");
        
        
        let percText = this.add.text(200, 195, "0%", {
            font: "15px",
        }).setOrigin(0.5);
        let loadingText = this.add.text(200, 50, "Loading...", {
            font: "15px",
        }).setOrigin(0.5);

        this.load.on("progress", function (perc) {
            percText.setText(perc * 100 + "%");
            loadingText.setText('Loading...');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(55, 185, 300 * perc, 20);

        });
        this.load.on("complete", function () {
            loadingText.destroy();
        });

        //Game Assets below:
        this.load.image('wallTiles', 'tiles/dungeon_tiles.png');
        this.load.image('grassTiles', 'tiles/grass_tiles.png');
        this.load.tilemapTiledJSON('dungeon1', 'tiles/dungeon01.json');
        this.load.tilemapTiledJSON('dungeon2', 'tiles/dungeon02.json');
        this.load.tilemapTiledJSON('dungeon3', 'tiles/dungeon03.json');

        this.load.spritesheet('duckie', 'character/duckie.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('bot', 'enemies/bot.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('heart', 'hearts/heart.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('star', 'items/star.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('chest', 'items/chest.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image('stump', 'trees/stump.png');
        this.load.image('tree', 'trees/tree.png');
        this.load.image('trigger', 'trees/trigger.png');

        this.load.spritesheet('closeButton', 'popup/closeButton.png', {
            frameWidth: 160,
            frameHeight: 160
        });
        this.load.image('window', 'popup/popupWindow.png');

        this.load.spritesheet('title', 'decoration/title.png', {
            frameWidth: 320,
            frameHeight: 320
        });

        this.load.spritesheet('redButton', 'items/redButton.png', {
            frameWidth: 48,
            frameHeight: 48
        });

        //Music and Sound Effects
        this.load.audio("music", "music/effervesce.mp3");
        this.load.audio("collect", "music/collect.wav");
        this.load.audio("hurt", "music/hurt.wav");
        this.load.audio("lose", "music/lose.wav");

    }
    create()
    {
        this.anims.create({
            key: "title_anim",
            frames: this.anims.generateFrameNames('title'),
            frameRate: 10,
            repeat: -1
        });
        //Below are all the animations for the duck player character
        this.anims.create({
            key: "duck_idleDown",
            frames: this.anims.generateFrameNames('duckie', {start:4, end:4}),
            frameRate: 0,
            repeat: 0
        });
        this.anims.create({
            key: "duck_idleUp",
            frames: this.anims.generateFrameNames('duckie', {start:14, end:14}),
            frameRate: 0,
            repeat: -1
        }); 
        this.anims.create({
            key: "duck_cry",
            frames: this.anims.generateFrameNames('duckie', {start:5, end:5}),
            frameRate: 0,
            repeat: -1
        }); 
        this.anims.create({
            key: "duck_walkDown",
            frames: this.anims.generateFrameNames('duckie', {start:0, end:3}),
            frameRate: 12,
            repeat: -1
        }); 
        this.anims.create({
            key: "duck_walkSide",
            frames: this.anims.generateFrameNames('duckie', {start:6, end:9}),
            frameRate: 12,
            repeat: -1
        }); 
        this.anims.create({
            key: "duck_walkUp",
            frames: this.anims.generateFrameNames('duckie', {start:10, end:13}),
            frameRate: 12,
            repeat: -1
        }); 

        //Below is the animations for the robot enemy
        this.anims.create({
            key: "bot_move",
            frames: this.anims.generateFrameNames('bot'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "heart_live",
            frames: this.anims.generateFrameNames('bot',{start:0, end:0}),
            frameRate: 0,
            repeat: -1
        });
        this.anims.create({
            key: "heart_empty",
            frames: this.anims.generateFrameNames('bot',{start:1, end:1}),
            frameRate: 0,
            repeat: -1
        });

        this.anims.create({
            key: "star_spin",
            frames: this.anims.generateFrameNames('star',{frames: [1,5,9,13,17,21]}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: "chest_open",
            frames: this.anims.generateFrameNames('chest', {start:1, end:1}),
            frameRate: 0,
            repeat: 0
        });
        
        this.anims.create({
            key: "close_button_shine",
            frames: this.anims.generateFrameNames('closeButton', {start:0, end:7}),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: "close_button_clicked",
            frames: this.anims.generateFrameNames('closeButton', {start:8, end:8}),
            frameRate: 0,
            repeat: 0
        });

        this.anims.create({
            key: "red_button_press",
            frames: this.anims.generateFrameNames('redButton'),
            frameRate: 10,
            repeat: 0
        });

        this.scene.start('title'); 
    }

}