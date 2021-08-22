import EventManager from "../../framework/manager/EventManager";
import Ctrl from "../../framework/util/Ctrl";
import Log from "../../framework/util/Log"
import DataCenter from "../main/DataCenter";
import { GameEvent } from "../main/EventConst";
import MapModel from "./model/MapModel";
import UserInfoModel from "./model/UserInfoModel";

export default class GameviewCtrl extends Ctrl {

  private mapModel: MapModel;
  private userInfoModel: UserInfoModel;
  constructor() {
    super('GameviewCtrl');
    this.init();
    //console.log("1111111111");
    EventManager.on(GameEvent.Build, this.build, this);
    EventManager.on(GameEvent.Request_Refresh_Currency, this.refreshCurrency, this);
  }

  protected getMessageListeners() {
    let map: object = {};
    // map[GameEvent.GAME_TEST] = this.test;
    // map[GameEvent.Build] = this.build;
    //map[GameEvent.Request_Refresh_Currency] = this.refreshCurrency;
    return map;
  };

  init() {
    this.userInfoModel = DataCenter.inst.getModel("UserInfo");
  }

  test(num: number) {
    console.log(`num is ${num}`);
  }

  build(obj: object) {
    //console.log(obj);
    if (!this.mapModel) { this.mapModel = DataCenter.inst.getModel('Map'); }
    if (!this.userInfoModel) { this.userInfoModel = DataCenter.inst.getModel("UserInfo") }
    let id: number = obj['id'];
    let cost = this.mapModel.getBuilingCost(id);
    if (this.userInfoModel.money < cost) {
      return;
    }
    this.userInfoModel.money -= cost;
    let pos: cc.Vec2 | cc.Vec3 = obj['pos'];
    this.mapModel.map[pos.y][pos.x]['building'] = id;
    EventManager.emit(GameEvent.Refresh_Money, this.userInfoModel.money);
    EventManager.emit(GameEvent.Build_UI);
  }

  refreshCurrency() {
    //console.log("refresh");
    if (!this.userInfoModel) {
      DataCenter.inst.getModel("UserInfo");
    }
    // console.log(this.userInfoModel);
    EventManager.emit(GameEvent.Refresh_Money, this.userInfoModel.money);
    EventManager.emit(GameEvent.Refresh_Masonry, this.userInfoModel.masonry);
    EventManager.emit(GameEvent.Refresh_Honor, this.userInfoModel.honor);
  }

};