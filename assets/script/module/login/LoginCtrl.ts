import Ctrl from "../../framework/util/Ctrl";

const { ccclass } = cc._decorator;

@ccclass
export default class LoginCtrl extends Ctrl {

    constructor() {
        super('LoginCtrl');
    }

    protected getMessageListeners() {
        return {};
    };

};