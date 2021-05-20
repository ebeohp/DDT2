import Phaser from 'phaser'
import GameLvl1 from './GameLvl1';
import GameLvl2 from './GameLvl2';
import GameLvl3 from './GameLvl3';
import Preloader from './Preloader';
import Title from './Title';

export default class Transition extends Phaser.Scene
{
    level: any;
    beep: boolean;
    constructor()
    {
        super('transition')
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
        
    }

    

}