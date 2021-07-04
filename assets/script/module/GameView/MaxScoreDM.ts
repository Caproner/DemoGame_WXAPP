import IDataModel from "../../base/IDataModel";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MaxScoreDM extends IDataModel {


    private _max_score: number = 0;
    //private _score:number = 0;
    // onLoad () {}

    start() {

    }

    // update (dt) {}

    init() {
        let num = super.Query('MaxScore');
        if (num == null) {
            super.Set('MaxScore', 0);
            super.Save();
            this._max_score = 0;
            return;
        }
        this._max_score = num;
    }

    get() {
        return this._max_score;
    }

    set(score) {
        if (score > this._max_score) {
            this._max_score = score;
            super.Set('MaxScore', this._max_score);
            super.Save();
        }
    }

    setScore(score) {
        super.Set('Score', score);
        super.Save();
    }

    getScore() {
        let res = super.Query('Score', 0);
        return res;
    }

}
