export class PROTO {
  public static readonly c2s_login = 100011;
  public static readonly c2s_player_info = 110011;
  public static readonly s2c_player_info = 110012;
}


let proto: object = {
  100011: { Code: undefined },
  110011: {},
  110012: { Lv: undefined, Exp: undefined, Builds: undefined, Npcs: undefined, Maps: undefined, UpdateTime: undefined }
};
export default proto;