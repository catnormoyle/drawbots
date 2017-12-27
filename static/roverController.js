
var turtle = new Turtle(); 
var robotMoves = [];

function goForward() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/forward?speed=" + speed});
  robotMoves.push({dir:FWD,speed:speed});
} 

function goBackward() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/backward?speed=" + speed});	 	 
  robotMoves.push({dir:BCK,speed:speed});
}   

function goStop() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/stop?speed=" + speed});	 	 	 
  robotMoves.push({dir:STOP,speed:speed});
}  	   

function goLeft() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/left?speed=" + speed});	 	 	 
  robotMoves.push({dir:LEFT,speed:speed});
}  

function goRight() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/right?speed=" + speed});	 	 	 
  robotMoves.push({dir:RIGHT,speed:speed});
}  	
   
function init() {
  $(document).keydown(function(e) {
    switch(e.which) {
       case 37: // left
         goLeft();	
         break;
       case 38: // up
         goForward();
         break;
       case 39: // right
         goRight();	
         break;
       case 40: // down
         goBackward();
         break;
       default: return; // exit this handler for other keys
   }
   e.preventDefault(); // prevent the default action (scroll / move caret)
  }); 
}

function setup() {
  var simCanvas = createCanvas(600, 400);
  simCanvas.parent('simContainer');
  turtle.setStartPosition(width * 0.5, height * 0.5);
}

function mousePressed() {
  turtle.setStartPosition(mouseX, mouseY);
}

function draw() {
  background(200);
  fill(50, 50, 50);

  turtle.init();
  var lastx = turtle.x;
  var lasty = turtle.y;

  robotMoves.forEach(function (ele) {
    turtle.move(ele);
    line(lastx, lasty, turtle.x, turtle.y);
    lastx = turtle.x;
    lasty = turtle.y;
  });
  turtle.draw();
}

