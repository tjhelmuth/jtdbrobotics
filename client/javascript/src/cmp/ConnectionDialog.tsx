import React, {ChangeEvent, useState} from 'react';
import Settings from "../model/Settings";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, LinearProgress, makeStyles,
    TextField, Typography
} from "@material-ui/core";
import SettingsForm from "./SettingsForm";


interface Props {
    settings: Settings,
    setup: boolean,
    connecting: boolean,
    onConnect: (address: string) => void
};

const IP_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

interface ValidationErrors {
    address?: string
}

const useStyles = makeStyles((theme) => ({
    loading: {
        display: 'flex',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
}));

export default ({settings, setup, connecting, onConnect}: Props) => {
    const classes = useStyles();

    let initialErrors: ValidationErrors = {
        address: IP_REGEX.test(settings.address) ? undefined : "Enter a valid IP Address"
    };
    const [errors, setErrors] = useState(initialErrors);
    const [update, setUpdate] = useState(settings.address);

    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let newErrors: ValidationErrors = {
            address: IP_REGEX.test(value) ? undefined : "Enter a valid IP Address"
        };

        setErrors(newErrors);
        setUpdate(value);
    };

    const handleConnectClick = () => {
        onConnect(update);
    };

    if(connecting){
        return <Dialog open={true}>
            <LinearProgress />
            <DialogContent className={classes.loading}>
                <Typography variant="h5" color="primary">Attempting to connect on<br /><span style={{color: '#000'}}>{settings.address}</span></Typography>
            </DialogContent>
        </Dialog>
    }

    return <Dialog open={true} maxWidth="xs">
        <DialogTitle>
            Connect to PI
        </DialogTitle>

        {!setup && <DialogContent>
            <DialogContentText color="error">You have lost connection to the pi. Change the configured IP Address or attempt to reconnect</DialogContentText>
        </DialogContent>}

        <DialogContent style={{minWidth: 350}}>
            <TextField
                name="address"
                label="IP Address"
                value={update}
                error={Boolean(errors.address)}
                helperText={errors.address}
                onChange={handleAddressChange}
                fullWidth
            />
        </DialogContent>

        <DialogActions style={{marginTop: 16}}>
            <Button color="primary" disabled={Boolean(errors.address)} onClick={handleConnectClick}>Connect</Button>
        </DialogActions>
    </Dialog>

};
