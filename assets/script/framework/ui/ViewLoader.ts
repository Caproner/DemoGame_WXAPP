
const { ccclass } = cc._decorator;

@ccclass
class ViewLoader {

    private namePathMap: Map<string, string> = undefined;
    constructor() {
        this.namePathMap = new Map<string, string>();
    }

    /**
     *加载视图并且挂载脚本
     *
     * @author guan
     * @date 2021/07/14
     * @param {cc.Node} parent
     * @param {string} name
     * @param {Function} compelete
     * @memberof ViewLoader
     */
    loadView(parent: cc.Node, name: string, compelete?: Function) {
        cc.resources.load('prefabs/' + name, (err: Error, prefab: cc.Prefab) => {
            if (err) {
                console.log(err);
                return;
            }
            let node = cc.instantiate(prefab);
            parent.addChild(node);
            let baseName: string = cc.path.basename(name);
            this.namePathMap[baseName] = 'prefabs/' + name;
            node.addComponent(baseName + 'VC');
            if (compelete != undefined) {
                compelete();
            }
        });
    }

    // loadLayer(parent: cc.Node, name: string, compelete: Function) {
    //     console.log(name);
    //     cc.resources.load('prefabs/' + name, (err: Error, prefab: cc.Prefab) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         let node = cc.instantiate(prefab);
    //         parent.addChild(node);
    //         let baseName: string = cc.path.basename(name);
    //         this.namePathMap[baseName] = 'prefabs/' + name;
    //         node.addComponent(baseName + 'LC');
    //         if (compelete != undefined) {
    //             compelete();
    //         }
    //     });
    // }

    /**
     *根据名字释放加载的预制体
     *
     * @author guan
     * @date 2021/07/14
     * @param {string} name
     * @returns {*} 
     * @memberof ViewLoader
     */
    release(name: string) {
        if (false == this.namePathMap.has(name)) {
            return;
        }
        let path: string = this.namePathMap.get(name);
        cc.resources.release(path, cc.Prefab);
        this.namePathMap.delete(name);
    }

    /**
     *清空预制体资源
     *
     * @author guan
     * @date 2021/07/14
     * @memberof ViewLoader
     */
    clear() {
        this.namePathMap.forEach((key, value) => {
            cc.resources.release(value, cc.Prefab);
        });
        this.namePathMap.clear();
    }

}

export default new ViewLoader();