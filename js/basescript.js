(function(){

	var heartBeats = setInterval(draw, 20);
	var movements = ["bounce", "dejavu"];
	var balls = [];


	var testball = new Ball("test-ball");
	testball.init();

	var inputWidth = document.getElementById("ball-width");
	var inputHeight = document.getElementById("ball-height");
	var inputSpeedX = document.getElementById("ball-speedx");
	var inputSpeedY = document.getElementById("ball-speedy");	
	var inputColor = document.getElementById("ball-color");	

	setForm();


	// draw();


	function Ball(id, width, height, bgcolor, posX, posY, speedX, speedY, movement){

		this.id=id || "ball" + (balls.length);
		this.width=width || Math.round(Math.random()*100 + 10);
		this.height=height || this.width;
		this.bgcolor=bgcolor || '#'+Math.floor(Math.random()*16777215).toString(16);
		this.posX=posX || 20;
		this.posY=posY || 20;
		this.speedX=speedX || Math.round(Math.random()*10 );
		this.speedY=speedY || Math.round(Math.random()*10 ) - 5;
		// this.movement=movement || movements[Math.floor(Math.random() * movements.length)];
		this.movement="bounce";


		this.init = function(){

			var container = document.getElementById("ball-preview");
			var form = document.forms["panel"];

			

			

			var element = document.createElement("div");	
			element.setAttribute("class", "ball");
			element.setAttribute("id", this.id);

			element.style.width=this.width + "px";	
			element.style.height=this.height + "px";	
			element.style.backgroundColor=this.bgcolor;	
			element.style.borderRadius="100%";	
			element.style.left="50%";	
			element.style.top="50%";
			element.style.marginTop="-" + (this.height/2) + "px";
			element.style.marginLeft="-" + (this.width/2) + "px";
			
			element.style.position="absolute";




			container.appendChild(element);

			

		}	

		this.launch = function(){

			this.posX = 0;
			this.posY = 0;

			balls.push(this);

		}



		this.move = function(){

			var container = document.getElementById(this.id).parentElement;
			var containerW = container.offsetWidth;
			var containerH = container.offsetHeight;


			switch(this.movement){

				case "dejavu" :

				this.posX = (this.posX + this.speedX) % containerW;
				this.posY = (this.posY + this.speedY) % containerH;



				break;

				case "bounce" :

				this.posX +=this.speedX;
				this.posY +=this.speedY;


				if (this.posX + this.width > containerW || this.posX < 0){
					this.speedX*=-1;
				}


				if (this.posY + this.width > containerH || this.posY < 0){
					this.speedY*=-1;
					

				}
				break;

				default:
				this.posX = (posX + this.speedX) % containerW;
				this.posY = (posY + this.speedY) % containerH;
				break;

			}



		}	

		this.updateId = function(newId){

			this.id = newId;

			console.log("newId : " + newId);

		}

		this.updateWidth = function(newWidth){
			this.width = newWidth;
			document.getElementById(this.id).style.width = newWidth + "px";
			document.getElementById(this.id).style.marginLeft = ((newWidth * -1) / 2) + "px";
			console.log(testball);

			this.height = newWidth;
			document.getElementById(this.id).style.height = newWidth + "px";
			document.getElementById(this.id).style.marginTop =  ((newWidth * -1) / 2) + "px";

			setForm();
		}

		this.updateHeight = function(newHeight){
			this.height = newHeight;
			document.getElementById(this.id).style.height = newHeight +"px";
			document.getElementById(this.id).style.marginTop = ((newHeight * -1) / 2) + "px" ;


			console.log(testball);

			this.width = newHeight;
			document.getElementById(this.id).style.width = newHeight + "px";
			document.getElementById(this.id).style.marginLeft = ((newHeight * -1) / 2) + "px" ;


			setForm();



		}


		this.updateSpeedX = function(newSpeedX){
			this.speedX = newSpeedX;


		}


		this.updateSpeedY = function(newSpeedY){
			this.speedY = newSpeedY;


		}

		this.updateBgColor = function(newBgColor){
			this.bgcolor = newBgColor;
			document.getElementById(this.id).style.backgroundColor = newBgColor;
			

		}

		this.updatePosX = function(newPosX){
			this.posX = newPosX;
			document.getElementById(this.id).style.left = newPosX;


		}

		this.updatePosY = function(newPosY){
			this.posY = newPosY;

			document.getElementById(this.id).style.top = newPosY;


		}





	}

	function draw(){

		balls.forEach(function(elem, index){

			elem.move();

			document.getElementById(elem.id).style.width=elem.width;	
			document.getElementById(elem.id).style.height=elem.height;	
			document.getElementById(elem.id).style.backgroundColor=elem.bgcolor;	
			document.getElementById(elem.id).style.backgroundColor=elem.bgcolor;	
			document.getElementById(elem.id).style.left=elem.posX +"px";	
			document.getElementById(elem.id).style.top=elem.posY +"px";	


		});
		
	}


	function randomize(){
		if(document.getElementById("test-ball") !== undefined){
			document.getElementById("test-ball").remove();
		}
		testball = new Ball("test-ball");
		testball.init();

		setForm();
	}


	function launch(){

		var pipe = document.getElementById("pipe");
		

		var newBall = document.createElement("div");
		newBall.setAttribute("id", "ball" + (balls.length));
		newBall.setAttribute("class", "ball");
		newBall.style.width = testball.width + "px";
		newBall.style.height = testball.height + "px";
		newBall.style.left = 200;
		newBall.style.top = pipe.style.height - testball.height/2;
		
		newBall.style.backgroundColor = testball.bgcolor;
		newBall.style.borderRadius = "100%";
		newBall.style.position = "absolute";

		


		
		document.body.appendChild(newBall);
		


		testball.updateId("ball" + (balls.length));
		testball.updatePosX(200);
		testball.updatePosY((window.innerHeight / 2) - (testball.height / 2));

		balls.push(testball);


		randomize();
	}

	function setForm(){

		inputWidth.value = testball.width;
		inputHeight.value = testball.height;
		inputSpeedX.value = testball.speedX;
		inputSpeedY.value = testball.speedY;
		inputColor.value = testball.bgcolor;



	}





	document.getElementById("randomize").addEventListener("click", randomize);
	document.getElementById("launch").addEventListener("click", launch);

	inputColor.addEventListener("change", testball.updateBgColor(inputColor.value));





	inputWidth.addEventListener("change", function(){testball.updateWidth(parseInt(this.value))});
	inputHeight.addEventListener("change", function(){testball.updateHeight(parseInt(this.value))});
	inputSpeedX.addEventListener("change", function(){testball.updateSpeedX(parseInt(this.value))});
	inputSpeedY.addEventListener("change", function(){testball.updateSpeedY(parseInt(this.value))});
	inputColor.addEventListener("change", function(){testball.updateBgColor(this.value)});







})();