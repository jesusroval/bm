
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
	//sign
	var signDiv = document.getElementById('signDiv');
	var signDivUsername = document.getElementById('signDiv-username');
	var signDivSignIn = document.getElementById('signDiv-signIn');
	var signDivSignUp = document.getElementById('signDiv-signUp');
	var signDivPassword = document.getElementById('signDiv-password');
	
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
		socket.emit('signIn',{username:signDivUsername.value,password:signDivPassword.value});
	}
	signDivSignUp.onclick = function(){
		socket.emit('signUp',{username:signDivUsername.value,password:signDivPassword.value});
	}
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
		// var Img = {};
		// Img.player = new Image();
		// Img.player.src = '/client/img/player.png';
		// Img.bullet = new Image();
		// Img.bullet.src = '/client/img/bullet.png';
		
		// Img.map = {};
		// Img.map['field'] = new Image();
		// Img.map['field'].src = '/client/img/map.png';
		// Img.map['forest'] = new Image();
		// Img.map['forest'].src = '/client/img/map2.png';

		var renderer = new PIXI.WebGLRenderer(704, 704);
		
		document.body.appendChild(renderer.view);
		
		stage = new PIXI.Container();


		var assetsToLoader = ["/client/img/animals.json"];


		var loader = new PIXI.loaders.Loader('/client/img', 5);




		loader.load();

		animate();
// -










	





		// var ctx = document.getElementById("ctx").getContext("2d");
		// ctx.font = '30px Arial';
			function animate() {
				requestAnimationFrame(animate);
				if(testID){
					p = Player.list[testID];
				}
				// test.rotation += 0.01;

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

			if(selfId === null){selfId = self.id};

// here
			self.obj = new PIXI.Sprite.fromImage('/client/img/player.png');
			self.obj.scale.x = 2;
			self.obj.scale.y = 2;
			self.obj.x = 100;
			self.obj.y = 100;
			stage.addChild(self.obj);

			// var testArray = [];
			// for (var i = 0; i < 4; i++) {
			// 	var test = new PIXI.Sprite.fromImage('/client/img/Untitled.png');
			// 	testArray.push(test);
			// }

			// //left
			// testArray[0].x = self.obj.x;
			// testArray[0].y = self.obj.y;
			// //right
			// testArray[1].x = self.obj.x + 45;
			// testArray[1].y = self.obj.y;

			// //bottom left
			// testArray[2].x = self.obj.x;
			// testArray[2].y = self.obj.y + 45;

			// //bottom (top)right
			// testArray[3].x = self.obj.x + 45;
			// testArray[3].y = self.obj.y + 45;




			// for (var i = 0; i < testArray.length; i++) {
			// 	stage.addChild(testArray[i]);
			// }



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
			
			
			return self;
		}
		Player.list = {};

		var Bomb = function(initPack){
			var self = {};
			self.id = initPack.id;
			self.x = initPack.x;
			self.y = initPack.y;

			self.obj = new PIXI.Sprite.fromImage('/client/img/bomb.png');
			self.obj.x = initPack.x;
			self.obj.y = initPack.y;
			stage.addChild(self.obj);

			socket.emit('keyPress',{inputId:'bomb',state:false});

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
				
				// var x = self.x - Player.list[selfId].x + WIDTH/2;
				// var y = self.y - Player.list[selfId].y + HEIGHT/2;
				
				// ctx.drawImage(Img.bullet,
				// 	0,0,Img.bullet.width,Img.bullet.height,
				// 	self.x-width/2,self.y-height/2,width,height);
			}
			
			Bullet.list[self.id] = self;		
			return self;
		}
		Bullet.list = {};
		
		var selfId = null;

		socket.on('init',function(data){
			// if(!map){

			// 	map = new PIXI.Sprite.fromImage('/client/img/map.png');

	  //   		map.scale.x = 2;
	  //   		map.scale.y = 2;
	  //   		map.position.x = 0;
	  //   		map.position.y = 0;

			//     stage.addChild(map);
			// }
			if(data.bomb){
				for (var i = 0; i < data.bomb.length; i++) {
					new Bomb(data.bomb[i]);
				}
				
			}
			if(data.serverArray && !map){				
				array2D = data.serverArray;

				for (var i = 0; i < array2D[0].length; i++) {
					for (var j = 0; j < array2D.length; j++) {
						if (array2D[i][j] === 1) {
							var box = new PIXI.Sprite.fromImage('/client/img/grid.png');
							box.position.x = j*TILE_SIZE;
							box.position.y = i*TILE_SIZE;
							// box.scale.x=2;
							// box.scale.y=2;
							stage.addChild(box);
						} else if(array2D[i][j] === 2){
							var box = new PIXI.Sprite.fromImage('/client/img/stone.png');
							box.position.x = j*TILE_SIZE;
							box.position.y = i*TILE_SIZE;
							// box.scale.x=2;
							// box.scale.y=2;
							stage.addChild(box);
						}
					}
				}

				map = array2D;
			}


			if(data.selfId)
				selfId = data.selfId;
			//{ player : [{id:123,number:'1',x:0,y:0},{id:1,number:'2',x:0,y:0}], bullet: []}
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
			//{ player : [{id:123,x:0,y:0},{id:1,x:0,y:0}], bullet: []}

			for (var i = 0; i < data.bomb.length; i++) {
				if(data.bomb[i].explode === true){
					var pack = data.bomb[i];
					var b = Bomb.list[pack.id];

					stage.removeChild(b.obj);
				}
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
						p.obj.x = pack.x;
					}
					if(pack.y !== undefined)
						p.obj.y = pack.y;
					if(pack.hp !== undefined)
						p.hp = pack.hp;
					if(pack.score !== undefined)
						p.score = pack.score;

					// if(pack.dropBomb === true){
					// 	var bomb = new PIXI.Sprite.fromImage('/client/img/bomb.png');
					// 	bomb.x = p.obj.x + 10;
					// 	bomb.y = p.obj.y + 20;
					// 	stage.addChild(bomb);
					// 	socket.emit('keyPress',{inputId:'bomb',state:false});
					// }


				

			}
			// for(var i = 0 ; i < data.bullet.length; i++){
			// 	var pack = data.bullet[i];
			// 	var b = Bullet.list[data.bullet[i].id];
			// 	if(b){
			// 		if(pack.x !== undefined)
			// 			b.obj.x = pack.x + 8;
			// 		if(pack.y !== undefined)
			// 			b.obj.y = pack.y + 16;
			// 	}
			// }
		});
		
		socket.on('remove',function(data){
			//{player:[12323],bullet:[12323,123123]}
			for(var i = 0 ; i < data.player.length; i++){
				var p = Player.list[data.player[i]];
				stage.removeChild(p.obj);
				delete Player.list[data.player[i]];

			}
			// for(var i = 0 ; i < data.bullet.length; i++){
			// 	var b = Bullet.list[data.bullet[i]];
			// 	stage.removeChild(b.obj);
			// }
		});
		
		// setInterval(function(){
		// 	if(!selfId)
		// 		return;
		// 	ctx.clearRect(0,0,680,400);
		// 	drawMap();
		// 	drawScore();
		// 	for(var i in Player.list)
		// 		Player.list[i].draw();
		// 	for(var i in Bullet.list)
		// 		Bullet.list[i].draw();
		// },40);
		
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
			if(event.keyCode === 68)	//d
				socket.emit('keyPress',{inputId:'right',state:false});
			else if(event.keyCode === 83)	//s
				socket.emit('keyPress',{inputId:'down',state:false});
			else if(event.keyCode === 65) //a
				socket.emit('keyPress',{inputId:'left',state:false});
			else if(event.keyCode === 87) // w
				socket.emit('keyPress',{inputId:'up',state:false});
			else if(event.keyCode === 32) //space
				socket.emit('keyPress',{inputId:'bomb',state:true});
		}
		
		// document.onmousedown = function(event){
		// 	socket.emit('keyPress',{inputId:'attack',state:true});
		// }
		// document.onmouseup = function(event){
		// 	socket.emit('keyPress',{inputId:'attack',state:false});
		// }
		document.onmousemove = function(event){

			mX = renderer.plugins.interaction.mouse.global.x;
			mY = renderer.plugins.interaction.mouse.global.y;
			mousePos(mX, mY); 

			// var x = -Player.list[selfId].x + event.clientX - 8;
			// var y = -Player.list[selfId].y + event.clientY - 8;
			// var angle = Math.atan2(y,x) / Math.PI * 180;
			// socket.emit('keyPress',{inputId:'mouseAngle',state:angle});
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