import EventMng from "../manager/EventManager";


export default class IDataModel {
    protected modelName: string = 'default';

    /**
     * 本地缓存的数据
     */
    private _dLocalData = {};

    constructor(modelName = 'default') {
        this.modelName = modelName;
        this.LoadStorage();
        
    }

    clear() {

    }

    protected LoadStorage() {
      let json_data = cc.sys.localStorage.getItem(`model_${this.modelName}`);
      if(!json_data){
        console.log('json data is null');
        this._dLocalData = {}
        this.Save();
        return;
      }
        let data = JSON.parse(json_data);
        if (!data || data === "") {
            this._dLocalData = {}
            this.Save();
        } else {
            this._dLocalData = data;
        }
    }

    /**
     * protected 只让实现类操作数据  也就是model类型操作数据 对外提供别的方法
     * @param sKey 
     * @param defaultValue 
     */
    protected Query(sKey: string, defaultValue: any = null) {
        if (this._dLocalData[sKey] != undefined) {
            return this._dLocalData[sKey];
        }
        return defaultValue;
    }

    /**
     * 设置成功返回 true，反之返回 false 用于是否保存数据
     * @param sKey 
     * @param value
     */
    protected Set(sKey: string, value: string | number) {
        if (this._dLocalData[sKey] && this._dLocalData[sKey] == value) {
            return false;//一样就不要改了
        }
        this._dLocalData[sKey] = value;
        return true;
    }

    protected Save() {
        cc.sys.localStorage.setItem(`model_${this.modelName}`, JSON.stringify(this._dLocalData));
    }
}
