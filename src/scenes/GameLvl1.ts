import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';

export default class GameLvl1 extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private duckie!: Phaser.Physics.Arcade.Sprite

    private heartGroup!: Phaser.Physics.Arcade.Group
    private heart1!: Phaser.Physics.Arcade.Group
    private heart2!: Phaser.Physics.Arcade.Group
    private heart3!: Phaser.Physics.Arcade.Group
    
    private myCam!: Phaser.Cameras.Scene2D.Camera

    private botGroup!: Phaser.Physics.Arcade.Group
    private bot1!: Phaser.Physics.Arcade.Sprite
    private numHearts = 3;
    private botCollider!: Phaser.Physics.Arcade.Collider

	constructor()
	{
		super('game1')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        const map = this.make.tilemap({key: 'dungeon1'});
        const tileset1 = map.addTilesetImage('dungeon', 'wallTiles');
        const tileset2 = map.addTilesetImage('green', 'grassTiles');

        const groundLayer = map.createLayer('Ground', tileset2)
        const wallsLayer = map.createLayer('Walls', tileset1)
        
    
        wallsLayer.setCollisionByProperty({collides: true})
        
        //Just to look at the walls colliders 
        /*
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243,234,48, 255),
            faceColor: new Phaser.Display.Color(48,49,47,255),
        })*/

        this.duckie = this.physics.add.sprite(128,128, 'duckie', 4);
        

        this.physics.add.collider(this.duckie, wallsLayer);
        
        this.botGroup = this.physics.add.group();
        this.bot1 = this.botGroup.create(200,128,'bot');
        this.bot1.anims.play('bot_move', true).setImmovable(true);
        this.botCollider = this.physics.add.collider(this.duckie, this.botGroup, this.hurtDuckie, null, this);

        this.myCam = this.cameras.main.startFollow(this.duckie, true);

        this.heartGroup = this.physics.add.group();
        this.heart1 = this.heartGroup.create(30, 20, "heart",0);
        this.heart1.setScrollFactor(0,0);
        this.heart2 = this.heartGroup.create(60, 20, "heart",0);
        this.heart2.setScrollFactor(0,0);
        this.heart3 = this.heartGroup.create(90, 20, "heart",0);
        this.heart3.setScrollFactor(0,0);
        console.log("Hey" + this.numHearts);
       

    }
    hurtDuckie(duck,bot)
    {
        duck.setPosition(128,128); //Return to spawn
        //Add tweens later for flickering effect
        this.numHearts -= 1;
        var once = 0;
        
        console.log("d" + this.numHearts);
        if(this.numHearts == 2 && once!=1)
        {
            this.heart1.setFrame(1);
            once+=1;
        }
        if(this.numHearts == 1 && once!=1)
        {
            this.heart2.setFrame(1);
            once+=1;
        }
        if(this.numHearts == 0 && once!=1)
        {
            this.heart3.setFrame(1);
            once+=1;
        }
    
    }  

    update(t: number, dt: number)
    {   
        if(!this.cursors || !this.duckie)
        {
            return;
        }
        const speed = 200;
        if(this.cursors.left?.isDown)
        {
            this.duckie.anims.play('duck_walkSide',true);
            this.duckie.setVelocity(-speed, 0);
            this.duckie.scaleX = -1
            this.duckie.body.offset.x = 32
        }
        else if(this.cursors.right?.isDown)
        {
            this.duckie.anims.play('duck_walkSide',true);
            this.duckie.setVelocity(speed, 0);

            this.duckie.scaleX = 1
            this.duckie.body.offset.x = 0
        }
        else if (this.cursors.up?.isDown)
        {
            this.duckie.anims.play('duck_walkUp',true);
            this.duckie.setVelocity(0,-speed);
        }
        else if(this.cursors.down?.isDown)
        {
            this.duckie.anims.play('duck_walkDown',true);
            this.duckie.setVelocity(0,speed);
        }
        else
        {   
            this.duckie.anims.play('duck_idleDown',true);
            this.duckie.setVelocity(0,0);
        }
    }
}
