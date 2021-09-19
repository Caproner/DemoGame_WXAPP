import EventManager from "../../framework/manager/EventManager";
import Ctrl from "../../framework/util/Ctrl";
import Log from "../../framework/util/Log"
import DataCenter from "../main/DataCenter";
import { GameEvent } from "../main/EventConst";
import axios from "../../framework/net/src/Axios";
import Util from "../../framework/util/Util";
import { PROTO } from "../datacfg/proto";

export default class GameviewCtrl extends Ctrl {

  constructor() {
    super('GameviewCtrl');
    this.init();
    this.registerEvents();
  }

  protected getMessageListeners() {
    let map: object = {};
    return map;
  };

  private registerEvents() {
    EventManager.on(GameEvent.Build, this.build, this);
    EventManager.on(GameEvent.Request_Refresh_Currency, this.refreshCurrency, this);
    EventManager.on(GameEvent.Test_OverWriteMapAndCurrency, this.overWriteMapAndCurrency, this);
    EventManager.on(GameEvent.Req_Refresh_UserInfo, this.refreshUserInfo, this);
    EventManager.on(GameEvent.Req_Init_BuildingUI, this.initBuildingUI, this);
  }

  init() {
  }

  test(num: number) {
    console.log(`num is ${num}`);
  }

  build(obj: object) {
    if (!DataCenter.inst.mapModel) { return; }
    if (!DataCenter.inst.userInfoModel) { return; }

    let pos: cc.Vec2 | cc.Vec3 = obj['pos'];
    //console.log(DataCenter.inst.mapModel.map[pos_str]);
    let pos_str = `${pos.y},${pos.x}`;
    if (!DataCenter.inst.mapModel.map[pos_str]) {
      return;
    }
    if (DataCenter.inst.mapModel.map[pos_str]['terrain']['id'] != 3) {
      return;
    }
    let id: number = obj['id'];
    if (DataCenter.inst.mapModel.map[pos_str]['building'] != undefined) {
      let id: number = DataCenter.inst.mapModel.map[pos_str]['building']['id'];
      let cost = DataCenter.inst.mapModel.getBuilingCost(id);
      DataCenter.inst.userInfoModel.money += cost;
      delete DataCenter.inst.mapModel.map[pos_str]['building'];
      EventManager.emit(GameEvent.Refresh_Money, DataCenter.inst.userInfoModel.money);
      EventManager.emit(GameEvent.Build_UI, pos, id, true);
      this.submitCurrency();
      this.submitMap();
      return;
    }

    let cost = DataCenter.inst.mapModel.getBuilingCost(id);
    if (DataCenter.inst.userInfoModel.money < cost) {
      return;
    }
    DataCenter.inst.userInfoModel.money -= cost;
    DataCenter.inst.mapModel.map[pos_str]['building'] = {};
    DataCenter.inst.mapModel.map[pos_str]['building']['id'] = id;
    EventManager.emit(GameEvent.Refresh_Money, DataCenter.inst.userInfoModel.money);
    EventManager.emit(GameEvent.Build_UI, pos, id, false);
    this.submitCurrency();
    this.submitMap();
    return;
  }

  refreshCurrency() {
    //console.log("refresh");
    if (!DataCenter.inst.userInfoModel) {
      return;
    }
    // console.log(DataCenter.inst.userInfoModel);
    EventManager.emit(GameEvent.Refresh_Money, DataCenter.inst.userInfoModel.money);
    EventManager.emit(GameEvent.Refresh_Masonry, DataCenter.inst.userInfoModel.masonry);
    EventManager.emit(GameEvent.Refresh_Honor, DataCenter.inst.userInfoModel.honor);
  }

  private submitMap() {
    axios({
      url: PROTO.saddr,
      method: 'POST',
      data: {
        Proto: PROTO.c2s_maps_sync,
        OpenID: DataCenter.inst.wxUserModel.openID,
        Maps: DataCenter.inst.mapModel.map
      }
    }).then(res => { console.log(res) })
      .catch(err => { console.log(err) })
  }

  private submitCurrency() {
    axios({
      url: PROTO.saddr,
      method: 'POST',
      data: {
        Proto: PROTO.c2s_money_sync,
        OpenID: DataCenter.inst.wxUserModel.openID,
        Money: DataCenter.inst.userInfoModel.currency
      }
    }).then(res => { console.log(res) })
      .catch(err => { console.log(err) })
  }

  // private submitBuildings() {
  //   axios({
  //     url: PROTO.saddr,
  //     method: 'POST',
  //     data: {
  //       Proto: '130031',
  //       OpenID: DataCenter.inst.wxUserModel.openID,
  //       Builds: DataCenter.inst.mapModel.buildings,
  //     }
  //   }).then(res => { console.log(res) })
  //     .catch(err => { console.log(err) })
  // }

  private overWriteMapAndCurrency() {
    axios({
      url: PROTO.saddr,
      method: 'POST',
      data: {
        Proto: PROTO.c2s_maps_sync,
        OpenID: DataCenter.inst.wxUserModel.openID,
        Maps: {}
      }
    }).then(res => { console.log(res) })
      .catch(err => { console.log(err) })

    axios({
      url: PROTO.saddr,
      method: 'POST',
      data: {
        Proto: PROTO.c2s_money_sync,
        OpenID: DataCenter.inst.wxUserModel.openID,
        Money: {}
      }
    }).then(res => { console.log(res) })
      .catch(err => { console.log(err) })
  }

  private refreshUserInfo() {
    //console.log("========");
    let wxUserInfo: any = DataCenter.inst.wxUserModel;
    let userInfo: any = DataCenter.inst.userInfoModel;
    EventManager.emit(GameEvent.Refresh_UserInfo, wxUserInfo, userInfo);
  }

  private initBuildingUI() {
    for (let key in DataCenter.inst.mapModel.map) {
      if (DataCenter.inst.mapModel.map[key]['building'] == undefined) {
        continue;
      }
      //console.log(key);
      let pos: cc.Vec3 = Util.strToPos(key);
      //console.log(pos);
      EventManager.emit(GameEvent.Build_UI, pos, DataCenter.inst.mapModel.map[key]['building']['id'], false);
    }
  }

};