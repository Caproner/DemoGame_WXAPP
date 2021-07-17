import Ctrl from "../../framework/util/Ctrl";

const { ccclass } = cc._decorator;

@ccclass
export default class LoadingCtrl extends Ctrl {

    constructor() {
        super('LoadingCtrl');
    }

    protected getMessageListeners() {
        return {};
    };

};