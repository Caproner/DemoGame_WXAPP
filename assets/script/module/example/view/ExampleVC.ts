import EventManager from "../../../framework/manager/EventManager";
import ViewCtrl from "../../../framework/ui/ViewCtrl";
import Log from "../../../framework/util/Log"

const { ccclass } = cc._decorator;

@ccclass
export default class BGVC extends ViewCtrl {
    private count: number = 0;
    onLoad() {
        this.name = 'BGVC';
        super.onLoad();
        EventManager.on('SHOW_NUM', this.showNum, this);
    }

    start() {
        let callback: Function = () => {
            if (this.count > 4) {
                this.unschedule(callback);
            }
            Log.log(this.count);
            ++this.count;
            EventManager.emit('EXEC_SHOW_NUM');
        };
        this.schedule(callback, 1);
    }

    update(dt: number) {
    }

    showNum(num: number) {
        let label = this.view['Tip'].getComponent(cc.Label);
        label.string = '数值：' + num;
    }
}