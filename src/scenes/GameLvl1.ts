import Phaser from 'phaser'

export default class GameLvl1 extends Phaser.Scene
{
	constructor()
	{
		super('game1')
	}

	preload()
    {
        
    }

    create()
    {
        const map = this.make.tilemap({key: 'dungeon1'});
        const tileset1 = map.addTilesetImage('dungeon', 'wallTiles');
        const tileset2 = map.addTilesetImage('green', 'grassTiles');

        const wallsLayer = map.createLayer('Walls', tileset1)
        map.createLayer('Ground', tileset2)
    
        wallsLayer.setCollisionByProperty({collides: true})
        
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243,234,48, 255),
            faceColor: new Phaser.Display.Color(48,49,47,255),
        })

        const duckie = this.add.sprite(128,128, 'duckie', 4);
        duckie.anims.play('duck_walkSide');
    }
}
