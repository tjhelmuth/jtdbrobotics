import React from 'react';
import {CardContent, Grid, IconButton, makeStyles, Slider, Typography} from "@material-ui/core";
import {throttle} from "throttle-debounce";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

interface Props {
    angle: number,
    onRotateLeftStart?: () => void,
    onRotateRightStart?: () => void,
    onRotateEnd?: () => void,
    onSliderChange: (angle: number) => void
}

const useStyles = makeStyles(theme => ({
    middleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}));

export default ({angle, onRotateLeftStart, onRotateRightStart, onRotateEnd, onSliderChange}: Props) => {
    const classes = useStyles();

    const handleAngleChange = throttle(50, (event: any, value: number | number[]) => {
        let angle = Array.isArray(value) ? value[0] : value;
        onSliderChange(angle);
    });

    return (
        <Grid container>
            <Grid item xs={12} style={{textAlign: 'center'}}>
                <Slider min={0} max={90} value={angle} onChange={handleAngleChange}/>
            </Grid>

            <Grid item xs={12}>
                <div className={classes.middleContainer}>
                    <IconButton onMouseDown={onRotateLeftStart} onMouseUp={onRotateEnd}>
                        <ChevronLeft fontSize="large" />
                    </IconButton>

                    <Typography variant="h2" color="primary">{angle}°</Typography>

                    <IconButton onMouseDown={onRotateRightStart} onMouseUp={onRotateEnd}>
                        <ChevronRight fontSize="large" />
                    </IconButton>
                </div>
            </Grid>
        </Grid>
);
};