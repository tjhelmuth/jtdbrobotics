import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import Motor from "../model/Motor";
import {RootState} from "../App";

interface MotorSliceState {
    motors: Array<Motor>,
    rotation: RotationState
}

export interface MotorAnglePayload {
    motor: Motor,
    angle: number
}

interface RotateMotorPayload {
    motor: Motor,
    direction: RotationDirection
}

export enum RotationDirection {
    LEFT,
    RIGHT
}

interface RotationState {
    [key: string]: RotationDirection
}

const initialState: MotorSliceState = {
    motors: [],
    rotation: {}
};

let motorSlice = createSlice({
    name: 'motor',
    initialState,
    reducers: {
        motorsLoaded: (state, action) => {
            state.motors = action.payload;
        },
        addMotor: (state, action) => {
            state.motors.push(action.payload);
        },
        changeMotorAngle: (state, action: PayloadAction<MotorAnglePayload>) => {
            let index = state.motors.findIndex((m) => m.name === action.payload.motor.name);
            state.motors[index].state.angle = action.payload.angle;
        },
        startRotating: (state, action: PayloadAction<RotateMotorPayload>) => {
            state.rotation[action.payload.motor.name] = action.payload.direction;
        },
        stopRotating: (state: MotorSliceState, action ) => {
            delete state.rotation[action.payload.name];
        }
    }
});

const {startRotating, changeMotorAngle} = motorSlice.actions;

//delay between sending next angle
const DELAY = 5;

export let startRotate = (motor: Motor, direction: RotationDirection) => (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(startRotating({
        motor,
        direction
    }));

    const increment = direction === RotationDirection.LEFT ? -1 : 1;
    const nextUpdate = () => {
        if(getState().motor.rotation[motor.name] === undefined){
            return;
        }

        const currAngle = getState().motor.motors.find(m => m.name === motor.name)?.state.angle;
        if(currAngle === undefined) return;

        let nextAngle = currAngle + increment;
        if(nextAngle < 0 || nextAngle > 90) return;

        dispatch(changeMotorAngle({
            motor,
            angle: nextAngle
        }));

        setTimeout(nextUpdate, DELAY);
    }

    nextUpdate();
}

export default motorSlice;