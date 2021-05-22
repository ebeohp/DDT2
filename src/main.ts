import Phaser from 'phaser'

//Import the scenes below from files
import Preloader from './scenes/Preloader'
import GameLvl1 from './scenes/GameLvl1'
import GameLvl2 from './scenes/GameLvl2'
import GameLvl3 from './scenes/GameLvl3'
import Title from './scenes/Title'
import GameOver from './scenes/GameOver'
import Transition1 from './scenes/Transition1'
import Transition2 from './scenes/Transition2'
import Transition3 from './scenes/Transition3'
import WinGame from './scenes/WinGame'

export default new Phaser.Game({

	type: Phaser.AUTO,
	width: 400, //Width of game canvas
	height: 250, //Height of game canvas
	physics: { //Physics configuration for game
		default: 'arcade', //Using arcade physics
		arcade: {
			debug: false,
			gravity: { y: 0 } //No gravity for a top down game
		}
	},
	scene: [Preloader, Title, GameLvl1, GameLvl2, GameLvl3, Transition1, Transition2, Transition3, GameOver, WinGame], //Has the scenes in order they should go
	scale: {
		zoom: 2 //Scales up all images 2 times
	}

})
