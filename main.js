let snake = null,
	fruit = null;


function initialize(){
	snake = new Snake(3, 25, "red");
	fruit = new GameObject(0, 0, snake.chunks[0].width, 1, "yellow");
	randomPlace(fruit, snake.chunks);
}

initialize();

function draw(){
	ctx.clearRect(0, 0, mainWidth, mainWidth);	

	fruit.toDraw();

	snake.toForce();
	if (snake.isCrash()){
		alert("You lose")
		initialize();
	} else if (snake.chunks[0].x == fruit.x && snake.chunks[0].y == fruit.y){
			snake.addChunk();
			randomPlace(fruit, snake.chunks);
		}
	snake.toSync();

	for (let i = 0; i < snake.chunks.length; ++i)
		snake.chunks[i].toDraw();
}

draw();

setInterval(draw, 160);


document.onkeydown = function(event){
	switch (event.keyCode){
		case 37: if (snake.chunks[0].course != 1){
					snake.chunks[0].course = 3;
					draw();
				 }
				 break;
		case 38: if (snake.chunks[0].course != 2){
					snake.chunks[0].course = 0;
					draw();
				 }
				 break;
		case 39: if (snake.chunks[0].course != 3){
					snake.chunks[0].course = 1;
					draw();
				 }
				 break;
		case 40: if (snake.chunks[0].course != 0){
					snake.chunks[0].course = 2;
					draw();
				 }
				 break;
	}
}
