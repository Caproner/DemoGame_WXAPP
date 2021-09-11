import { GameEvent } from "../../main/EventConst";
import EventManager from "../../../framework/manager/EventManager";
import ViewCtrl from "../../../framework/ui/ViewCtrl";

const { ccclass } = cc._decorator;

@ccclass
export default class TabBarVC extends ViewCtrl {

  private building: cc.Node = undefined;
  onLoad() {

    this.name = 'TabBarVC';
    super.onLoad();
    //console.log(this.view);
    this.building = this.view['Build'];
    if (this.building) {
      this.building.on('click', () => { EventManager.emit(GameEvent.Show_BuildBar) });
    }
    if (this.view['Pack']) {
      this.view['Pack'].on('click', () => { EventManager.emit(GameEvent.Test_OverWriteMapAndCurrency) });
    }
  }

  start() {
  }

  update(dt: number) {
  }

}