import { GameEvent } from "../../main/EventConst";
import EventManager from "../../../framework/manager/EventManager";
import ViewCtrl from "../../../framework/ui/ViewCtrl";

const { ccclass } = cc._decorator;

@ccclass
export default class BuildBarVC extends ViewCtrl {

  private mark: cc.Node = undefined;
  // private building: cc.Node[] = undefined;
  private closeBtn: cc.Node = undefined;
  onLoad() {
    this.name = 'BuildBarVC';
    super.onLoad();

    this.mark = this.view['Mark50'];
    this.closeBtn = this.view['CloseButton'];
    if (this.mark) {
      this.mark.setPosition(cc.v3(0, -500, 0));
    }
    if (this.closeBtn) {
      this.closeBtn.on('click', this.closeBar, this);
    }
    let self = this;
    for (let i = 1; i < 5; ++i) {
      let node: cc.Node = this.view['B' + i];
      if (node) {
        node.on('click', () => { self.mark.setPosition(node.position); EventManager.emit(GameEvent.Set_Build_Id, i); }, this);
      }
    }

  }

  start() {
  }

  update(dt: number) {
  }

  closeBar() {
    this.mark.setPosition(cc.v3(0, -500, 0));
    EventManager.emit(GameEvent.Show_TabBar);
    EventManager.emit(GameEvent.Set_Build_Id, 0);
  }

}