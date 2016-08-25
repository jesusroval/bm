
	// 
var WIDTH = 640;
var HEIGHT = 480;
var socket = io();
var TILE_SIZE = 64;	


var mX = 0;
var mY = 0;
var playChar;
var cats = ['cat.png' ,'hedgehog.png', 'tiger.png', 'bomb.png', 'tile.png'];
var charArray = [];
var map;
var enemy = false;
var array2D = [];
var testID;
var bombArray = [];
var oldX;
var oldY;
var aPlayer = false;
var wantUpdate = false;
var interpollation = 6;

	pressingRight = false;
	pressingLeft = false;
	pressingUp = false;
	pressingDown = false;

var explotionOffSetX = 24; 
var explotionOffSetY = 28;
var gridBtn = document.getElementById('gridBtn');
//sign
var signDiv = document.getElementById('signDiv');
// var signDivUsername = document.getElementById('signDiv-username');
var signDivSignIn = document.getElementById('signDiv-signIn');
var createGameBtn = document.getElementById('create');
var joinGameBtn = document.getElementById('join');
var startGameBtn = document.getElementById('start');
var gameList = document.getElementById('gameList');














// var currentMousePos = { x: -1, y: -1 };


// 	document.addEventListener("touchstart", onTouchStart, true);  

// 	document.addEventListener("touchend", onTouchEnd, true);  

// 	document.addEventListener("touchmove", onTouchMove, true);
	


// 	function onTouchStart(event){  
// 		currentMousePos.x = event.pageX;  
// 		currentMousePos.y = event.pageY;
// 	}

// 	function onTouchMove(event){  
// 		currentMousePos.x = event.pageX;
// 		currentMousePos.y = event.pageY;
// 	}

// 	function onTouchEnd(event){  
// 		currentMousePos.x = event.pageX;  
// 		currentMousePos.y = event.pageY;
// 		alert('x ' + event.pageX + '  y ' + event.pageY);
// 	}





var amountOfPlayers = 0;
var playerText = [];
var pt;
var movie;
var currentFrameNow = 0;


// var signDivSignUp = document.getElementById('signDiv-signUp');
// var signDivPassword = document.getElementById('signDiv-password');


var bomb = new Howl({
  src: ['/client/sounds/bomb.mp3']
});
var chuckle = new Howl({
  src: ['/client/sounds/chuckle.mp3']
});
var zombie = new Howl({
  src: ['/client/sounds/zombie.mp3']
});
var dying = new Howl({
  src: ['/client/sounds/dying.mp3']
});
var fuse = new Howl({
  src: ['/client/sounds/fuse.mp3']
});




// var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// var array2D = [];
// for(var i = 0 ; i < 40; i++){
// 	array2D[i] = [];
// 	for(var j = 0 ; j < 40; j++){
// 		array2D[i][j] = array[i * 40 + j];
// 	} 
// }

// 		isPositionWall = function(pt){
// 				var gridX = Math.floor(pt.obj.x / TILE_SIZE);
// 				var gridY = Math.floor(pt.obj.y / TILE_SIZE);
// 				if(gridX < 0 || gridX >= array2D[0].length)
// 					return true;
// 				if(gridY < 0 || gridY >= array2D.length)
// 					return true;
// 				return array2D[gridY][gridX];
// 			}




var gridMap = function(){
	// var gridMap = "<table border=1>";
	var table = document.createElement('table');
	table.id = 'gridMap';
	table.border = 1;
  	var tableBody = document.createElement('tbody');

	for (var i = 0; i < array2D[0].length; i++) {
		// gridMap += '<tr>';
		var row = document.createElement('tr');

		// document.createElement('')
		for (var j = 0; j < array2D.length; j++) {
		    var cell = document.createElement('td');
		    cell.appendChild(document.createTextNode(array2D[j][i]));
      		row.appendChild(cell);
			// gridMap += "<td>"+array2D[j][i]+"</td>";
				// Tile({gridX:j, gridY:i, type:1,});	
		}
	    tableBody.appendChild(row);

		// gridMap += "</tr>";
	}

	table.appendChild(tableBody);
  	document.body.appendChild(table);
	wantUpdate = true;

	// gridMap += "</table>";	

	// document.appendChild(gridMap);
}

// gridBtn.onclick = gridMap;

var gridMapUpdate = function(){
	var gridMap = document.getElementById('gridMap').rows;
	var y;
	for (var i = 0; i < 11; i++) {	
		for (var j = 0; j < 11; j++) {
			y = gridMap[i].cells;
			y[j].innerHTML = array2D[i][j];
		}
	}
	// console.log('map updated');

}


signDivSignIn.onclick = function(){
	socket.emit('signIn');
}



startGameBtn.onclick = function(){

	var gameId = gameList.options[gameList.selectedIndex].value;

	socket.emit('startGame',{ gameId:gameId})

}

joinGameBtn.onclick = function(){

	
	// var strUser = gameList.options[gameList.selectedIndex].value;
	

	var gameId = gameList.options[gameList.selectedIndex].value;


	socket.emit('joinGame', {playerName:'Bertil', gameId:gameId});
}
createGameBtn.onclick = function(){
	
	//take from textbox later name

socket.emit('createGame', {gameName:'what ever (1/4)'});

}
socket.on('addgameToList', function(data){


	

    var option = document.createElement("option");
    option.text = data.gameName;
    option.value = data.id;
    gameList.add(option, gameList[0]);


	// gameList.appendChild('<option>text4</option>');

});








socket.on('startTheGame', function(data){
		signDiv.style.display = 'none';
		gameDiv.style.display = 'inline-block';
		game();	
});

// signDivSignUp.onclick = function(){
// 	socket.emit('signUp',{username:signDivUsername.value,password:signDivPassword.value});
// }
// socket.on('signInResponse',function(data){
// 	if(data.success){
// 		signDiv.style.display = 'none';
// 		gameDiv.style.display = 'inline-block';
// 		game();
// 	} else
// 		alert("Sign in unsuccessul.");
// });
// socket.on('signUpResponse',function(data){
// 	if(data.success){
// 		alert("Sign up successul.");
// 	} else
// 		alert("Sign up unsuccessul.");
// });

//chat
var chatText = document.getElementById('chat-text');
var chatInput = document.getElementById('chat-input');
var chatForm = document.getElementById('chat-form');

// socket.on('addToChat',function(data){
// 	chatText.innerHTML += '<div>' + data + '</div>';
// });
// 	socket.on('evalAnswer',function(data){
// });


// chatForm.onsubmit = function(e){
// 	e.preventDefault();
// 	if(chatInput.value[0] === '/')
// 		socket.emit('evalServer',chatInput.value.slice(1));
// 	else
// 		socket.emit('sendMsgToServer',chatInput.value);
// 	chatInput.value = '';		
// }
	PIXI.loader
    .add('client/img/char.json')
    .load(onAssetsLoaded);

	// var loader = new PIXI.loaders.Loader('/client/img', 8);
	// loader.add("/char.json");


	// loader.load(onAssetsLoaded);

	// animate();
// -
function onAssetsLoaded()
{
    // create an array of textures from an image path
    // var frames = [];
//32
    for (var i = 0; i < 48; i++) {
        var val = i < 10 ? '0' + i : i;

        // magically works since the spritesheet was loaded with the pixi loader
      var temptext = PIXI.Texture.fromFrame('playerOne00' + val + '.png')
      playerText.push(temptext);
      // pt = PIXI.Texture.fromFrame('playerOne0000.png');
      // playerText.push(PIXI.Texture.fromFrame('playerOne0001.png'));

    }

       // movie = new PIXI.extras.MovieClip(playerText);
       //  movie.animationSpeed = 0.11;

       // movie.play();



    // animate();
}

function game(){

	var renderer = new PIXI.WebGLRenderer(704, 704);
	// var renderer = new PIXI.WebGLRenderer(768, 768);
	
	document.body.appendChild(renderer.view);
	
	stage = new PIXI.Container();

	// var assetsToLoader = ["/client/img/animals.json"];

    animate();
	// var ctx = document.getElementById("ctx").getContext("2d");
	// ctx.font = '30px Arial';
function animate() {
	requestAnimationFrame(animate);
		if(aPlayer){
			for(var i in Player.list){

				tempPlayer = Player.list[i];

				if(tempPlayer.died === false){
					if(tempPlayer.serverX !== tempPlayer.obj.x){

						tempPlayer.obj.x = tempPlayer.serverX;
						// var diff = tempPlayer.serverX - tempPlayer.obj.x;
						// tempPlayer.obj.x += diff/interpollation;
						// if(tempPlayer.serverX > tempPlayer.obj.x)
						// 	tempPlayer.obj.x += 2;

						// if(tempPlayer.serverX < tempPlayer.obj.x)
						// 	tempPlayer.obj.x -= 2;


					}
					if(tempPlayer.serverY !== tempPlayer.obj.y){
						// var diff = tempPlayer.serverY - tempPlayer.obj.y;
						// tempPlayer.obj.y += diff/interpollation;
						// tempPlayer.obj.y += 2;
						tempPlayer.obj.y = tempPlayer.serverY;

					}
				} else{
					tempPlayer.obj.x = tempPlayer.serverX;
					tempPlayer.obj.y = tempPlayer.serverY;
				}							
			}

			for(var i in Enemy.list){
				if(Enemy.list[i]){
					tempEnemy = Enemy.list[i];
					// if(tempPlayer.died === false){
						if(tempEnemy.serverX !== tempEnemy.obj.x){
							var diff = tempEnemy.serverX - tempEnemy.obj.x;


							tempEnemy.obj.x += diff/interpollation;
						}
						if(tempEnemy.serverY !== tempEnemy.obj.y){
							var diff = tempEnemy.serverY - tempEnemy.obj.y;
							tempEnemy.obj.y += diff/interpollation;
						}
				}
				// }
				//  else{
				// 	tempEnemy.obj.x = tempEnemy.serverX;
				// 	tempEnemy.obj.y = tempEnemy.serverY;
				// }							
			}			
		}	

	renderer.render(stage);
	}
	
var Player = function(initPack){
	var self = {};
	self.id = initPack.id;
	self.number = initPack.number;
	self.x = initPack.x;
	self.y = initPack.y;
	self.hp = initPack.hp;
	self.hpMax = initPack.hpMax;
	self.score = initPack.score;
	self.map = initPack.map;
	self.died;

	self.speed = 4;

	self.serverX = initPack.x;
	self.serverY = initPack.y;

	self.movingDown = initPack.movingDown;
	self.movingUp = initPack.movingUp;
	self.movingRight = initPack.movingRight;
	self.movingLeft = initPack.movingLeft;	
	self.animationSkip = false;
	// self.nowX;
	// self.nowY;

	// self.pressingRight = false;
	// self.pressingLeft = false;
	// self.pressingUp = false;
	// self.pressingDown = false;
	//33 34 35 36 
	self.frames = [];

	var cp = initPack.player;
	cp *= 4;
	cp += 32

	// cp *= 8;
	console.log(initPack.player + ' ip ' + initPack.spriteArrayOffset);
	for (currentFrameNow; currentFrameNow < initPack.spriteArrayOffset; currentFrameNow++) {
		self.frames.push(playerText[currentFrameNow]);
	}


	for (var i = 0; i < 4; i++) {

		self.frames.push(playerText[cp]);
		cp += 1;
	}

	if(selfId === null){selfId = self.id};

	movie = new PIXI.extras.MovieClip(self.frames);
	movie.animationSpeed = 0.14;
	movie.gotoAndStop(1);
    // movie.play();


	self.obj = movie;

	// new PIXI.Sprite(playerText[1]);

	self.obj.scale.x = 2;
	self.obj.scale.y = 2;
	self.obj.x = initPack.x - 32;
	self.obj.y = initPack.y - 32;
	stage.addChild(self.obj);


	amountOfPlayers +=1;
	// working but have instant death
	// //Create the health bar
	// self.healthBar = new PIXI.Container();
	// self.healthBar.position.x = self.x;
	// self.healthBar.position.y = self.y;
	// stage.addChild(self.healthBar);

	// //Create the black background rectangle
	// var innerBar = new PIXI.Graphics();
	// innerBar.beginFill(0x000000);
	// innerBar.drawRect(0, 0, 32, 4);
	// innerBar.endFill();
	// self.healthBar.addChild(innerBar);

	// //Create the front red rectangle
	// var outerBar = new PIXI.Graphics();
	// outerBar.beginFill(0xFF3300);
	// outerBar.drawRect(0, 0, 32, 4);
	// outerBar.endFill();
	// self.healthBar.addChild(outerBar);

	// self.healthBar.outer = outerBar;

	self.draw = function(){	

		// var x = self.x - Player.list[selfId].x + WIDTH/2;
		// var y = self.y - Player.list[selfId].y + HEIGHT/2;
	
		var hpWidth = 30 * self.hp / self.hpMax;
		// ctx.fillStyle = 'red';
		// ctx.fillRect(self.x - hpWidth/2,self.y - 40,hpWidth,4);
		
		var width = Img.player.width*2;
		var height = Img.player.height*2;


		// ctx.drawImage(Img.player,
		// 	0,0,Img.player.width,Img.player.height,
		// 	self.x-width/2,self.y-height/2,width,height);
		
		//ctx.fillText(self.score,self.x,self.y-60);
	}
	
	Player.list[self.id] = self;
	
	aPlayer = true;
	
	return self;
}
Player.list = {};
	
var PowerUp = function(initPack){
	var self = {};

	self.gridX = initPack.gridX;
	self.gridY = initPack.gridY;
	self.id = initPack.id;
	self.type = initPack.type;

	if(self.type === 'bombUp'){
		self.obj = new PIXI.Sprite.fromImage('/client/img/fu.png');
		self.obj.position.x = (initPack.gridX * TILE_SIZE) + 16;
		self.obj.position.y = (initPack.gridY * TILE_SIZE) + 16;
		stage.addChild(self.obj);				
	} else if(self.type === 'amountUp'){
		self.obj = new PIXI.Sprite.fromImage('/client/img/bu.png');
		self.obj.position.x = (initPack.gridX * TILE_SIZE) + 16;
		self.obj.position.y = (initPack.gridY * TILE_SIZE) + 16;
		stage.addChild(self.obj);					
	} else if(self.type === 'speedUp'){
		self.obj = new PIXI.Sprite.fromImage('/client/img/skatesprite.png');
		self.obj.position.x = (initPack.gridX * TILE_SIZE) + 16;
		self.obj.position.y = (initPack.gridY * TILE_SIZE) + 16;
		stage.addChild(self.obj);					
	}


	PowerUp.list[self.id] = self;		
	return self;
}
PowerUp.list = {};	

var Explotion = function(initPack){
	var self = {};
	self.id = initPack.id;
	self.x = initPack.x;
	self.y = initPack.y;

		if(initPack.removeBlock){
			array2D[data.y][data.x] = 0;

		}
		self.obj = new PIXI.Sprite.fromImage('/client/img/explosion.png');
		self.obj.position.x = initPack.gridX * TILE_SIZE;
		self.obj.position.y = initPack.gridY * TILE_SIZE;
		stage.addChild(self.obj);


 
	Explotion.list[self.id] = self;		
	return self;
}
Explotion.list = {};	

var Tile = function(initPack){
	var self = {};
	self.id = initPack.id;


	if(initPack.type === 1){
		self.obj = new PIXI.Sprite.fromImage('/client/img/grid.png');
	} else if(initPack.type > 1){
		self.obj = new PIXI.Sprite.fromImage('/client/img/stone.png');
	}

	self.obj.x = initPack.gridX * TILE_SIZE;
	self.obj.y = initPack.gridY * TILE_SIZE;
	stage.addChild(self.obj);

	Tile.list[self.id] = self;		
	return self;
}
Tile.list = {};

var Bomb = function(initPack){
	var self = {};
	self.id = initPack.id;
	self.x = initPack.x;
	self.y = initPack.y;



	self.obj = new PIXI.Sprite.fromImage('/client/img/bomb.png');
	self.obj.x = initPack.x;
	self.obj.y = initPack.y;
	stage.addChild(self.obj);

	fuse.play();



	Bomb.list[self.id] = self;		
	return self;
}
Bomb.list = {};	




var Bullet = function(initPack){
	var self = {};
	self.id = initPack.id;
	self.x = initPack.x;
	self.y = initPack.y;
	self.map = initPack.map;

	self.obj = new PIXI.Sprite.fromImage('/client/img/bullet.png');
	
	self.obj.scale.x = 0.5;
	self.obj.scale.y = 0.5;

	stage.addChild(self.obj);

	
	self.draw = function(){
		if(Player.list[selfId].map !== self.map)
			return;
		var width = Img.bullet.width/2;
		var height = Img.bullet.height/2;
	}
	
	Bullet.list[self.id] = self;		
	return self;
}
Bullet.list = {};

var Enemy = function(initPack){
	var self = {};
	self.id = initPack.id;
	self.x = initPack.x;
	self.y = initPack.y;

	self.serverX = initPack.x;
	self.serverY = initPack.y;

	self.obj = new PIXI.Sprite.fromImage('/client/img/bat.png');
	
	// self.obj.scale.x = 0.5;
	// self.obj.scale.y = 0.5;

	self.obj.x = initPack.x;
	self.obj.y = initPack.y;

	stage.addChild(self.obj);



	Enemy.list[self.id] = self;		
	return self;
}
Enemy.list = {};

var selfId = null;

// socket.on('map', function(data){
// 	console.log('map ' + data);
// });

socket.on('init',function(data){
	
	// if(data.tile.length > 0 && !map){
	// 	for (var i = 0; i < data.tile.length; i++) {
	// 		new Tile(data.tile[i]);
	// 	}
	// 	map = true;
	// 	console.log(data.tile.length +  ' tile init');		
	// }
	// if(data.enemy){
	// 	for (var i = 0; i < data.enemy.length; i++) {
	// 		var tempEnemy = data.enemy[i];
	// 		new Enemy(tempEnemy);

	// 	}				
	// }

	if(data.array2D){
		alert('initntint');
	}

	if (data.powerUp) {
		for (var i = 0; i < data.powerUp.length; i++) {
			new PowerUp(data.powerUp[i]);
		}				
	}

	if(data.explotion)
	{
		for (var i = 0; i < data.explotion.length; i++) {
			new Explotion(data.explotion[i]);
		}
	}
	if(data.bomb){
		for (var i = 0; i < data.bomb.length; i++) {
			new Bomb(data.bomb[i]);
		}				
	}



	if(data.selfId)
		selfId = data.selfId;
	if(data.player){
		var alreadyExist = false;

		for(var i = 0 ; i < data.player.length; i++){
			alreadyExist = false;

			for (var j = 0; j < charArray.length; j++) {
				if(charArray[j].id === data.player[i].id){
					alreadyExist = true;
				}
			}

			if(!alreadyExist){
				console.log(data.player.length);
				charArray.push(new Player(data.player[i]));
			}



		}

		currentFrameNow = 0;

	}

});
socket.on('bombTest', function(data){
	console.log(data);
});

socket.on('update',function(data){

	array2D = data.array2D;

	if(wantUpdate === true)
		gridMapUpdate();

	if(enemy === true){
		for (var i = 0; i < data.enemy.length; i++) {
			var pack = data.enemy[i];
			var e = Enemy.list[pack.id];
			if(e){
				e.serverX = pack.x;
				e.serverY = pack.y;
			}
		}
	} else{
			for (var i = 0; i < data.enemy.length; i++) {
				var tempEnemy = data.enemy[i];
				new Enemy(tempEnemy);
			}
			enemy = true;			
	}

	if(data.tile.length > 0 && !map){
		for (var i = 0; i < data.tile.length; i++) {
			new Tile(data.tile[i]);
		}
		map = true;
		console.log(data.tile.length +  ' tile init/UPDATE');		
	}

	for(var i = 0 ; i < data.player.length; i++){
		var pack = data.player[i];
		var p = Player.list[pack.id];

		if(!p){
			charArray.push(new Player(data.player[i]));
			p = Player.list[pack.id];
		}

		testID = pack.id;
			oldX = p.obj.x;
			oldY = p.obj.y;

			if(pack.x !== undefined){
				// p.obj.x = pack.x;
				p.serverX = pack.x- 32;
			}
			if(pack.y !== undefined)
				// p.obj.y = pack.y;
				p.serverY = pack.y- 32;			
			if(pack.hp !== undefined)
				p.hp = pack.hp;
			// working but have instant death
				// p.healthBar.width = p.hp * 3.5;
				// p.healthBar.x =pack.x + 8;
				// p.healthBar.y =pack.y - 5;		
			if(pack.score !== undefined)
				p.score = pack.score;

			if(pack.died !== undefined){
				p.died = pack.died;
			}

			if(!p.animationSkip){
				if(pack.movingDown){
					if(p.obj.currentFrame >= 1)
						p.obj.gotoAndStop(0);
					else if(p.obj.currentFrame === 0)
						p.obj.gotoAndStop(1);			
				} else if(pack.movingUp){
					if(p.obj.currentFrame >= 7 || p.obj.currentFrame < 6)
						p.obj.gotoAndStop(6);
					else if(p.obj.currentFrame === 6)
						p.obj.gotoAndStop(7);					
				}else if(pack.movingLeft){
					if(p.obj.currentFrame >= 3 || p.obj.currentFrame < 2)
						p.obj.gotoAndStop(2);
					else if(p.obj.currentFrame === 2)
						p.obj.gotoAndStop(3);					
				} else if(pack.movingRight){
					if(p.obj.currentFrame >= 5 || p.obj.currentFrame < 4)
						p.obj.gotoAndStop(4);
					else if(p.obj.currentFrame === 4)
						p.obj.gotoAndStop(5);					
				} else if(pack.lastDirection === 'down'){
					p.obj.gotoAndStop(8);
				} else if(pack.lastDirection === 'left'){
					p.obj.gotoAndStop(9);
				} else if(pack.lastDirection === 'right'){
					p.obj.gotoAndStop(10);
				} else if(pack.lastDirection === 'up'){
					p.obj.gotoAndStop(11);
				}
				p.animationSkip = true;
			} else{
				p.animationSkip = false;				
			}
	}
});



socket.on('remove',function(data){

	for(var i = 0 ; i < data.player.length; i++){
		var p = Player.list[data.player[i]];
		stage.removeChild(p.obj);
		delete Player.list[data.player[i]];
	}
	for (var i = 0; i < data.bomb.length; i++) {
		var b = Bomb.list[data.bomb[i]];
		if(b){
			bomb.play();
			stage.removeChild(b.obj);
			delete Bomb.list[data.bomb[i]];
		}
	}
	for (var i = 0; i < data.explotion.length; i++) {
		var e = Explotion.list[data.explotion[i]];

		stage.removeChild(e.obj);
		delete Explotion.list[data.explotion[i]];
	}

	for (var i = 0; i < data.tile.length; i++) {
		var t = Tile.list[data.tile[i]];
		stage.removeChild(t.obj);
		delete Tile.list[data.tile[i]];
	}

	for (var i = 0; i < data.powerUp.length; i++) {
		var pU = PowerUp.list[data.powerUp[i]];
		if(pU){
			chuckle.play();
			stage.removeChild(pU.obj);
			delete PowerUp.list[data.powerUp[i]];
		}
	}


	for(var i = 0 ; i < data.enemy.length; i++){
		var e = Enemy.list[data.enemy[i]];
		
		if (e) {
			zombie.play();
			stage.removeChild(e.obj);
			delete Enemy.list[data.enemy[i]];
		}
	}
			
});

document.body.addEventListener('touchstart', function(e){
    // alert pageX coordinate of touch point
    var touchX = e.changedTouches[0].pageX;
    var touchY = e.changedTouches[0].pageY;

    console.log('touch y ' + touchY);

	socket.emit('touchstart', {touchX:touchX, touchY:touchY});
	// console.log(' grid x ' + gridTX + ' grid y ' + gridTY);
	// console.log('  x ' + touchX + '  y ' + touchY);


}, false)


document.body.addEventListener('touchend', function(e){

	socket.emit('touchend',{h:'h'});

}, false)
document.onkeypress = function(event){
	if(event.keyCode === 100){	//d
		socket.emit('keyPress',{inputId:'right',state:true});
		pressingRight = true;
	} else if(event.keyCode === 115){	//s
		socket.emit('keyPress',{inputId:'down',state:true});
		pressingDown = true;


	// var player = Player.list[selfId];
	// if(player.obj.currentFrame >= 1)
	// 	player.obj.gotoAndStop(0);
	// else if(player.obj.currentFrame === 0)
	// 	player.obj.gotoAndStop()1;


	// console.log(player.obj.currentFrame);


		// var player = Player.list[selfId];
		// player.obj.
  //   // movie.play();
  //   	player.moveDown.play();
		// player.obj = player.moveDown;

	} else if(event.keyCode === 97){
	 //a
		socket.emit('keyPress',{inputId:'left',state:true});
		pressingLeft = true;
	} else if(event.keyCode === 119) {// w
		socket.emit('keyPress',{inputId:'up',state:true});
		pressingUp = true;
	} else if(event.keyCode === 109){  //m
		gridMap();

	} else if(event.keyCode === 114){  //r

		socket.emit('resetThisGame',{date:Date.now(),state:true}, function(error, message){
			console.log(' client reset callback');
		});
	} else if(event.keyCode === 112){
		socket.emit('enemyMove',{help:' evil bats stop! '});
	}

}

	socket.on('removeStageChild', function(data, callback){

		for (var i = stage.children.length - 1; i >= 0; i--) {	
			stage.removeChild(stage.children[i]);
		};		
			console.log('removeStageChild');
	});

socket.on('serverIsReset', function(){

	map = false;
	enemy = false;
			console.log(' client reset serverIsReset');
});

document.onkeyup = function(event){

	if(event.keyCode === 68){	//d
		socket.emit('keyPress',{inputId:'right',state:false});
		pressingRight = false;

	}
	else if(event.keyCode === 83){	//s
		socket.emit('keyPress',{inputId:'down',state:false});
		pressingDown = false;
	}
	else if(event.keyCode === 65){
	 //a
		socket.emit('keyPress',{inputId:'left',state:false});
		pressingLeft = false;
	}
	else if(event.keyCode === 87) {// w
		socket.emit('keyPress',{inputId:'up',state:false});
		pressingUp = false;
	}



	if(event.keyCode === 32) //space
		socket.emit('keyPress',{inputId:'bomb',state:true});
}

// document.onmousedown = function(event){
// 	socket.emit('keyPress',{inputId:'attack',state:true});
// }
// document.onmouseup = function(event){
// 	socket.emit('keyPress',{inputId:'attack',state:false});
// }
document.onmousemove = function(event){

	// mX = renderer.plugins.interaction.mouse.global.x;
	// mY = renderer.plugins.interaction.mouse.global.y;
	// mousePos(mX, mY); 

}

	mousePos = function(eX, eY){
		if (Player.list[selfId].obj.x && Player.list[selfId].obj.y) {
			var x = -Player.list[selfId].obj.x + eX -8;
			var y = -Player.list[selfId].obj.y + eY -8;

			var angle = Math.atan2(y,x) / Math.PI * 180;

			socket.emit('keyPress',{inputId:'mouseAngle',state:angle});
		}
	}
}