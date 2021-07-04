'use strict';

const fs = require('fire-fs');
const path = require('fire-path');
const project_path = Editor.Project.path;

let script_template = 'import UiCtrl from "../../base/UiCtrl";\n\
import UiManager from "../../manager/UiManager";\n\
const {ccclass, property} = cc._decorator;\n\
\n\
@ccclass\n\
export default class UINAMECtrl extends UiCtrl {\n\
    onLoad () {\n\
        super.onLoad();\n\
    }\n\n\
    start () {\n\
      \n\
    }\n\
    // update (dt) {}\n\
}';

let scene_ctrl_template = 'import UiManager from "../manager/UiManager";\n\
import UiCtrl from "../base/UiCtrl";\n\
const {ccclass, property} = cc._decorator;\n\
@ccclass\n\
export default class UINAMEController extends UiCtrl {\n\
    onLoad () {\n\
      super.onLoad();\n\
    }\n\n\n\
    start () {\n\
    }\n\
    // update (dt) {}\n\
}';

function createPrefabScript(assetInfo){
   let url = assetInfo.url;
   let base_name = path.basenameNoExt(url);
   let module_folder = path.join(project_path, "assets/script/module/" +  base_name);
   if (!fs.existsSync(module_folder)) {
     fs.mkdirsSync(module_folder);
   }
   let ouput_url = "db://assets/script/module/" + base_name + "/" + base_name + "Ctrl.ts";
   Editor.log(ouput_url);
   if(Editor.assetdb.exists(ouput_url))
   {
     Editor.log(`文件${ouput_url}已存在`);
   }
   else
   {
     let temp_template = script_template;
     temp_template = temp_template.replace("UINAME",base_name);
     Editor.assetdb.create(ouput_url,temp_template);
   }
}

function createSceneScript(assetInfo){
  let url = assetInfo.url;
  let base_name = path.basenameNoExt(url);
  let module_folder = path.join(project_path, "assets/script/scene/");
  if (!fs.existsSync(module_folder)) {
    fs.mkdirsSync(module_folder);
  }
  let ouput_url = "db://assets/script/scene/" + base_name + "Controller.ts";
  Editor.log(ouput_url);
  if(Editor.assetdb.exists(ouput_url))
  {
    Editor.log(`文件${ouput_url}已存在`);
  }
  else
  {
    let temp_template = scene_ctrl_template;
    temp_template = temp_template.replace("UINAME",base_name);
    Editor.assetdb.create(ouput_url,temp_template);
   
  }
}

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'create' () {
      //Editor.log('Hello World!');
      let currentSelection = Editor.Selection.curSelection('asset');
      if(currentSelection.length < 1){
        Editor.log("null");
      }
      let selectionUUid = currentSelection[0];
      let assetInfo = Editor.assetdb.assetInfoByUuid(selectionUUid);
      let assetType = assetInfo.type;
      //Editor.log(assetType);
      if(assetType === 'prefab')
      {
        createPrefabScript(assetInfo);
      }
      else if(assetType === 'scene')
      {
        Editor.log("scene");
        createSceneScript(assetInfo);
      }
      else
      {
        Editor.log("please select prefab or scene");
      }
    },
  },
};