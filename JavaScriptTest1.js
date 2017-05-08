window.onload = init;
window.onload = init;

var player;
var obstacles = [];
var playerScore;
var menu = 1;
var up, down, left, right;
var leaderBoardScores = [];
var leaderNames = [];
var intervalSpeed = 80;
var waitTime;
var credit = 1;

function init ()
{
	resetAll();
	//removeButtons();
	startMenu();
	
	
	// up = document.getElementById("up");
	// down = document.getElementById("down");
	// left = document.getElementById("left");
	// right = document.getElementById("right");
	
	eventHandlers();
}

function resetAll ()
{
	document.body.innerHTML = "";
	obstacles.length = 0;
	intervalSpeed = 80;
}

function startMenu ()
{
	var mainDiv = document.createElement('div');
	mainDiv.id = "startingWrapper";
	
	var wrapper = document.createElement('div');
	wrapper.id = "bigWrapper";
	wrapper.appendChild(mainDiv);
	
	var body = document.querySelector('body');
	body.appendChild(wrapper);
	
	drawMenu();
}

function drawMenu()
{
	var mainDiv = document.getElementById('startingWrapper');
	mainDiv.className = "mainArea";
	//title
	var header = document.createElement('h1');
	header.innerHTML = 'Dodge It!';
	mainDiv.appendChild(header);
	
	var hr = document.createElement('hr');
	mainDiv.appendChild(hr);
	
	// left area
	var leftArea = document.createElement('div');
	leftArea.className = "sides";
	leftArea.id = "leftArea";
	
	var startGame = document.createElement('button');
	startGame.innerHTML = "START GAME!";
	startGame.id = "startGame";
	startGame.className = "menuButton";
	leftArea.appendChild(startGame);
	
	var optionBut = document.createElement('button');
	optionBut.innerHTML = "OPTIONS";
	optionBut.id = "optionBut";
	optionBut.className = "menuButton";
	leftArea.appendChild(optionBut);
	
	var leaderBoard = document.createElement('button');
	leaderBoard.innerHTML = "LEADERBOARD";
	leaderBoard.id = "leaderBoard";
	leaderBoard.className = "menuButton";
	leftArea.appendChild(leaderBoard);
	
	var credits = document.createElement('button');
	credits.innerHTML = "CREDITS";
	credits.id = "credits";
	credits.className = "menuButton";
	leftArea.appendChild(credits);
	
	// right area
	
	var rightArea = document.createElement('div');
	rightArea.className = "sides";
	rightArea.id = "rightArea";
	
	var infoTitle = document.createElement('h2');
	infoTitle.innerHTML = "Instructions: \n";
	rightArea.appendChild(infoTitle);
	
	rightArea.appendChild(document.createElement('hr'));
	
	var instructions = document.createElement('p');
	instructions.innerHTML = "Play with the arrow keys and navigate through the obstacles without hitting them. Achieve the highest score and race with your friends!";
	rightArea.appendChild(instructions);
	
	
	mainDiv.appendChild(leftArea);
	mainDiv.appendChild(rightArea);
}


function removeButtons ()
{
	var buttons = document.getElementsByTagName('button');
	for (var i = 0; i<buttons.length; i++)
		buttons[i].style.display = 'none';
}

function eventHandlers ()
{
	// up.addEventListener("mousedown", moveUp);
	// down.addEventListener("mousedown", moveDown);
	// left.addEventListener("mousedown", moveLeft);
	// right.addEventListener("mousedown", moveRight);
	
	// up.addEventListener("mouseup", moveStop);
	// down.addEventListener("mouseup", moveStop);
	// left.addEventListener("mouseup", moveStop);
	// right.addEventListener("mouseup", moveStop);
	
	document.getElementById('startGame').addEventListener('click', begin);
	document.getElementById('leaderBoard').addEventListener('click', showLeaderBoard);
	document.getElementById('optionBut').addEventListener('click', showOptionsMenu);
	document.getElementById('credits').addEventListener('click', showCredits);
}

function moveStop()
{
	player.speedX = 0;
	player.speedY = 0;
	okClick = 0;
}

function begin ()
{
	document.querySelector("#startingWrapper").style.display = "none";
	startGame();
}

function showLeaderBoard ()
{
	var rightArea = document.querySelector("#rightArea");
	rightArea.innerHTML = "";
	var title = document.createElement('h2');
	title.innerText = "Scores: ";
	for (var i=0; i<leaderNames.length-1; i++)
		for (var j=i+1; j<leaderNames.length; j++)
			if (leaderBoardScores[i] < leaderBoardScores[j])
			{
				let aux = leaderBoardScores[i];
				leaderBoardScores[i] = leaderBoardScores[j];
				leaderBoardScores[j] = aux;
				
				aux = leaderNames[i];
				leaderNames[i] = leaderNames[j];
				leaderNames[j] = aux;
			}
	rightArea.appendChild(title);
	rightArea.appendChild(document.createElement('hr'));
	var entry = [];
	entry.length = leaderNames.length;
	
	localStorage.setItem ("leadNames", leaderNames);
	alert (localStorage.getItem("leadNames"));
	for (var i=0; i<leaderNames.length; i++)
	{
		var temp = document.createTextNode(leaderNames[i] + ".............." + leaderBoardScores[i] + "\n");
		entry[i] = temp;
	}
	for (var i=0; i<leaderNames.length; i++)
	{
		rightArea.appendChild(entry[i]);
	}
		
}



function showOptionsMenu ()
{
	var rightArea = document.querySelector("#rightArea");
	rightArea.innerHTML = "";
	var title = document.createElement('h2');
	title.innerText = "Options:";
	rightArea.appendChild(title);
	rightArea.appendChild(document.createElement('hr'));
	
	var radio1 = document.createElement('input');
	radio1.name = "Style";
	radio1.type = "radio";
	radio1.value = "Normal";
	radio1.id = "normalRadio";
	radio1.style.display = "inline-block";
	if (document.querySelector('link').href.indexOf("Stilizare1.css") != -1)
		radio1.checked = true;
	
	var radio2 = document.createElement('input');
	radio2.name = "Style";
	radio2.type = "radio";
	radio2.value = "Inverted";
	radio2.id = "invertedRadio";
	radio2.style.display = "inline-block";
	if (document.querySelector('link').href.indexOf("Stilizare2.css") != -1)
		radio2.checked = true;
	
	var submitStyleButton = document.createElement('button');
	submitStyleButton.id = "submitStyleButton";
	submitStyleButton.style.display = "inline-block";
	submitStyleButton.style.marginLeft= "10px";
	submitStyleButton.innerText = "Apply";
	submitStyleButton.addEventListener('click', styleChange);
	
	rightArea.appendChild(radio1);
	rightArea.appendChild(document.createTextNode("Normal"));
	rightArea.appendChild(radio2);
	rightArea.appendChild(document.createTextNode("Inverted"));
	rightArea.appendChild(submitStyleButton);
	
	var date, currentDate = new Date;
	date = "The current time is: " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	var node = document.createElement('div');
	node.innerHTML = date;
	node.style.display = "block";
	rightArea.appendChild (node);
}

function showCredits ()
{
	if (credit == 1)
	{
		creditWindow = window.open ("Credits.html");
		credit *=-1;
	}
	else
	{
		creditWindow.close();
		credit *= -1;
	}
}

function styleChange()
{
	var buttons = document.getElementsByName('Style');
	if (buttons[0].checked == true)
	{
		document.querySelector('link').href = "Stilizare1.css";
	}
	else
		if (buttons[1].checked == true)
		{
			document.querySelector('link').href = "Stilizare2.css";	
		}
}

function startGame()
{
	waitTime = 3;
	var interv = setInterval(function() {
		showCount(waitTime);
		waitTime--;
	}, 1000);
	
	setTimeout (function() {
		clearInterval(interv);
		gameArea.start();
		player = new component(20, 20, 200, 150, "blue");
		playerScore = new component ("15px", "Tahoma", 280, 40, "black", "text");
	}, 4000);
	
	
}

function showCount (wait)
{
	var txtNode = document.createElement('div');
	txtNode.innerText = wait;
	txtNode.style.width = gameArea.canvas.width;
	txtNode.style.height = gameArea.canvas.height;
	txtNode.style.textAlign = "center";
	txtNode.style.fontSize = "40px";
	document.body.innerHTML = "";
	document.body.appendChild(txtNode);
}

function restartGame()
{
	resetAll();
	gameArea.start();
	player = new component(20, 20, 200, 150, "blue");
	playerScore = new component ("15px", "Tahoma", 280, 40, "black", "text");
}

var gameArea = {
	canvas : document.createElement("canvas"),
	start : function()
	{
		
		this.canvas.width = 400;
		this.canvas.height = 300;
		this.context = this.canvas.getContext("2d"); 
		this.interval = setInterval(updateGameArea, 20); 
		this.frameNr = 0;
		document.body.insertBefore(this.canvas, document.body.childNodes[0]); 
			
		window.addEventListener('keydown', function (e) {
			//okClick = 0;
			gameArea.keys = (gameArea.keys || []);
			gameArea.keys[e.keyCode] = true;
		});
		window.addEventListener('keyup', function (e) {
			gameArea.keys[e.keyCode] = false;
			stopKey;
		});
		
		
	},
	clear : function ()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function() 
	{
		clearInterval(this.interval);
		onGoing = false;
	}
}

function everyInterval (n)
{
	if (gameArea.frameNr % n == 0) 
		return true;
	return false;
}

function stopKey()
{
	player.speedX = 0;
	player.speedY = 0;
	okClick = 1;
}

class startPoint {
	constructor (X,Y)
	{
		this.X = X;
		this.Y = Y;
		this.speedX = 0;
		this.speedY = 0;
		this.calculateSpeed();
	}
	
	calculateSpeed()
	{
		switch (this.X)
		{
			case(-100):
			{
				this.speedX = 1;
				break;
			}
			case (gameArea.canvas.width/2):
			{
				this.speedX = 0;
				break;
			}
			case (gameArea.canvas.width):
			{
				this.speedX = -1;
				break;
			}
			
		}
		switch (this.Y)
		{
			case(-100):
			{
				this.speedY = 1;
				break;
			}
			case (gameArea.canvas.height/2):
			{
				this.speedY = 0;
				break;
			}
			case (gameArea.canvas.height):
			{
				this.speedY = -1;
				break;
			}
			
		}
		
	}
}

function component (width, height, x, y, color, type, radius)
{
	this.radius = radius;
	this.text;
	this.type = type;
	this.speedX = 0;
	this.speedY = 0;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.update = function ()
	{
		ctx = gameArea.context;
		if (this.type == "text")
		{
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		}
		else
			if (this.type == "circle")
			{
				ctx.fillStyle = color;
				ctx.beginPath();
				ctx.arc (this.x + this.radius, this.y + this.radius, this.radius, 0, 2*Math.PI);
				ctx.fill();
				this.width = this.radius *2;
				this.height = this.radius *2;
				//ctx.fillRect(this.x, this.y, this.width, this.height);
			}
			else
			{
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
	}
	this.newPos = function() 
	{
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.keyDownMove = function()
	{
		player.speedX = 0;
		player.speedY = 0;
		if (gameArea.keys && gameArea.keys[37]) {player.speedX = -1; }
		if (gameArea.keys && gameArea.keys [39]) {player.speedX = 1; }
		if (gameArea.keys && gameArea.keys [38]) {player.speedY = -1; }
		if (gameArea.keys && gameArea.keys [40]) {player.speedY = 1; }
		
	}
	this.crashInto = function(otherObj)
	{
		myLeft = this.x ;
		myRight = this.x + this.width;
		myTop = this.y;
		myBottom = this.y + this.height;
		
		otherLeft = otherObj.x ;
		otherRight = otherObj.x + otherObj.width;
		otherTop = otherObj.y ;
		otherBottom = otherObj.y + otherObj.height;
		collide = true;
		if ((myLeft > otherRight) || (myTop > otherBottom) || (myRight < otherLeft) || (myBottom < otherTop))
			collide = false;
		return collide;
	}
	
}

function moveUp() 
{
	okClick = 1;
    player.speedY -= 1; 
}

function moveDown() 
{
	okClick = 1;
    player.speedY += 1; 
}

function moveLeft() 
{
	okClick = 1;
    player.speedX -= 1; 
}

function moveRight() 
{
	okClick = 1;
    player.speedX += 1; 
}

function rand33 (randX)
{
	if (randX < 0.33)
		return -1;
	if (randX <0.66)
		return 0;
	if (randX < 1)
		return 1;
}
function randWidthFnct ()
{
	var values = [-100, gameArea.canvas.width/2, gameArea.canvas.width];
	var randGen = Math.random();
	if (rand33(randGen) == -1)
		return values[0];
	if (rand33(randGen) == 0)
		return values[1];
	if (rand33(randGen) == 1)
		return values[2];
}
function randHeightFnct ()
{
	var values = [-100, gameArea.canvas.height/2, gameArea.canvas.height];
	var randGen = Math.random();
	if (rand33(randGen) == -1)
		return values[0];
	if (rand33(randGen) == 0)
		return values[1];
	if (rand33(randGen) == 1)
		return values[2];
}


function updateGameArea() 
{

	for (var i =0; i<obstacles.length; i++)
		if (player.crashInto(obstacles[i]))
		{
			gameArea.stop();
			menu*= -1;
			showGameOver();
			//enterUserName();
			
			//init();
			return;
		}
	gameArea.clear();
	gameArea.frameNr++;
	if (gameArea.frameNr == 1 || everyInterval(intervalSpeed))
	{
		var minHeight = 5;
		var maxHeight = 100;
		var minWidth = 5;
		var maxWidth = 140;
		let randWidth = Math.floor (Math.random() * (maxWidth - minWidth)) + minWidth;
		let randHeight = Math.floor (Math.random() * (maxHeight - minHeight)) + minHeight;
		
		if (gameArea.frameNr % 1000 == 0) 
		{
			if (intervalSpeed < 10)
				intervalSpeed = 9;
			else
				intervalSpeed -= 50;
		}
		
		if (Math.floor(Math.random()*10) > 4)
		{
			let randX = Math.random();
			let randY = Math.random();
			let x,y;
			x = randWidthFnct();
			y = randHeightFnct();
			while (x == gameArea.canvas.width/2 && y == gameArea.canvas.height/2)
			{
				x = randWidthFnct();
				y = randHeightFnct(); 
			}
			let sp = new startPoint(x,y);
			
			
			obstacles.push(new component(randWidth, randHeight, x, y, "green", "circle", randHeight/2));
			
			obstacles[obstacles.length - 1].speedX = sp.speedX;
			obstacles[obstacles.length - 1].speedY = sp.speedY;
			
		}
		else
		{
			let randX = Math.random();
			let randY = Math.random();
			let x,y;
			x = randWidthFnct();
			y = randHeightFnct();
			while (x == gameArea.canvas.width/2 && y == gameArea.canvas.height/2)
			{
				x = randWidthFnct();
				y = randHeightFnct(); 
			}
			let sp = new startPoint(x,y);
			
			
			
			obstacles.push(new component(randWidth, randHeight, x, y, "#f5d5a4" ));
			obstacles[obstacles.length - 1].speedX = sp.speedX;
			obstacles[obstacles.length - 1].speedY = sp.speedY;
		}
		
	}
	for (var i=0; i<obstacles.length; i++)
	{
		//if (obstacles[i].speedX != 0 && obstacles[i].speedY != 0)
		{
			obstacles[i].x += obstacles[i].speedX;
			obstacles[i].y += obstacles[i].speedY;
		}
		//else
		// {
			// obstacles[i].x += obstacles[i].speedX +1;
			// obstacles[i].y += obstacles[i].speedY +1;
		// }
		obstacles[i].update();
	}
	//if (okClick == 0)
		player.keyDownMove();
	playerScore.text ="Score " + gameArea.frameNr;
	playerScore.update();
	player.newPos();
	player.update();

}

function showGameOver()
{
	//gameArea.clear();
	ctx.globalAlpha= 0.2;
	ctx = gameArea.context;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 400, 300);
	
	var overWrapper = document.createElement('div');
	overWrapper.style.width = "200px";
	overWrapper.style.height = "150px";
	overWrapper.style.backgroundColor = "black";
	overWrapper.style.opacity = "0.4";
	overWrapper.style.border = "3px dashed white";
	overWrapper.style.zIndex = "20";
	overWrapper.style.position = "absolute";
	overWrapper.style.top = "70px";
	overWrapper.style.left = "80px";
	overWrapper.style.padding = "25px";
	
	
	document.body.appendChild(overWrapper);
	
	var label = document.createElement('label');
	label.innerText = "Introduceti-va numele: ";
	label.style.color = "white";
	label.style.display = "block";
	var submitButton = document.createElement('button');
	submitButton.innerHTML = "Submit";
	submitButton.style.display = "inline-block";
	var resetButton = document.createElement('button');
	resetButton.innerHTML = "Reset";
	resetButton.style.display = "inline-block";
	var backButton = document.createElement('button');
	backButton.innerHTML = "Back";
	backButton.style.display = "inline-block";
	var textBox = document.createElement('input');
	textBox.type = "text";
	textBox.style.display = "block"
	textBox.maxLength = 10;
	overWrapper.appendChild(label);
	overWrapper.appendChild(textBox);
	overWrapper.appendChild(submitButton);
	overWrapper.appendChild(resetButton);
	overWrapper.appendChild(backButton);
	
	resetButton.onclick = restartGame;
	backButton.onclick = init;
	submitButton.onclick = function (){
		leaderBoardScores.push(playerScore.text);
		leaderNames.push(textBox.value);
		init();
	}
	
	
}

