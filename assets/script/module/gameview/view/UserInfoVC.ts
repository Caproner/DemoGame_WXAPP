import EventManager from "../../../framework/manager/EventManager";
import ViewCtrl from "../../../framework/ui/ViewCtrl";
import Log from "../../../framework/util/Log";
import WXUserModel from "../../login/model/WXUserModel";
import DataCenter from "../../main/DataCenter";
import { GameEvent } from "../../main/EventConst";

const { ccclass } = cc._decorator;

@ccclass
export default class UserInfoVC extends ViewCtrl {

  private avatar: cc.Node;
  private nickName: cc.Node;
  private gender: cc.Node;
  private honor: cc.Node;
  private bg: cc.Node;

  onLoad() {
    this.name = 'UserInfoVC';
    super.onLoad();
    //Log.log(this.view);
    this.initUi();
    this.node.on(cc.Node.EventType.TOUCH_END, this.cancel, this);
  }

  start() {
  }

  update(dt: number) {
  }

  initUi() {
    this.avatar = this.view['Avatar'];
    this.nickName = this.view['NickNameLabel'];
    this.gender = this.view['GenderLabel'];
    this.honor = this.view['HonorLabel'];
    this.bg = this.view['BG'];
    let wxUserInfo: WXUserModel = DataCenter.inst.getModel('WXUser');
    if (!wxUserInfo) {
      return;
    }
    if (wxUserInfo.avatarUrl) {
      cc.assetManager.loadRemote(wxUserInfo.avatarUrl, { ext: '.jpg' }, (err: Error, texture: cc.Texture2D) => {
        if (err) {
          Log.log(err);
          return;
        }
        let sprite = this.avatar.getComponent(cc.Sprite);
        sprite.spriteFrame = new cc.SpriteFrame(texture);
      });
    }

    let name: cc.Label = this.nickName.getComponent(cc.Label);
    name.string = '昵称：' + wxUserInfo.nickName;

    let gender: cc.Label = this.gender.getComponent(cc.Label);
    gender.string = '性别：' + (wxUserInfo.gender == 1 ? '男' : '女');

  }

  cancel(t: cc.Touch) {
    let pos: cc.Vec2 = this.node.convertToNodeSpaceAR(t.getLocation());
    let rect: cc.Rect = this.bg.getBoundingBox();
    if (rect.contains(pos)) {
      return;
    }
    EventManager.emit(GameEvent.Close_UserInfoView);
  }

}