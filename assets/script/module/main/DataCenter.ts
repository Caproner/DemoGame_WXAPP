import ExampleModel from "../example/model/ExampleModel";
import MapModel from "../gameview/model/MapModel";
import UserInfoModel from "../gameview/model/UserInfoModel";
import WXUserModel from "../login/model/WXUserModel";
const { ccclass } = cc._decorator;


export default class DataCenter {
  public modelMap: Map<string, any> = undefined;
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

  private registerEvent() {
    //EventManager.on(GameEvent.Iint_Model, this.initModel, this);
  }

  private initModel() {
    this.modelMap = new Map<string, any>();
    this.pushModel(new MapModel());
    this.pushModel(new ExampleModel());
    this.pushModel(new WXUserModel());
    this.pushModel(new UserInfoModel());
  }

  private pushModel(model: any) {
    this.modelMap.set(model.modelName, model);
  }

  getModel(key: string) {
    if (this.modelMap.has(key)) {
      return this.modelMap.get(key);
    }

    return undefined;
  }
}