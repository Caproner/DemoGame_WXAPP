//import { SocketDelegate } from "./SocketDelegate";
import Log from "../util/Log"

interface Net {
    open(url: string);
    close();
    send();
    getState();
}


export class Network {

    public static post(url: string, data: any, timeout: number = 2000, callback?: Function) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                let response: string = xhr.responseText;
                Log.log(response);
                if (callback != undefined) {
                    callback(response);
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.timeout = timeout;
        xhr.send(data);
    }

    public static get(url: string, timeout: number = 2000, callback?: Function) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                let response: string = xhr.responseText;
                Log.log(response);
                if (callback != undefined) {
                    callback(response);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.timeout = timeout;
        xhr.send();
    }

}

// export class Network {
//     private _socket: SocketDelegate = null;
//     private _url: string = 'ws://echo.websocket.org';

//     constructor() {
//         // this.safeConnectSocket();
//     }

//     close() {
//         this.safeCloseSocket();
//     }

//     send(msg) {
//         if (!this._socket.isSocketOpened()) {
//             console.error('send message but socket not open!')
//             return;
//         }
//         console.log(msg);
//         this._socket.send(msg);
//     }

//     connect() {
//         this.safeConnectSocket();
//     }

//     private safeConnectSocket() {
//         if (this._socket != null) {
//             this._socket.closeConnect();
//         }
//         this._socket = new SocketDelegate();
//         this._socket.connect(this._url);
//     }

//     private safeCloseSocket() {
//         if (this._socket != null) {
//             this._socket.closeConnect();
//         }
//         this._socket = null;
//     }
// }