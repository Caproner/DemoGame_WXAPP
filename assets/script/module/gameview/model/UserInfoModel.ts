import DataModel from "../../../framework/data/DataModel";
import Log from "../../../framework/util/Log"
import Util from "../../../framework/util/Util";

export default class UserInfoModel extends DataModel {

  constructor() {
    super("UserInfo");
    this.init();//测试用
  }

  private _currency: any = {};
  public get currency(): any {
    return this._currency;
  }
  public set currency(value: any) {
    this._currency = value;
  }
  public get honor() {
    return this._currency['2'];
  }
  public set honor(value) {
    this._currency['2'] = value;
  }
  public get masonry() {
    return this._currency['1'];
  }
  public set masonry(value) {
    this._currency['1'] = value;
  }
  public get money() {
    return this._currency['0'];
  }
  public set money(value) {
    this._currency['0'] = value;
  }
  private _lv: number;
  public get lv(): number {
    return this._lv;
  }
  public set lv(value: number) {
    this._lv = value;
  }
  private _exp: number;
  public get exp(): number {
    return this._exp;
  }
  public set exp(value: number) {
    this._exp = value;
  }
  //test
  init() {
    this._currency =
    {
      '2': 100,
      '1': 10,
      '0': 1000
    }
    this._lv = 1;
    this._exp = 0;
  }

  public setData(info: any) {
    if (!info) {
      Log.log("UserInfo:invalid info");
      return;
    }
    console.log(info);
    this._lv = info.Lv;
    this._exp = info.Exp;
    let currency: any = info.Money;

    if (Util.isValidObject(currency)) {
      this._currency = currency;
      if (undefined == this.currency['0'])
        this._currency['0'] = 1000;
      if (undefined == this.currency['1'])
        this._currency['1'] = 10;
      if (undefined == this.currency['2'])
        this._currency['2'] = 100;
    }
  }

}