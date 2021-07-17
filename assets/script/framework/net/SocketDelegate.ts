
import EventManager from "../manager/EventManager";
import Log from "../util/Log"


import { ISocket, SocketState, WbSocket, WxSocket } from "./Socket";

export interface ISocketDelegate {
    onSocketOpen();
    onSocketMessage(data: string | ArrayBuffer);
    onSocketError(errMsg);
    onSocketClosed(msg: string);
}

/**
 * 实现socket各个回调接口
 */
export class SocketDelegate implements ISocketDelegate {
    private _socket: ISocket;

    isSocketOpened() {
        return (this._socket && this._socket.getState() == SocketState.OPEN);
    }

    isSocketClosed() {
        return this._socket == null;
    }

    connect(url: string) {
        // Log.log('connect socket = ' + url);
        // 根据平台创建socket
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this._socket = new WxSocket(url, this);
            // Log.log("wx-websocket");
        } else {
            //Log.log("cocos-websocket");
            this._socket = new WbSocket(url, this);
        }
        this._socket.connect();
    }

    closeConnect() {
        if (this._socket) {
            this._socket.close();
        }
    }

    onSocketOpen() {
        Log.log('socket open');
        EventManager.emit('SOCKET_OPEN');
    }

    onSocketError(errMsg) {
        errMsg && Log.error('socket error, msg = ' + errMsg);
        //网络错误处理
    }

    onSocketClosed(msg: string) {
        Log.log('socket close, reason = ' + msg);
        if (this._socket) {
            this._socket.close();
        }
        this._socket = null;
        EventManager.emit('SOCKET_CLOSE');
    }

    onSocketMessage(data: string) {
        if (this.isSocketClosed()) {
            Log.error('onMessage call but socket had closed')
            return;
        }
        if (undefined == data) {
            return;
        }
        //Log.log(data);
        let jsonData: object = JSON.parse(data);
        if (jsonData) {
            let msgName: string = jsonData['MsgName'];
            if (msgName) { EventManager.emit(msgName, data); }
        }
    }

    send(msg) {

        this._socket.send(msg);

    }

}