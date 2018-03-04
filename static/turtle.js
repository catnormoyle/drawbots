
var LEFT = 0;
var RIGHT = 1;
var FWD = 2;
var BCK = 3;
var STOP = 4;

class Turtle {

  constructor() {
    this.x = 0;
    this.y = 0;
    this.startx = 0;
    this.starty = 0;
    this.theta = 0;
    this.turnRate = 10 * Math.PI/ 180.0;
    this.moveRate = 25; // conversion between IRL and canvas units
  }

  setStartPosition(startx, starty) {
    this.startx = startx;
    this.starty = starty;
  }

  init() {
    this.x = this.startx;
    this.y = this.starty;
    this.theta = 0;
  }

  move(cmd) {
    switch (cmd.dir) {
      case FWD: this.forward(cmd.speed); break;
      case BCK: this.backward(cmd.speed); break;
      case STOP: this.stop(cmd.speed); break;
      case LEFT: this.left(cmd.speed); break;
      case RIGHT: this.right(cmd.speed); break;
    }
  }

  tip() {
    var dir = this.direction();
    var x = this.x + 10 * dir.x;
    var y = this.y + 10 * dir.y;
    return {x:x, y:y};
  }

  direction() {
    var x = -Math.sin(this.theta);
    var y =  Math.cos(this.theta);
    return {x:x, y:y};
  }

  forward(speed) {
    var dir = this.direction();
    var r = speed * this.moveRate;
    this.x += r * dir.x;
    this.y += r * dir.y;
  }

  backward(speed) {
    var dir = this.direction();
    var r = -speed * this.moveRate;
    this.x += r * dir.x;
    this.y += r * dir.y;
  }

  stop(speed) {
  }

  left(speed) {
    this.theta += this.turnRate;
  }

  right(speed) {
    this.theta -= this.turnRate;
  }

  draw() {
    //console.log(this.x+" "+this.y);
    push();
    fill(255,0,0);
    translate(this.x, this.y);
    rotate(this.theta);
    triangle(-5, -5, 0, 10, 5, -5);
    pop();
  }
}

