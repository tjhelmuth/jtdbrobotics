import io from 'socket.io-client'

const SOCKET_OPTIONS = {
    reconnection: false,
    autoConnect: false,
    transports: ['websocket']

};

export default class Server {
    socket?: SocketIOClient.Socket
    disconnectHandler?: () => void;

    async connect(address: string){
        this.disconnect();
        this.socket = await this.doConnect(address);
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

    sendAngle(angle: number){
        this.socket?.emit('angle', angle);
    }

    private doConnect(address: string): Promise<SocketIOClient.Socket> {
        return new Promise<SocketIOClient.Socket>((accept, reject) => {
            let socket = io(address, SOCKET_OPTIONS);
            socket.on('connect', () => {
                console.log("CONNECT"!!!!);
                accept(socket);
            });

            socket.on('connect_error', (e: object) => {
                console.log("CONNECT ERROR!??!?!?");
                reject(e);
            });

            socket.connect();
        });
    }
}