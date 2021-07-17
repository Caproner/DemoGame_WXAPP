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
        this.building = this.view['Build'];
        if (this.building) {
            this.building.on('click', () => { EventManager.emit(GameEvent.Show_BuildBar) });
        }
    }

    start() {
    }

    update(dt: number) {
    }

}