import { GameEvent } from "../../main/EventConst";
import EventManager from "../../../framework/manager/EventManager";
import ViewCtrl from "../../../framework/ui/ViewCtrl";

const { ccclass } = cc._decorator;

@ccclass
export default class BuildBarVC extends ViewCtrl {

    private meet: cc.Node = undefined;
    private corn: cc.Node = undefined;
    private mark: cc.Node = undefined;
    private closeBtn: cc.Node = undefined;
    onLoad() {
        this.name = 'BuildBarVC';
        super.onLoad();
        this.meet = this.view['Meet'];
        this.corn = this.view['Corn'];
        this.mark = this.view['Mark50'];
        this.closeBtn = this.view['CloseButton'];
        if (this.mark) {
            this.mark.setPosition(cc.v3(0, -500, 0));
        }
        if (this.closeBtn) {
            this.closeBtn.on('click', this.closeBar, this);
        }
        if (this.meet) {
            this.meet.on('click', this.buildMeet, this);
        }
        if (this.corn) {
            this.corn.on('click', this.buildCorn, this);
        }

    }

    start() {
    }

    update(dt: number) {
    }

    buildMeet() {
        this.mark.setPosition(this.meet.position);
        EventManager.emit(GameEvent.Set_Build_Id, 1);
    }

    buildCorn() {
        this.mark.setPosition(this.corn.position);
        EventManager.emit(GameEvent.Set_Build_Id, 2);
    }

    closeBar() {
        this.mark.setPosition(cc.v3(0, -500, 0));
        EventManager.emit(GameEvent.Show_TabBar);
        EventManager.emit(GameEvent.Set_Build_Id, 0);
    }

}