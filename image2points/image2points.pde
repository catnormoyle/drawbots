import java.util.*;

PImage img = null;
List<PVector> points = new ArrayList<PVector>();
float lastTime = 0;

void setup()
{  
  
  size(400, 400, P3D); // width and height should match image!
  img = loadImage("stars.png");
  img.resize(width, height);

  lastTime = millis();
  
  frameRate(30);
  strokeWeight(1);
  //noStroke();
  background(255);
  stroke(255,0,255,100);
  
  float spread = 25;
  for (int i = 0; i < img.height; i++)
  {
    for (int j = 0; j < img.width; j++)
    {
      color c = img.get(i, j);
      int a = (c >> 24) & 0xFF;
      int r = (c >> 16) & 0xFF;  
      int g = (c >> 8) & 0xFF;   
      int b = c & 0xFF; 
      
      if (r != 255 || g != 255 || b != 255)
      {
        points.add(new PVector(i, j, spread*(2*noise(i*img.width+j)-1)));
      }      
    }
  }
  print(points.size());
  ortho();
}

void draw()
{
  background(255);
  
  float turnSpeed = 45; // degrees per second
  float theta = millis() * PI/180.0 * turnSpeed/1000.0;
  float radius = (height/2.0) / tan(PI*30.0 / 180.0);
  
  beginCamera();
  camera(radius*cos(theta)+width/2, height/2, radius*sin(theta), width/2, height/2, 0, 0, 1, 0);
  beginShape(POINTS);
  for (int i = 0; i < points.size(); i++)
  {
    PVector pt = (PVector) points.get(i);
    vertex(pt.x, pt.y, pt.z);
  } 
  endShape();
  endCamera();
}