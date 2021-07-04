
const {ccclass, property} = cc._decorator;

@ccclass
export default class UiCtrl extends cc.Component {
    public view;

    init(root, path){
        let children = root.children;
        for(let i = 0;i<children.length;++i){
            this.view[path+root.children[i].name] = root.children[i];
            this.init(root.children[i], path + root.children[i].name + "/");
        }
    }

    onLoad () {
        this.view = {};
        this.init(this.node,"");
    }

    start () {
        
    }

    // update (dt) {}
}
