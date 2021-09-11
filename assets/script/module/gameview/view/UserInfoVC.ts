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
  private nickName: cc.Label;
  private gender: cc.Label;
  private honor: cc.Label;
  private bg: cc.Node;
  private level: cc.Label;
  private exp: cc.Label;

  onLoad() {
    this.name = 'UserInfoVC';
    super.onLoad();
    //Log.log(this.view);
    this.registerEvents();
    this.initUi();
  }
  private registerEvents() {
    this.node.on(cc.Node.EventType.TOUCH_END, this.cancel, this);
    EventManager.on(GameEvent.Refresh_UserInfo, this.refreshInfo, this);
  }

  start() {
  }

  update(dt: number) {
  }

  initUi() {
    this.avatar = this.view['Avatar'];
    this.nickName = this.view['NickNameLabel'].getComponent(cc.Label);
    this.gender = this.view['GenderLabel'].getComponent(cc.Label);
    this.honor = this.view['HonorLabel'].getComponent(cc.Label);
    this.bg = this.view['BG'];
    this.level = this.view['LevelLabel'].getComponent(cc.Label);
    this.exp = this.view['ExpLabel'].getComponent(cc.Label);
    EventManager.emit(GameEvent.Req_Refresh_UserInfo);
  }

  cancel(t: cc.Touch) {
    let pos: cc.Vec2 = this.node.convertToNodeSpaceAR(t.getLocation());
    let rect: cc.Rect = this.bg.getBoundingBox();
    if (rect.contains(pos)) {
      return;
    }
    EventManager.emit(GameEvent.Close_UserInfoView);
  }

  private refreshInfo(wxUserInfo: any, userInfo: any) {
    //let wxUserInfo: WXUserModel = DataCenter.inst.wxUserModel;
    //console.log("--------------");
    //console.log(wxUserInfo);
    //console.log(userInfo);
    if (!wxUserInfo || !userInfo) {
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

    this.nickName.string = '昵称：' + wxUserInfo.nickName;
    this.gender.string = '性别：' + (wxUserInfo.gender == 1 ? '男' : '女');
    this.level.string = '等级：' + userInfo.lv;
    this.exp.string = '经验：' + userInfo.exp;
    this.honor.string = '荣誉：' + userInfo.honor;

  }

}