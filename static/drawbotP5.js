
function init() {
  controller.init();
}

function setup() {
  var simCanvas = createCanvas(600, 400);
  simCanvas.parent('simContainer');
  controller.setup(width * 0.5, height * 0.5);
}

function mouseDragged() {
  var canvasParent = document.getElementById('simContainer');
  if (mouseX >= 0 && mouseX <= canvasParent.clientWidth && 
      mouseY >= 0 && mouseY <= canvasParent.clientHeight)
  {
    controller.mouseDragged(mouseX, mouseY);
  }
}

function mousePressed() {
  var canvasParent = document.getElementById('simContainer');
  if (mouseX >= 0 && mouseX <= canvasParent.clientWidth && 
      mouseY >= 0 && mouseY <= canvasParent.clientHeight)
  {
    controller.mousePressed(mouseX, mouseY);
  }
}

function draw() {
  background(200);
  controller.draw();
}

function goForward() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/forward?speed=" + speed});
  controller.goForward(speed);
} 

function goBackward() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/backward?speed=" + speed});	 	 
  controller.goBackward(speed);
}   

function goStop() {
  controller.goStop();
}  	   

function goLeft() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/left?speed=" + speed});	 	 	 
  controller.goLeft(speed);
}  

function goRight() {
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/right?speed=" + speed});	 	 	 
  controller.goRight(speed);
}  	



