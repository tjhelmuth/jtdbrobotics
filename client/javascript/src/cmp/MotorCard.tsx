import React from 'react';
import Motor from "../model/Motor";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import AngleInput from "./AngleInput";
import motorSlice, {RotationDirection, startRotate} from '../state/MotorSlice'
import {useDispatch} from "react-redux";

interface Props {
    motor: Motor;
    onAngleChange: (motor: Motor, angle: number) => void
}

export default ({motor, onAngleChange}: Props) => {
    const dispatch = useDispatch();

    const handleAngleSlider = (angle: number) => {
        onAngleChange(motor, angle);
    }

    const handleRotateLeftStart = () => {
        dispatch(startRotate(motor, RotationDirection.LEFT));
    }

    const handleRotateRightStart = () => {
        dispatch(startRotate(motor, RotationDirection.RIGHT));
    }

    const handleRotateEnd = () => {
        dispatch(motorSlice.actions.stopRotating(motor));
    }


    return <Card elevation={2}>
        <CardHeader title={motor.name} titleTypographyProps={{color: 'primary', variant: 'h6'}} style={{paddingBottom: 0}} />

        <CardContent>
            <Typography>Pin #</Typography>
            <Typography color="textSecondary" gutterBottom>{motor.pin}</Typography>

            <Typography variant="h6">
                Control Angle
            </Typography>
            <AngleInput angle={motor.state.angle} onSliderChange={handleAngleSlider} onRotateLeftStart={handleRotateLeftStart} onRotateRightStart={handleRotateRightStart} onRotateEnd={handleRotateEnd} />
        </CardContent>
    </Card>
};