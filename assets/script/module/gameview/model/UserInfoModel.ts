import DataModel from "../../../framework/data/DataModel";

export default class UserInfoModel extends DataModel {

  constructor() {
    super("UserInfo");
    this.init();//测试用
  }

  private _honor: number;
  public get honor() {
    return this._honor;
  }
  public set honor(value) {
    this._honor = value;
  }
  private _masonry: number;
  public get masonry() {
    return this._masonry;
  }
  public set masonry(value) {
    this._masonry = value;
  }
  private _money: number;
  public get money() {
    return this._money;
  }
  public set money(value) {
    this._money = value;
  }

  //test
  init() {
    this._honor = 100;
    this._masonry = 10;
    this._money = 1000;
  }

}