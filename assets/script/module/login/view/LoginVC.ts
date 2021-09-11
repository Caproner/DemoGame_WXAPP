import EventManager from "../../../framework/manager/EventManager";
import ViewCtrl from "../../../framework/ui/ViewCtrl";
import { GameEvent, ViewLoaderEvent } from "../../main/EventConst";
import MainCtrl from "../../main/MainCtrl";
import Log from "../../../framework/util/Log"

const { ccclass } = cc._decorator;

@ccclass
export default class LoginVC extends ViewCtrl {

  onLoad() {
    this.name = 'LoginVC';
    super.onLoad();
    this.userAuthorize()
  }

  start() {
  }

  update(dt: number) {
  }

  private startGame(data: any, info: any) {
    if (undefined == info) {
      Log.log(ViewLoaderEvent.View_Login_to_GameView);
    }
    //EventManager.emit(GameEvent.Save_WXUser_Info, openID, info);
    EventManager.emit(GameEvent.Login_Succeeded, data, info);
    EventManager.emit(ViewLoaderEvent.View_Login_to_GameView);
  }

  login(info: any) {
    //console.log(MainCtrl.inst.isWx);
    if (!MainCtrl.inst.isWx) {
      this.startGame(undefined, undefined);
      return;
    }
    let self = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://1.15.40.65:17263/login',
            data: {
              code: res.code
            },
            success(res1) {
              let data: any = res1.data;
              //self.loadData(data);
              self.startGame(data, info)
            }
          });
        } else {
          console.error('登录失败！' + res.errMsg)
        }
      }
    });
  }

  requestTest(info: any) {

    console.log("============");
    console.log(info);
    console.log(info.data);
    console.log(info.data.OpenID);
    wx.request({
      url: 'http://1.15.40.65:17263/player/action',
      data: {
        Proto: '120011',
        OpenID: info.data.OpenID
      },
      success(res1) {
        console.log("======action======");
        console.log(res1);
      }
    });

  }

  userAuthorize() {
    if (!MainCtrl.inst.isWx) {
      this.startGame(undefined, undefined);
      return;
    }
    let self = this;
    let sysInfo = wx.getSystemInfoSync();
    //获取微信界面大小
    let width = sysInfo.screenWidth;
    let height = sysInfo.screenHeight;
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          Log.log("用户已授权");
          wx.getUserInfo({
            success(res) {
              self.login(res.userInfo);
              //self.startGame(res.userInfo);
            }
          });
        } else {
          Log.log("用户未授权");
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
              //此时可进行登录操作
              self.login(res.userInfo)
              //self.startGame(res.userInfo);

              button.destroy();
            } else {
              Log.log("用户拒绝授权:");
            }
          });
        }
      }
    });//getSetting
  }

}