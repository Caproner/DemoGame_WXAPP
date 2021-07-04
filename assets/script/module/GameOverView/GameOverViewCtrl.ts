import UiCtrl from "../../base/UiCtrl";
import { SingletonFactory } from "../../commom/SingletonFactory";
import SceneManager from "../../manager/SceneManager";
import UiManager from "../../manager/UiManager";
import MaxScoreDM from "../GameView/MaxScoreDM";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameOverViewCtrl extends UiCtrl {
    private _scoreDM:MaxScoreDM = null;
    onLoad() {
        super.onLoad();
        let btn = this.view['CancelButton'];
        if (btn) {
            UiManager.add_btn_listen(btn, this, this.cancel);
        }
        this._scoreDM = SingletonFactory.getInstance(MaxScoreDM);
        this.view['Score'].getComponent(cc.Label).string = '得分:' + this._scoreDM.getScore();
        this.view['MaxScore'].getComponent(cc.Label).string = '最高分:' + this._scoreDM.get();
    }

    start() {

    }
    // update (dt) {}

    cancel() {
       // console.log("cancel");
        SceneManager.loadScene('LoadScene');
    }
}