function signedMod(a, n) 
{
   return a - Math.floor(a/n) * n;
}

class DrawbotFollowController extends DrawbotController
{
  constructor() {
    super();

    this.target = this.turtle.tip();
    this.pos = this.turtle.tip();
    this.vel = {x:0, y:0};
    this.veld = {x:0, y:0};
    this.THETA = 0;
    this.VEL = 1;
    this.THETADOT = 2;
    this.state = [0.,0.,0.];
    this.deriv = [0.,0.,0.];
    this.maxTorque = 40.0;
    this.maxForce = 1000.0;
    this.maxSpeed = 300.0;
    this.arrivalDistance = 100;
    this.dt = 0.01;
    this.velKv = 5;
    this.oriKp = 100;
    this.oriKv = 20;
    this.m = 1;
    this.I = 1;
  }

  seek(pos, target) {
    let vd = {x: target.x-pos.x, y: target.y-pos.y};
    let mag = Math.sqrt(vd.x*vd.x + vd.y*vd.y);
    if (mag < 0.000001) {
      return vd;
    }
    let speed = this.maxSpeed;
    if (mag < this.arrivalDistance) {
      var a = (mag/this.arrivalDistance); // slowdown
      speed = this.maxSpeed * a * a * a;
    }
    vd.x = vd.x * (speed/mag);
    vd.y = vd.y * (speed/mag);
    return vd;
  }

  init() {
  }

  update() {
    // compute vd
    var vd = this.seek(this.pos, this.target);
    var thetad = Math.atan2(vd.y, vd.x);
    var vdspeed = Math.sqrt(vd.x*vd.x + vd.y*vd.y);

    // compute control laws
    // compute smallest angle between thetad and current theta
    var angleDiff = signedMod((thetad - this.state[this.THETA] + Math.PI), Math.PI * 2.0) - Math.PI;
 
    var f = this.m * this.velKv * (vdspeed - this.state[this.VEL]);
    var t = this.I * (this.oriKp * (angleDiff) - this.oriKv * (this.state[this.THETADOT]));

    //f = Math.min(maxForce, Math.max(-maxForce, f));
    t = Math.min(this.maxTorque, Math.max(-this.maxTorque, t));

    // compute derivatives and perform Euler step
    this.deriv[this.THETA] = this.state[this.THETADOT];
    this.deriv[this.VEL] = f/this.m;
    this.deriv[this.THETADOT] = t/this.I;

    for (var i = 0; i < this.state.length; i++) {
      this.state[i] += this.deriv[i] * this.dt;
    }

    // convert local values to global values
    this.vel.x = Math.cos(this.state[this.THETA]) * this.state[this.VEL];
    this.vel.y = Math.sin(this.state[this.THETA]) * this.state[this.VEL];

    this.pos.x = this.pos.x + this.vel.x * this.dt;
    this.pos.y = this.pos.y + this.vel.y * this.dt;

    this.veld = vd; 
    //console.log(state)
  }

  mouseDragged(mouseX, mouseY) {
    this.target = {x:mouseX, y:mouseY};
  }

  mousePressed(mouseX, mouseY) {
  }

  draw() {
    this.update();

    fill(255,0,0);
    noStroke();
    //ellipse(this.target.x, this.target.y, 15, 15);

    fill(0,0,255);
    ellipse(this.pos.x, this.pos.y, 25, 25); 
    stroke(0,0,0);
    line(this.pos.x, this.pos.y, this.pos.x+this.vel.x, this.pos.y+this.vel.y);
    stroke(0,255,0);
    line(this.pos.x, this.pos.y, this.pos.x+this.veld.x, this.pos.y+this.veld.y);

    console.log(this.pos);

    super.draw();
  }
}

var controller = new DrawbotFollowController();
