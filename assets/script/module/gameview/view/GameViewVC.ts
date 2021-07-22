import { GameEvent } from "../../main/EventConst";
import EventManager from "../../../framework/manager/EventManager";
import ViewCtrl from "../../../framework/ui/ViewCtrl";
import ViewLoader from "../../../framework/ui/ViewLoader";
//import ResourceManager from "../../../framework/manager/ResourceManager";
import Log from "../../../framework/util/Log"
import Util from "../../../framework/util/Util";
import MapModel from "../model/MapModel";
import DataCenter from "../../main/DataCenter";

const { ccclass } = cc._decorator;

@ccclass
export default class GameViewVC extends ViewCtrl {

  private tabBar: cc.Node = undefined;
  private buildBar: cc.Node = undefined;
  private titleBar: cc.Node = undefined;
  private map: cc.Node = undefined;
  private num = 0;
  private buildId: number = 0;
  private buildingPrefabs: object = {};
  private buildingLayer: cc.Node = undefined;
  private npcLayer: cc.Node = undefined;
  private userInfoView: cc.Node = undefined;
  private mapFlag = undefined;//测试用,不要直接访问model
  onLoad() {
    this.name = 'GameViewVC';
    super.onLoad();
    this.map = this.node.getChildByName('TiledMap');
    this.buildingLayer = this.node.getChildByName('BuildingLayer');
    this.loadUi();
    this.registerEvent();
    let model: MapModel = DataCenter.inst.getModel('Map');
    this.mapFlag = model.map;
  }

  private loadUi() {
    ViewLoader.loadView(this.node, 'GameView/NPCLayer', () => { this.npcLayer = this.node.getChildByName('NPCLayer'); });
    //ViewLoader.loadView(this.node, 'GameView/TiledMap', () => { this.map = this.node.getChildByName('TiledMap') });
    ViewLoader.loadView(this.node, 'GameView/TitleBar', () => { this.titleBar = this.node.getChildByName('TitleBar') });
    ViewLoader.loadView(this.node, 'GameView/TabBar', () => { this.tabBar = this.node.getChildByName('TabBar') });
    ViewLoader.loadView(this.node, 'GameView/BuildBar', () => {
      this.buildBar = this.node.getChildByName('BuildBar');
      if (this.buildBar)
        this.buildBar.active = false;
    });
    for (let i = 1; i < 3; ++i) {
      cc.resources.load('prefabs/building/B' + i, cc.Prefab, (err: Error, prefab: cc.Prefab) => {
        if (err) {
          Log.log(`load prefab failed:prefabs/building/B${i}`);
        }
        this.buildingPrefabs[i] = prefab;
      });
    }
  }

  private registerEvent() {
    EventManager.on(GameEvent.Show_BuildBar, this.showBuildBar, this);
    EventManager.on(GameEvent.Show_TabBar, this.showTabBar, this);
    EventManager.on(GameEvent.Set_Build_Id, this.setBuildId, this);
    EventManager.on(GameEvent.Show_UserInfoView, this.showUserInfo, this);
    EventManager.on(GameEvent.Close_UserInfoView, this.closeUserInfoView, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
  }

  start() {
    // let callback = () => {
    //     if (this.num > 4) {
    //         this.unschedule(callback);
    //     }
    //     EventManager.emit(GameEvent.GAME_TEST, this.num);
    //     ++this.num;
    // }
    // this.schedule(callback, 2);
  }

  update(dt: number) {
  }

  showBuildBar() {
    if (this.tabBar && this.buildBar) {
      this.tabBar.active = false;
      this.buildBar.active = true;
    }
  }

  showTabBar() {
    if (this.tabBar && this.buildBar) {
      this.tabBar.active = true;
      this.buildBar.active = false;
    }
  }

  showUserInfo() {
    if (!this.userInfoView) {
      //Log.log('load user');
      ViewLoader.loadView(this.node, 'GameView/UserInfo', () => {
        this.userInfoView = this.node.getChildByName('UserInfo');
        //Log.log(this.userInfoView.position);
      });
    }
    else {
      // this.userInfoView.setPosition(0, 0);
      this.userInfoView.active = true;
    }
  }

  closeUserInfoView() {
    if (this.userInfoView) {
      //this.userInfoView.setPosition(-1000, 0);
      this.userInfoView.active = false;
    }
  }

  setBuildId(id: number) {
    this.buildId = id;
    //Log.log(this.buildId);
  }


  touchEnd(t: cc.Touch) {
    if (this.buildId < 1 || undefined == this.buildingPrefabs[this.buildId]) {
      return;
    }
    if (!this.buildingLayer) {
      return;
    }
    let pos = this.node.convertToNodeSpaceAR(t.getLocation());
    if (this.tabBar) {
      let bottomRect = this.tabBar.getBoundingBox();
      if (bottomRect.contains(pos)) {
        return;
      }
    }
    if (this.titleBar) {
      let topRect = this.titleBar.getBoundingBox();
      if (topRect.contains(pos)) {
        return;
      }
    }
    pos = this.buildingLayer.convertToNodeSpaceAR(t.getLocation());
    let item = cc.instantiate(this.buildingPrefabs[this.buildId]);
    let girdPos: cc.Vec3 = Util.girdPos(pos, 50, 50);
    let pos2: cc.Vec3 = cc.v3(girdPos.x * 50 + 25, girdPos.y * 50 + 25, 0);
    if (this.mapFlag[girdPos.y + 1][girdPos.x + 1]['terrain'] == 1) {
      return;
    }
    let pos2d = cc.v2(pos2.x, pos2.y);
    for (let i = 0; i < this.buildingLayer.children.length; ++i) {
      let child: cc.Node = this.buildingLayer.children[i];
      let childRect: cc.Rect = child.getBoundingBox();
      if (childRect.contains(pos2d)) {
        this.buildingLayer.removeChild(child);
        EventManager.emit(GameEvent.Build, { 'id': 0, 'pos': girdPos });
        return;
      }
    }
    item.setPosition(pos2);
    this.buildingLayer.addChild(item);
    EventManager.emit(GameEvent.Build, { 'id': this.buildId, 'pos': girdPos });
  }

}