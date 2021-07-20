import EventManager from "./framework/manager/EventManager";
import ViewLoader from "./framework/ui/ViewLoader";
import Log from "./framework/util/Log"
import proto from "./module/datacfg/proto";
import DataCenter from "./module/main/DataCenter";
import { GameEvent, ViewLoaderEvent } from "./module/main/EventConst";
import MainCtrl from "./module/main/MainCtrl";


const { ccclass } = cc._decorator;

@ccclass
export default class GameStart extends cc.Component {


  onLoad() {
    //初始化数据中心和控制中心
    DataCenter.inst;
    MainCtrl.inst;
    //Log.log('hello world');
    //ViewLoader.loadView(this.node, 'example/Example');
    //ViewLoader.loadView(this.node, 'GameView/GameView');
    //ViewLoader.loadView(this.node, 'loading/Loading');
    ViewLoader.loadView(this.node, 'login/Login');
    this.registerEvent();

  }

  private registerEvent() {
    EventManager.on(ViewLoaderEvent.VIEW_GAMEVIEW, () => {
      ViewLoader.loadView(this.node, 'GameView/GameView');
    });
    EventManager.on(ViewLoaderEvent.View_Login_to_GameView, () => {
      let child = this.node.getChildByName('Login');
      this.node.removeChild(child);
      ViewLoader.loadView(this.node, 'GameView/GameView');
    });
  }

  start() {

  }

  update(dt: number) {

  }
}


