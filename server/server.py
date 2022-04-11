import pigpio
from motor import Motor
from motor import Config as MotorConfig
import util
import time
import yaml

import eventlet
import socketio

import setup

pi = pigpio.pi()

config = MotorConfig(200, 1, 2, 0, 90)

motors = setup.setup_motors(pi)

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

def sendMotors():
    json = list(map(lambda m: m.toJson(), motors))
    sio.emit('get-motors', json)

@sio.event
def connect(sid, environ):
    print("Connected")
    sendMotors()

@sio.event
def angle(sid, data):
    motorName = data['name']
    angle = data['angle']
    motor = next(m for m in motors if m.name == motorName)
    motor.setAngle(angle)

@sio.on('add-motor')
def addMotor(sid, data):
    motors.append(Motor(pi, data['name'], data['pin'], config))
    sendMotors()


if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 8765)), app)