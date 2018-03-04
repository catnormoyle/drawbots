
class DrawbotController
{
  constructor() {
    this.turtle = new Turtle(); 
    this.robotMoves = [];
  }

  setup(x, y) {
    this.turtle.setStartPosition(x, y);
  }

  mousePressed(mouseX, mouseY) {
  }

  init() {
  }

  draw() {
    fill(50, 50, 50);
    this.turtle.init();
    var last = this.turtle.tip();

    for (var i = 0; i < this.robotMoves.length; i++) {
      this.turtle.move(this.robotMoves[i]);
      var current = this.turtle.tip();
      line(last.x, last.y, current.x, current.y);
      last = current;
    }
    this.turtle.draw();
  }

  goForward(speed) {
    this.robotMoves.push({dir:FWD,speed:speed});
  } 

  goBackward(speed) {
    this.robotMoves.push({dir:BCK,speed:speed});
  }   

  goStop() {
    this.robotMoves.push({dir:STP,speed:0});
  }  	   

  goLeft(speed) {
    this.robotMoves.push({dir:LFT,speed:speed});
  }  

  goRight(speed) {
    this.robotMoves.push({dir:RGT,speed:speed});
  }  	
}   

