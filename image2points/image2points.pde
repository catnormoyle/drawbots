import java.util.*;

class Point
{
  public PVector xyz;
  public color rgba;
  public Point(PVector pt, color c)
  {
    rgba = c;
    xyz = pt;
  }
};

PImage img = null;
ArrayList<Point> points = new ArrayList<Point>();

float lastTime = 0;

void setup()
{  
  size(380,430,P3D); // width and height should match image!
  img = loadImage("Scan10004_color_380x430.png");

  lastTime = millis();
  
  frameRate(30);
  strokeWeight(1);
  //noStroke();
  background(255);
  stroke(255,0,255,100);
  
  float spread = 200;
  for (int i = 0; i < width; i++)
  {
    for (int j = 0; j < height; j++)
    {
      color c = img.get(i, j);
      int a = (c >> 24) & 0xFF;
      int r = (c >> 16) & 0xFF;  
      int g = (c >> 8) & 0xFF;   
      int b = c & 0xFF; 
      
      if (r != 255 || g != 255 || b != 255)
      {
        float z = spread*(2*noise(i*height+j)-1);
        points.add(new Point(new PVector(i, j, z), c));
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
    Point p = (Point) points.get(i);
    PVector pt = p.xyz;
    color c = p.rgba;
    stroke(c);
    vertex(pt.x, pt.y, pt.z);
  } 
  endShape();
  endCamera();
}