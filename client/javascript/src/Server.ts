import io from 'socket.io-client'
import Motor from "./model/Motor";

const SOCKET_OPTIONS = {
    reconnection: false,
    autoConnect: false,
    transports: ['websocket']

};

class Server {
    socket?: SocketIOClient.Socket
    disconnectHandler?: () => void;
    getMotorsHandler?: (motors: Array<object>) => void;

    async connect(address: string){
        const path = `ws://${address}:8765`;

        this.disconnect();
        this.socket = await this.doConnect(path);
        if(this.disconnectHandler){
            this.socket.on('disconnect', this.disconnectHandler);
        }

    }

    onDisconnect(handler: () => void){
        if(this.disconnectHandler){
            this.socket?.off('disconnect', this.disconnectHandler);
        }
        this.disconnectHandler = handler;
        this.socket?.on('disconnect', handler);
    }

    disconnect(){
        this.socket?.disconnect();
        delete this.socket;
    }

    sendAngle(motorName: string, angle: number){
        this.socket?.emit('angle', {
            name: motorName,
            angle,
        });
    }

    addMotor(motor: Motor){
        this.socket?.emit('add-motor', {
            name: motor.name,
            pin: motor.pin
        });
    }

    private doConnect(address: string): Promise<SocketIOClient.Socket> {
        return new Promise<SocketIOClient.Socket>((accept, reject) => {
            let socket = io(address, SOCKET_OPTIONS);
            socket.once('connect', () => {
                console.log("CONNECT"!!!!);
                accept(socket);
            });

            socket.once('connect_error', (e: object) => {
                console.log("CONNECT ERROR!??!?!?");
                reject(e);
            });

            if(this.getMotorsHandler){
                socket.on('get-motors', this.getMotorsHandler);
            }

            socket.connect();
        });
    }
}

export default new Server();