import Motor from "./Motor";

export default class MotorState {
    angle: number;

    constructor(angle: number) {
        this.angle = Math.floor(angle);
    }

}