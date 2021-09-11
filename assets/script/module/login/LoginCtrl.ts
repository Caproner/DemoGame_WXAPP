import EventManager from "../../framework/manager/EventManager";
import Ctrl from "../../framework/util/Ctrl";
import Log from "../../framework/util/Log";
import DataCenter from "../main/DataCenter";
import { GameEvent } from "../main/EventConst";
import WXUserModel from "./model/WXUserModel";

const { ccclass } = cc._decorator;

@ccclass
export default class LoginCtrl extends Ctrl {



  constructor() {
    super('LoginCtrl');
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
    Log.log(openID, info);
    if (!openID || !info) {
      Log.log('invalid openID & info');
      return;
    }
    if (!DataCenter.inst.wxUserModel) {
      Log.log('invalid WxUserModel');
      //Log.log(DataCenter.inst.wxUserModel);
      return;
    }
    DataCenter.inst.wxUserModel.openID = openID;
    DataCenter.inst.wxUserModel.avatarUrl = info.avatarUrl;
    DataCenter.inst.wxUserModel.city = info.city;
    DataCenter.inst.wxUserModel.country = info.country;
    DataCenter.inst.wxUserModel.gender = info.gender;
    DataCenter.inst.wxUserModel.nickName = info.nickName;
  }

};