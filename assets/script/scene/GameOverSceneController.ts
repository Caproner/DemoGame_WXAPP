import UiManager from "../manager/UiManager";
import UiCtrl from "../base/UiCtrl";
const {ccclass, property} = cc._decorator;
@ccclass
export default class GameOverSceneController extends UiCtrl {
    onLoad () {
      super.onLoad();
      UiManager.load_ui(this.node,'GameOverView');
      
    }


    start () {
    }
    // update (dt) {}
}