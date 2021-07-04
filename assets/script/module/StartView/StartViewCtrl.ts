import UiCtrl from "../../base/UiCtrl";
import SceneManager from "../../manager/SceneManager";
import UiManager from "../../manager/UiManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class StartViewCtrl extends UiCtrl {
    onLoad() {
        super.onLoad();
        let btn = this.view['StartButton'];
        //console.log(btn);
        if (btn) {
            UiManager.add_btn_listen(btn, this, this.startGame);
        }
    }

    start() {

    }
    // update (dt) {}

    startGame() {
        SceneManager.loadScene('MainScene');
    }
}