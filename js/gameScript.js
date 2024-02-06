// Dimensions du canvas
var canvas = document.getElementById("myCanvas");
canvas.width = 1100;
canvas.height = 720;
var ctx = canvas.getContext("2d");

// Son du splash screen
sound = document.getElementById("myAudio");
sound.setAttribute('src', 'sounds/title.mp3');
sound.load();
sound.play();

// Fonction qui permet de changer la source et jouer les sons
function changeSound(soundpath){
	sound.pause();
	sound.setAttribute('src', soundpath);
	sound.load();
	sound.play();

}
var sound2 = document.getElementById("soundEffect");
sound2.setAttribute('src', 'sounds/begin.mp3');
sound2.load();
function playEffect(soundpath){

	sound2.pause();
	sound2.setAttribute('src', soundpath);
	sound2.load();
	sound2.play();
}
var sound3 = document.getElementById("soundEffect2");
sound3.setAttribute('src', 'sounds/extralife.mp3');
sound3.load();
function playEffect2(soundpath){

	sound3.pause();
	sound3.setAttribute('src', soundpath);
	sound3.load();
	sound3.play();
}

//**************************************************************************//
//******************************* Life bar *********************************//
//**************************************************************************//

var lifebar = document.getElementById('lifebar');
var curFrame = 0;
var lifeImage = new Image();

//Définir la source du fichier image
lifeImage.src = "img/sprite_barre_de_vies.png";

function updateLifeFrame(){
	switch (nbVies) {
		case 0:
			curFrame = -3;
			break;
		case 1:
			curFrame = -2;
			glowLife();
			break;
		case 2:
			curFrame = -1;
			break;
		case 3:
			curFrame = 0;
			break;
		default:
			break;
	}
	// changement de la position de la source dans la spritesheet sprite_barre_de_vies.png
	lifebar.style.backgroundPositionX = (curFrame * 141).toString() + "px";

}

//**************************************************************************//
//************************* Animations du TitleScreen **********************//
//**************************************************************************//

function delayAnimationSplash(){
	// dessin du canvas avec l'image du début
	drawSplash();
	playEffect("sounds/Game_Over.ogg");
	// délai pour l'animation après le début de la musique
	setTimeout(()=>{
		document.getElementById('container').style.visibility ="visible";
		anime({
			targets: '#myCanvas',
			keyframes: [
				{translateX: 200},
				{translateX: -240},
				{translateX: 200},
				{translateX: 0}
			],
			duration: 3000,
			easing: 'easeOutBounce'
		});

		anime({
			targets: '#btnStart',
			opacity: ['0%', '100%'],
			duration: 1000,
			easing: 'easeInExpo',
			delay:3000
		});

		const xMax = 16;
		const shake = anime({
			targets: '#btnStart',
			easing: 'easeInOutSine',
			duration: 700,
			translateX: [
				{
					value: xMax * -1,
				},
				{
					value: xMax,
				},
				{
					value: xMax * -1,
				},
				{
					value: xMax,
				},
				{
					value: xMax/-2,
				},
				{
					value: xMax/2,
				},
				{
					value: xMax/-2,
				},
				{
					value: xMax/2,
				},
				{
					value: 0,
				}
			],
			loop:true,
			delay:4000
		});
		document.getElementById('countDownSplash').style.visibility = 'collapse';
	},3000);
}


//**************************************************************************//
//****************************** Faux chargement ***************************//
//**************************************************************************//

function falseLoad()
{
	document.getElementById('loading').style.visibility = "visible";
	changeSound('sounds/loading.mp3');
	document.getElementById('btnStart').style.visibility = "hidden";
	anime({
		targets: '#loading',
		opacity: ['0%', '100%'],
		duration: 20
	});
	drawBg();
	let animation = anime({
		targets: '.segment',
		width: 100,
		duration: 200,
		easing: 'linear',
		direction: 'alternate',
		loop: 2,
		delay: function(el, i, l) {
			return i * 850;
		},
		endDelay: 2000
	});
	setTimeout(()=>{
		document.getElementById('loading').style.visibility = "hidden";
		sound.pause();
		drawScoreAndLives();
		duringLoad = false;
		drawLevel();
		//drawBeforeLaunch();
	},5000);

}

//**************************************************************************//
//************** Images et fonctions de dessins des éléments ***************//
//**************************************************************************//

//****** splash du début ***********************************
var splash = new Image();
splash.src = "img/splashscreen_1100_720.png";

function drawSplash() {
	ctx.beginPath();
	ctx.drawImage(splash, 0, 0)
	ctx.closePath();
}

//****** tableau de background de niveau preload *************
var bgArray = new Array();

for (let i = 1; i < 4; i++) {
	var background = new Image();
	background.src = "img/bg_niveau"+i.toString()+".png";
	bgArray.push(background);
}
// niveau initialise à 1
var niveau = 1;

function drawBg() {
	ctx.beginPath();
	ctx.drawImage(bgArray[niveau-1], 0, 0)
	ctx.closePath();
}

//*********** Section life bar et score ************************
function drawScoreAndLives(){
	anime({
		targets: '#right',
		opacity: ['0%', '100%'],
		duration: 20
	});
}

//***************  Clignotement reste juste une vie *************
function glowLife(){
	if(nbVies === 1){
		document.getElementById("lifebar").style.filter = "drop-shadow(2px 3px 7px #ec463d)";
		var animation = anime({
			targets: '#lifebar',
			opacity: 0.15,
			scale: [1.2, .8],
			direction: 'alternate',
			loop: true,
			easing: 'easeInOutQuad',
			autoplay: false,
			duration: 350
		});
		function loop(t) {
			if(nbVies === 1){
				animation.tick(t);
				customRAF = requestAnimationFrame(loop);
			}
		}
		requestAnimationFrame(loop);
	}
	else {
		document.getElementById("lifebar").style.filter = "drop-shadow(0px 0px 0px #ec463d)";
		document.getElementById("lifebar").style.opacity = "1";
	}

}

//************************************************************************************************************//
//********************************************** Simple version Game *****************************************//
//************************************************************************************************************//

//var canvas = document.getElementById("myCanvas");
//var ctx = canvas.getContext("2d");


//****** paddle ******
var paddleHeight = 20;
var paddleWidth = 115;
var paddleX = (canvas.width-paddleWidth)/2;
var paddle_img = new Image();
paddle_img.src = 'img/paddle.png';
var paddleTop = canvas.height-paddleHeight - 40;



//****** ball ******
var ball = new Image();
ball.src = 'img/ball3.png';
var ballDiameter = 28;
var x = ((canvas.width/2) - (ballDiameter/2));
var y = paddleTop - ballDiameter;

var dx = 8;
var dy = -8;

// limite de hauteur avant d'être mort

var deathLimit = canvas.height - paddleHeight - (ballDiameter/2);

var rightPressed = false;
var leftPressed = false;
var brickColumnCount = 10;
var brickRowCount = 5;
var brickWidth = 103;
var brickHeight = 30;
var brickPadding = 3;
var brickOffsetTop = 80;
var brickOffsetLeft = 20;
var score = 0;
var nbVies = 3;
var inGame = false;
var pauseGame = false;
var duringLoad = true;

var bricksImage = new Image();
bricksImage.src = "img/sprite_briques_special.png";

var bricks = [];


function drawLevel()
{
	duringLoad = true;
	nextBall();
	bricks = [];
	switch (niveau){
		case 1:
			drawFirstLevel();
			break;
		case 2:
			drawSecondLevel();
			break;
		case 3:
			drawFirstLevel();
			break;
		default:
			drawSecondLevel();
			break;
	}
	changeSound("sounds/begin.wav")
	drawBeforeLaunch();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
	if(!duringLoad)
	{
		if(e.keyCode === 68) {
			rightPressed = true;
			//paddleX += 10;
		}
		else if(e.keyCode === 65) {
			leftPressed = true;
			//paddleX -= 10;
		}
		else if(e.keyCode === 32 && !inGame)
		{
			inGame = true;
			draw();
			changeSound("sounds/gameplay.mp3");
		}
		else if(e.keyCode === 32)
		{
			pauseGame = !pauseGame;
			changeSound("sounds/pause.wav");
			if(!pauseGame)
			setTimeout(function (){
				changeSound("sounds/gameplay.mp3");
			}, 500)
		}
	}

}

function keyUpHandler(e) {
	if(e.keyCode === 68) {
		rightPressed = false;
	}
	else if(e.keyCode === 65) {
		leftPressed = false;
	}
}

var frameWidth = 15;
function mouseMoveHandler(e) {
	if(!pauseGame)
	{
		var relativeX = e.clientX - canvas.offsetLeft;
		if(relativeX < paddleWidth + frameWidth){
			paddleX = frameWidth;
		}
		else if(relativeX > canvas.width - paddleWidth - frameWidth)
		{
			paddleX = canvas.width - paddleWidth - frameWidth;
		}
		else {
			paddleX = relativeX - paddleWidth;
		}
	}

}

function fireworks() {

	changeSound('sounds/fireworks.mp3');
	playEffect2('sounds/level_completed.wav');
	document.getElementById('success').style.visibility = "visible";
	anime({
		targets: '#success',
		opacity: 1,
		easing: 'linear',
		duration: 2200
	});
	setTimeout(function () {
		anime({
			targets: '#success',
			opacity: 0,
			easing: 'linear',
			duration: 2000
		});
	}, 2500);


}

function showWinMessage() {
	document.getElementById('message').style.visibility = "visible";
	document.getElementById('message').innerText = "BRAVO! Vous avez réussi le niveau " + niveau.toString();
}

function showSuccess() {
	showWinMessage();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBg();
	fireworks();
}
var bonusrate = 1;
var lifeBonus = 200;

function popLife() {
	anime({
		targets: '#lifes',
		keyframes: [
			{scale: 3, duration:500, easing: 'easeInBounce'},
			{scale: 1, duration:300, easing: 'easeOutBack'}
		]

	});
}

function collisionDetection() {
	for(var c=0; c<brickRowCount; c++) {
		for(var r=0; r<brickColumnCount; r++) {
			var b = bricks[c][r];
			if(b.status >= 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status--;
					score += b.points;
					drawScore();
					if((score >= 500 * bonusrate) && nbVies < 3)
					{
						bonusrate++;
						nbVies++;

						popLife();
						setTimeout(function (){
							playEffect2("sounds/extralife.wav");
							updateLifeFrame();
						}, 300)

					}
					if(score >= levelLimit) {
						duringLoad = true;
						y = paddleTop - ballDiameter;
						inGame = false;
						showSuccess();
						setTimeout(function () {
							document.getElementById('message').style.visibility = "hidden";
							falseLoad();
						}, 5200);
						setTimeout(function () {
							niveau++;
						}, 10200);
					}
					if(b.status > 0){
						playEffect("sounds/hit_tough_brick_first.ogg");
					}
					else if(b.points === 5){
						playEffect2("sounds/hit_tough_brick_last.wav");
					}
					else{
						playEffect("sounds/hit_brick.wav");
					}

				}
			}
		}
	}
}

function drawBall() {
	if(!inGame)
	{
		x = (paddleX + paddleWidth/2) - (ballDiameter/2);
	}
	ctx.beginPath();
	ctx.drawImage(ball, x, y);
	ctx.closePath();
}
function drawPaddle() {
	ctx.beginPath();
	ctx.drawImage(paddle_img, paddleX, paddleTop);
	ctx.closePath();
}
var sourceBrickWidth = 82;
var sourceBrickHeight  = 32;
function drawBricks() {
	for(var c=0; c<brickRowCount; c++) {
		for(var r=0; r<brickColumnCount; r++) {
			if(bricks[c][r].status >= 1) {
				var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.drawImage(bricksImage, bricks[c][r].color * sourceBrickWidth, 0, 82, 32, brickX, brickY, brickWidth, brickHeight);
				ctx.closePath();
			}
		}
	}
}
var lastScore = 0;
function drawScore() {
	if (lastScore !== score)
	{
		lastScore = score;
		let arrScore = Array.from(score.toString());
		arrScore = arrScore.reverse();
		for (let i = 0; i < arrScore.length; i++) {
			document.getElementById('score'+i).innerText = arrScore[i];
		}
		if(score !== 0 && score % 100 === 0)
		{
			document.getElementById('scorenombre').setAttribute("class", "animate seven go");
			setTimeout(function() {
				document.getElementById('scorenombre').classList.remove("go");
			},2000);

		}
	}
}

function drawBeforeLaunch() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBg();
	drawBricks();
	drawBall();
	drawPaddle();

	if(rightPressed && paddleX < canvas.width-(2*frameWidth)-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 2*frameWidth) {
		paddleX -= 7;
	}
	requestAnimationFrame(drawBeforeLaunch);
}
var bouncePause = false;

function draw() {
	if(inGame) {
		if (!pauseGame) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawBg();
			drawBricks();
			drawBall();
			drawPaddle();
			drawScore();
			collisionDetection();
			//changement de direction sur les murs ou sur le paddle
			if (x + dx > canvas.width - ballDiameter || x + dx < ballDiameter) {
				dx = -dx;
				playEffect2("sounds/hit_wall2.ogg");
			}
			if (y + dy < frameWidth) { //mur du haut
				dy = -dy;
				playEffect2("sounds/hit_wall2.ogg");
			}
			if(y + ballDiameter > paddleTop && (y + ballDiameter <= (paddleTop + ballDiameter/3)) ){

				if((x+dx >= (paddleX - 1.2*ballDiameter)) && x+dx <= (paddleX + paddleWidth +0.2*ballDiameter) && !bouncePause){
					calculateReboundAngle(x, paddleX, dx);
					dy = -dy;
					bouncePause = true;
					playEffect("sounds/hit_paddle.wav");
				}
			}
			else{
				bouncePause =false;
				if(y + ballDiameter>= canvas.height){
					nbVies--;
					updateLifeFrame();
					playEffect("sounds/dead.wav");
					if (!nbVies) {
						document.getElementById('myCanvas').style.visibility = 'collapse';
						GameOver();
						inGame = !inGame;
					}
					else {
						//reset les variables
						drawScore();
						nextBall();
					}
				}
			}

			if(inGame)
			{
				x += dx;
				y += dy;
			}

		}
		requestAnimationFrame(draw);
		if(leftPressed){
			paddleX -=7;
		}
		if(rightPressed){
			paddleX +=7;
		}
	}
	else{
		requestAnimationFrame(drawBeforeLaunch);
	}
}

function nextBall()
{

	//****** paddle ******
	paddleX = (canvas.width-paddleWidth)/2;

	//****** ball ******
	x = ((canvas.width/2) - (ballDiameter/2));
	y = paddleTop - ballDiameter;

	//vitesse et direction
    dx = 8;
	dy = -8;

	//reset de variables
	rightPressed = false;
	leftPressed = false;
	inGame = false;
	pauseGame = false;
	duringLoad = false;
}


var levelLimit = 0;

function drawFirstLevel(){
	var brickColor = 0;
	brickRowCount = 6;
	var strength = 1;
	var pts = 10;
	var colorchart = 0;
	for(var c=0; c<brickRowCount; c++) {
		if(c === 0){
			strength = 2;
			pts = 5;
			brickColor = 6;
		}
		else{
			strength = 1;
			pts = 10;
			brickColor = colorchart;
			colorchart++;
		}
		bricks[c] = [];
		for(var r=0; r<brickColumnCount; r++) {
			bricks[c][r] = { x: 0, y: 0, status: strength, color: brickColor, points: pts};
			levelLimit += pts * strength;
		}
	}
}

function drawSecondLevel(){
	var brickColor = 4
	brickRowCount = 11;
	var strength = 1;
	var pts = 10;
	var columns = 2;
	for(var r=0; r<brickRowCount; r++) {
		bricks[r] = [];
		if(r === 10){
			strength = 2;
			pts = 5;
		}
		for(var c=0; c<brickColumnCount; c++) {
			if(c < columns){
				bricks[r][c] = { x: 0, y: 0, status: strength, color: brickColor, points: pts};
				levelLimit += pts * strength;
			}
			else{
				bricks[r][c] = { x: 0, y: 0, status: 0, color: brickColor, points: 0};
			}

		}
		if(r%2 === 1){
			brickColor++;
			columns += 2;
		}

	}
}

var options = {
	opacityIn:[0,1],
	scaleIn:[0.2,1],
	scaleOut:3,
	durationIn:500,
	durationOut:300,
	delay:200,
	easing:"easeInExpo"
};
anime.timeline({loop:false})
	.add({
		targets:'.text-animation .one',
		opacity:options.opacityIn,
		scale:options.scaleIn,
		duration:options.durationIn
	})
	.add({
		targets:'.text-animation .one',
		opacity:0,
		scale:options.scaleOut,
		easing:options.easing,
		duration:options.durationOut,
		delay:options.delay
	})
	.add({
		targets:'.text-animation .two',
		opacity:options.opacityIn,
		scale:options.scaleIn,
		duration:options.durationIn
	})
	.add({
		targets:'.text-animation .two',
		opacity:0,
		scale:options.scaleOut,
		easing:options.easing,
		duration:options.durationOut,
		delay:options.delay
	})
	.add({
		targets:'.text-animation .three',
		opacity:options.opacityIn,
		scale:options.scaleIn,
		duration:options.durationIn
	})
	.add({
		targets:'.text-animation .three',
		opacity:0,
		scale:options.scaleOut,
		easing:options.easing,
		duration:options.durationOut,
		delay:options.delay
	})
	.add({
		targets:'.text-animation, #countDownSplash',
		opacity:0,
		easing: 'easeOutExpo',
		duration:2000
	})

function GameOver(){
	changeSound("sounds/retro_game_over.wav");
	setTimeout(function(){
		playEffect("sounds/laugh.wav");
	},500);
	setTimeout(function(){
		playEffect2("sounds/orchestra_game_over.wav");
	},5000);

	document.getElementById('gameOver').style.visibility = 'visible';
	anime({
		targets: '.top',
		opacity: [0,1],
		rotateY: 360,
		scale: 4,
		duration: 3000,
		elasticity: 800,
		loop: false,
		direction: 'normal'
	});
	document.getElementById('btnReset').style.visibility = 'visible';
	anime({
		targets: '#btnReset',
		opacity: ['0%', '100%'],
		duration: 1000,
		easing: 'easeInExpo',
		delay:5000,
		zIndex:'10'
	});
}
function reload(){
	window.location.reload();
}

function calculateReboundAngle(debutBall, debutPaddle, direction){
	var finPaddle = debutPaddle + (7 * paddleWidth/8);
	debutPaddle = debutPaddle + (paddleWidth/8);
	var milieuBall = debutBall + (ballDiameter/2);
	var milieuPaddle = paddleX + (paddleWidth/2);

	if(milieuBall > debutPaddle && milieuBall < finPaddle){
		if(milieuBall <= milieuPaddle){
			if(dx === -10){
				dx = -10
				dy = 6;
			}
			else{
				dx = -6;
				dy = 10;
			}

		}
		else{
			if(dx === 10){
				dx = 10
				dy = 6;
			}
			else{
				dx = 6;
				dy = 10;
			}
		}

	}
	else{
		if(debutBall <= debutPaddle)
		{
			if(dx === -6)
			{
				dx = -6;
				dy = 10;
			}
			else{
				dx = -10;
				dy = 6;
			}

		}
		else{
			if(dx === 6)
			{
				dx = 6;
				dy = 10;
			}
			else{
				dx = 10;
				dy = 6;
			}
		}
	}
}