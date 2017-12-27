import serial

hasPI = False
try:
  import RPi.GPIO as GPIO
  sys.path.append(r'/home/pi')
  hasPI = true
except:
  pass

class Rover:

  def __init__(self, sleepTime = 0.5):
    self.sleep = sleepTime

  def forward(self):
    print "Calling forward"
    if hasPI:
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(19, GPIO.OUT)
      GPIO.setup(20, GPIO.OUT)
      GPIO.output(19, GPIO.HIGH)
      GPIO.output(20, GPIO.HIGH)
      time.sleep(float(self.sleep))
      GPIO.output(19, GPIO.LOW)
      GPIO.output(20, GPIO.LOW)

  def backward(self):
    print 'Calling backward!' 
    if hasPI:
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(26, GPIO.OUT)
      GPIO.setup(21, GPIO.OUT)
      GPIO.output(26, GPIO.HIGH)
      GPIO.output(21, GPIO.HIGH)
      time.sleep(float(self.sleep))
      GPIO.output(26, GPIO.LOW)
      GPIO.output(21, GPIO.LOW)

  def right(self):
    print 'Calling right!'
    if hasPI:
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(20, GPIO.OUT)
      GPIO.setup(26, GPIO.OUT)
      GPIO.output(20, GPIO.HIGH)
      GPIO.output(26, GPIO.HIGH)
      time.sleep(float(self.sleep))
      GPIO.output(20, GPIO.LOW)
      GPIO.output(26, GPIO.LOW)


  def left(self):
    print 'Calling left!'
    if hasPI:
      GPIO.setmode(GPIO.BCM)
      GPIO.setup(19, GPIO.OUT)
      GPIO.setup(21, GPIO.OUT)
      GPIO.output(19, GPIO.HIGH)
      GPIO.output(21, GPIO.HIGH)
      time.sleep(float(self.sleep))
      GPIO.output(19, GPIO.LOW)
      GPIO.output(21, GPIO.LOW)

  def stop(self):
    print 'Calling stop!'
    if hasPI:
      GPIO.output(20, GPIO.LOW)
      GPIO.output(26, GPIO.LOW)
      GPIO.output(19, GPIO.LOW)
      GPIO.output(21, GPIO.LOW)

