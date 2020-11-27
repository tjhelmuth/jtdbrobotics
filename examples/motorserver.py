import eventlet
import socketio

import RPi.GPIO as GPIO;

GPIO.setmode(GPIO.BCM)
GPIO.setup(12, GPIO.OUT)

def remap_range(value, left_min, left_max, right_min, right_max):
    # this remaps a value from original (left) range to new (right) range
    # Figure out how 'wide' each range is
    left_span = left_max - left_min
    right_span = right_max - right_min
 
    # Convert the left range into a 0-1 range (int)
    valueScaled = int(value - left_min) / int(left_span)
 
    # Convert the 0-1 range into a value in the right range.
    return int(right_min + (valueScaled * right_span))

sio = socketio.Server()
app = socketio.WSGIApp(sio)

#1.5ms pulse is middle? 2ms pulse is right? 1ms pulse is left?
#so valid range is between 1ms and 2ms pulse    50 hz is 1/50second
#so valid range is between 5% and 10%

try:
    pwm = GPIO.PWM(12, 50)
    pwm.start(0)
    pwm.ChangeDutyCycle(0)
    
    @sio.event
    def connect(sid, environ):
        print('connect ', sid)


    last_duty_cycle = 0

    @sio.event
    def angle(sid, data):
        global last_duty_cycle
        angle = int(data)
        if angle > 180 or angle < 1:
            return

        duty_cycle = remap_range(angle, 0, 180, 50, 100) / 10
        if abs(last_duty_cycle - duty_cycle) > 0.3:
            print("DUTY CYCLE {}".format(duty_cycle))
            pwm.ChangeDutyCycle(duty_cycle)
            last_duty_cycle = duty_cycle


    @sio.event
    def disconnect(sid):
        print('disconnect ', sid)

except Exception as e:
    print(e)
    pwm.stop()
    GPIO.cleanup()

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 8008)), app)