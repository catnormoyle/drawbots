from flask import Flask, render_template, request, jsonify
import datetime
import sys
import time
import serial
import RPi.GPIO as GPIO
sys.path.append(r'/home/pi')

app = Flask(__name__)
print("Grabbing AMA0")
ser = serial.Serial(port = "/dev/ttyAMA0", baudrate=57600)
ser.open()

sleep = .5

@app.route("/")
def hello():
   now = datetime.datetime.now()
   timeString = now.strftime("%Y-%m-%d %H:%M")
   templateData = {
      'title' : 'Rover 5',
      'time': timeString
      }
   return render_template('main.html', **templateData)
 
  
@app.route("/forward/")
def forward():
  print 'Calling forward!'
  GPIO.setmode(GPIO.BCM)
  GPIO.setup(19, GPIO.OUT)
  GPIO.setup(20, GPIO.OUT)
  GPIO.output(19, GPIO.HIGH)
  GPIO.output(20, GPIO.HIGH)
  time.sleep(float(sleep))
  GPIO.output(19, GPIO.LOW)
  GPIO.output(20, GPIO.LOW)
  return 'Click.'
  
  
@app.route("/backward/") 
def backward(): 
  print 'Calling backward!' 
  GPIO.setmode(GPIO.BCM)
  GPIO.setup(26, GPIO.OUT)
  GPIO.setup(21, GPIO.OUT)
  GPIO.output(26, GPIO.HIGH)
  GPIO.output(21, GPIO.HIGH)
  time.sleep(float(sleep))
  GPIO.output(26, GPIO.LOW)
  GPIO.output(21, GPIO.LOW)
  return 'Click.'


@app.route("/right/")
def right():
  print 'Calling right!'
  GPIO.setmode(GPIO.BCM)
  GPIO.setup(20, GPIO.OUT)
  GPIO.setup(26, GPIO.OUT)
  GPIO.output(20, GPIO.HIGH)
  GPIO.output(26, GPIO.HIGH)
  time.sleep(float(sleep))
  GPIO.output(20, GPIO.LOW)
  GPIO.output(26, GPIO.LOW)
  return 'Click.'

@app.route("/left/")
def left():
  print 'Calling left!'
  GPIO.setmode(GPIO.BCM)
  GPIO.setup(19, GPIO.OUT)
  GPIO.setup(21, GPIO.OUT)
  GPIO.output(19, GPIO.HIGH)
  GPIO.output(21, GPIO.HIGH)
  time.sleep(float(sleep))
  GPIO.output(19, GPIO.LOW)
  GPIO.output(21, GPIO.LOW)
  return 'Click.'
  
@app.route("/stop/")
def stop():
  print 'Calling stop!'
  GPIO.output(20, GPIO.LOW)
  GPIO.output(26, GPIO.LOW)
  GPIO.output(19, GPIO.LOW)
  GPIO.output(21, GPIO.LOW)
  return 'Click.'
  

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=80, debug=True)

