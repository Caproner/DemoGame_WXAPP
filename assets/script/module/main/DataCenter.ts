import DataModel from "../../framework/data/DataModel";
import MapModel from "../gameview/model/MapModel";
import ExampleModel from "../example/model/ExampleModel";
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