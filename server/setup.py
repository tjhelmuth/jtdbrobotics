import logging
import yaml
from motor import Config as MotorConfig
from motor import Motor



def setup_motors(pigpio):
    with open("./config/brobot.yaml", "r") as stream:
        try:
            motors = yaml.safe_load(stream)

            resolved_motors = []
            for motor_name in motors:
                data = motors[motor_name]

                if data['pin'] is None:
                    logging.warn("Skipping motor {} as no pin specified".format(motor_name))
                    continue

                config = MotorConfig(data['freq'], data['min_time'], data['max_time'], data['min_angle'], data['max_angle'])
                motor = Motor(pigpio, motor_name, data['pin'], config)
                resolved_motors.append(motor)

            return resolved_motors

        except yaml.YAMLError as exc:
            print(exc)