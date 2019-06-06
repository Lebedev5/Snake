const canvas = document.getElementById('canvas') || document.querySelector('canvas'),
	  ctx = canvas.getContext('2d');

canvas.setAttribute("width", getComputedStyle(canvas).width);
canvas.setAttribute("height", getComputedStyle(canvas).width);

const mainWidth = parseInt(canvas.getAttribute("width"));


function GameObject(x, y, width, course, color, arr){
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 25;
	this.course = course || 1;
	this.toDraw = function (){
		this.color = color || "green";
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.width);
		ctx.strokeRect(this.x, this.y, this.width, this.width);
		ctx.strokeRect(this.x, this.y, this.width, this.width);
	}
	if (Array.isArray(arr)){
		arr.push(this);
	}
}

function Snake(count, width, color){
	if (count){


		this.chunks = [];

		for (let i = 0; i < count; ++i){
			this.chunks.push(new GameObject(null, null, width, 1, color));
			if (i == 0){
				color = null;
				this.chunks[i].x = Math.floor(Math.random() * (mainWidth - this.chunks[i].width * (this.chunks.length * 2)) 
							/ this.chunks[i].width) * this.chunks[i].width + this.chunks[i].width * (this.chunks.length * 2);
				this.chunks[i].y = Math.floor(Math.random() * (mainWidth - this.chunks[i].width) 
							/ this.chunks[i].width) * this.chunks[i].width + this.chunks[i].width;
			} else {
				this.chunks[i].x = this.chunks[i - 1].x - 25;
				this.chunks[i].y = this.chunks[i - 1].y;
			}
		};


		this.toSync = function(){
			for (let i = this.chunks.length - 1; i > 0; --i){
				this.chunks[i].course = this.chunks[i - 1].course;
			}
		};


		this.toForce = function(){
			for (let i = 0; i < this.chunks.length; ++i){
				switch (this.chunks[i].course){
					case 0: if (this.chunks[i].y <= 0)
								this.chunks[i].y = mainWidth - this.chunks[i].width;
							else
								this.chunks[i].y -= this.chunks[i].width;
							break;
					case 1: if (this.chunks[i].x >= mainWidth - this.chunks[i].width)
								this.chunks[i].x = 0;
							else
								this.chunks[i].x += this.chunks[i].width;
							break;
					case 2: if (this.chunks[i].y >= mainWidth - this.chunks[i].width)
								this.chunks[i].y = 0;
							else
								this.chunks[i].y += this.chunks[i].width;
							break;
					case 3: if (this.chunks[i].x <= 0)
								this.chunks[i].x = mainWidth - this.chunks[i].width;
							else
								this.chunks[i].x -= this.chunks[i].width;
							break;
				}
			}
		}

		this.isCrash = function(){
			for (let i = 1; i < this.chunks.length; ++i){
				if (this.chunks[0].x == this.chunks[i].x && this.chunks[0].y == this.chunks[i].y)
					return true;
			}
			return false;
		}

		this.addChunk = function(){
			let dir = {x: 0, y: 0},
				lastChunk = this.chunks[this.chunks.length - 1];
			switch (lastChunk.course){
				case 0: dir.x = lastChunk.x;
						dir.y = lastChunk.y + lastChunk.width;
						break;
				case 1: dir.x = lastChunk.x - lastChunk.width;
						dir.y = lastChunk.y;
						break;
				case 2: dir.x = lastChunk.x;
						dir.y = lastChunk.y - lastChunk.width;
						break;
				case 3: dir.x = lastChunk.x + lastChunk.width;
						dir.y = lastChunk.y;
						break;
			}
			this.chunks.push(new GameObject(dir.x, dir.y, lastChunk.width, lastChunk.course));
		}

	}
}

function randomPlace(obj, chunks){
	let succesfull = false,
		result = {};
	while (!succesfull){
		succesfull = true;
		result.x = Math.floor(Math.random() * (mainWidth - obj.width) / obj.width) * obj.width + obj.width;
		result.y = Math.floor(Math.random() * (mainWidth - obj.width) / obj.width) * obj.width + obj.width;
		for (let i = 0; i < chunks.length; ++i)
			if (chunks[i].x == result.x && chunks[i].y == result.y)
				succesfull = false;
	}
	obj.x = result.x;
	obj.y = result.y;
}