import {Container, createMuiTheme, makeStyles, Paper, Tab, Tabs, ThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MotorList from "../MotorList";
import Motor, {create as createMotor} from "../../model/Motor";
import AddMotorDialog from "../AddMotorDialog";
import Settings, {EMPTY_SETTINGS} from '../../model/Settings';
import ConnectionDialog from "../ConnectionDialog";
import Server from "../../Server";
import motorSlice from "../../state/MotorSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../App";
import appSlice, {ConnectionState, connectToServer} from "../../state/AppSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#efefef',
        height: '100vh',
        padding: theme.spacing(2)
    },
    container: {
        padding: theme.spacing(1)
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#54b0f3'
        },
        secondary: {
            main: '#cdced2'
        }
    }
});

const { motorsLoaded, addMotor, changeMotorAngle } = motorSlice.actions;
const {disconnect} = appSlice.actions;

export default (props: any) => {
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const [adding, setAdding] = useState(false);

    // const [motors, setMotors] = useState(Array<Motor>());
    const [settings, setSettings] = useState(EMPTY_SETTINGS);

    const dispatch = useDispatch();

    const motors = useSelector((state: RootState) => {
        return state.motor.motors;
    });

    const {connectionState} = useSelector((state: RootState) => {
        return state.app;
    });
    const connected = connectionState === ConnectionState.CONNECTED;
    const connecting = connectionState === ConnectionState.CONNECTING;

    const handleDisconnect = () => dispatch(disconnect());

    const handleGetMotors = (motorsArr: Array<any>) => {
        const motors = motorsArr.map(m => createMotor({name: m.name, pin: m.pin, state: {angle: m.angle}}));
        dispatch(motorsLoaded(motors));
    };

    useEffect(() => {
        let initialSettings = Settings.load();
        setSettings(initialSettings);

        Server.getMotorsHandler = handleGetMotors;
        Server.onDisconnect(handleDisconnect);

        if(initialSettings !== EMPTY_SETTINGS){
            handleConnect(initialSettings.address);
        }
    }, []);

    const handleTabChange = (event: any, tabNum: number) => {
        setTab(tabNum);
    };

    const handleAngleChange = (motor: Motor, angle: number) => {
        dispatch(changeMotorAngle({angle, motor}))
    };

    const handleAddClick = () => setAdding(true);
    const handleAddMotor = (motor: Motor) => {
        dispatch(addMotor(motor));
        setAdding(false);

        Server.addMotor(motor);
    }
    const handleAddCancel = () => setAdding(false);

    const handleConnect = async (address: string) => {
        let settings = new Settings(address);
        settings.persist();
        setSettings(settings);

        dispatch(connectToServer(address));
    };

    return <ThemeProvider theme={theme}>
        <div className={classes.root}>

            {!connected && <ConnectionDialog
                settings={settings}
                setup={settings == EMPTY_SETTINGS}
                connecting={connecting}
                onConnect={handleConnect}
            />}

            {connected &&
                <Container maxWidth="lg">
                <Paper className={classes.container} elevation={0}>
                    <Tabs value={tab} onChange={handleTabChange}>
                        <Tab label="Motors" />
                        <Tab label="Programs" />
                    </Tabs>

                    {tab === 0 && <MotorList
                        motors={motors}
                        onAngleChange={handleAngleChange}
                        onAddClick={handleAddClick}
                    />}
                </Paper>

                {adding && <AddMotorDialog
                    names={motors.map(m => m.name)}
                    onSave={handleAddMotor}
                    onCancel={handleAddCancel}
                />}
                </Container>
            }
        </div>
    </ThemeProvider>
};