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

  private moneyLabel: cc.Label;
  private masonryLabel: cc.Label;
  private honorLabel: cc.Label;
  //private wxUserInfo: WXUserModel;
  onLoad() {
    this.name = 'TitleBarVC';
    super.init(this.node, '');
    this.loadAvatar();
    let avatar: cc.Node = this.view['Avatar'];
    if (avatar) {
      avatar.on(cc.Node.EventType.TOUCH_END, () => { EventManager.emit(GameEvent.Show_UserInfoView); }, this);
    }
    this.honorLabel = this.view['Honor/Label'].getComponent(cc.Label);
    this.masonryLabel = this.view['Masonry/Label'].getComponent(cc.Label);
    this.moneyLabel = this.view['Money/Label'].getComponent(cc.Label);
    this.registerEvent();
    EventManager.emit(GameEvent.Request_Refresh_Currency);
  }
  registerEvent() {
    let self = this;
    EventManager.on(GameEvent.Refresh_Money, (money: number) => {
      if (!self.moneyLabel) { return; }
      self.moneyLabel.string = '' + money
    })
    EventManager.on(GameEvent.Refresh_Masonry, (masonry: number) => { if (!self.masonryLabel) { return; } self.masonryLabel.string = '' + masonry })
    EventManager.on(GameEvent.Refresh_Honor, (honor: number) => { if (!self.honorLabel) { return; } self.honorLabel.string = '' + honor })
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
    let wxUserInfo: WXUserModel = DataCenter.inst.wxUserModel;
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