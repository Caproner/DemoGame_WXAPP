
/**
 *游戏事件常量
 *
 * @author guan
 * @date 2021/07/13
 * @export
 * @class GameEvent
 */
export class GameEvent {
  /**测试 */
  public static readonly GAME_TEST = 'GAME_TEST';//测试
  /**显示建筑栏*/
  public static readonly Show_BuildBar = 'Show_BuildBar';//显示建筑栏
  /**显示底部工具栏 */
  public static readonly Show_TabBar = 'Show_TabBar';//显示底部工具栏
  /**初始化数据 */
  public static readonly Iint_Model = 'Init_Model';
  /**设置当前建造id*/
  public static readonly Set_Build_Id = 'Set_Build_Id';
  /**建造-设置地图信息 */
  public static readonly Build = 'Build';
  /**将获取到的微信用户信息保存到本地 */
  public static readonly Save_WXUser_Info = 'Save_WXUser_Info';
}


/**
 *视图加载事件
 *
 * @author guan
 * @date 2021/07/15
 * @export
 * @class ViewLoaderEvent
 */
export class ViewLoaderEvent {
  /**加载视图GameView */
  public static readonly VIEW_GAMEVIEW = 'VIEW_GAMEVIEW';
  /**从登录界面转到游戏界面 */
  public static readonly View_Login_to_GameView = 'View_Login_to_GameView';
}