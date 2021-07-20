import EventManager from "../manager/EventManager";

export default class DataModel {
  public modelName: string = 'default';
  private data = {};

  constructor(modelName = 'default') {
    this.modelName = modelName;
    this.loadStorage();
    //this.registerListeners();
  }


  // private registerListeners() {
  //   let msgTable = this.getMessageListeners();
  //   for (const key in msgTable) {
  //     if (msgTable.hasOwnProperty(key)) {
  //       EventManager.on(key.toString(), function (msg: any) {
  //         msgTable[key](msg);
  //       })
  //     }
  //   }
  // }

  // protected getMessageListeners() {
  //   return {};
  // };

  protected loadStorage() {
    let itemData = cc.sys.localStorage.getItem(`model_${this.modelName}`);
    if (!itemData) {
      this.data = {}
      this.save();
      return;
    }
    let data = JSON.parse(itemData);
    if (!data || data === "") {
      this.data = {}
      this.save();
      return;
    }
    this.data = data;
  }

  protected query(key: string, defaultValue: any = undefined): any {
    let temp = this.data[key];
    if (temp == undefined) {
      return defaultValue;
    }
    return temp;
  }

  protected set(key: string, value: any): boolean {
    if (this.data[key] && this.data[key] == value) {
      return false;
    }
    this.data[key] = value;
    return true;
  }

  protected save() {
    cc.sys.localStorage.setItem(`model_${this.modelName}`, JSON.stringify(this.data));
  }
}
