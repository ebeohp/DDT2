import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';

class ListNode
{
    public data: string
    public next!: any
    constructor(data, next)
    {
        this.data = data
        this.next = null
    }
}
class LinkedList{
    public head!: ListNode
    constructor(head = null)
    {
        this.head = head 
    }
    removeHead()
    {
        this.head = this.head.next
    }
}
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
    private numStars = 3;

    private botCollider!: Phaser.Physics.Arcade.Collider
    private spacebar!: Phaser.Input.Keyboard.Key;
    
    private treeGroup!: Phaser.Physics.Arcade.Group;
    private tree1!: Phaser.Physics.Arcade.Group;
    private treeCollider!: Phaser.Physics.Arcade.Collider;
    private treeTrigger!: Phaser.Physics.Arcade.Collider;
    private treeTrigGroup!: Phaser.Physics.Arcade.Group;

    starGroup: Phaser.Physics.Arcade.Group;
    starText: Phaser.GameObjects.BitmapText;
    chestCollider: Phaser.Physics.Arcade.Collider;
    chestGroup: Phaser.Physics.Arcade.Group;
    chestTrigger: Phaser.Physics.Arcade.Collider;
    chestTrigGroup: Phaser.Physics.Arcade.Group;

    
    list: LinkedList;
    exitButton: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;


	constructor()
	{
		super('game2')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        const map = this.make.tilemap({key: 'dungeon2'});
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

        this.duckie = this.physics.add.sprite(100,100, 'duckie', 4);
        var name = this.add.bitmapText(15,7, "pixelFont", "DUCKIE", 16);
        name.setScrollFactor(0,0);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.myCam = this.cameras.main.startFollow(this.duckie, true);

        this.physics.add.collider(this.duckie, wallsLayer);
        
        this.botGroup = this.physics.add.group();
        this.bot1 = this.botGroup.create(200,128,'bot');
        this.bot1.anims.play('bot_move', true);
        this.bot1.setImmovable(true);
        this.botCollider = this.physics.add.collider(this.duckie, this.botGroup, this.hurtDuckie, null, this);


        //Graphics for lives system and groups hearts 
        this.heartGroup = this.physics.add.group();
        this.heart1 = this.heartGroup.create(30, 30, "heart",0);
        this.heart1.setScrollFactor(0,0).setDepth(10);
        this.heart2 = this.heartGroup.create(60, 30, "heart",0);
        this.heart2.setScrollFactor(0,0).setDepth(10);
        this.heart3 = this.heartGroup.create(90, 30, "heart",0);
        this.heart3.setScrollFactor(0,0).setDepth(10);
        
        //Graphics for trees and groups all trees //Each tree has their own trigger
        this.treeGroup = this.physics.add.group();
        var tree1 = this.treeGroup.create(120,230,'stump');
        tree1.body.setSize(20,20);
        tree1.setOffset(15,20);
        tree1.setImmovable(true);

        this.treeCollider = this.physics.add.collider(this.duckie, this.treeGroup);
        
        this.treeTrigGroup = this.physics.add.group(); //This is to set an invisible area around the tree to sense for space bar input that can fix the tree
        var tTrig1 = this.treeTrigGroup.create(120,230, 'trigger');
        
        this.treeTrigger = this.physics.add.overlap(this.duckie, this.treeTrigGroup, this.fixTree, null, this);

        //Graphics for stars and star mechanics
        this.numStars = 0; //Counts number collected in this level
        this.starText = this.add.bitmapText(150,7, "pixelFont", "       X 0", 14); //Text to tell user how many stars they counted
        var fakeStar = this.add.sprite(155,12,'star',1);
        this.starText.setScrollFactor(0,0).setDepth(10);;
        fakeStar.setScrollFactor(0,0).setDepth(10);;

        this.starGroup = this.physics.add.group();
        var star1 = this.starGroup.create(50,200, 'star');
        star1.anims.play('star_spin');

        //make 2 arrays with x and y  of stars and then loop through + create stars 
        
        this.physics.add.collider(this.duckie, this.starGroup, this.collectStar, null, this);

        //Graphics for chest and chest mechanics
        this.chestGroup = this.physics.add.group();
        var chest1 = this.chestGroup.create(180,60, 'chest', 0);
        chest1.setImmovable(true);


        this.chestCollider = this.physics.add.collider(this.duckie, this.chestGroup);

        this.chestTrigGroup = this.physics.add.group(); //This is to set an invisible area around the tree to sense for space bar input that can fix the tree
        var cTrig1 = this.chestTrigGroup.create(180,60, 'trigger');

        this.chestTrigger = this.physics.add.overlap(this.duckie, this.chestTrigGroup, this.openChest, null, this);

        //Linked list construction below with queue linking NEED NEW FACST
        var node1 = new ListNode("", null)
        var node2 = new ListNode("", null)
        node1.next = node2;
        var node3 = new ListNode("", null)
        node2.next = node3;

        this.list = new LinkedList(node1);
        //console.log(this.list.head.next.data);

    }
    openChest(duck, chest)
    {
        if(Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            chest.anims.play('chest_open');
            chest.disableBody(true,false);
            duck.disableBody(true,false); //Dont allow movement while popup is on
            var window = this.add.image(chest.x,chest.y,'window');
            window.setScale(0.1).setAlpha(0).setDepth(20);

            this.tweens.add({
                targets: window,
                alpha: { from: 0, to: 1 },
                repeat: 0,
                x: duck.x,
                y: duck.y,
                scaleX: 0.75,
                scaleY: 0.5,
                ease: 'Linear',
                duration: 400,
                onComplete: function(){
                    this.displayFact(window,duck,chest);
                },
                callbackScope: this
            }); 
            
        }
    }
    displayFact(popup,player,chest)
    {
        var funFact = this.add.text(170,70, 'Fun Fact!', { font: '"Press Start 2P"', color: '#000000', align: 'center', wordWrap: { width: 200 } });
        funFact.setDepth(20);
        funFact.setScrollFactor(0,0);
        var text = this.add.text(95,90, this.list.head.data, { font: '"Press Start 2P"', color: '#000000', align: 'center', wordWrap: { width: 200 } });
        text.setDepth(20);
        text.setScrollFactor(0,0);
        this.list.removeHead();
        this.tweens.add({ //This tweens doesnt do anything except call to create a button after 5 seconds
            targets: text,
            alpha: { from: 1, to: 1 },
            repeat: 0,
            ease: 'Linear',
            duration: 100, //3000
            onComplete: function(){
                this.giveExitButton(popup,player,funFact,text,chest); 
            },
            callbackScope: this
        });  
    }
    giveExitButton(popup,player,text1,text2,chest) //To allow player to exit the popup
    {
        this.exitButton = this.physics.add.sprite(190,180,"closeButton");
        this.exitButton.setInteractive().setScale(0.5).setDepth(20).setScrollFactor(0,0);
        this.exitButton.on('pointerout', function (pointer) {
            this.exitButton.setFrame(0);
        }, this);
        this.exitButton.on('pointerover', function (pointer) {
            this.exitButton.play('close_button_shine');
        }, this);
        this.exitButton.on('pointerup', function (pointer) {
            popup.destroy(true);
            text1.destroy(true);
            text2.destroy(true);
            this.exitButton.destroy(true);
            this.tweens.add({
                targets: popup,
                alpha: { from: 1, to: 0 },
                repeat: 0,
                scaleX: 0,
                scaleY: 0,
                ease: 'Linear',
                duration: 200,
                onComplete: function(){ 
                    this.giveStars(player,chest);
                },
                callbackScope: this
            });     
        }, this);
    }
    giveStars(player,chest)
    {
        var star = this.starGroup.create(chest.x,chest.y, 'star'); //Starting for the chest
        star.disableBody(true,false);
        star.setFrame(1);
        this.tweens.add({
            targets: star,
            repeat: 5,
            x: player.x, //going to the duck
            y: player.y,
            ease: 'Linear',
            duration: 400,
            onComplete: function(){
                player.enableBody(false,0, 0, true, true); //Allow player to move again and enable physics body
                star.disableBody(true,true);
                this.numStars += 5;
                this.starText.text = "       X " + this.numStars;
            },
            callbackScope: this
        }); 
    }
    
    collectStar(duck, star)
    {
        star.disableBody(true,false);
        this.numStars += 1;
        this.starText.text = "       X " + this.numStars;

        this.tweens.add({
            targets: star,
            alpha: { from: 1, to: 0 },
            repeat: 0,
            y: '-=100',
            ease: 'Linear',
            duration: 1000,
            onComplete: function(){
                this.numStars += 1;
                console.log("Collected!");
                star.disableBody(true,true);
            }
        });
    }
    fixTree(duck, tree)
    {
        if(Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            tree.setTexture('tree');
            tree.setOrigin(0.5,0.66);
        }
    }
    hurtDuckie(duck,bot)
    {
        duck.setPosition(128,128); //Respawn at start
    
        var tween = this.tweens.add({ //Tweens for flickering effect when respawning
            targets: duck,
            alpha: 0,
            ease: "Power1",
            duration: 100,
            repeat: 3,
            onComplete: function(){
                duck.alpha = 1;
            },
            callbackScope: this
        });
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
            
            //Make a try again? button show up
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
        if(this.numHearts == 0)
        {
            this.duckie.anims.play("duck_cry", true);
            this.duckie.disableBody(true,false);
        }        
        
    }
}