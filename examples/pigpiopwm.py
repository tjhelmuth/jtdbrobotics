import pigpio

MOTOR_PIN = 12

# at 200hz, each wave is 5ms. Our servo (micro servo 9g) has a valid range of 1-2ms
# this means a duty cycle of 20% to 40%


pi = pigpio.pi()
pi.set_PWM_frequency(MOTOR_PIN, 200)
pi.set_PWM_range(MOTOR_PIN, 100)
pi.set_PWM_dutycycle(MOTOR_PIN, 20)

