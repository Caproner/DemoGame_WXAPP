import UiManager from "../manager/UiManager";
import UiCtrl from "../base/UiCtrl";
import SceneManager from "../manager/SceneManager";
const { ccclass, property } = cc._decorator;
@ccclass
export default class LoadSceneController extends UiCtrl {
  onLoad() {
    super.onLoad();
    UiManager.load_ui(this.node,'StartView');
  }


  start() {
    // this.scheduleOnce(function(){
    //   SceneManager.loadScene('MainScene');
    // },2);
  }
  // update (dt) {}
}