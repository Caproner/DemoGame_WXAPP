import EventManager from "../../../framework/manager/EventManager";
import ViewCtrl from "../../../framework/ui/ViewCtrl";
import ViewLoader from "../../../framework/ui/ViewLoader";
import MainCtrl from "../../main/MainCtrl";
import { ViewLoaderEvent } from "../../main/EventConst";

const { ccclass } = cc._decorator;

@ccclass
export default class LoadingVC extends ViewCtrl {

    onLoad() {
        this.name = 'LoadingVC';
        super.onLoad();
    }

    start() {
        this.scheduleOnce(() => {
            if (MainCtrl.isWx) {
                wx.login({

                });
            }
            EventManager.emit(ViewLoaderEvent.VIEW_GAMEVIEW);
        }, 2);
    }

    update(dt: number) {
    }
}