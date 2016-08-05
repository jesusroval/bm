
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
	var array2D = [];
	var testID;
	var bombArray = [];
	var oldX;
	var oldY;
	var aPlayer = false;

	var explotionOffSetX = 24; 
	var explotionOffSetY = 28;
	//sign
	var signDiv = document.getElementById('signDiv');
	// var signDivUsername = document.getElementById('signDiv-username');
	var signDivSignIn = document.getElementById('signDiv-signIn');
	// var signDivSignUp = document.getElementById('signDiv-signUp');
	// var signDivPassword = document.getElementById('signDiv-password');
	
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



	signDivSignIn.onclick = function(){
		socket.emit('signIn');
	}
	// signDivSignUp.onclick = function(){
	// 	socket.emit('signUp',{username:signDivUsername.value,password:signDivPassword.value});
	// }
	socket.on('signInResponse',function(data){
		if(data.success){
			signDiv.style.display = 'none';
			gameDiv.style.display = 'inline-block';
			game();
		} else
			alert("Sign in unsuccessul.");
	});
	socket.on('signUpResponse',function(data){
		if(data.success){
			alert("Sign up successul.");
		} else
			alert("Sign up unsuccessul.");
	});

	//chat
	var chatText = document.getElementById('chat-text');
	var chatInput = document.getElementById('chat-input');
	var chatForm = document.getElementById('chat-form');
	
	socket.on('addToChat',function(data){
		chatText.innerHTML += '<div>' + data + '</div>';
	});
	socket.on('evalAnswer',function(data){
	});
	
	
	// chatForm.onsubmit = function(e){
	// 	e.preventDefault();
	// 	if(chatInput.value[0] === '/')
	// 		socket.emit('evalServer',chatInput.value.slice(1));
	// 	else
	// 		socket.emit('sendMsgToServer',chatInput.value);
	// 	chatInput.value = '';		
	// }
	
	function game(){

		var renderer = new PIXI.WebGLRenderer(704, 704);
		
		document.body.appendChild(renderer.view);
		
		stage = new PIXI.Container();

		var assetsToLoader = ["/client/img/animals.json"];

		var loader = new PIXI.loaders.Loader('/client/img', 7);

		loader.load();

		animate();
// -
		// var ctx = document.getElementById("ctx").getContext("2d");
		// ctx.font = '30px Arial';
	function animate() {
		requestAnimationFrame(animate);
			if(aPlayer){
				for(var i in Player.list){
					tempPlayer = Player.list[i];
					if(tempPlayer.died === false){
						if(tempPlayer.serverX !== tempPlayer.obj.x){
							var diff = tempPlayer.serverX - tempPlayer.obj.x;
							tempPlayer.obj.x += diff/5;
						}
						if(tempPlayer.serverY !== tempPlayer.obj.y){
							var diff = tempPlayer.serverY - tempPlayer.obj.y;
							tempPlayer.obj.y += diff/5;
						}
					} else{
						tempPlayer.obj.x = tempPlayer.serverX;
						tempPlayer.obj.y = tempPlayer.serverY;
					}							
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

			self.serverX = initPack.x;
			self.serverY = initPack.y;
			// self.nowX;
			// self.nowY;


			if(selfId === null){selfId = self.id};

// here
			self.obj = new PIXI.Sprite.fromImage('/client/img/player.png');
			self.obj.scale.x = 2;
			self.obj.scale.y = 2;
			self.obj.x = initPack.x;
			self.obj.y = initPack.y;
			stage.addChild(self.obj);

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
				self.obj = new PIXI.Sprite.fromImage('/client/img/upfire.png');
				self.obj.position.x = (initPack.gridX * TILE_SIZE) + 16;
				self.obj.position.y = (initPack.gridY * TILE_SIZE) + 16;
				stage.addChild(self.obj);				
			} else if(self.type === 'amountUp'){
				self.obj = new PIXI.Sprite.fromImage('/client/img/bombup.png');
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
			self.obj.x = initPack.x + 10;
			self.obj.y = initPack.y + 20;
			stage.addChild(self.obj);

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
		
		var selfId = null;

		socket.on('init',function(data){
			
			// if(data.tile.length > 0 && !map){
			// 	for (var i = 0; i < data.tile.length; i++) {
			// 		new Tile(data.tile[i]);
			// 	}
			// 	map = true;
			// 	console.log(data.tile.length +  ' tile init');		
			// }

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
				for(var i = 0 ; i < data.player.length; i++){
					charArray.push(new Player(data.player[i]));
				}
				for(var i = 0 ; i < data.bullet.length; i++){
					new Bullet(data.bullet[i]);
				}
			}

		});
		socket.on('bombTest', function(data){
			console.log(data);
		});

		socket.on('update',function(data){
			console.log('server update');
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
						p.serverX = pack.x;
					}
					if(pack.y !== undefined)
						// p.obj.y = pack.y;
						p.serverY = pack.y;			
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

				stage.removeChild(b.obj);
				delete Bomb.list[data.bomb[i]];

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
					stage.removeChild(pU.obj);
					delete PowerUp.list[data.powerUp[i]];
				}

			}			
		});
		
		var drawMap = function(){
			// var player = Player.list[selfId];
			// var x = WIDTH/2 - player.x;
			// var y = HEIGHT/2 - player.y;
			// ctx.drawImage(Img.map['field'],0,0);
		}
		
		var drawScore = function(){
			// ctx.fillStyle = 'black';
			// ctx.fillText(Player.list[selfId].score,0,30);
		}
		
		document.onkeydown = function(event){
			if(event.keyCode === 68)	//d
				socket.emit('keyPress',{inputId:'right',state:true});
			else if(event.keyCode === 83)	//s
				socket.emit('keyPress',{inputId:'down',state:true});
			else if(event.keyCode === 65) //a
				socket.emit('keyPress',{inputId:'left',state:true});
			else if(event.keyCode === 87) // w
				socket.emit('keyPress',{inputId:'up',state:true});


				
		}
		document.onkeyup = function(event){
			// if(event.keyCode === 68)	//d
			// 	socket.emit('keyPress',{inputId:'right',state:false});
			// else if(event.keyCode === 83)	//s
			// 	socket.emit('keyPress',{inputId:'down',state:false});
			// else if(event.keyCode === 65) //a
			// 	socket.emit('keyPress',{inputId:'left',state:false});
			// else if(event.keyCode === 87) // w
			// 	socket.emit('keyPress',{inputId:'up',state:false});
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