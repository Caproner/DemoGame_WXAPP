import DataModel from "../../../framework/data/DataModel";

export default class WXUserModel extends DataModel {

  /**opendID */
  private _openID: string;
  public get openID(): string {
    return this._openID;
  }
  public set openID(value: string) {
    this._openID = value;
  }
  /**头像地址 */
  private _avatarUrl: string;
  public get avatarUrl(): string {
    return this._avatarUrl;
  }
  public set avatarUrl(value: string) {
    this._avatarUrl = value;
  }
  /**昵称 */
  private _nickName: string;
  public get nickName(): string {
    return this._nickName;
  }
  public set nickName(value: string) {
    this._nickName = value;
  }
  /**性别 */
  private _gender: number;
  public get gender(): number {
    return this._gender;
  }
  public set gender(value: number) {
    this._gender = value;
  }
  /**城市 */
  private _city: string;
  public get city(): string {
    return this._city;
  }
  public set city(value: string) {
    this._city = value;
  }
  /**国家 */
  private _country: string;
  public get country(): string {
    return this._country;
  }
  public set country(value: string) {
    this._country = value;
  }

  constructor() {
    super('WXUser');
  }

  protected getMessageListeners() {
    let map: object = {};
    return map;
  };

};