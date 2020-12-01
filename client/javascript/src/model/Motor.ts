import MotorState from "./MotorState";

interface Motor {
    name: string;
    pin: number;
    state: MotorState;
}

export const create = (motor: Motor) => {
    return {...motor, state: {...motor.state, angle: Math.floor(motor.state.angle)}};
}

export default Motor;