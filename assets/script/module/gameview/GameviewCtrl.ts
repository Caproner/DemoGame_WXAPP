import Ctrl from "../../framework/util/Ctrl";
import DataCenter from "../main/DataCenter";
import { GameEvent } from "../main/EventConst";
import MapModel from "./model/MapModel";

export default class GameviewCtrl extends Ctrl {

    constructor() {
        super('GameviewCtrl');
    }

    protected getMessageListeners() {
        let map: object = {};
        map[GameEvent.GAME_TEST] = this.test;
        map[GameEvent.Build] = this.build;
        return map;
    };

    test(num: number) {
        console.log(`num is ${num}`);
    }

    build(obj: object) {

        let map: MapModel = DataCenter.inst.getModel('Map');
        let id: number = obj['id'];
        let pos: cc.Vec2 | cc.Vec3 = obj['pos'];
        map.map[pos.y + 1][pos.x + 1]['building'] = id;
    }

};