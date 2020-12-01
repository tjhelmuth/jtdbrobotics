import {Middleware} from "redux";
import Server from "../Server";

import motorSlice, {MotorAnglePayload} from "./MotorSlice";

const actions = motorSlice.actions;

const ServerMiddleware: Middleware = (storeApi) => {
    return (next) => {
        return (action) => {
            /**
             * Send updated motor angle to the python
             */
            console.log(action.type, actions.changeMotorAngle.type);
            if(action.type === actions.changeMotorAngle.type){
                let payload = action.payload as MotorAnglePayload;
                Server.sendAngle(payload.motor.name, payload.angle);
            }

            return next(action);
        };
    }

}

export default ServerMiddleware;