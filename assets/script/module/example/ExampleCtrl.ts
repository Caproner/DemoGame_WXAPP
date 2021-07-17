import EventManager from "../../framework/manager/EventManager";
import Ctrl from "../../framework/util/Ctrl";
import DataCenter from "../main/DataCenter";
import ExampleModel from "./model/ExampleModel";

export default class ExampleCtrl extends Ctrl {

    constructor() {
        super('ExampleCtrl');
    }

    protected getMessageListeners() {
        return {
            'EXEC_SHOW_NUM': this.show
        };
    };

    show() {
        let model: ExampleModel = DataCenter.inst.getModel('Example');
        //console.log(model);
        if (!model) {
            return;
        }
        model.add(2);
        console.log(model.get());
        EventManager.emit('SHOW_NUM', model.get());
    }
};