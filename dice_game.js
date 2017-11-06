describeGame ();


function describeGame(){
	let refresh = prompt ("If this is the first time loading this page, type 'exit' to stop the game.  Hit 'F12' to reveal the console log after typing 'exit' then refresh the page.  If you completed this step hit 'Cancel'.");
	if (refresh === "exit"){
		return;
	}
	
	console.log("Welcome to my dice game.  The goal is to reach stage 100 while surviving.");
	console.log("Monsters can be defeated or ran past, however if you run past and they catch up to you it could mean game over!");
	console.log("Please choose a class between : warrior, or rogue to play as.  Each has their strengths and weaknesses so choose wisely.")
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
	let monsterAwarenessID;
	let setIndexDifference = 0;
	let monsterCurrentStage;
	
	let monsterDamage = 0;
	let monsterCanMove = 0;	//0 = false, 1 = true
	let monsterMovement = 0;
	let monsterApproached = 0;	//0 = false, 1 true
	let neanderthalResponse;
	let neanderthalCombatTotal = 0;
	let neanderthalNegotiateTotal = 0;
	let neanderthalPassTotal = 0;
	let neanderthalCombatStarted = 0;
	let increaseNeanderthalNegotiateOdds = 0;
	let increaseNeanderthalPassOdds = 0;
	
	
	monsterAwarenessArray = setMonsterAwareness(monsterPosition, isMonsterAware, monsterCheck);

	
	let turnCount = 0;
	let determineRoll = 0;
	let spacesToMove;
	//player variables
	//let playerPosition = 1;
	let currentStage = 1;
	let stagesMoved = 0;
	let startingHealth = playerHealth;
	let playerDamage = 0;
	let attacking = 0;
	let getAction;
	let restTurns = 0;
	let isResting = 0;	//0 = false, 1 = true
	let indexStage = 0;
	
	for (currentStage; currentStage <= lastStage; currentStage){
		turnCount += 1;
		if (turnCount >= gameEnder){
			if (turnCount === gameEnder){
				alert("The mist has appeared.  The time to reach the end is running out!");
				console.log("The mist has appeared.  The time to reach the end is running out!");
			}
			mistMovement = calculate8Roll() + 1;
			mistStage += mistMovement;
			alert("The mist has reached stage " + mistStage + ".  You are at stage " + currentStage + ".  Don't let it reach you!");
			console.log("The mist has reached stage " + mistStage + ".  You are at stage " + currentStage + ".  Don't let it reach you!");
			if (mistStage >= currentStage){
				alert("The mist caught up to you.  You lose!");
				return console.log("The mist caught up to you.  You lose!");
			}
		}
		
		if (monsterEncounter === 1){
			console.log("It is turn " + turnCount + ".  You are at stage " + currentStage + " with " + playerHealth + " health.");
			
			if (monsterApproached === 1){
				monsterID = monsterPosition[currentStage];			
			}else{monsterID = monsterPosition[currentStage - 1];
			}
			
			
			if (attacking === 0){
				monsterHealth = getMonsterHealth(monsterID);
			}
			attacking = 1;
			monsterName = getMonsterID(monsterID);
			if (monsterID === 6 && neanderthalCombatStarted === 0){
				getMonsterVisual(monsterID);
				console.log("A Neanderthal blocks the way.  What do you do?");
				neanderthalResponse = prompt("'ask' him politely to move, try to 'find' a way around, or 'attack'.");
				neanderthalResponse = neanderthalResponse.toLowerCase();
				
				if (neanderthalResponse === "ask"){
					neanderthalNegotiateTotal += calculate10Roll();
					if (neanderthalNegotiateTotal >= 23){
						alert("He grunts something unintelligible and looks at you.  You point past him in hopes of conveying your message.  After an awkward moment some drool falls from his bottom lip.  He scratches his side and walks away.  With the path cleared you are able to exit the map.  Congratulations, you win!");
						console.log("You managed to convince him to move which allows you to get past stage 100.  Congratulations, you win!");
						return;
					}else{
						alert("He grunts at you, seemingly unconvinced.");
					}
				}else if (neanderthalResponse === "find"){
					if (playerClass === "warrior"){
						neanderthalPassTotal += calculate6Roll(playerClass);
					}
					if (playerClass === "rogue"){
						neanderthalPassTotal += calculate10Roll(playerClass);
					}
					if (neanderthalPassTotal > 32){
						console.log("You found a path past Neanderthal which allows you to get past stage 100.  Congratulations, you win!");
						alert("Finally after moving about him you find a way through.  With successful passage you're able to clear stage 100.  Congratulations, you win!");
						return;
					}else{
						console.log("You might see a way through, but he randomly shifts his position while looking off in the distance.  His random shift requires you to look around and try again.");
						alert("You might see a way through, but he randomly shifts his position while looking off in the distance.  His random shift requires you to look around and try again.");
					}
				}else if (neanderthalResponse === "attack"){
					neanderthalCombatTotal += 1;
					alert("He grunts in annoyance.");
					console.log("He grunts in annoyance.");
					if (neanderthalCombatTotal === 2){
						console.log("The neanderthal roars in rage.  Battle with Neanderthal will begin next turn!");
						alert("The neanderthal roars in rage.  Battle with Neanderthal will begin next turn!");
						neanderthalCombatStarted = 1;
					}
				}else {
					console.log("You're response wasn't typed correctly. A turn was wasted in the process.  Try again.");
					alert("The Neanderthal scratches his side, your unintelligible response didn't seem to reach his ears.");
				}
			}else{
				
				console.log("In battle with " + monsterName + "!");
				getMonsterVisual(monsterID);
				alert("Press 'OK' to attack!");
				playerDamage = doRegularAttack(playerClass, determineRoll);
				determineRoll = 0;
				monsterHealth -= playerDamage;
				if(monsterHealth <= 0){
					monsterHealth = 0;
					alert("You did " + playerDamage + " to " + monsterName + "!  " + monsterName + " has been defeated!  Hit 'OK' to proceed to the next turn.");
					console.log("You did " + playerDamage + " to " + monsterName + "!  " + monsterName + " has been defeated!");
					
					if (monsterID === 6){
						alert("The Neanderthal groans and falls backward as you deliver the finishing blow.  With him knocked out you are able to clear stage 100.  Congratulations, you win!");
						console.log("The Neanderthal groans and falls backward as you deliver the finishing blow.  With him knocked out you are able to clear stage 100.  Congratulations, you win!");
					}
					
					if (monsterApproached === 1){
						indexStage = currentStage + 1;
					}else{
						indexStage = currentStage;
					}
					
					removeMonsterPosition(monsterPosition, indexStage);
					removeMonsterAwareness(monsterAwarenessArray, indexStage);
					monsterEncounter = 2;
					attacking = 0;
					monsterApproached = 0;
					//currentStage += 1;
				}else{
					alert("You did " + playerDamage + " to " + monsterName + "!  " + monsterName + " has " + monsterHealth + " health remaining.  Hit 'OK' to proceed to the next turn.");
					console.log("You did " + playerDamage + " to " + monsterName + "!  " + monsterName + " has " + monsterHealth + " health remaining.");
					
					monsterDamage = getMonsterDamage(monsterID);
					playerHealth = playerHealth - monsterDamage;
					
					if (playerHealth <= 0){
						alert(monsterName + " hit you for " + monsterDamage + "!  You have " + playerHealth + " remaining.  Hit 'OK to proceed to the next turn.");
						console.log("You have been defeated by " + monsterName + "!  You lose!");
						return alert("You have been defeated by " + monsterName + "!  You lose!");				
					}
					
					alert(monsterName + " hit you for " + monsterDamage + "!  You have " + playerHealth + " remaining.  Hit 'OK to proceed to the next turn.");
					console.log(monsterName + " hit you for " + monsterDamage + "!  You have " + playerHealth + " health remaining.");
				}
			}
			//break;
		}
		
		if (monsterEncounter === 0){
			console.log("It is turn " + turnCount + ".  You are at stage " + currentStage + " with " + playerHealth + " health.");
			
			for (let j = currentStage - 1; j < currentStage + 15 && j < lastStage && monsterCanMove > 0; j++){
				if (monsterAwarenessArray[j] === "a"){
					monsterID = monsterPosition[j];
					monsterName = getMonsterID(monsterID);
					monsterAwarenessID = monsterAwarenessArray[j];
					
					monsterMovement = getMonsterMovement(monsterID);
					monsterDistanceFromPlayer =  j - currentStage;
					
					if (monsterMovement > monsterDistanceFromPlayer){
						monsterMovement = monsterDistanceFromPlayer;
					}
					indexStage = currentStage - 1;
					
					monsterCurrentPosition = monsterDistanceFromPlayer + currentStage - 1;
					monsterPlayerPositionDifference = monsterCurrentPosition - currentStage + 1;
					monsterCurrentStage = j;
					
					monsterPosition = moveMonsterPosition(monsterPosition, monsterMovement, monsterID, monsterCurrentPosition, currentStage);
					monsterAwarenessArray = moveMonsterAwareness(monsterAwarenessArray, monsterMovement, monsterAwarenessID, monsterCurrentPosition, currentStage);
					
					alert(monsterName + " has rolled " + monsterMovement + " from stage " + monsterCurrentStage + ".  You are at stage " + currentStage + ".  Press 'OK' to proceed.");
					console.log(monsterName + " has rolled " + monsterMovement + " from stage " + monsterCurrentStage + ".  You are at stage " + currentStage + ".");
					//may need to change input after 'from stage'
				}
				if (monsterMovement === monsterDistanceFromPlayer && !(monsterPosition[currentStage] === "x") && !(monsterEncounter === 1)){
					monsterEncounter = 1;
					monsterApproached = 1;
					
					alert(monsterName + " has reached you unprepared; they get to attack you without retaliation!  Press 'OK' to continue.");
					console.log("A " + monsterName + " reached you unprepared; they get to attack you without retaliation!");
					
					monsterDamage = getMonsterDamage(monsterID);
					playerHealth -= monsterDamage;
					
					alert(monsterName + " hit you for " + monsterDamage + "!  You have " + playerHealth + " remaining.  Press 'OK' to proceed to the next step.");
					console.log(monsterName + " hit you for " + monsterDamage + "!  You have " + playerHealth + " health remaining.");
					
					if (restTurns > 0){
						alert("Your rest action was interupted!  You will have to do a rest action after the battle to reinitiate it if you want to heal.  Press 'OK' to proceed to the next step.");
						console.log("Your rest action was interupted!  You will have to do a rest action after the battle to reinitiate it if you want to heal.")
						isResting = 0;
						restTurns = 0;
					}
				}
			}
			
			monsterCanMove = 0;
			
			if (restTurns > 0){
				restTurns -= 1;
				if (restTurns === 0){
					playerHealth = startingHealth;
					alert("You have fully rested up.  You're back to full health (" + playerHealth + ").");
					isResting = 0;
				}
			}
			
			for (let j = currentStage + 1; j < currentStage + 15 && j < lastStage && isResting === 0 && !(monsterEncounter === 1); j++){
				if (!(monsterPosition[j] === "x") && restTurns === 0){
					monsterCheck += 1;
					
					monsterID = monsterPosition[j];
					monsterDistanceFromPlayer =  j - currentStage;
					monsterName = getMonsterID(monsterID);				//displays text of monster name to player
					monsterCurrentPosition = monsterDistanceFromPlayer + currentStage; //make adjustments so it lines up correctly in array
					monsterPlayerPositionDifference = monsterCurrentPosition - currentStage;
					//monsterStats = getMonsterStats(monsterPosition, j);
					//monsterStatsArray = setMonsterStats(monsterPosition, monsterDistanceFromPlayer, monsterStats, monsterCheck);
					monsterAwarenessArray = setMonsterAwareness(monsterPosition, isMonsterAware, monsterCheck, monsterID, monsterCurrentPosition, monsterPlayerPositionDifference, monsterAwarenessArray);
					indexStage = currentStage - 1;
					
					if (monsterID >= 0){
						//monsterCurrentPosition = monsterDistanceFromPlayer + ;
						isMonsterAware = declareMonsterAwareness(monsterID, monsterPlayerPositionDifference, monsterAwarenessArray, monsterCurrentPosition);
					}
					if (monsterPosition[j] === 9){
						j += 15;
					}
					
					console.log("A " + monsterName + " can be seen " + monsterDistanceFromPlayer + " stages ahead.  " + isMonsterAware);
					monsterCanMove += 1;
				}
			}
			
			if (isResting === 0 && monsterEncounter === 0){	
				if (playerHealth === startingHealth){
					console.log("You can: roll to move the largest distance, move one stage (moving one stage can sneak up on monsters, however might fail the closer you get), or pass (stay put for one turn)");
					determineRoll = getMoveCommand(playerClass);
				}else{
					getAction = getTurnCommand(playerClass, monsterDistanceFromPlayer, playerHealth, startingHealth);
					if (getAction === "move"){
						determineRoll = getMoveCommand(playerClass);
					}
					if (getAction === "rest"){
						isResting = 1;
						restTurns = getRestCommand(playerClass);
					}
				}
				for (currentStage; (monsterPosition[currentStage - 1] === "x" || monsterPosition[currentStage - 1] === "v") && determineRoll > 0 && isResting === 0; currentStage){
					determineRoll -= 1;
					currentStage += 1;
					stagesMoved += 1;
					indexStage = currentStage - 1;
				}
				if (!(monsterPosition[indexStage] === "x" || monsterPosition[indexStage] === "v")){
					monsterEncounter = 1;
				}
				
				console.log("You advanced " + stagesMoved + " stages this turn.");
				stagesMoved = 0;
				if (monsterEncounter === 1 && monsterAwarenessArray[currentStage - 1] === "s"){
					monsterID = monsterPosition[currentStage - 1];
					monsterName = getMonsterID(monsterID);
					console.log("You caught " + monsterName + " unaware, you get to attack without retaliation!");
					alert("You caught a monster by surprise!");
					playerDamage = doSurpriseAttack(playerClass, determineRoll);
					determineRoll = 0;
					
					monsterHealth = getMonsterHealth(monsterID);
					monsterHealth -= playerDamage;
					if (monsterHealth < 0){
						monsterHealth = 0;
					}
					if(monsterHealth <= 0){
						monsterHealth = 0;
						alert("You did " + playerDamage + " to " + monsterName + "!  " + monsterName + " has been defeated!  Hit 'OK' to proceed to the next turn.");
						console.log("You did " + playerDamage + " to " + monsterName + "!  " + monsterName + " has been defeated!");
						if (monsterApproached === 1){
							indexStage = currentStage + 1;
						}else{
							indexStage = currentStage;
						}
						removeMonsterPosition(monsterPosition, indexStage);
						removeMonsterAwareness(monsterAwarenessArray, indexStage);
						attacking = 0;
						monsterEncounter = 2;
						monsterApproached = 0;
					}else{
						alert("You did " + playerDamage + " to " + monsterName + "!  "  + monsterName + " has " + monsterHealth + " health remaining.  Hit 'OK' to proceed to the next turn.")
						console.log("You did " + playerDamage + " to " + monsterName + "!  "  + monsterName + " has " + monsterHealth + " health remaining.");
						attacking = 1;
					}
				}
			}else if (isResting === 1){
				alert("You are currently resting.  There are " + restTurns + " left until you are fully healed.  Press 'OK' to end this turn.");
				console.log("You are currently resting.  There are " + restTurns + " left until you are fully healed.");
			}
		}
		if (monsterEncounter === 1){
			if (monsterApproached === 1){
				monsterID = monsterPosition[currentStage];
			}else{
				monsterID = monsterPosition[currentStage - 1];
			}
			monsterName = getMonsterID(monsterID);
			if (monsterID === 6){
			}else{
				console.log("Battle with " +  monsterName + " will begin next turn!");
				alert("Press 'OK' to end this turn");
			}
		}
		if(monsterEncounter === 2){
			monsterEncounter = 0;
		}
		indexStage = currentStage - 1;
		//break;
	}
	
	console.log(playerClass);
	console.log(playerHealth);
	console.log(monsterCount);
	console.log(monsterHealth);
	console.log(gameEnder);
}

function getPlayerClass() {
	
	let playerClass = prompt("Choose a class (warrior or rogue).");
	playerClass = playerClass.toLowerCase();
	
	while(1){
		if (!(playerClass === "warrior" || playerClass === "rogue")){	//|| playerClass === "mage" 
			alert("Your input wasn't valid.  Try again (type 'warrior' or 'rogue' exactly)");
			playerClass = prompt("Choose a class (warrior, or rogue).");
			playerClass = playerClass.toLowerCase();
		}else{
			return playerClass;
		}
	}
}

function calculateMist(playerClass){
	
	let mist = 60;
	let endStage = 100;
	
	// if (playerClass === "warrior"){
		// mist = Math.floor(endStage/3);
	// }
	// if (playerClass === "mage"){
		// mist = Math.floor(endStage/4);
	// }
	// if (playerClass === "rogue"){
		// mist = Math.floor(endStage/5);
	// }
	return mist;
}

function randomizeMonsters(playerClass){
	let monsterChance = calculate4Roll(playerClass) + 3;
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
	
	let monsterBaseAmount = monsterStrength * monsterAmount - 2;	//2: spawns 2 weak monsters before tougher ones can spawn
	
	let monsterStageDistance = Math.floor(remainingStages / monsterAmount);
	
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
		monsterHealth = 50 + calculate20Roll() + calculate12Roll();
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

function getMonsterVisual (monsterID){
	
	if (monsterID === 0){
		console.log("d:{");
		return;
	}
	if (monsterID === 1){
		console.log("( *w*)");
		return;
	}
	if (monsterID === 2){
		console.log("Q(= n = Q)");
		return;
	}
	if (monsterID === 3){
		console.log("w( 0.0) ~~~~ (0.0 )w");
		return;
	}
	if (monsterID === 4){
		console.log("     q----p");
		console.log("O----| @@ |----O");
		console.log("| |( )|xx( ) |  |");
		console.log("L___||uuuu||___v)");
		return;
	}
	if (monsterID === 5){
		console.log("| v  ___  v |   ( | | |( )");
		console.log("|____________|   |      |");
		return;
	}
	if (monsterID === 6){
		console.log("──────────────────▄▄───▄▄▄▄▄▄▀▀▀▄──▄")
		console.log("────────────────▄▀──▀▀█▄▄──▄────█▄█▄▀▀▄▄▄▄");
		console.log("─────────────────▀█▀────▀▀▀▀█▄▄▄▄───▄▄────▀▀▀▀");
		console.log("─────────────▄▀▀▀▀▀──▀█▄▄▄▄▄─▀▀▀▀▀█▄███▀");
		console.log("──────────────▀█▄▄▄──▀▀─▄▄▄▄──────────▀▀▀▀█▀▀▀");
		console.log("───────▄▀▀▀▄▄▀▀████▀█▄▄▄▄▄▄▄▄▄▄▄───▄▄▄▄──▄█░▄█");
		console.log("────────▀▄▄▄▀▀██▀▀▀▄█─███▄──██─────▀██▀▀─█░░██");
		console.log("────────────▀█─▀▀█▄█▄─▀▀▀───█────────────▀█░▀█");
		console.log("─────────▄▄▀▀─▀▀▀▀░░▀█────▄█▄▀────────────█░░░");
		console.log("───▄▀▀▀▀▀░░░░░░░░░░░░░▀██▀▀▄▄▀▀──────────██░░░");
		console.log("▄▀▀▄████░░███████░░▄▄▄▄░░▀█▄─▀▀──────────▀█▄▄░");
		console.log("█░░█████▄▄███████▄██████▄▄░▀█──███▄▄────────█▄");
		console.log("█░░░▀▀▀▀▀▀▀▀▀▀▀░░░░░░░░░▀▀▀░░█─▀███▀───────▄█▀");
		console.log("─▀▀▄▄▄▄▄░░░░░░░░░░░░░░░░░░░░▄▀─────────────▀█░");
		console.log("───▄▀▄▄▀░░░░░░░░░░░░░░░░░░░░█────────────────█");
		console.log("▀▀▀─▀▄▀█░░░░░░░░░░░░░░░░░░░░█───────────────▄▀");
		console.log("─▄▄▀▀──▀▄░░░░░░░░░░░░░░░░░░█────────────────█░");
		console.log("▀────────▀▄░░░░░░░░░░░░░░▄▀──────────▄█▄▄────█");
		console.log("───────────▀▄▄▄▄░░░░░▄▄▄▀────────────▀██▀────█");
		console.log("────────────█░░░▀▀▀▀██████████▀▀▀▀▀▀▄▄▄▄▄▄▄▄▄█");
		console.log("───────────▄▀░░░░░░░█▒▒▒▒▒▒▒▒█░░░░░░░░░▄▄░░░░█");
		console.log("───────────▀▄▄▄░░░░░█▒▒▒▒▒▒▒▒█░░░░░░░░░▀█▀░░░█");
		console.log("image obtained from http://www.messletters.com/en/text-art/");
		return;
	}
	if (monsterID === 9){
		console.log("_________________________");
		console.log("|_I_I_I_I_I_I_I_I_I_I_I_|");
		console.log("|                       |");
		console.log("|_______________________|");
		return;
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
		isAware = "It noticed you and is aware of you're position!  It will move towards you next turn and any attack engaged will result in a counterattack! (unless you knock this monster out in one blow or are using a ranged attack(Mage).  If the monster moves onto you after you end your turn, it will interupt any 'rest' action that might be happening and attack you without you being able to attack back!)";
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

function getMonsterID (monsterID){
	
	
	let monsterName;
	if (monsterID === 0){
		monsterName = "Mr. Mustachio";
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

function moveMonsterPosition(monsterPosition, monsterMovement, monsterID, monsterCurrentPosition, currentStage){
	monsterPosition.splice(monsterCurrentPosition + 1, 1, "x");		//replaces correctly, don't change
	let newPlacement = monsterCurrentPosition;
	for (monsterMovement; monsterMovement > 0; monsterMovement --){	
		if (!(monsterPosition[newPlacement] === "x") && newPlacement > currentStage){
			monsterPosition.splice(newPlacement + 2, 1, monsterID);
			return monsterPosition;
		} 
		newPlacement -= 1;
	}
	if	(monsterMovement === 0){
		monsterPosition.splice(newPlacement + 1, 1, monsterID);
	}
	console.log(monsterPosition);
	return monsterPosition;
}

function moveMonsterAwareness(monsterAwarenessArray, monsterMovement, monsterAwarenessID, monsterCurrentPosition, currentStage){
	monsterAwarenessArray.splice(monsterCurrentPosition + 1, 1, "x");	//replaces correctly, don't change
	let newPlacement = monsterCurrentPosition;
	for (monsterMovement; monsterMovement > 0; monsterMovement --){	
		if (!(monsterAwarenessArray[newPlacement] === "x") && newPlacement > currentStage){
			monsterAwarenessArray.splice(newPlacement + 2, 1, monsterAwarenessID);
			return monsterAwarenessArray;
		} 
		newPlacement -= 1;
	}
	if	(monsterMovement === 0){
		monsterAwarenessArray.splice(newPlacement + 1, 1, monsterAwarenessID);
	}
	console.log(monsterAwarenessArray);
	return monsterAwarenessArray;
}

function removeMonsterPosition(monsterPosition, currentStage){
	monsterPosition.splice(currentStage - 1, 1, "v");
	return monsterPosition;
}

function removeMonsterAwareness(monsterAwarenessArray, currentStage){
	monsterAwarenessArray.splice(currentStage - 1, 1, "d");
	return monsterAwarenessArray;
}

function classHealth (playerClass){
	let health;
	if (playerClass === "warrior"){
		console.log("Warrior.  The one who takes fights head on and forces their way through.");
		console.log("Warriors move between 2-6 spaces, can do up to 20 damage and said damage also gets a minimum roll between 6-12, so should you get a unlucky low roll there's a chance to have decent minimum damage.");
		console.log("Warriors have 100 health.  Press 'OK' above to continue when you're ready, or if you want to change class refresh the page to start over.");
		health = 100;
		alert("Press 'OK' when you're ready to continue.");
		return health;
		
	// }else if (playerClass === "mage"){
		// console.log("Mage.  Long range casters who fight using their wit and intellect.");
		// console.log("Mages move between 3-8 spaces, can do up to 12 ranged damage with a chance to do critical damage (up to 4 times more).");
		// console.log("Mages can also only take one turn to fully heal (instead of 3).");
		// console.log("Mages have 50 health.  Press 'OK' above to continue when you're ready, or if you want to change class refresh the page to start over.");
		// health = 50;
		// alert("Press 'OK' when you're ready to continue.");
		// return health;
		
	// }
	}else{
		console.log("Rogue.  Specializes mostly in speed and evasion, this class can move very quickly, but can easily get overwhelmed if too many wrong moves are made.");
		console.log("Rogues move between 4-10 spaces, can do up to 8 damage times the number of stages they would have moved past the monster.");
		console.log("Rogues have 70 health.  Press 'OK' above to continue when you're ready, or if you want to change class refresh the page to start over.");
		health = 70;		
		alert("Press 'OK' when you're ready to continue.");

		return health;
		
	}	
}

function getTurnCommand (playerClass){
	
	let input;
	let action;
	while (1){
		if (playerClass === "warrior" || playerClass === "rogue"){
			input = prompt("What would you like to do next? ('move' (with the option to stay put for one turn) or 'rest' (full heal after 3 turns without movement however can be interupted if a monster is aware of you)");
		}else{
			input = prompt("What would you like to do next? ('move' (with the option to stay put for one turn), 'rest' (fully heal yourself using 1 turn without movement), or 'attack')");
		}
		if (input === "move"){
			action = "move";//getMoveCommand(playerClass);
			return action;
		}
		if (input === "rest"){
			action = "rest";//getRestCommand(playerClass);
			return action;
		}
		if (playerClass === "mage" && input === "attack"){
			action = "attack";//getMageCommand(playerClass);
			return action;
		}
		alert("Your input wasn't valid.  Try again.");
	}
}

function getMoveCommand (playerClass){
	
	
	let move = prompt("Type 'move' '+1' or 'pass'");
	let movement;
	
	while(1){
			
		if(move === "99"){
			movement = 100;
			return movement;
		}
		
		if(!(move === "move" || move === "+1" || move === "pass")){
			alert("Your input wasn't valid.  Try again (type 'move' '+1' or 'pass' exactly)");						
			move = prompt("Type 'move' '+1' or 'pass'");
		}
		if (move === "+1"){
			movement = 1;
			return movement;
		}else if (move === "move"){
			if (playerClass === "warrior"){
			movement = calculate6Roll(playerClass);
			return movement;
			}
			// if (playerClass === "mage"){
				// movement = calculate8Roll(playerClass);
				// return movement;
			// }
			if (playerClass === "rogue"){
				movement = calculate10Roll(playerClass);
				return movement;
			}
		}else if (move === "pass"){
			movement = 0;
			return movement;
		}
	}
}

function getRestCommand (playerClass){
	let heal = 0;	//turn count required
	if (playerClass === "mage"){
		heal = 1;
		return heal;
	}else{
		heal = 3;
		return heal;
	}
}

function doSurpriseAttack (playerClass, determineRoll){
	let damageDealt = 0;
	let minimumDamage = 0;
	
	if (playerClass === "warrior"){
		damageDealt = calculate20Roll();
		if (damageDealt < 12){
			minimumDamage = calculate12Roll();
			if (minimumDamage > damageDealt){
				return minimumDamage;
			}
			return damageDealt;
		}
		return damageDealt;
	}
	if (playerClass === "mage"){
		damageDealt = calculate12Roll();
		return damageDealt;
	}
	if (playerClass === "rogue"){
		if (determineRoll > 1){
			damageDealt = calculate8Roll() * determineRoll;
			return damageDealt;
		}
		damageDealt = calculate8Roll();
		return damageDealt;
	}
		
}

function doRegularAttack (playerClass, determineRoll){
	let damageDealt = 0;
	let minimumDamage = 0;
	
	if (playerClass === "warrior"){
		damageDealt = calculate20Roll();
		if (damageDealt < 12){
			minimumDamage = calculate12Roll();
			if (minimumDamage > damageDealt){
				return minimumDamage;
			}
			return damageDealt;
		}
		return damageDealt;
	}
	if (playerClass === "mage"){
		damageDealt = calculate12Roll();
		return damageDealt;
	}
	if (playerClass === "rogue"){
		if (determineRoll > 1){
			console.log("You rolled an extra " + determineRoll + " stages.  (deal " + determineRoll + "x damage).");
			damageDealt = calculate8Roll() * determineRoll;
			return damageDealt;
		}
		damageDealt = calculate8Roll();
		return damageDealt;
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
