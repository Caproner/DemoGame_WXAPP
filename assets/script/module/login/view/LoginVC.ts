import EventManager from "../../../framework/manager/EventManager";
import ViewCtrl from "../../../framework/ui/ViewCtrl";
import { ViewLoaderEvent } from "../../main/EventConst";
import MainCtrl from "../../main/MainCtrl";
import Log from "../../../framework/util/Log"

const { ccclass } = cc._decorator;

@ccclass
export default class LoginVC extends ViewCtrl {

    onLoad() {
        this.name = 'LoginVC';
        super.onLoad();
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    start() {
    }

    update(dt: number) {
    }

    startGame(info: any) {
        console.log(info);
        if (undefined == info) {
            Log.log(ViewLoaderEvent.View_Login_to_GameView);
        }
        EventManager.emit(ViewLoaderEvent.View_Login_to_GameView);
    }

    onClick() {
        if (!MainCtrl.inst.isWx) {
            this.startGame(undefined);
            return;
        }
        let self = this;
        let wx = window['wx'];
        let sysInfo = wx.getSystemInfoSync();
        //获取微信界面大小
        let width = sysInfo.screenWidth;
        let height = sysInfo.screenHeight;
        wx.getSetting({
            success(res) {
                //console.log(res.authSetting);
                if (res.authSetting["scope.userInfo"]) {
                    console.log("用户已授权");
                    wx.getUserInfo({
                        success(res) {
                            self.startGame(res.userInfo);
                        }
                    });
                } else {
                    console.log("用户未授权");
                    let button = wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000',//最后两位为透明度
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height,
                        }
                    });
                    button.onTap((res) => {
                        if (res.userInfo) {
                            //console.log("用户授权:", res.userInfo);
                            self.startGame(res.userInfo);
                            //此时可进行登录操作
                            button.destroy();
                        } else {
                            console.log("用户拒绝授权:");
                        }
                    });
                }
            }
        })
    }

}