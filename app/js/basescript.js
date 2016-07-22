(function(){

	var heartBeats = setInterval(draw, 20);
	var movements = ["bounce", "dejavu"];
	var balls = [];

	var testball = new Ball().init();
	// draw();
		

	function Ball(id, width, height, bgcolor, posX, posY, speedX, speedY, movement){

		this.id=id || "ball" + (balls.length);
		this.width=width || Math.round(Math.random()*100 + 10);
		this.height=height || this.width;
		this.bgcolor=bgcolor || '#'+Math.floor(Math.random()*16777215).toString(16);
		this.posX=posX || 20;
		this.posY=posY || 20;
		this.speedX=speedX || Math.random()*9 + 1;
		this.speedY=speedY || Math.random()*9 + 1;
		this.movement=movement || movements[Math.floor(Math.random() * movements.length)];


		this.init = function(){

			var container = document.getElementById("ball-preview");

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

			console.log(element);
		
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

	document.getElementById("randomize");




	console.log("hiya!");
})();