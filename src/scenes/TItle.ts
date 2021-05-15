import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('title')
    }
    preload()
    {
    }
    create()
    {
        
       var title = this.add.sprite(200,100, 'title');
       title.play('title_anim').setScale(0.5);
    }

}