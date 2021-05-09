import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }
    preload()
    {
        this.load.image('wallTiles', 'tiles/dungeon_tiles.png');
        this.load.image('grassTiles', 'tiles/grass_tiles.png');
        this.load.tilemapTiledJSON('dungeon1', 'tiles/dungeon01.json');

        this.load.spritesheet('duckie', 'character/duckie.png', {
            frameWidth: 48,
            frameHeight: 48
        });

    }
    create()
    {
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


        this.scene.start('game1'); 
    }

}