
import { Network } from "../../framework/net/NetWork";
import Ctrl from "../../framework/util/Ctrl";
import { SingletonFactory } from "../../framework/util/SingletonFactory";
import GameviewCtrl from "../gameview/GameviewCtrl";
import LoginCtrl from "../login/LoginCtrl";
import ExampleCtrl from "../example/ExampleCtrl";

export default class MainCtrl {

  private static instance: MainCtrl = undefined;
  public static get inst(): MainCtrl {
    if (!MainCtrl.instance) {
      MainCtrl.instance = new MainCtrl();
    }
    //console.log('inst');
    return MainCtrl.instance;
  }
  private constructor() {
    this.init();
  }
  public ctrlMap: Map<string, any> = undefined;
  public net: Network = undefined;
  public isWx: boolean = false;



  private init() {
    this.isWx = cc.sys.platform == cc.sys.WECHAT_GAME;
    this.net = SingletonFactory.getInstance(Network);
    this.initCtrl();
  }

  private initCtrl() {
    this.ctrlMap = new Map<string, any>();
    this.pushCtrl(new GameviewCtrl());
    this.pushCtrl(new LoginCtrl());
    this.pushCtrl(new ExampleCtrl());
  }

  private pushCtrl(ctrl: Ctrl) {
    this.ctrlMap.set(ctrl.name, ctrl);
  }



}
