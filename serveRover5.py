from flask import Flask, render_template, request, jsonify
import datetime
import sys
import time
import serial
from rover import *

app = Flask(__name__, template_folder='.')
rover = Rover(0.5)

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
  rover.forward()
  return 'Click.'
  
@app.route("/backward/") 
def backward(): 
  rover.backward()
  return 'Click.'

@app.route("/right/")
def right():
  rover.right()
  return 'Click.'

@app.route("/left/")
def left():
  rover.left()
  return 'Click.'
  
@app.route("/stop/")
def stop():
  rover.stop()
  return 'Click.'

if __name__ == "__main__":
   app.run(host='127.0.0.1', port=8080, debug=True)

