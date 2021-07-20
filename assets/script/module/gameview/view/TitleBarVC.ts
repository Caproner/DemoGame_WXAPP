import ViewCtrl from "../../../framework/ui/ViewCtrl";
import MainCtrl from "../../main/MainCtrl";
import Log from "../../../framework/util/Log"

const { ccclass } = cc._decorator;

@ccclass
export default class TitleBarVC extends ViewCtrl {

  onLoad() {
    this.name = 'TitleBarVC';
    super.init(this.node, '');
    //console.log(this.view);
    this.loadAvatar();
  }

  start() {
  }

  update(dt: number) {
  }

  loadAvatar() {
    if (!MainCtrl.inst.isWx) {
      return;
    }
    let avatar: cc.Node = this.view['Avatar'];
    let sprite: cc.Sprite = avatar.getComponent(cc.Sprite);
    wx.getUserInfo({
      success: function (res) {
        Log.log(res);
        let userInfo = res.userInfo
        let nickName = userInfo.nickName
        let avatarUrl = userInfo.avatarUrl
        let gender = userInfo.gender //性别 0：未知、1：男、2：女 
        let province = userInfo.province
        let city = userInfo.city
        let country = userInfo.country
        Log.log(avatarUrl);
        cc.assetManager.loadRemote(avatarUrl, { ext: '.jpg' }, (err: Error, texture: cc.Texture2D) => {
          if (err) {
            Log.error(err);
            return;
          }
          sprite.spriteFrame = new cc.SpriteFrame(texture);
        });
      },
      fail: function (res) {
        console.log("获取用户信息失败");
        Log.log(res);
      }

    });
  }
}