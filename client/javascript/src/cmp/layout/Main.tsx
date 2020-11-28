import {Container, createMuiTheme, makeStyles, Paper, Tab, Tabs, ThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MotorList from "../MotorList";
import Motor from "../../model/Motor";
import AddMotorDialog from "../AddMotorDialog";
import Settings, {EMPTY_SETTINGS} from '../../model/Settings';
import ConnectionDialog from "../ConnectionDialog";
import Server from "../../Server";
import MotorState from "../../model/MotorState";

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

const server = new Server();

export default (props: any) => {
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const [adding, setAdding] = useState(false);

    const [motors, setMotors] = useState(Array<Motor>());
    const [settings, setSettings] = useState(EMPTY_SETTINGS);

    const [connected, setConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);

    const handleDisconnect = () => {
        setConnected(false);
    };

    const handleGetMotors = (motorsArr: Array<any>) => {
        const motors = motorsArr.map(m => new Motor(m.name, m.pin, new MotorState(m.angle)));
        setMotors(motors);
    };

    useEffect(() => {
        let initialSettings = Settings.load();
        setSettings(initialSettings);

        server.getMotorsHandler = handleGetMotors;
        server.onDisconnect(handleDisconnect);

        if(initialSettings !== EMPTY_SETTINGS){
            handleConnect(initialSettings.address);
        }
    }, []);

    const handleTabChange = (event: any, tabNum: number) => {
        setTab(tabNum);
    };

    const handleAngleChange = (motor: Motor, angle: number) => {
        const newMotors = [...motors];
        let index = newMotors.findIndex((m: Motor) => m === motor);
        newMotors[index] = motor.atAngle(angle);
        setMotors(newMotors);

        server.sendAngle(motor.name, angle);
    };

    const handleAddClick = () => setAdding(true);
    const handleAddMotor = (motor: Motor) => {
        const newMotors = [...motors];
        newMotors.push(motor);
        setMotors(newMotors);
        setAdding(false);

        server.addMotor(motor);
    }
    const handleAddCancel = () => setAdding(false);

    const handleConnect = async (address: string) => {
        let settings = new Settings(address);
        settings.persist();
        setSettings(settings);

        setConnecting(true);

        try {
            await server.connect(address);
            setConnecting(false);
            setConnected(true);
        } catch (e) {
            setConnecting(false);
            console.log(e);
        }
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
            <Container maxWidth="lg" >
                <Paper className={classes.container}>
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