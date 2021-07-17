

const { ccclass } = cc._decorator;

/**
 *视图控制类, 界面逻辑写于此处,
 *
 * @author guan
 * @date 2021/07/11
 * @export
 * @class ViewCtrl
 * @extends {cc.Component}
 */
@ccclass
export default class ViewCtrl extends cc.Component {


    public closeTouchOut: boolean = false;
    public view: object = {};
    public name: string = 'ViewCtrl';//类名,虽然可以通过class.constructor.name获取,但是为了方便还是使用成员变量定义类名

    /**
     *初始化视图, 将节点树存入this.view中, 获取子节点时可以直接使用 this.view['childName']获取
     *
     * @author guan
     * @date 2021/07/11
     * @param {cc.Node} root 根节点
     * @param {string} path 根节点路径
     * @memberof ViewCtrl
     */
    public init(root: cc.Node, path: string): void {
        let children: cc.Node[] = root.children;
        for (let i = 0; i < children.length; ++i) {
            this.view[path + root.children[i].name] = root.children[i];
            this.init(root.children[i], path + root.children[i].name + "/");
        }
    }

    onLoad() {
        this.init(this.node, '');
    }
}
