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


let tiledIdMap = {
  11: 2,
  12: 2,
  13: 2,
  14: 2,
  30: 2,
  43: 2,
  45: 2,
  19: 3,
  20: 3,
  35: 3,
  36: 3
};

let girdWidth: number = 48;
let halfGirdWidth: number = 24;

@ccclass
export default class GameViewVC extends ViewCtrl {

  private tabBar: cc.Node = undefined;
  private buildBar: cc.Node = undefined;
  private titleBar: cc.Node = undefined;
  private map: cc.Node = undefined;
  private num = 0;
  private buildId: number = -1;
  private buildingPrefabs: object = {};
  private buildingLayer: cc.Node = undefined;
  private npcLayer: cc.Node = undefined;
  private userInfoView: cc.Node = undefined;
  private mapFlag = undefined;//测试用,不要直接访问model
  onLoad() {
    this.name = 'GameViewVC';
    super.onLoad();
    this.map = this.node.getChildByName('TiledMap001');
    this.buildingLayer = this.node.getChildByName('BuildingLayer');
    this.loadUi();
    this.registerEvent();
    this.mapFlag = DataCenter.inst.mapModel.map;
    //EventManager.emit(GameEvent.Req_Init_BuildingUI);
    //this.initMapModel();
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
    let size = 5;
    for (let i = 1; i < size; ++i) {
      cc.resources.load('prefabs/building/B' + i, cc.Prefab, (err: Error, prefab: cc.Prefab) => {
        if (err) {
          Log.log(`load prefab failed:prefabs/building/B${i}`);
        }
        this.buildingPrefabs[i] = prefab;
        if (size == i + 1) {
          EventManager.emit(GameEvent.Req_Init_BuildingUI);
        }
      });
    }
  }

  private registerEvent() {
    EventManager.on(GameEvent.Show_BuildBar, this.showBuildBar, this);
    EventManager.on(GameEvent.Show_TabBar, this.showTabBar, this);
    EventManager.on(GameEvent.Set_Build_Id, this.setBuildId, this);
    EventManager.on(GameEvent.Show_UserInfoView, this.showUserInfo, this);
    EventManager.on(GameEvent.Close_UserInfoView, this.closeUserInfoView, this);
    EventManager.on(GameEvent.Build_UI, this.build, this);
    //EventManager.on(GameEvent.Test_InitMap, this.initMapModel, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
  }

  start() {
  }

  update(dt: number) {
  }

  showBuildBar() {
    if (this.tabBar && this.buildBar) {
      this.tabBar.active = false;
      this.buildBar.active = true;
      this.buildId = 0;
    }
  }

  showTabBar() {
    if (this.tabBar && this.buildBar) {
      this.tabBar.active = true;
      this.buildBar.active = false;
      this.buildId = -1;
      //console.log(this.buildId);
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

  //test
  touchEnd(t: cc.Touch) {
    if (this.buildId < 0) {
      return;
    }
    if (!this.buildingLayer) {
      return;
    }
    //Log.log(this.buildId);
    //Log.log(DataCenter.inst.mapModel.map);
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
    let girdPos: cc.Vec3 = Util.girdPos(pos, girdWidth, girdWidth);
    girdPos.x = Math.floor(girdPos.x / 2) * 2;
    girdPos.y = Math.floor(girdPos.y / 2) * 2;
    //console.log(girdPos);
    EventManager.emit(GameEvent.Build, { 'id': this.buildId, 'pos': girdPos });
  }

  build(girdPos: cc.Vec3 | cc.Vec2, id: number, remove: boolean) {
    if (!this.buildingLayer) {
      return;
    }
    //Log.log(girdPos, remove);
    //let pos2: cc.Vec3 = cc.v3(girdPos.x * girdWidth + halfGirdWidth, girdPos.y * girdWidth + halfGirdWidth, 0);
    let pos2: cc.Vec3 = cc.v3((girdPos.x + 1) * girdWidth, (girdPos.y + 1) * girdWidth, 0);
    if (remove) {

      let pos2d = cc.v2(pos2.x, pos2.y);
      for (let i = 0; i < this.buildingLayer.children.length; ++i) {
        let child: cc.Node = this.buildingLayer.children[i];
        let childRect: cc.Rect = child.getBoundingBox();
        if (childRect.contains(pos2d)) {
          this.buildingLayer.removeChild(child);
          return;
        }
      }
      return;
    }
    if (id < 1) {
      return;
    }
    let item = cc.instantiate(this.buildingPrefabs[id]);
    item.setPosition(pos2);
    this.buildingLayer.addChild(item);

  }

  initMapModel() {
    if (!this.map) {
      console.log("invalid this.map")
      return;
    }

    let tiledMap: cc.TiledMap = this.map.getComponent(cc.TiledMap);
    if (!tiledMap) {
      console.log("invalid tiledmap");
      return;
    }
    let layer: cc.TiledLayer = tiledMap.getLayer('terrain');
    if (!layer) {
      console.log("invalid layer");
      return;
    }
    let size: cc.Size = layer.getLayerSize();
    let row: number = size.height;
    let col: number = size.width;
    this.mapFlag = new Array<Array<object>>();
    let idarr = new Array<Array<number>>();
    for (let i = row - 1; i > -1; --i) {
      let arr: Array<object> = new Array<object>();
      let arr2: Array<number> = new Array<number>();
      for (let j = 0; j < col; ++j) {
        let obj = {
          terrain:
          {
            id: 1
          },
          building:
          {
            id: 0
          },
        };
        let tiled: cc.TiledTile = layer.getTiledTileAt(j, i, true);
        let id: number = tiledIdMap[tiled.gid];
        if (id) {
          obj.terrain.id = id;
        }
        arr.push(obj);
        arr2.push(obj.terrain.id);
      }//end for j
      this.mapFlag.push(arr);
      idarr.push(arr2);
    }//end for i

    DataCenter.inst.mapModel.map = this.mapFlag;
    console.log(DataCenter.inst.mapModel.map);
    //console.log(this.mapFlag);
    console.log(idarr);
  }

}