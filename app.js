//var mongojs = require("mongojs");
var db = null;//mongojs('localhost:27017/myGame', ['account','progress']);

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log("Server started.");

var SOCKET_LIST = {};

var charArray = [];

var TILE_SIZE = 64;	
var explotionOffSetX = 24; 
var explotionOffSetY = 28;
// var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
 
// var array2D = [];
// for(var i = 0 ; i < 40; i++){
// 	arary2D[i] = [];
// 	for(var j = 0 ; j < 40; j++){
// 		array2D[i][j] = array[i * 40 + j];
// 	}
// }

	var array =[1,1,1,1,1,1,1,1,1,1,1,
				1,0,0,0,2,0,0,0,2,0,1,
				1,0,1,0,1,0,1,0,1,2,1,
				1,0,0,2,0,0,2,0,2,0,1,
				1,2,1,2,1,0,1,0,1,0,1,
				1,0,0,2,0,2,0,0,0,0,1,
				1,2,1,0,1,2,1,2,1,0,1,
				1,0,0,0,2,2,0,0,2,0,1,
				1,0,1,0,1,2,1,0,1,0,1,
				1,0,0,0,0,2,2,0,0,0,1,				
				1,1,1,1,1,1,1,1,1,1,1,
				];

var array2D = [];


for(var i = 0 ; i < 11; i++){
	array2D[i] = [];
	for(var j = 0 ; j < 11; j++){
		array2D[i][j] = array[i * 11 + j];
	}
}





isPositionWall = function(bumper){

		var gridX = Math.floor(bumper.x / TILE_SIZE);
		var gridY = Math.floor(bumper.y / TILE_SIZE);


		if(gridX < 0 || gridX >= array2D[0].length)
			return true;
		if(gridY < 0 || gridY >= array2D.length)
			return true;
		return array2D[gridY][gridX];
	}


var Entity = function(param){
	var self = {
		x:100,
		y:100,
		spdX:0,
		spdY:0,
		id:"",
		map:'forest',
		wall: false,
	}
	if(param){
		if(param.x)
			self.x = param.x;
		if(param.y)
			self.y = param.y;
		if(param.map)
			self.map = param.map;
		if(param.id)
			self.id = param.id;		
	}
	
	self.update = function(){
		self.updatePosition();
	}
	self.updatePosition = function(){
		var oldX = self.x;
		var oldY = self.y;

		self.x += self.spdX;
		self.y += self.spdY;

	}
	self.getDistance = function(pt){
		return Math.sqrt(Math.pow(self.x-pt.x,2) + Math.pow(self.y-pt.y,2));
	}
	return self;
}

var Player = function(param){
	var self = Entity(param);
	self.number = "" + Math.floor(10 * Math.random());
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;
	self.pressingAttack = false;
	self.dropBomb = false;
	self.mouseAngle = 0;
	self.maxSpd = 5;
	self.hp = 10;
	self.hpMax = 10;
	self.score = 0;
	self.gridX = 1;
	self.gridY = 1;
	self.x = 70;
	self.y = 70;
	self.killed = false;
	
	var super_update = self.update;
	self.update = function(){
		self.updateSpd();
		
		super_update();
		
		if(self.pressingAttack){
			self.shootBullet(self.mouseAngle);
		}

		if(self.dropBomb){
			Bomb(
				{x:self.x,
				y:self.y});
			self.dropBomb = false;
		}

		// if(self.killed = false){
		// 	console.log(self.killed);
		// 	self.gridX = 1;
		// 	self.gridY = 1;
		// 	self.x = 70;
		// 	self.y = 70;
		// 	self.hp = self.hpMax;
		// 	self.killed = true;		
		// }
	}

	self.shootBullet = function(angle){
		Bullet({
			parent:self.id,
			angle:angle,
			x:self.x,
			y:self.y,
			map:self.map,
		});
	}
	
	self.updateSpd = function(){


		// var rightBumper = {x:self.x+45, y:self.y+28};
		// var leftBumper = {x:self.x + 1, y:self.y+28};
		// var topBumper = {x:self.x+24, y:self.y};
		// var bottomBumper = {x:self.x+24, y:self.y +56};

		var rightBumper = {x:self.x+45, y:self.y+28};
		var leftBumper = {x:self.x + 1, y:self.y+28};
		var topBumper = {x:self.x+24, y:self.y};
		var bottomBumper = {x:self.x+24, y:self.y +56};

		if(self.pressingRight && !isPositionWall({x:self.x + TILE_SIZE, y:self.y})){
			self.x += TILE_SIZE;
			self.gridX += 1;

		}
		else if(self.pressingLeft && !isPositionWall({x:self.x - TILE_SIZE, y:self.y})){
			self.x -= TILE_SIZE;
			self.gridX -= 1;
		}

		
		if(self.pressingUp && !isPositionWall({x:self.x, y:self.y - TILE_SIZE})){
			self.y -= TILE_SIZE;
			self.gridY -= 1;
		}
		else if(self.pressingDown && !isPositionWall({x:self.x, y:self.y + TILE_SIZE})){
			self.y += TILE_SIZE;
			self.gridY += 1;
		}
			self.pressingLeft = false;
			self.pressingRight = false;
			self.pressingUp = false;
			self.pressingDown = false;

		// if(self.pressingRight && !isPositionWall(rightBumper))
		// 	self.spdX = self.maxSpd;
		// else if(self.pressingLeft && !isPositionWall(leftBumper))
		// 	self.spdX = -self.maxSpd;
		// else
		// 	self.spdX = 0;
		
		// if(self.pressingUp && !isPositionWall(topBumper))
		// 	self.spdY = -self.maxSpd;
		// else if(self.pressingDown && !isPositionWall(bottomBumper))
		// 	self.spdY = self.maxSpd;
		// else
		// 	self.spdY = 0;	
	}
	
	self.getInitPack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,	
			number:self.number,	
			hp:self.hp,
			hpMax:self.hpMax,
			score:self.score,
			map:self.map,
		};		
	}
	self.getUpdatePack = function(){

		return {
			id:self.id,
			x:self.x,
			y:self.y,
			hp:self.hp,
			score:self.score,
			dropBomb:self.dropBomb
		}	
	}
	
	Player.list[self.id] = self;
	
	initPack.player.push(self.getInitPack());
	return self;
}


///////


Player.list = {};
Player.onConnect = function(socket){
	var map = 'field';
	// if(Math.random() < 0.5)
	// 	map = 'forest';
	var player = Player({
		id:socket.id,
		map:map,
	});

	var wtf = Tile.getAllInitPack();

	socket.emit('init',{
		player:Player.getAllInitPack(),
		tile: wtf,
	});

	socket.on('keyPress',function(data){
		if(data.inputId === 'left')
			player.pressingLeft = data.state;
		else if(data.inputId === 'right')
			player.pressingRight = data.state;
		else if(data.inputId === 'up')
			player.pressingUp = data.state;
		else if(data.inputId === 'down')
			player.pressingDown = data.state;
		else if(data.inputId === 'mouseAngle')
			player.mouseAngle = data.state;		
		else if(data.inputId === 'attack')
			player.pressingAttack = data.state;
		else if(data.inputId === 'bomb')
			player.dropBomb = data.state;

	});










}
Player.getAllInitPack = function(){
	var players = [];
	for(var i in Player.list)
		players.push(Player.list[i].getInitPack());
	return players;
}

Player.onDisconnect = function(socket){
	delete Player.list[socket.id];
	removePack.player.push(socket.id);
}
Player.update = function(){
	var pack = [];
	for(var i in Player.list){
		var player = Player.list[i];
		player.update();
		pack.push(player.getUpdatePack());		
	}
	return pack;
}
var destroy = function(x, y, explodeLength){
	var gridX = Math.floor((x + explotionOffSetX) / TILE_SIZE);
	var gridY = Math.floor((y + explotionOffSetY) / TILE_SIZE);

	var cord = [];
	var timer = 0;

	Explotion({x:gridX, y:gridY});

	timer = 100;



	var rightHit = false;
	var leftHit = false;
	var upHit = false;
	var bottomHit = false;


	for (var i = 1; i < (explodeLength + 1); i++) {

		var right = {x:(gridX + i), y:gridY, timer:timer*i, removeBlock:false};
		if (rightHit || array2D[right.y][right.x] === 1) {
			rightHit = true;
		} else if(array2D[right.y][right.x] === 2){
			right.removeBlock = true;
			rightHit = true;
			changeMap(right);
	
		}

		if(!rightHit){
			timedExplotion(right);	
		}


		var up = {x:gridX, y:(gridY + i), timer:timer*i, removeBlock:false};
		if (upHit || array2D[up.y][up.x] === 1) {
			upHit = true;
		} else if(array2D[up.y][up.x] === 2){
			up.removeBlock = true;
			upHit = true;
			changeMap(up);

		}	

		if(!upHit){	
			timedExplotion(up);
		}

		var bottom = {x:gridX, y:(gridY - i), timer:timer*i, removeBlock:false}
		if (bottomHit || array2D[bottom.y][bottom.x] === 1) {
			bottomHit = true;
		} else if(array2D[bottom.y][bottom.x] === 2){
			bottom.removeBlock = true;
			bottomHit = true;
			changeMap(bottom);

		}

		if(!bottomHit){	
			timedExplotion(bottom);
		}


		var left = {x:(gridX - i), y:gridY, timer:timer*i, removeBlock:false}
		if (leftHit || array2D[left.y][left.x] === 1) {
			leftHit = true;
		} else if(array2D[left.y][left.x] === 2){
			left.removeBlock = true;
			leftHit = true;
			changeMap(left);
		}

		if(!leftHit){	
			timedExplotion(left);
		}		
	}
}
function changeMap(data){
	// array2D[data.y][data.x] = 0;
	setTimeout(function(){
	var count = 0
		for(var i in Tile.list) {
			count+=1;
			var t = Tile.list[i];
			if(t.gridX === data.x && t.gridY === data.y){

					array2D[data.y][data.x] = 0;
					delete Tile.list[i];
					removePack.tile.push(t.id);				
			}
		}

	console.log(count +  ' after remove, changemap');
	}, data.timer);



}

		// if(Tile.List[i].gridX === data.x && Tile.List[i].gridY === data.y){
		// 	var tile = Tile.list[i];
		// 	removePack.tile.push(tile.id);
		// 	delete Tile.list[i];
		// }
function timedExplotion(data){
	setTimeout(function(){
		Explotion(data);
	}, data.timer);
}
var Explotion = function(param){
	var self = Entity(param);

	self.gridX = param.x;
	self.gridY = param.y;
	self.id = Math.random();
	self.toRemove;
	self.burnTime = 400;
	self.removeBlock = param.removeBlock;
	// self.timer = param.timer;
	// self.explosionCords = destroy(self.x, self.y, param.explodeLength);


		for(var i in Player.list){
			var player = Player.list[i];

			if (player.gridX === self.gridX && player.gridY === self.gridY) {
				player.hp -= 10;
				if(player.hp <= 0){
					died(player);
				}
			}	
		}

	function died(player){
		player.gridX = 66;
		player.gridY = 66;
		player.x = 1666;
		player.y = 1666;
		player.hp = player.hpMax;

		setTimeout(function() {
			player.gridX = 1;
			player.gridY = 1;
			player.x = 70;
			player.y = 70;
			player.hp = player.hpMax;
		}, 2000);
	}


	self.explodeFunc = setTimeout(function() { 	
		self.toRemove = true;
	}, self.burnTime);

	self.getInitPack = function(){
		return {
			id:self.id,
			gridX:self.gridX,
			gridY:self.gridY,
			removeBlock:self.removeBlock,
		};
	}
	self.getUpdatePack = function(){
				return {
			id:self.id,
			x:self.x,
			y:self.y,
		}	
	}
	Explotion.list[self.id] = self;
	initPack.explotion.push(self.getInitPack());
	return self;

}
Explotion.list = {};

Explotion.update = function(){
	var pack = [];
	for(var i in Explotion.list){
		var explotion = Explotion.list[i];
		// bomb.update();
		if(explotion.toRemove){
			delete Explotion.list[i];
			removePack.explotion.push(explotion.id);
		}
		pack.push(explotion.getUpdatePack());		
	}
	return pack;
}

var Bomb = function(param){
	var self = Entity(param);
	self.id = Math.random();
	self.toRemove;
	self.fuse = 1000;
	self.explode = false;
	self.explodeLength = 2;

	self.explodeFunc = setTimeout(function() { 
		self.toRemove = true;
		destroy(
					self.x,
					self.y,
					self.explodeLength
					);
	}, self.fuse);

	self.getInitPack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,
		};
	}

	self.getUpdatePack = function(){
				return {
			id:self.id,
			x:self.x,
			y:self.y,
			explode:self.explode,
		}	
	}


	Bomb.list[self.id] = self;
	initPack.bomb.push(self.getInitPack());
	return self;
}
Bomb.list = {};

Bomb.update = function(){
	var pack = [];
	for(var i in Bomb.list){
		var bomb = Bomb.list[i];
		// bomb.update();
		if(bomb.toRemove){
			delete Bomb.list[i];
			removePack.bomb.push(bomb.id);
		}

		// if(bullet.toRemove || isPositionWall(bullet.x, bullet.y)){
		// 	delete Bullet.list[i];
		// 	removePack.bullet.push(bullet.id);
		// } else
		pack.push(bomb.getUpdatePack());		
	}
	return pack;
}

var Tile = function(param){
	var self = {};
	self.id = Math.random();
	self.gridX = param.gridX;
	self.gridY = param.gridY;
	self.type = param.type;
	self.toRemove = false;

	self.getInitPack = function(){
		return {
			id:self.id,
			gridX:self.gridX,
			gridY:self.gridY,	
			type:self.type,
		};		
	}

	Tile.list[self.id] = self;
	initPack.tile.push(self.getInitPack());
	return self;
}
Tile.list = {};

Tile.getAllInitPack = function(){
	var counts = 0;
	var tiles = [];
	for(var i in Tile.list){
		counts+=1;
		tiles.push(Tile.list[i].getInitPack());
	}
	return tiles;
}


var Bullet = function(param){
	var self = Entity(param);
	self.id = Math.random();
	self.angle = param.angle;
	self.spdX = Math.cos(param.angle/180*Math.PI) * 10;
	self.spdY = Math.sin(param.angle/180*Math.PI) * 10;
	self.parent = param.parent;
	
	self.timer = 0;
	self.toRemove = false;
	var super_update = self.update;
	self.update = function(){
		if(self.timer++ > 100)
			self.toRemove = true;
		super_update();
		
		for(var i in Player.list){
			var p = Player.list[i];
			if(self.map === p.map && self.getDistance(p) < 32 && self.parent !== p.id){
				p.hp -= 1;
								
				if(p.hp <= 0){
					var shooter = Player.list[self.parent];
					if(shooter)
						shooter.score += 1;
					p.hp = p.hpMax;
					p.x = Math.random() * 680;
					p.y = Math.random() * 400;					
				}
				self.toRemove = true;
			}
		}
	}
	self.getInitPack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,
			map:self.map,
		};
	}
	self.getUpdatePack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,		
		};
	}
	
	Bullet.list[self.id] = self;
	initPack.bullet.push(self.getInitPack());
	return self;
}
Bullet.list = {};

Bullet.update = function(){
	var pack = [];
	for(var i in Bullet.list){
		var bullet = Bullet.list[i];
		bullet.update();


		if(bullet.toRemove || isPositionWall(bullet.x, bullet.y)){
			delete Bullet.list[i];
			removePack.bullet.push(bullet.id);
		} else
			pack.push(bullet.getUpdatePack());		
	}
	return pack;
}

Bullet.getAllInitPack = function(){
	var bullets = [];
	for(var i in Bullet.list)
		bullets.push(Bullet.list[i].getInitPack());
	return bullets;
}

var DEBUG = true;

var isValidPassword = function(data,cb){
	return cb(true);
	/*db.account.find({username:data.username,password:data.password},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});*/
}
var isUsernameTaken = function(data,cb){
	return cb(false);
	/*db.account.find({username:data.username},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});*/
}
var addUser = function(data,cb){
	return cb();
	/*db.account.insert({username:data.username,password:data.password},function(err){
		cb();
	});*/
}

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
	
	socket.on('signIn',function(data){
		isValidPassword(data,function(res){
			if(res){
				Player.onConnect(socket);

				socket.emit('signInResponse',{success:true});
			} else {
				socket.emit('signInResponse',{success:false});			
			}
		});
	});
	socket.on('signUp',function(data){
		isUsernameTaken(data,function(res){
			if(res){
				socket.emit('signUpResponse',{success:false});		
			} else {
				addUser(data,function(){
					socket.emit('signUpResponse',{success:true});					
				});
			}
		});		
	});
	
	
	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
		Player.onDisconnect(socket);
	});
	socket.on('sendMsgToServer',function(data){
		var playerName = ("" + socket.id).slice(2,7);
		for(var i in SOCKET_LIST){
			SOCKET_LIST[i].emit('addToChat',playerName + ': ' + data);
		}
	});
	
	socket.on('evalServer',function(data){
		if(!DEBUG)
			return;
		var res = eval(data);
		socket.emit('evalAnswer',res);		
	});
	
	
	
});

var initPack = {player:[],bullet:[], bomb:[], explotion:[],serverArray:array2D, tile:[]};
var removePack = {player:[],bullet:[], bomb:[], explotion:[], tile:[]};

function initMap() {
	for (var i = 0; i < array2D[0].length; i++) {
		for (var j = 0; j < array2D.length; j++) {
			if (array2D[i][j] === 1) {
				Tile({gridX:j, gridY:i, type:1,});
			} else if(array2D[i][j] === 2){
				Tile({gridX:j, gridY:i, type:2,});
			}
		}
	}
}

initMap();




setInterval(function(){
	var pack = {
		player:Player.update(),
		bullet:Bullet.update(),
		bomb:Bomb.update(),
		explotion:Explotion.update(),
		tile:Tile.getAllInitPack(),
	}
	
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('init',initPack);
		socket.emit('update',pack);
		socket.emit('remove',removePack);
	}
	initPack.player = [];
	initPack.bullet = [];
	initPack.bomb = [];
	initPack.explotion = [];
	initPack.tile = [];

	removePack.player = [];
	removePack.bullet = [];
	removePack.bomb = [];
	removePack.explotion = [];
	removePack.tile = [];
	
},1000/25);










