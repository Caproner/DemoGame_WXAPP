import ViewCtrl from "../../../framework/ui/ViewCtrl";
import MainCtrl from "../../main/MainCtrl";
import Log from "../../../framework/util/Log"
import WXUserModel from "../../login/model/WXUserModel";
import DataCenter from "../../main/DataCenter";
import EventManager from "../../../framework/manager/EventManager";
import { GameEvent } from "../../main/EventConst";

const { ccclass } = cc._decorator;

@ccclass
export default class TitleBarVC extends ViewCtrl {

  //private wxUserInfo: WXUserModel;
  onLoad() {
    this.name = 'TitleBarVC';
    super.init(this.node, '');
    //console.log(this.view);
    this.loadAvatar();
    let avatar: cc.Node = this.view['Avatar'];
    if (avatar) {
      avatar.on(cc.Node.EventType.TOUCH_END, () => { EventManager.emit(GameEvent.Show_UserInfoView); }, this);
    }
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
    let wxUserInfo: WXUserModel = DataCenter.inst.getModel('WXUser');
    if (!wxUserInfo) {
      return;
    }
    if (!wxUserInfo.avatarUrl) {
      return;
    }
    cc.assetManager.loadRemote(wxUserInfo.avatarUrl, { ext: '.jpg' }, (err: Error, texture: cc.Texture2D) => {
      if (err) {
        Log.error(err);
        return;
      }
      sprite.spriteFrame = new cc.SpriteFrame(texture);
    });
  }
}