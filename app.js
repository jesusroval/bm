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

var asp = [];

	var array =[1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1,
				1 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,2 ,0 ,1,
				1 ,0 ,1 ,10,1 ,0 ,1 ,10,1 ,0 ,1,
				1 ,0 ,0 ,2 ,0 ,0 ,2 ,0 ,0 ,0 ,1,
				1 ,0 ,1 ,2 ,1 ,0 ,1 ,2 ,1 ,0 ,1,
				1 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,1,
				1 ,0 ,1 ,0 ,1 ,2 ,1 ,2 ,1 ,0 ,1,
				1 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1,
				1 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,1,
				1 ,11,0 ,0 ,0 ,0 ,2 ,0 ,0 ,10,1,				
				1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1,
				];

var array2D = [];


for(var i = 0 ; i < 11; i++){
	array2D[i] = [];
	for(var j = 0 ; j < 11; j++){
		array2D[i][j] = array[i * 11 + j];
	}
}



function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

isPositionWall = function(bumper){

		var gridX = Math.floor(bumper.x / TILE_SIZE);
		var gridY = Math.floor(bumper.y / TILE_SIZE);
		// console.log(bumper);

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
var Enemy = function(param){
	var self = {};
	self.id = Math.random();
	self.x = (param.gridX * TILE_SIZE) + 16;
	self.y = (param.gridY * TILE_SIZE) + 16;
	self.width = 32;
	self.height = 32;
	self.gridX = 1;
	self.gridY = 1;

	self.maxSpd = 4;
	//left, up, right, down
	self.direction = [false, true, false, false];
	self.directionIndex = 0;

	self.isWall = [[-self.maxSpd,0],[0,-self.maxSpd],[self.maxSpd*8,0],[0,self.maxSpd*8]];

	// self.movmentSpeed = [[-self.maxSpd,0],[0,-self.maxSpd],[self.maxSpd,0],[0,self.maxSpd]];
	self.movmentSpeed = [[-TILE_SIZE,0],[0,-TILE_SIZE],[TILE_SIZE,0],[0,TILE_SIZE]];
	self.turn = Math.floor(Math.random()*16);



	self.move = function(){


		if(self.turn === 16){

			self.turn = 0;
			var possibleDirection = [];

			// if(Math.random() < 0.98){

			var gridX = Math.floor((self.x) / TILE_SIZE);
			var gridY = Math.floor((self.y) / TILE_SIZE);

			var gridCordX = gridX * TILE_SIZE;
			var gridCordY = gridY * TILE_SIZE;

			var lastWall = [];	
			var gridWall = [[-1,0],[0,-1],[1,0],[0,1]];
			var tempDir = false;
			var currentDirectionPossible = false;
			var random = Math.random();


			for (var i = 0; i < 4; i++) {
				
				gridWall[i][0] += gridX;
				gridWall[i][1] += gridY;
				var tempWall = [gridWall[i][0] * TILE_SIZE, gridWall[i][1] * TILE_SIZE];
				lastWall.push(tempWall);
			}
			

			for (var i = 0; i < lastWall.length; i++) {
				if(isPositionWall({x:lastWall[i][0], y:lastWall[i][1]})){


				} else{

					if(self.directionIndex === i){
						currentDirectionPossible = true;
					} else{
						possibleDirection.push(i);
					}
				}
			}

			if(random < 0.6 && possibleDirection.length > 1){
					for (var i = 0; i < possibleDirection.length; i++) {
					var random = Math.random();

					if(random > 0.5){
					self.directionIndex = possibleDirection[i];
					self.x += self.movmentSpeed[possibleDirection[i]][0];
					self.y += self.movmentSpeed[possibleDirection[i]][1];
					break;
					}
				}
			}
			else if(currentDirectionPossible === true){
				// console.log(random + ':r  current ' + self.directionIndex);
				self.x += self.movmentSpeed[self.directionIndex][0];
				self.y += self.movmentSpeed[self.directionIndex][1];
			} else if(possibleDirection.length > 0){
					// console.log('new   ' + possibleDirection);

				for (var i = 0; i < possibleDirection.length; i++) {
					var random = Math.random();

					if(random > 0.5){
					self.directionIndex = possibleDirection[i];
					self.x += self.movmentSpeed[possibleDirection[i]][0];
					self.y += self.movmentSpeed[possibleDirection[i]][1];
					break;
					}
				}

			} else{
				console.log('failed enemy movment');
			}
		} 
		// else if(self.turn === ){

		// }else if(self.turn === ){

		// }else if(self.turn === ){

		// }
		else{
			self.turn += 1;
		}
	}


	// self.move();

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
		}	
	}	

	Enemy.list[self.id] = self;
	initPack.enemy.push(self.getInitPack());
	return self;
}
Enemy.list = {};

Enemy.getAllInitPack = function(){
	var enemies = [];
	for(var i in Enemy.list)
		initPack.enemy.push(Enemy.list[i].getInitPack());

}

Enemy.update = function(){
	var pack = [];
	for(var i in Enemy.list){
		var enemy = Enemy.list[i];

		enemy.move();
		// bomb.update();
		// if(explotion.toRemove){
		// 	delete Enemy.list[i];
		// 	removePack.enemy.push(enemy.id);
		// }
		pack.push(enemy.getUpdatePack());		
	}
	return pack;
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
	self.explodeLength = 1;
	self.bombs = [];
	self.amountBombsAllowed = 1;
	self.died = false;
	self.width = 48;
	self.height = 56;


	var super_update = self.update;
	self.update = function(){
		self.updateSpd();
		
		super_update();
		
		if(self.pressingAttack){
			self.shootBullet(self.mouseAngle);
		}

		if(self.dropBomb && self.amountBombsAllowed > self.bombs.length){
			
			var tempBomb = Bomb(
					{x:self.x,
					y:self.y,
					explodeLength:self.explodeLength,
					parent:self,
					});

			setTimeout(function(){
				var tB = self.bombs.indexOf(tempBomb);
				self.bombs.splice(tB, 1);
				self.dropBomb = false;
			}, tempBomb.fuse)

			self.bombs.push(tempBomb);

			self.dropBomb = false;
		}
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

		// hitTestRectangle(r1, r2)


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

		for(var i in PowerUp.list){
			var pU = PowerUp.list[i];
			if(pU.gridX === self.gridX && pU.gridY === self.gridY){

				if(pU.type === 'bombUp'){
					self.explodeLength += 1;					
				} else if(pU.type === 'amountUp'){
					self.amountBombsAllowed += 1;					
				}


				// console.log(array2D[pU.gridY][pU.gridX]);
				delete PowerUp.list[i];
				removePack.powerUp.push(pU.id);
				array2D[pU.gridY][pU.gridX] = 0;	
			}
		}		
			self.pressingLeft = false;
			self.pressingRight = false;
			self.pressingUp = false;
			self.pressingDown = false;

		for(var i in Enemy.list){
			var albert =  Enemy.list[i];
			if(hitTestRectangle(self, albert))
				Player.died(self);		
		}

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
			dropBomb:self.dropBomb,
			died:self.died,
		}	
	}
	
	Player.list[self.id] = self;

	// Enemy.getAllInitPack();
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
Player.died = function(player){
		player.gridX = -6;
		player.gridY = -6;
		player.x = -666;
		player.y = -666;
		player.hp = player.hpMax;
		player.explodeLength = 1;
		player.amountBombsAllowed = 1;
		player.died = true;

		setTimeout(function() {
			player.gridX = 1;
			player.gridY = 1;
			player.x = 70;
			player.y = 70;
			player.hp = player.hpMax;
			player.died = false;
		}, 2000);
	}

function checkImpact(data){


	if (data.y > 0 && data.y < 12 && data.x > 0 && data.x < 12) {
		var mapGrid = array2D[data.y][data.x];

		if (data.hit || mapGrid === 1) {
			data.hit = true;
		} else if(mapGrid === 2){
			data.removeBlock = true;
			data.hit = true;
			changeMap(data);
		} else if(mapGrid === 10){
			data.powerUp = 'bombUp';
			data.removeBlock = true;
			data.hit = true;
			changeMap(data);
		} else if(mapGrid === 11){
			data.powerUp = 'amountUp';
			data.removeBlock = true;
			data.hit = true;
			changeMap(data);			
		}

		if(!data.hit){
			timedExplotion(data);	
		}

		return(data.hit);
	}
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

	console.log('destroy ' + explodeLength);

	var right = {x:(gridX + i), y:gridY, timer:timer*i, removeBlock:false, hit: false,};
	var down = {x:gridX, y:(gridY + i), timer:timer*i, removeBlock:false, hit: false,};
	var up = {x:gridX, y:(gridY - i), timer:timer*i, removeBlock:false, hit: false,};
	var left = {x:(gridX - i), y:gridY, timer:timer*i, removeBlock:false, hit: false,};	



	for (var i = 1; i < (explodeLength + 1); i++) {
		if(!rightHit)
		rightHit = checkImpact({x:(gridX + i), y:gridY, timer:timer*i, removeBlock:false, hit: false,});
		if(!bottomHit)
		bottomHit = checkImpact({x:gridX, y:(gridY + i), timer:timer*i, removeBlock:false, hit: false,});
		if(!upHit)
		upHit = checkImpact({x:gridX, y:(gridY - i), timer:timer*i, removeBlock:false, hit: false,});
		if(!leftHit)
		leftHit = checkImpact({x:(gridX - i), y:gridY, timer:timer*i, removeBlock:false, hit: false,});	
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

				if(data.powerUp){
					PowerUp({gridX:t.gridX, gridY:t.gridY, type:data.powerUp})
				}

				array2D[data.y][data.x] = 0;
				delete Tile.list[i];
				removePack.tile.push(t.id);				
			}
		}

	console.log(count +  ' after remove, changemap');
	}, data.timer);



}

function timedExplotion(data){
	setTimeout(function(){
		Explotion(data);
	}, data.timer);
}
var PowerUp = function(param){
	var self = Entity(param);

	self.gridX = param.gridX;
	self.gridY = param.gridY;
	self.id = Math.random();
	self.type = param.type;
	self.burnTime = 10000;
	self.toRemove = false;

	setTimeout(function() {
		delete PowerUp.list[self];
		removePack.powerUp.push(self.id);
	}, self.burnTime);

	self.getInitPack = function(){
		return {
			id:self.id,
			gridX:self.gridX,
			gridY:self.gridY,
			type:self.type,
		};
	}	

	PowerUp.list[self.id] = self;
	initPack.powerUp.push(self.getInitPack());
	return self;
}
PowerUp.list = {};

PowerUp.getAllInitPack = function(){
	var powerUps = [];
	for(var i in PowerUp.list){
		powerUps.push(PowerUp.list[i].getInitPack());
	}
	return powerUps;
}

var Explotion = function(param){
	var self = Entity(param);

	self.gridX = param.x;
	self.gridY = param.y;
	self.id = Math.random();
	self.toRemove;
	self.burnTime = 400;
	self.removeBlock = param.removeBlock;
	self.width = 64;
	self.height = 64;
	// self.timer = param.timer;
	// self.explosionCords = destroy(self.x, self.y, param.explodeLength);


		for(var i in Player.list){
			var player = Player.list[i];

			if (player.gridX === self.gridX && player.gridY === self.gridY) {
				player.hp -= 10;
				if(player.hp <= 0){
					Player.died(player);
				}
			}	
		}

		for(var i in Enemy.list){
			var enemy = Enemy.list[i];
			var exp = {x:self.gridX*TILE_SIZE,y:self.gridY*TILE_SIZE, width:self.width, height:self.height};
			if (hitTestRectangle(enemy, exp)) {
				// console.log('hit');
				enemy.x = -666;
				enemy.y = -666;
			} else{
				// console.log(enemy.x + ' ' + exp.x);
			}
		}



	// self.died = function(player){
	// 	player.gridX = -6;
	// 	player.gridY = -6;
	// 	player.x = -666;
	// 	player.y = -666;
	// 	player.hp = player.hpMax;
	// 	player.explodeLength = 1;
	// 	player.amountBombsAllowed = 1;
	// 	player.died = true;

	// 	setTimeout(function() {
	// 		player.gridX = 1;
	// 		player.gridY = 1;
	// 		player.x = 70;
	// 		player.y = 70;
	// 		player.hp = player.hpMax;
	// 		player.died = false;
	// 	}, 2000);
	// }


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
	self.fuse = 2000;
	self.explode = false;
	self.explodeLength = param.explodeLength;
	self.parent = param.parent;


	self.gridX = Math.floor(self.x / TILE_SIZE);
	self.gridY = Math.floor(self.y / TILE_SIZE);

	array2D[self.gridY][self.gridX] = 1;




	self.explodeFunc = setTimeout(function() { 
		self.toRemove = true;
		delete self.parent.bombs[self];
		destroy(
					self.x,
					self.y,
					self.explodeLength
					);
		array2D[self.gridY][self.gridX] = 0;
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

var initPack = {player:[], bomb:[], explotion:[],serverArray:array2D, tile:[], powerUp:[], enemy:[]};
var removePack = {player:[], bomb:[], explotion:[], tile:[], powerUp:[]};

function initMap() {
	for (var i = 0; i < array2D[0].length; i++) {
		for (var j = 0; j < array2D.length; j++) {
			if (array2D[i][j] === 1) {
				Tile({gridX:j, gridY:i, type:1,});
			} else if(array2D[i][j] === 2){
				Tile({gridX:j, gridY:i, type:2,});
			} else if(array2D[i][j] === 10){
				Tile({gridX:j, gridY:i, type:10,});
			} else if(array2D[i][j] === 11) {
				Tile({gridX:j, gridY:i, type:10,});				
			} 

			
		}
	}
}

initMap();

				Enemy({gridX:10, gridY:7});
				Enemy({gridX:7, gridY:7});
				Enemy({gridX:4, gridY:5});
				Enemy({gridX:4, gridY:3});


setInterval(function(){
	var pack = {
		player:Player.update(),
		bomb:Bomb.update(),
		explotion:Explotion.update(),
		tile:Tile.getAllInitPack(),
		enemy:Enemy.update(),
	}


	
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('init',initPack);
		socket.emit('update',pack);
		socket.emit('remove',removePack);
	}
	initPack.player = [];
	initPack.bomb = [];
	initPack.explotion = [];
	initPack.tile = [];
	initPack.powerUp = [];
	initPack.enemy = [];

	removePack.player = [];
	removePack.bomb = [];
	removePack.explotion = [];
	removePack.tile = [];
	removePack.powerUp = [];
	
},1000/25);










