
import { Network } from "../../framework/net/NetWork";
import { SingletonFactory } from "../../framework/util/SingletonFactory";
import GameviewCtrl from "../gameview/GameviewCtrl";
import LoginCtrl from "../login/LoginCtrl";
import EventManager from "../../framework/manager/EventManager";
import { GameEvent } from "./EventConst";
import DataCenter from "./DataCenter";
import axios from "../../framework/net/src/Axios";
import Util from "../../framework/util/Util";
import { PROTO } from "../datacfg/proto";

const { ccclass } = cc._decorator;
export default class MainCtrl extends cc.Component {

  private static instance: MainCtrl = undefined;
  public static get inst(): MainCtrl {
    if (!MainCtrl.instance) {
      MainCtrl.instance = new MainCtrl();
    }
    //console.log('inst');
    return MainCtrl.instance;
  }
  private constructor() {
    super();
    this.init();
    this.register();
    this.schedule(this.loopSync, 60);
  }

  private register() {
    EventManager.on(GameEvent.Login_Succeeded, this.initAllData, this);
  }

  public net: Network = undefined;
  public isWx: boolean = false;
  public gameViewCtrl: GameviewCtrl = undefined;
  public loginCtrl: LoginCtrl = undefined;



  private init() {
    this.isWx = cc.sys.platform == cc.sys.WECHAT_GAME;
    this.net = SingletonFactory.getInstance(Network);
    this.initCtrl();
  }

  private initCtrl() {
    this.gameViewCtrl = new GameviewCtrl();
    this.loginCtrl = new LoginCtrl();
  }

  private initAllData(mdata: any, wxinfo: any) {
    if (!mdata || !wxinfo) {
      //console.log("initMap");
      //EventManager.emit(GameEvent.Test_InitMap);
      return;
    }
    //console.log(data);
    //console.log(wxinfo);
    DataCenter.inst.wxUserModel.openID = mdata.data.OpenID;
    DataCenter.inst.wxUserModel.avatarUrl = wxinfo.avatarUrl;
    DataCenter.inst.wxUserModel.city = wxinfo.city;
    DataCenter.inst.wxUserModel.country = wxinfo.country;
    DataCenter.inst.wxUserModel.gender = wxinfo.gender;
    DataCenter.inst.wxUserModel.nickName = wxinfo.nickName;


    axios({
      url: PROTO.saddr,//'http://1.15.40.65:17263/player/action',
      data: {
        Proto: PROTO.c2s_player_info,
        OpenID: mdata.data.OpenID
      }
    }).then(res => {
      // let mapData: Array<Array<object>> = res.data.data.Maps.map
      // console.log(mapData);
      // DataCenter.inst.mapModel.loadMapdata(mapData)
      let data = res.data;
      console.log(data);
      let mapData: any = data.data.Maps;
      if (Util.isValidObject(mapData)) {
        DataCenter.inst.mapModel.map = mapData;
      }
      else {
        console.log("invalid mapData");
      }
      DataCenter.inst.userInfoModel.setData(data.data);
      //console.log(data.data.Builds);
      // if (data.data.Builds && data.data.Builds.length > 0) {
      //   DataCenter.inst.mapModel.buildings = data.data.Builds;
      // }
      // else {
      //   console.log("invalid buildings");
      // }
    })
      .catch(err => { console.log("数据获取:", err) })
  }

  private loopSync() {
    axios({
      url: PROTO.saddr,
      data: {
        Proto: PROTO.c2s_loop_sync,//'130001',
        OpenID: DataCenter.inst.wxUserModel.openID,
      }
    }).then(res => { console.log(res) })
      .catch(err => { console.log(err) })
  }

}

