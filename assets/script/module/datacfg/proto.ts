export class PROTO {
  public static readonly saddr = 'http://1.15.40.65:17263/player/action';
  public static readonly s2c_err = 100012; // 通用失败返回协议号
  public static readonly s2c_ok = 100022; // 通用成功返回协议号
  public static readonly s2c_login = 110012; // 登录返回
  public static readonly c2s_player_info = 120011; // 玩家数据请求
  public static readonly s2c_player_info = 120012; // 玩家数据返回
  public static readonly c2s_loop_sync = 130001; // 玩家心跳数据同步
  public static readonly c2s_money_sync = 130011; // 玩家货币数据同步
  public static readonly c2s_lv_sync = 130021; // 玩家等级数据同步
  public static readonly c2s_builds_sync = 130031; // 玩家已解锁建筑数据同步
  public static readonly c2s_npcs_sync = 130041; // 玩家已解锁角色数据同步
  public static readonly c2s_maps_sync = 130051; // 玩家地图建筑数据同步
  public static readonly c2s_money_opt = 140021; // 玩家货币变更操作
}


let proto: object = {
  100012: { Error: undefined },
  100022: {},
  110012: { Token: undefined, OpenID: undefined, SessionKey: undefined },
  120011: {},
  120012: { Lv: undefined, Exp: undefined, Money: undefined, Builds: undefined, Npcs: undefined, Maps: undefined, Times: undefined },
  130001: {},
  130011: { Money: undefined },
  130021: { Lv: undefined, Exp: undefined },
  130031: { Builds: undefined },
  130041: { Npcs: undefined },
  130051: { Maps: undefined },
  140021: { Opt: undefined, Type: undefined, Num: undefined }
};
export default proto;