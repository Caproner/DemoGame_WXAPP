import EventManager from "../../framework/manager/EventManager";
import Ctrl from "../../framework/util/Ctrl";
import Log from "../../framework/util/Log";
import DataCenter from "../main/DataCenter";
import { GameEvent } from "../main/EventConst";
import WXUserModel from "./model/WXUserModel";

const { ccclass } = cc._decorator;

@ccclass
export default class LoginCtrl extends Ctrl {

  private wxUserModel: WXUserModel;

  constructor() {
    super('LoginCtrl');
    this.wxUserModel = DataCenter.inst.getModel('WXUser');
    this.register();
  }

  private register() {
    EventManager.on(GameEvent.Save_WXUser_Info, this.saveWXUserInfo, this);
  }

  /**
   *将获取到的微信用户信息保存到本地
   *
   * @author guan
   * @date 2021/07/20
   * @param {string} openID opendid
   * @param {*} info 用户信息
   * @returns {*} 
   * @memberof LoginCtrl
   */
  saveWXUserInfo(openID: string, info: any) {
    if (!openID || !info) {
      Log.log('invalid openID & info');
      return;
    }
    if (!this.wxUserModel) {
      Log.log('invalid WxUserModel');
      //Log.log(this.wxUserModel);
      return;
    }
    this.wxUserModel.openID = openID;
    this.wxUserModel.avatarUrl = info.avatarUrl;
    this.wxUserModel.city = info.city;
    this.wxUserModel.country = info.country;
    this.wxUserModel.gender = info.gender;
    this.wxUserModel.nickName = info.nickName;
  }

};