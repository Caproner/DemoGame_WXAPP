

const {ccclass, property} = cc._decorator;

@ccclass
class ISceneManager extends cc.Component {
    loadScene(scene_name){
        cc.director.loadScene(scene_name, function(){
                let canvas = cc.find("Canvas");
                canvas.addComponent(scene_name + "Controller");
        });
       
    }
    
}

export default new ISceneManager();