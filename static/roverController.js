
function goForward() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/forward?speed=" + speed});
} 

function goBackward() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/backward?speed=" + speed});	 	 
}   

function goStop() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/stop?speed=" + speed});	 	 	 
}  	   

function goLeft() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/left?speed=" + speed});	 	 	 
}  

function goRight() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/right?speed=" + speed});	 	 	 
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
  var simCanvas = createCanvas(600,400);
  simCanvas.parent('simContainer');
}

function draw() {
  background(0);
  fill(255, 0, 0);
  ellipse(0,0, 100, 100);
}

