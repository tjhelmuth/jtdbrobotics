import React from 'react';
import Motor from "../model/Motor";
import {Card, CardContent, CardHeader, Grid, Slider, Typography} from "@material-ui/core";
import {throttle} from 'throttle-debounce';

interface Props {
    motor: Motor;
    onAngleChange: (motor: Motor, angle: number) => void
}

export default ({motor, onAngleChange}: Props) => {
    const handleAngleChange = throttle(50, (event: any, value: number | number[]) => {
        let angle = Array.isArray(value) ? value[0] : value;
        onAngleChange(motor, angle);
    });

    return <Card elevation={2}>
        <CardHeader title={motor.name} titleTypographyProps={{color: 'primary', variant: 'h6'}} style={{paddingBottom: 0}} />

        <CardContent>
            <Typography>Pin #</Typography>
            <Typography color="textSecondary">{motor.pin}</Typography>
        </CardContent>

        <CardContent>
            <Typography>Angle</Typography>
            <Typography color="textSecondary" style={{marginBottom: 8}}>{motor.state.angle}</Typography>
            <Grid container>
                <Grid item xs={1}><strong>0</strong></Grid>
                <Grid item xs={9} style={{textAlign: 'center'}}><Slider min={0} max={90} value={motor.state.angle} onChange={handleAngleChange}/></Grid>
                <Grid item xs={2} style={{textAlign: 'right'}}><strong>90</strong></Grid>
            </Grid>
        </CardContent>
    </Card>
};