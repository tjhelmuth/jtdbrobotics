import React, {ChangeEvent, useState} from 'react';
import SettingsModel from "../model/Settings";
import {Button, Fade, Grid, makeStyles, TextField} from "@material-ui/core";

interface Props {
    settings: SettingsModel
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

const IP_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

interface ValidationErrors {
    address?: string
}

export default ({settings}: Props) => {
    const classes = useStyles();
    const [editing, setEditing] = useState(false);

    let initialErrors: ValidationErrors = {};
    const [errors, setErrors] = useState(initialErrors);

    const [updateAddr, setUpdateAddr] = useState(settings.address);

    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let newErrors: ValidationErrors = {
            address: IP_REGEX.test(value) ? undefined : "Enter a valid IP Address"
        };

        setErrors(newErrors);
        setUpdateAddr(value);
    };

    const handleSave = () => {
        const update = new SettingsModel(updateAddr);

    };

    const handleCancel = () => {
        setUpdateAddr(settings.address);
        setEditing(false);
    };


    const commonProps = {
        InputProps: {readOnly: !editing},
        fullWidth: true
    };

    return (
        <Grid container style={{padding: 16}}>
            <Grid item xs={12}>
                <div className={classes.actions}>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.actionBtn}
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </Button>
                </div>
            </Grid>

            <Grid item xs={12}>
                <form>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                name="address"
                                label="IP Address"
                                value={editing ? updateAddr : settings.address}
                                error={Boolean(errors.address)}
                                helperText={errors.address}
                                onChange={handleAddressChange}
                                {...commonProps}
                            />
                        </Grid>

                        <Fade in={editing}>
                            <Grid item xs={12} style={{textAlign: 'right', padding: 8, marginTop: 16}}>
                                <Button variant="contained" color="primary" className={classes.actionBtn}>Save</Button>
                                <Button variant="contained" className={classes.actionBtn} onClick={handleCancel}>Cancel</Button>
                            </Grid>
                        </Fade>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};