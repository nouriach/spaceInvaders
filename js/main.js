/******
N Ouriach
Space Invaders in CSS, JavaScript & HTML
July 2019
*******/

document.onkeydown = function (e){
	
	if (e.code === "ArrowRight") {
//		console.log ("RIGHT");
		heroPosition.left = heroPosition.left + 10;
//		console.log(heroPosition.left);
		moveHero ();
	}
		
	else if (e.code === "ArrowLeft"){
//		console.log ("LEFT");
		heroPosition.left = heroPosition.left - 10;
//		console.log(heroPosition.left);
		moveHero ();
	}
		
	else if (e.code === "Space"){
//		console.log ("SHOOT");
		
//		push a new missile into the empty array and position it wherever the 		hero currently is
		missiles.push({
		left: heroPosition.left + 35,
		top: heroPosition.top
		})
		
//		call the missile function
		heroShoot ()
	}
	else {
		
	}
}

// this echoes the default style 'top' and 'left' in CSS

let heroPosition = {
	
	top: 700,
	left: 550
};

let missiles = [];
let enemies = [
	
	{left: 300, top: 50},
	{left: 500, top: 50},
	{left: 700, top: 50},
	{left: 900, top: 50},
	
	{left: 300, top: 150},
	{left: 500, top: 150},
	{left: 700, top: 150},
	{left: 900, top: 150},
	
	{left: 300, top: 250},
	{left: 500, top: 250},
	{left: 700, top: 250},
	{left: 900, top: 250},

];

//move hero functions below and also make sure it doesn't leave the screen

function moveHero () {
	
	if (heroPosition.left > 50 && heroPosition.left < 1150) {
		document.getElementById("hero").style.left = heroPosition.left + "px"
	}
	
	else {
		console.log ("you can't leave the screen")
	}
}

//This function will grab the array of missiles (which increases each time "space" is hit) and will create a new element. This new element has pre-set CSS stylings.

function heroShoot () {
	document.getElementById("missiles").innerHTML = "";
	for (missile = 0; missile < missiles.length; missile++) {
		document.getElementById("missiles").innerHTML += 
		`<div class = 'missile' style='left:${missiles[missile].left}px; top:${missiles[missile].top}px;'></div>`
	}	 
}

function moveMissiles () {
	for (missile = 0; missile < missiles.length; missile++) {
		missiles[missile].top = missiles[missile].top - 10;
	}
}

function drawEnemies () {
	
	document.getElementById("enemies").innerHTML = "";
	for (enemy = 0; enemy < enemies.length; enemy++) {
		document.getElementById("enemies").innerHTML += 
		`<div class = 'enemy' style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px;'></div>`
	}	
}

//enemies currently move diagonally down

function moveEnemies () {
	
	if (heroPosition.left !== 550){
		for (enemy = 0; enemy < enemies.length; enemy++) {
		enemies[enemy].top = enemies[enemy].top + 2;
//		enemies[enemy].left = enemies[enemy].left + 2;
		}
	}
	else { console.log("game will begin when player moves")
		 }
}

function collisisonDetection () {
	for (enemy = 0; enemy < enemies.length; enemy++ ){
		for (missile = 0; missile < missiles.length; missile++){
		if 
		(missiles[missile].top <= enemies[enemy].top + 50 && missiles[missile].top > enemies[enemy].top &&
		missiles[missile].left >= enemies[enemy].left &&
		missiles[missile].left <= enemies[enemy].left + 100
		) {
			enemies.splice(enemy, 1);
			missiles.splice(missile, 1);
			}
		}
	}
}


function gameLoop() {
	setTimeout( gameLoop, 100)
	moveMissiles();
	heroShoot()
	moveEnemies();
	drawEnemies();
	collisisonDetection();
}
gameLoop();