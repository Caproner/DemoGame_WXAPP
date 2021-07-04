import UiCtrl from "../../base/UiCtrl";
import { SingletonFactory } from "../../commom/SingletonFactory";
import EventManager from "../../manager/EventManager";
import SceneManager from "../../manager/SceneManager";
import UiManager from "../../manager/UiManager";
import MaxScoreDM from "./MaxScoreDM";
const { ccclass, property } = cc._decorator;

let maxCount = 60;
@ccclass
export default class GameViewCtrl extends UiCtrl {
    private _maxScore:MaxScoreDM = null;
    private _ballon: cc.Prefab = null;
    private _score: number = 0;
    private _speed: number = 200;
    private _ballon_arr = [];
    private _count: number = 0;
    private _callback = null;
    private _loadEnd = false;
    private _labelScore: cc.Label = null;
    private _labelMaxScore: cc.Label = null;
    onLoad() {
        super.onLoad();
        this._maxScore = SingletonFactory.getInstance(MaxScoreDM);
        cc.loader.loadRes("prefabs/Ballon", (err, prefab) => {
            this._ballon = prefab;
            //console.log('load');
        });
        let phy = cc.director.getPhysicsManager();
        //console.log(phy);
        phy.enabled = true;
        phy.debugDrawFlags = 1;
        phy.gravity = cc.v2(0, 100);
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchEvent, this);
        this._labelScore = this.view['Score'].getComponent(cc.Label);
        this._labelMaxScore = this.view['MaxScore'].getComponent(cc.Label);
        this._labelScore.string = '得分:0';
        this._labelMaxScore.string = '最高分:' + this._maxScore.get();
        //console.log(this._labelMaxScore);
        let btn = this.view['Cancel'];
        if (btn) {
            UiManager.add_btn_listen(btn, this, this.cancel);
        }
    }

    start() {
        //.log(this._ballon_arr);
    }

    update(dt) {
        if (this._ballon == null) {
            return;
        }
        if (!this._loadEnd) {
            this._loadEnd = true;
            this.startGame();
        }
        //this._maxScore.set(this._score);
        if (this._ballon_arr.length < 1) {
            return;
        }
        if (this._ballon_arr[0].position.y > 370) {
            this.node.removeChild(this._ballon_arr[0]);
            this._ballon_arr.shift();
        }
    }

    addBallon() {
        let item = cc.instantiate(this._ballon);
        let x = Math.random() * 315 - 187;
        let y = -380;
        item.setPosition(x, y);
        this.node.addChild(item);
        this._ballon_arr.push(item);
    }

    startGame() {
        this._score = 0;
        this._count = 0;
        this.addBallon();
        this._callback = () => {
            if (this._count >= maxCount) {
                this.unschedule(this._callback);
                this._maxScore.setScore(this._score);
                SceneManager.loadScene('GameOverScene');
            } else {
                this.addBallon();
                ++this._count;
            }
        };
        this.schedule(this._callback, 0.5);
    }


    touchEvent(t: cc.Touch) {
        //console.log('touch');
        //let pos = t.getLocation();
        let pos = this.node.convertToNodeSpaceAR(t.getLocation());
        let x = pos.x;
        let y = pos.y;
        //console.log(pos);
        for (let i = 0; i < this._ballon_arr.length; ++i) {
            let node = this._ballon_arr[i];
            let box = node.getComponent(cc.BoxCollider);
            let size = box.size;
            let w_pos = node.position;
            let xmin = w_pos.x - size.width / 2;
            let ymin = w_pos.y - size.height / 2;
            let xmax = w_pos.x + size.width / 2;
            let ymax = w_pos.y + size.height / 2;
            if (x < xmin || y < ymin || x > xmax || y > ymax) {
                continue;
            }
            ++this._score;
            this._labelScore.string = '得分:' + this._score;
           
            if (this._score > this._maxScore.get()) {
                 this._labelMaxScore.string = '最高分:' + this._score;
                 this._maxScore.set(this._score);
            }
            this.node.removeChild(this._ballon_arr[i]);
            this._ballon_arr.splice(i, 1);
            break;
        }
    }

    cancel() {
        SceneManager.loadScene('LoadScene');
    }

}