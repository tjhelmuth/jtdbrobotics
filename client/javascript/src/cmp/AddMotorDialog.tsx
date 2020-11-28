import React, {ChangeEvent, useState} from 'react';
import Motor from "../model/Motor";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
    TextField
} from "@material-ui/core";

interface Props {
    names: Array<string>
    onSave: (motor: Motor) => void,
    onCancel: () => void
}

const useStyles = makeStyles((theme) => ({
    formField: {
        marginBottom: theme.spacing(2)
    }
}));

export default ({onSave, onCancel, names}: Props) => {
    const classes = useStyles();

    const [name, setName] = useState("Motor");
    const [pin, setPin] = useState(0);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePinChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPin(parseInt(event.target.value));
    };

    const handleSave = () => {
        onSave(new Motor(name, pin));
    };

    return <Dialog open={true}>
        <DialogTitle>Add Motor</DialogTitle>

        <DialogContent>
            <form>
                <Grid container>
                    <Grid item xs={12} className={classes.formField}>
                        <TextField name="name" value={name} label="Motor Name" onChange={handleNameChange} fullWidth/>
                    </Grid>

                    <Grid item xs={12} className={classes.formField}>
                        <TextField name="pin" value={pin} label="Pin Number" onChange={handlePinChange} type="number" fullWidth/>
                    </Grid>
                </Grid>
            </form>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
    </Dialog>;
}