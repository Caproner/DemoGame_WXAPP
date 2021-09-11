import { WxSocket } from "../../framework/net/Socket";
import ExampleModel from "../example/model/ExampleModel";
import MapModel from "../gameview/model/MapModel";
import UserInfoModel from "../gameview/model/UserInfoModel";
import WXUserModel from "../login/model/WXUserModel";
const { ccclass } = cc._decorator;


export default class DataCenter {
  public mapModel: MapModel = undefined;
  public wxUserModel: WXUserModel = undefined;
  public userInfoModel: UserInfoModel = undefined;

  private static instance: DataCenter = undefined;
  public static get inst(): DataCenter {
    if (!DataCenter.instance) {
      DataCenter.instance = new DataCenter();
    }
    return DataCenter.instance;
  }
  private constructor() {
    this.initModel();
  }

  private initModel() {
    this.mapModel = new MapModel();
    this.wxUserModel = new WXUserModel();
    this.userInfoModel = new UserInfoModel();
  }
}