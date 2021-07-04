
const {ccclass, property} = cc._decorator;

@ccclass
class UiManager extends cc.Component {
    
    add_btn_listen(node, caller, func){
        //console.log(node);
        let btn = node.getComponent(cc.Button);
        //console.log(btn);
        if(!btn){
            return;
        }
        
        node.on("click",func,caller);
    }

    load_ui(parent, name){
        cc.loader.loadRes("prefabs/" + name, function(err, prefab){
            let item = cc.instantiate(prefab);
            parent.addChild(item);
            item.addComponent(name+"Ctrl");
        })
    }

    unload_ui(parent, naame){
        
    }

}

export default new UiManager();