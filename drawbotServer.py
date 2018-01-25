from flask import Flask, render_template, request, jsonify
import datetime
import sys
import time
import serial
from drawbot import *

sys.path.append(r'/home/pi')

app = Flask(__name__, template_folder='templates')
drawbot = Drawbot(0.5)

@app.route("/")
def hello():
   now = datetime.datetime.now()
   timeString = now.strftime("%Y-%m-%d %H:%M")
   templateData = {
      'title' : 'Drawbots',
      'time': timeString
      }
   return render_template('main.html', **templateData)
  
@app.route("/cam")
def cam():
   now = datetime.datetime.now()
   timeString = now.strftime("%Y-%m-%d %H:%M")
   templateData = {
      'title' : 'Rover 5',
      'time': timeString
      }
   return render_template('camtest.html', **templateData)
 
@app.route('/test/')
def vid():
   drawbot.streamCamera()
  
@app.route("/forward/")
def forward():
  speed = request.args.get('speed', None)
  drawbot.forward(speed)
  return 'Click.'
  
@app.route("/backward/") 
def backward(): 
  speed = request.args.get('speed', None)
  drawbot.backward(speed)
  return 'Click.'

@app.route("/right/")
def right():
  speed = request.args.get('speed', None)
  drawbot.right(speed)
  return 'Click.'

@app.route("/left/")
def left():
  speed = request.args.get('speed', None)
  drawbot.left(speed)
  return 'Click.'
  
@app.route("/stop/")
def stop():
  drawbot.stop()
  return 'Click.'

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=80, debug=True)

