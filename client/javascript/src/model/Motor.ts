import MotorState from "./MotorState";

class Motor {
    name: string;
    pin: number;

    state: MotorState;

    constructor(name: string, pin: number, state?: MotorState){
        this.name = name;
        this.pin = Math.floor(pin);
        this.state = state || new MotorState(0);
    }

    atAngle(angle: number): Motor {
        return new Motor(this.name, this.pin, new MotorState(angle));
    }
}

export default Motor;