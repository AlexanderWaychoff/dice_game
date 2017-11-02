describeGame ();


function describeGame(){
	console.log("Welcome to my dice game.  The goal is to reach stage 100 while surviving.");
	console.log("Monsters can be defeated or ran past, however if you run past and they catch up to you it could mean game over!");
	console.log("Please choose a class between : warrior, mage, or rogue to play as.  Each has their strengths and weaknesses so choose wisely.")
	console.log("");
	let playerClass = getPlayerClass ();
	let playerHealth = classHealth (playerClass);
	console.log(playerHealth);

	let gameEnder = calculateMist (playerClass);
	let monsterRandom = randomizeMonsters(playerClass);
	let monsterCount = calculateMonsterAmount (playerClass, monsterRandom);
	let monsterStrength = calculateMonsterStrength (playerClass, monsterRandom);
	let monsterPosition = determineMonsterPosition(monsterRandom, monsterCount, monsterStrength, playerClass);
	startGame (playerClass, playerHealth, monsterCount, monsterStrength, gameEnder, monsterPosition);
}

function startGame(playerClass, playerHealth, monsterCount, monsterHealth, gameEnder, monsterPosition){
	let lastStage = 100;
	let mistMovement;
	let mistStage = 0;
	//monster
	let monsterID;
	let monsterDistanceFromPlayer;
	let monsterEncounter = 0;	//0 = false, 1 = true
	let monsterName;
	let monsterCurrentPosition;
	let isMonsterAware;
	let monsterStats;
	let monsterCheck = 0;
	let monsterStatsArray;
	let monsterAwarenessArray;
	
	monsterAwarenessArray = setMonsterAwareness(monsterPosition, isMonsterAware, monsterCheck);

	
	let turnCount = 0;
	let determineRoll = 0;
	let spacesToMove;
	//player variables
	//let playerPosition = 1;
	let currentStage = 1;
	let startingHealth = playerHealth;
	
	for (currentStage; currentStage <= lastStage; currentStage){
		turnCount += 1;
		if (turnCount >= gameEnder){
			if (turnCount === gameEnder){
				console.log("The mist has appeared.  The time to reach the end is running out!");
			}
			mistMovement = calculate8Roll() + 3;
			mistStage += mistMovement;
			console.log("The mist has reached stage " + mistStage + ".  Don't let it reach you!")
			if (mistStage >= currentStage){
				return console.log("The mist caught up to you.  You lose!");
			}
		}
		if (monsterEncounter === 0){
			console.log("It is turn " + turnCount + ".  You are at stage " + currentStage + " with " + playerHealth + " health.");
			for(let j = currentStage; j < currentStage + 15 && j < lastStage; j++){
				if (!(monsterPosition[j] === "x")){
					monsterCheck += 1;
					
					monsterID = monsterPosition[j];
					monsterDistanceFromPlayer =  j - currentStage;
					monsterName = getMonsterID(monsterID);				//displays text of monster name to player
					monsterCurrentPosition = monsterDistanceFromPlayer + currentStage; //make adjustments so it lines up correctly in array
					monsterPlayerPositionDifference = monsterCurrentPosition - currentStage;
					//monsterStats = getMonsterStats(monsterPosition, j);
					monsterStatsArray = setMonsterStats(monsterPosition, monsterDistanceFromPlayer, monsterStats, monsterCheck);
					monsterAwarenessArray = setMonsterAwareness(monsterPosition, isMonsterAware, monsterCheck, monsterID, monsterCurrentPosition, monsterPlayerPositionDifference, monsterAwarenessArray);
					
					if (monsterID >= 0){
						//monsterCurrentPosition = monsterDistanceFromPlayer + ;
						isMonsterAware = declareMonsterAwareness(monsterID, monsterPlayerPositionDifference, monsterAwarenessArray, monsterCurrentPosition);
					}
					if (monsterPosition[j] === 9){
						j += 15;
					}
					
					console.log("A " + monsterName + " can be seen " + monsterDistanceFromPlayer + " stages ahead.  " + isMonsterAware);
				}
				
			}
			console.log(monsterPosition);
			console.log(monsterAwarenessArray);
			if (!(playerClass === "mage")){
				console.log("You can: roll to move the largest distance, or move one stage (moving one stage can sneak up on monsters, however might fail the closer you get)");
				determineRoll = getMoveCommand(playerClass);
				console.log(currentStage);
				console.log(determineRoll);
				for (currentStage; monsterPosition[currentStage] === "x" && determineRoll > 0; currentStage){
					determineRoll -= 1;
					currentStage += 1;
					console.log(determineRoll);
					console.log(currentStage);
				}
				if (!(monsterPosition[currentStage] === "x")){
					monsterEncounter = 1;
				}
			}else if (monsterDistanceFromPlayer <= 12){
				console.log("You can: roll a 12 die to try a ranged attack (the number rolled is how many stages your attack can reach, an attack that doesn't travel far enough will alert the monster), roll to move the largest distance, or move one stage (moving one stage can sneak up on monsters, however might fail the closer you get)");
				determineRoll = getMoveCommand(playerClass);
				currentStage += determineRoll;
			}else{
				console.log("You can: roll to move the largest distance, or move one stage (moving one stage can sneak up on monsters, however might fail the closer you get)");
				determineRoll = getMoveCommand(playerClass);
				for (currentStage; monsterPosition[currentStage] === "x" && determineRoll > 0; currentStage){
					determineRoll -= 1;
					currentStage += 1;
					console.log(determineRoll);
					console.log(currentStage);
				}
				if (!(monsterPosition[currentStage] === "x")){
					monsterEncounter = 1;
				}
			}
			if (monsterEncounter === 1){
				monsterID = monsterPosition[currentStage];
				monsterName = getMonsterID(monsterID);
				console.log("Battle with " +  monsterName + " has begun!");
				alert("Press 'OK' to end this turn");
			}
		}
		if (monsterEncounter === 1){
			console.log(monsterName);
			alert("Code came to this message.");
			break;
		}
		
		//break;
	}
	
	console.log(playerClass);
	console.log(playerHealth);
	console.log(monsterCount);
	console.log(monsterHealth);
	console.log(gameEnder);
}

function getPlayerClass() {
	
	let playerClass = prompt("Choose a class (warrior, mage, or rogue).");
	playerClass = playerClass.toLowerCase();
	
	while(1){
		if (!(playerClass === "warrior" || playerClass === "mage" || playerClass === "rogue")){
			alert("Your input wasn't valid.  Try again (type 'warrior' 'mage' or 'rogue' exactly)");
			playerClass = prompt("Choose a class (warrior, mage, or rogue).");
			playerClass = playerClass.toLowerCase();
		}else{
			return playerClass;
		}
	}
}

function calculateMist(playerClass){
	
	let mist = 0;
	let endStage = 100;
	
	if (playerClass === "warrior"){
		mist = Math.floor(endStage/3);
	}
	if (playerClass === "mage"){
		mist = Math.floor(endStage/4);
	}
	if (playerClass === "rogue"){
		mist = Math.floor(endStage/5);
	}
	return mist;
}

function randomizeMonsters(playerClass){
	let monsterChance = calculate4Roll(playerClass);
	return monsterChance;
}

function calculateMonsterAmount (playerClass, monsterChance){
	let monsterAmountMultiplier = 0;
	
	monsterAmountMultiplier += monsterChance;
	return monsterAmountMultiplier;
}

function calculateMonsterStrength (playerClass, monsterChance){
	let monsterStrength = 0;
	
	monsterStrength = 5 - monsterChance;
	return monsterStrength;
	
}

function determineMonsterPosition (monsterChance, monsterCount, monsterStrength, playerClass){
	let monsterStageArray = [];
	let monsterAmountMultiplier = calculate4Roll(playerClass);
	let monsterAmount = monsterAmountMultiplier * monsterCount;
	let monsterAmountTest = monsterAmount / 3;
	let monsterType;
	let monsterTypeBase;
	let setMonster;
	let decideWhichMonster;
	let strongMonster1 = 4;
	let strongMonster2 = 5;
	let finalBoss = 6;
	let monsterStageDistanceGap = 0;
	let monsterStageFallBack = 0;
	let totalMonstersSet = 0;
	let remainingStages = 95;
	let baseStages = 95;
	let monsterPlacedAt = 0;
	
	console.log(monsterStrength);
	console.log(monsterChance);
	console.log(monsterAmount);
	
	if (monsterAmountTest < 3){
		let monsterAdjustment = 4;
		monsterAmount += monsterAdjustment;
	}
	if (monsterAmountTest < 2){
		let monsterAdjustment = 3;
		monsterAmount += monsterAdjustment;
	}
	if (monsterAmountTest < 1){
		let monsterAdjustment = 2;
		monsterAmount += monsterAdjustment;
	}
	console.log(monsterAmount);
	
	let monsterBaseAmount = monsterStrength * monsterAmount - 2;	//2: spawns 2 weak monsters before tougher ones can spawn
	
	let monsterStageDistance = Math.floor(remainingStages / monsterAmount);
	console.log(monsterStageDistance);
	
	for (let i = 0; i <= 99; i ++){
		if(i >= 0 && i <= 99){
			remainingStages = baseStages - i;
			
			
			if (monsterStageFallBack > 10){
				monsterStageDistanceGap = calculate6Roll() * (-1);
			}else{
				monsterStageDistanceGap = calculate12Roll();
			}
			monsterType = monsterStrength * monsterAmount;
			
			if (monsterType < monsterBaseAmount && monsterStrength > 0 && monsterAmount > 0){
				setMonster = calculate6Roll() - 1;
				console.log(monsterAmount);
				if (setMonster > 3){
					monsterStrength -= 1;
					decideWhichMonster = Math.round(Math.random());
					if(decideWhichMonster === 0){
						setMonster = strongMonster1;
					}else{
						setMonster = strongMonster2;
					}
				}else{
					setMonster = calculate4Roll() - 1;
				}
			}else{
				setMonster = calculate4Roll() - 1;
			}
			monsterPlacedAt = i;
			for (i; i < (monsterStageDistanceGap + monsterPlacedAt + monsterStageDistance) && i < 99; i++){
				monsterStageArray.push("x");
			}
			if (i === (monsterStageDistanceGap + monsterPlacedAt +monsterStageDistance) && monsterAmount > 0 && i < 99){
				if (totalMonstersSet > 2){
					let checkIfWall = checkForWall(totalMonstersSet);
					if (checkIfWall === 1){
						setMonster = 9;
						totalMonstersSet = 0;
					}
				}
			}
			monsterAmount -= 1;
			if (i === 99){
				monsterStageArray.push(finalBoss);
				console.log(monsterStageArray);
				return monsterStageArray;
			}
			monsterStageArray.push(setMonster);
			
			monsterStageDistance = Math.floor(remainingStages / monsterAmount);
			if (monsterStageDistance === Infinity) {
				monsterStageDistance = 0;
			}
			
			monsterStageFallBack = monsterStageDistanceGap + monsterStageDistance;
			totalMonstersSet += 1;
		}
	}
	
	return monsterStageArray;
		
	//0 = Mr. Mustachio
	//1 = Slime
	//2 = Disgruntled Boxer
	//3 = Paranoid Pleb
	//4 = robot
	//5 = ogre
	//6 = neanderthal
	//9 = wall
	}

function getMonsterStats (monsterPosition, monsterPositionIndex){
	
	let monsterType;
	let monsterHealth;
	
	for (let i = 0; i < 100; i++){
		if (!(monsterPosition === "x")){
			
		}else{
			monsterType = monsterPosition[i];
			monsterHealth = getMonsterHealth(monsterType);
		}
	}
}
//put all repeated rolls/things below here
function checkForWall (totalMonstersSet){
	if (totalMonstersSet > 5){
		totalMonstersSet = 3;
	}
	let wallCheck = totalMonstersSet - calculate6Roll();
	let buildWall = 0;
	
	if (wallCheck < 0){
		buildWall = 1;
		return buildWall;
	}
	return buildWall;
}
	//add playerClass to all rolls maybe
function getMonsterHealth (monster){
	let monsterHealth;
	if(monster === 0){	//mr mustachio
		monsterHealth = 13 + calculate4Roll();
		return monsterHealth;
	}
	if(monster === 1){	//slime
		monsterHealth = 18 + calculate6Roll();
		return monsterHealth;
	}
	if(monster === 2){	//disgruntled boxer
		monsterHealth = 20 + calculate12Roll();
		return monsterHealth;		
	}
	if(monster === 3){	//paranoid pleb
		monsterHealth = 5 + calculate20Roll();
		return monsterHealth;
	}
	if(monster === 4){	//robot
		monsterHealth = 35 + calculate20Roll();
		return monsterHealth;
	}
	if(monster === 5){	//ogre
		monsterHealth = 50 + calculate10Roll();
		return monsterHealth;
	}
	if(monster === 6){	//neanderthal
		monsterHealth = 70 + calculate20Roll() + calculate12Roll();
		return monsterHealth;
	}
	if(monster === 9){	//wall
		monsterHealth = 30 + calculate20Roll();
		return monsterHealth;
	}
}

function getMonsterDamage (monster){
	let monsterDamage;
	if(monster === 0){	//mr mustachio
		monsterDamage = calculate4Roll();
		return monsterDamage;
	}
	if(monster === 1){	//slime
		monsterDamage = 1 + calculate6Roll();
		return monsterDamage;
	}
	if(monster === 2){	//disgruntled boxer
		monsterDamage = calculate12Roll();
		return monsterDamage;		
	}
	if(monster === 3){	//paranoid pleb
		monsterDamage = 1 + calculate6Roll();
		return monsterDamage;
	}
	if(monster === 4){	//robot
		monsterDamage = 3 + calculate4Roll();
		return monsterDamage;
	}
	if(monster === 5){	//ogre
		monsterDamage = 3 + calculate10Roll();
		return monsterDamage;
	}
	if(monster === 6){	//neanderthal
		monsterDamage = 5 + calculate20Roll();
		return monsterDamage;
	}
	if(monster === 9){	//wall
		monsterDamage = 0;
		return monsterDamage;
	}	
}

function getMonsterMovement (monster){
	let monsterMovement;
	if(monster === 0){	//mr mustachio
		monsterMovement = 2 + calculate8Roll();
		return monsterMovement;
	}
	if(monster === 1){	//slime
		monsterMovement = calculate6Roll();
		return monsterMovement;
	}
	if(monster === 2){	//disgruntled boxer
		monsterMovement = calculate8Roll();
		return monsterMovement;		
	}
	if(monster === 3){	//paranoid pleb
		monsterMovement = calculate12Roll();
		return monsterMovement;
	}
	if(monster === 4){	//robot
		monsterMovement = calculate6Roll();
		return monsterMovement;
	}
	if(monster === 5){	//ogre
		monsterMovement = calculate4Roll();
		return monsterMovement;
	}
	if(monster === 6){	//neanderthal
		monsterMovement = 0;
		return monsterMovement;
	}
	if(monster === 9){	//wall
		monsterMovement = 0;
		return monsterMovement;
	}		
}

function declareMonsterAwareness (monster, monsterPosition, monsterAwarenessArray, monsterAwarenessIndex){
	let monsterAwareness;
	let monsterAwarenessTest;
	let isAware = "It is currently unaware of you're position.";
	
	//s = false, a = true
	
	// if (monsterAwarenessArray[monsterAwarenessIndex] === "s"){
		
	// }
	if (monsterAwarenessArray[monsterAwarenessIndex] === "a"){
		isAware = "It noticed you and is aware of you're position!  It will move towards you next turn and any attack engaged will result in a counterattack! (unless you knock this monster out in one blow or are using a ranged attack(Mage))";
		return isAware;
	}
	
	if(monster === 6){	//neanderthal
		monsterAwareness = 0;
		isAware = "He doesn't seem to care what's going on around him.";
		return isAware;
	}
	if(monster === 9){	//wall
		monsterAwareness = 0;
		isAware = "You're unable to see past the wall.";
		return isAware;
	}	
	return isAware;
}

function getMonsterAwareness (monster, monsterPosition){
	
	let monsterAwareness;
	let monsterAwarenessTest;
	let isAware = 0;
	if(monster === 0){	//mr mustachio
		monsterAwareness = calculate8Roll();
		monsterAwarenessTest = monsterPosition - monsterAwareness;
		if (monsterAwarenessTest <= 0){
			isAware = 1;
			return isAware;
		}
	}
	if(monster === 1){	//slime
		monsterAwareness = calculate6Roll();
		monsterAwarenessTest = monsterPosition - monsterAwareness;
		if (monsterAwarenessTest <= 0){
			isAware = 1;
			return isAware;
		}
	}
	if(monster === 2){	//disgruntled boxer
		monsterAwareness = calculate4Roll();
		monsterAwarenessTest = monsterPosition - monsterAwareness;
		if (monsterAwarenessTest <= 0){
			isAware = 1;
			return isAware;
		}	
	}
	if(monster === 3){	//paranoid pleb
		monsterAwareness = 3 + calculate8Roll();
		monsterAwarenessTest = monsterPosition - monsterAwareness;
		if (monsterAwarenessTest <= 0){
			isAware = 1;
			return isAware;
		}
	}
	if(monster === 4){	//robot
		monsterAwareness = calculate8Roll();
		monsterAwarenessTest = monsterPosition - monsterAwareness;
		if (monsterAwarenessTest <= 0){
			isAware = 1;
			return isAware;
		}
	}
	if(monster === 5){	//ogre
		monsterAwareness = calculate4Roll();
		rmonsterAwarenessTest = monsterPosition - monsterAwareness;
		if (monsterAwarenessTest <= 0){
			isAware = 1;
			return isAware;
		}
	}
	if(monster === 6){	//neanderthal
		monsterAwareness = 0;
		isAware = 0;
		return isAware;
	}
	if(monster === 9){	//wall
		monsterAwareness = 0;
		isAware = 0;
		return isAware;
	}	
	return isAware;
}

	//^ add playerClass maybe; stop
function getMonsterID (monsterID){
	
	
	let monsterName;
	if (monsterID === 0){
		monsterName = "Mustachio";
		return monsterName;
	}
	if (monsterID === 1){
		monsterName = "Slime";
		return monsterName;
	}
	if (monsterID === 2){
		monsterName = "Disgruntled Boxer";
		return monsterName;
	}
	if (monsterID === 3){
		monsterName = "Paranoid Pleb";
		return monsterName;
	}
	if (monsterID === 4){
		monsterName = "Robot";
		return monsterName;
	}
	if (monsterID === 5){
		monsterName = "Ogre";
		return monsterName;
	}
	if (monsterID === 6){
		monsterName = "Neanderthal";
		return monsterName;
	}
	if (monsterID === 9){
		monsterName = "Wall";
		return monsterName;
	}
	return monsterName;
}

function setMonsterAwareness (monsterPosition, isMonsterAware, monsterCheck, monsterID, monsterCurrentPosition, monsterPlayerPositionDifference, monsterAwarenessArray){
	//let isAware; //s = false, a = true
	isMonsterAware = getMonsterAwareness(monsterID, monsterPlayerPositionDifference);
	
	//6 = neanderthal; 9 = wall;
	if(monsterCheck === 0){
		monsterAwarenessArray = [];
		 for (let i = 0; i <= 99; i++){
			if (!(monsterPosition[i] === "x" || monsterPosition[i] === 6 || monsterPosition[i] === 9)){
				monsterAwarenessArray.push("s");
			}else if (monsterPosition[i] === 6){
				monsterAwarenessArray.push(6);
			}else if (monsterPosition[i] === 9){
				monsterAwarenessArray.push(9);
			}else{
				monsterAwarenessArray.push("x");
			}
		}
	}
	
	if (isMonsterAware === 1){
		monsterAwarenessArray[monsterCurrentPosition] = "a";
	}
	return monsterAwarenessArray;
}

function setMonsterStats (monsterPosition, j, monsterStats, monsterCheck){
	
}

function classHealth (playerClass){
	let health;
	if (playerClass === "warrior"){
		console.log("Warrior.  The one who takes fights head on and forces their way through.");
		console.log("Warriors move between 2-6 spaces, can do up to 20 damage and said damage also gets a minimum roll between 6-12, so should you get a unlucky low roll there's a chance to have decent minimum damage.");
		console.log("Warriors have 100 health and can block up to 8 damage on attacks received from monsters.");
		console.log("Press 'OK' above to continue when you're ready, or if you want to change class refresh the page to start over.");
		health = 100;
		alert("Press 'OK' when you're ready to continue.");
		return health;
		
	}else if (playerClass === "mage"){
		console.log("Mage.  Long range casters who fight using their wit and intellect.");
		console.log("Mages move between 3-8 spaces, can do up to 12 ranged damage with a chance to do critical damage (up to 4 times more) however are stunned for one turn afterwards.");
		console.log("Mages can also only take one turn to fully heal (instead of 3).");
		console.log("Mages have 50 health.  Press 'OK' above to continue when you're ready, or if you want to change class refresh the page to start over.");
		health = 50;
		alert("Press 'OK' when you're ready to continue.");
		return health;
		
	}else{
		console.log("Rogue.  Specializes mostly in evasion, this quick class can move very quickly, but can easily get overwhelmed if too many wrong moves are made.");
		console.log("Rogues move between 4-10 spaces, can do up to 8 damage times the number of stages they would have moved past the monster.");
		console.log("Able to stun the monster instead for 1-4 turns plus the number of stages they move past the monster.");
		console.log("Rogues have 70 health.");
		console.log("Press 'OK' above to continue when you're ready, or if you want to change");
		console.log("class refresh the page to start over.")
		health = 70;		
		alert("Press 'OK' when you're ready to continue.");

		return health;
		
	}	
}

function getMoveCommand (playerClass){
	
	let move = prompt("Type 'move' or '+1'");
	let movement;
	
	while(1){
			
		if(move === "99"){
			movement = 100;
			return movement;
		}
		
		if(!(move === "move" || move === "+1")){
			alert("Your input wasn't valid.  Try again (type 'move' or '+1' exactly)");						
			move = prompt("Type 'move' or '+1'");
		}
		if (move === "+1"){
			movement = 1;
			return movement;
		}else if (move === "move"){
			if (playerClass === "warrior"){
			movement = calculate6Roll(playerClass);
			return movement;
			}
			if (playerClass === "mage"){
				movement = calculate8Roll(playerClass);
				return movement;
			}
			if (playerClass === "rogue"){
				movement = calculate10Roll(playerClass);
				return movement;
			}
		}
	}
}

function calculate4Roll(playerClass){
	
	let numberOneToFour = Math.floor(Math.random()* 4) + 1;
	return numberOneToFour;
}

function calculate6Roll(playerClass, determineRoll){
	
	let numberOneToSix = Math.floor(Math.random()* 6) + 1;
	if(playerClass === "warrior"){
		if (numberOneToSix < 2){
			numberOneToSix = 2;
		}
	}
	return numberOneToSix;
}

function calculate8Roll(playerClass, determineRoll){
	
	let numberOneToEight = Math.floor(Math.random()* 8) + 1;
	if (playerClass === "mage"){
		if (numberOneToEight < 3){
			numberOneToEight = 3;
		}
	}
	return numberOneToEight;
}

function calculate10Roll(playerClass, determineRoll){
	
	let numberOneToTen = Math.floor(Math.random()* 10) + 1;
	if (playerClass === "mage"){
		if (numberOneToTen < 6){
			numberOneToTen = 6;
		}
	}
	if (playerClass === "rogue"){
		if(numberOneToTen < 4){
			numberOneToTen = 4;
		}
	}
	return numberOneToTen;
}

function calculate12Roll(playerClass, determineRoll){
	
	let numberOneToTwelve = Math.floor(Math.random()* 12) + 1;
	if (playerClass === "warrior"){
		if (numberOneToTwelve < 6){
			numberOneToTwelve = 6;
		}
	}
	return numberOneToTwelve;
}

function calculate20Roll(playerClass, determineRoll){
	
	let numberOneToTwenty = Math.floor(Math.random()* 20) + 1;
	return numberOneToTwenty;
}

	//mr mustachio console.log("d:{");
	//slime console.log("( *w*)");
	//boxer console.log("Q(= n = Q)")
	//paranoid pleb console.log("w( 0.0) ~~~~ (0.0 )w");
	//robot
	//console.log("     q----p");
	//console.log("O----| @@ |----O");
	//console.log("| |( )|xx( ) |  |");
	//console.log("L___||uuuu||___v)";
	//ogre
	//console.log("| v  ___  v |   ( | | |( )");
	//console.log("|____________|   \      |");
	//neanderthal
	// console.log("──────────────────▄▄───▄▄▄▄▄▄▀▀▀▄──▄")
	// console.log("────────────────▄▀──▀▀█▄▄──▄────█▄█▄▀▀▄▄▄▄");
	// console.log("─────────────────▀█▀────▀▀▀▀█▄▄▄▄───▄▄────▀▀▀▀");
	// console.log("─────────────▄▀▀▀▀▀──▀█▄▄▄▄▄─▀▀▀▀▀█▄███▀");
	// console.log("──────────────▀█▄▄▄──▀▀─▄▄▄▄──────────▀▀▀▀█▀▀▀");
	// console.log("───────▄▀▀▀▄▄▀▀████▀█▄▄▄▄▄▄▄▄▄▄▄───▄▄▄▄──▄█░▄█");
	// console.log("────────▀▄▄▄▀▀██▀▀▀▄█─███▄──██─────▀██▀▀─█░░██");
	// console.log("────────────▀█─▀▀█▄█▄─▀▀▀───█────────────▀█░▀█");
	// console.log("─────────▄▄▀▀─▀▀▀▀░░▀█────▄█▄▀────────────█░░░");
	// console.log("───▄▀▀▀▀▀░░░░░░░░░░░░░▀██▀▀▄▄▀▀──────────██░░░");
	// console.log("▄▀▀▄████░░███████░░▄▄▄▄░░▀█▄─▀▀──────────▀█▄▄░");
	// console.log("█░░█████▄▄███████▄██████▄▄░▀█──███▄▄────────█▄");
	// console.log("█░░░▀▀▀▀▀▀▀▀▀▀▀░░░░░░░░░▀▀▀░░█─▀███▀───────▄█▀");
	// console.log("─▀▀▄▄▄▄▄░░░░░░░░░░░░░░░░░░░░▄▀─────────────▀█░");
	// console.log("───▄▀▄▄▀░░░░░░░░░░░░░░░░░░░░█────────────────█");
	// console.log("▀▀▀─▀▄▀█░░░░░░░░░░░░░░░░░░░░█───────────────▄▀");
	// console.log("─▄▄▀▀──▀▄░░░░░░░░░░░░░░░░░░█────────────────█░");
	// console.log("▀────────▀▄░░░░░░░░░░░░░░▄▀──────────▄█▄▄────█");
	// console.log("───────────▀▄▄▄▄░░░░░▄▄▄▀────────────▀██▀────█");
	// console.log("────────────█░░░▀▀▀▀██████████▀▀▀▀▀▀▄▄▄▄▄▄▄▄▄█");
	// console.log("───────────▄▀░░░░░░░█▒▒▒▒▒▒▒▒█░░░░░░░░░▄▄░░░░█");
	// console.log("───────────▀▄▄▄░░░░░█▒▒▒▒▒▒▒▒█░░░░░░░░░▀█▀░░░█");
	// console.log("image provided by http://www.messletters.com/en/text-art/");
	//wall 
	//console.log("_________________________");
	//console.log("|_I_I_I_I_I_I_I_I_I_I_I_|");
	//console.log("|                       |");
	//console.log("|_______________________|");