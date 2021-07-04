import UiManager from "../manager/UiManager";
import UiCtrl from "../base/UiCtrl";
const { ccclass, property } = cc._decorator;
@ccclass
export default class MainSceneController extends UiCtrl {

  onLoad() {
    super.onLoad();
    //UiManager.load_ui(this.node, "StartView");
    UiManager.load_ui(this.node,'GameView');
  }


  start() {
  }
  // update (dt) {}
}