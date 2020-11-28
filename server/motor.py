import util
import json

PWM_RANGE = 100

class Motor:
    dutyCycle = -1

    def __init__(self, pi, name, pin, config):
        self.pi = pi
        self.name = name
        self.pin = pin
        self.config = config

        self.__configure()

    def setAngle(self, angle):
        cycleMs = self.__convertAngleToCycleTime(angle)
        self.__setDutyTime(cycleMs)

    def getAngle(self):
        return self.__convertDutyCycleToAngle(self.dutyCycle)

    def __configure(self):
        """  Set the initial PWM values """
        pi = self.pi
        pi.set_PWM_range(self.pin, PWM_RANGE)
        pi.set_PWM_frequency(self.pin, self.config.freq)
        self.__setDutyTime(self.config.minTime)

    def __setDutyTime(self, time):
        self.dutyCycle = self.__convertTimeToDuty(time)
        self.pi.set_PWM_dutycycle(self.pin, self.dutyCycle)

    def __convertTimeToDuty(self, time):
        freq = self.config.freq
        # if 200hz freq, cycle is 5ms
        cycleMs = 1000 / freq

        if time > cycleMs:
            return PWM_RANGE            
        if time < 0:
            return 0
    
        return (time / cycleMs) * PWM_RANGE

    def __convertDutyToTime(self, duty):
        freq = self.config.freq
        # if 200hz freq, cycle is 5ms
        cycleMs = 1000 / freq

        percentage = duty / PWM_RANGE
        dutyMs = percentage * cycleMs
        return dutyMs

    def __convertAngleToCycleTime(self, angle):
        return util.remap_range(angle, self.config.minAngle, self.config.maxAngle, self.config.minTime, self.config.maxTime)

    def __convertDutyCycleToAngle(self, dutyCycle):
        dutyTime = self.__convertDutyToTime(dutyCycle)
        return util.remap_range(dutyTime,  self.config.minTime, self.config.maxTime, self.config.minAngle, self.config.maxAngle)

    def toJson(self):
        dict = {
            'name': self.name,
            'pin': self.pin,
            'angle': self.getAngle()
        };

        return dict;




class Config:
    def __init__(self, freq, minTime, maxTime, minAngle, maxAngle):
        self.freq = freq
        self.minTime = minTime
        self.maxTime = maxTime
        self.minAngle = minAngle
        self.maxAngle = maxAngle
