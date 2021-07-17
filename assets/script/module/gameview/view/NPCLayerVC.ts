import ViewCtrl from "../../../framework/ui/ViewCtrl";

const { ccclass } = cc._decorator;

@ccclass
export default class NPCLayerVC extends ViewCtrl {

    onLoad() {
        this.name = 'NPCLayerVC';
        super.onLoad();
    }

    start() {
    }

    update (dt:number){
    }
}