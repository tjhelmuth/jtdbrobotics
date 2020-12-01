import React from 'react';
import Motor from "../model/Motor";
import {AppBar, Button, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MotorCard from "./MotorCard";

interface Props {
    motors: Array<Motor>
    onAngleChange: (motor: Motor, angle: number) => void
    onAddClick: () => void
}

const useStyles = makeStyles((theme) => ({
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    actionBtn: {
        marginRight: theme.spacing(1)
    }
}));

export default ({motors, onAngleChange, onAddClick}: Props) => {
    const classes = useStyles();

    return <Grid container style={{paddingBottom: 16, paddingTop: 16}} spacing={1}>

        <Grid item xs={12}>
            <div className={classes.actions}>
                <Button variant="outlined" color="primary" className={classes.actionBtn} onClick={onAddClick}>Add Motor</Button>
                <Button variant="outlined" disabled className={classes.actionBtn}>Save State</Button>
            </div>
        </Grid>

        {motors.length === 0 && <Typography color="textSecondary" style={{padding: 8}}>You have not added any motors</Typography>}

        {motors.map((motor: Motor) => <Grid key={motor.name} item sm={6} xs={12} md={4} lg={4} xl={3}>
            <MotorCard motor={motor} onAngleChange={onAngleChange}/>
        </Grid>)}
    </Grid>
};
