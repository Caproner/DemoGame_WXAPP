'use strict';

const fs = require('fire-fs');
const path = require('fire-path');
const project_path = Editor.Project.path;

let script_template = `import ViewCtrl from "../../../framework/ui/ViewCtrl";

const { ccclass } = cc._decorator;

@ccclass
export default class UINAMEVC extends ViewCtrl {

    onLoad() {
        this.name = 'UINAMEVC';
        super.onLoad();
    }

    start() {
    }

    update (dt:number){
    }
}`

let scene_ctrl_template = 'import UiCtrl from "../framework/base/UiCtrl";\n\
\n\
const { ccclass, property } = cc._decorator;\n\
@ccclass\n\
export default class UINAMEController extends UiCtrl {\n\
  \n\
  onLoad() {\n\
    super.onLoad();\n\
  }\n\
  \n\
  start() {\n\
  }\n\
  // update (dt) {}\n\
}';

let layer_template = `import LayerCtrl from "../../framework/ui/LayerCtrl";

const { ccclass } = cc._decorator;

@ccclass
export default class UINAMELC extends LayerCtrl {

    onLoad() {
        this.name = 'UINAMELC';
    }

    start() {

    }

    update(dt: number) {

    }
}`;

let ctrl_template = `import Ctrl from "../../framework/util/Ctrl";

export default class UINAMECtrl extends Ctrl {

    constructor() {
        super('UINAMECtrl');
    }

};`

let model_template = `import DataModel from "../../../framework/data/DataModel";

export default class UINAMEModel extends DataModel {

    constructor() {
        super('UINAME');
    }
};`

function createPrefabScript (assetInfo, template, suffix) {
  let url = assetInfo.url;
  let base_name = path.basenameNoExt(url);
  let idx1 = url.indexOf('prefabs');
  //Editor.log(idx1);
  let idx2 = url.indexOf('/', idx1);
  let idx3 = url.indexOf('/', idx2 + 1);
  let folder_base_name;
  if (idx3 == -1) {
    folder_base_name = base_name;
  }
  else {
    folder_base_name = url.substr(idx2 + 1, idx3 - idx2 - 1);
  }
  folder_base_name = folder_base_name.toLocaleLowerCase();
  let module_folder = path.join(project_path, "assets/script/module/" + folder_base_name + "/view/");
  if (!fs.existsSync(module_folder)) {
    fs.mkdirsSync(module_folder);
  }
  let ouput_url = "db://assets/script/module/" + folder_base_name + "/view/" + base_name + suffix + ".ts";
  Editor.log(ouput_url);
  if (Editor.assetdb.exists(ouput_url)) {
    Editor.log(`文件${ouput_url}已存在`);
  }
  else {
    let temp_template = template;
    temp_template = temp_template.replace('UINAME', base_name);
    temp_template = temp_template.replace("'UINAME", `'${base_name}`);
    Editor.assetdb.create(ouput_url, temp_template);
  }
}

function createSceneScript (assetInfo) {
  let url = assetInfo.url;
  let base_name = path.basenameNoExt(url);
  let module_folder = path.join(project_path, "assets/script/scene/");
  if (!fs.existsSync(module_folder)) {
    fs.mkdirsSync(module_folder);
  }
  let ouput_url = "db://assets/script/scene/" + base_name + "Controller.ts";
  Editor.log(ouput_url);
  if (Editor.assetdb.exists(ouput_url)) {
    Editor.log(`文件${ouput_url}已存在`);
  }
  else {
    let temp_template = scene_ctrl_template;
    temp_template = temp_template.replace("UINAME", base_name);
    Editor.assetdb.create(ouput_url, temp_template);

  }
}

function createFolder (assetInfo, template, suffix) {
  let url = assetInfo.url;
  //Editor.log(url);
  let base_name = path.basenameNoExt(url);
  let folder_base_name = base_name;
  folder_base_name = folder_base_name.toLocaleLowerCase();
  let module_folder = path.join(project_path, "assets/script/module/" + folder_base_name + '/view/');
  if (!fs.existsSync(module_folder)) {
    fs.mkdirsSync(module_folder);
  }
  let url1 = url + '/**/*';
  Editor.assetdb.queryAssets(url1, '', (err, results) => {
    //Editor.log(results.length);
    results.forEach((res) => {
      //Editor.log(res);
      let tempBaseName = path.basenameNoExt(res.url);
      let outUrl = 'db://assets/script/module/' + folder_base_name + '/view/' + tempBaseName + suffix + '.ts';
      Editor.log(outUrl);
      if (Editor.assetdb.exists(outUrl)) {
        Editor.log(`文件${ouput_url}已存在`);
      }
      let temp_template = template;
      temp_template = temp_template.replace('UINAME', tempBaseName);
      temp_template = temp_template.replace("'UINAME", `'${tempBaseName}`);
      Editor.assetdb.create(outUrl, temp_template);
    });
  });
}

function mvcFolder (assetInfo, dataTemplate, ctrlTemplate) {

}

function createCtrl (assetInfo, ctrlTemplate) {
  let url = assetInfo.url;
  let base_name = path.basenameNoExt(url);
  let script_base_name = base_name;
  let first_ch = script_base_name.substr(0, 1);
  let tail_str = script_base_name.substr(1);
  script_base_name = first_ch.toUpperCase() + tail_str;
  let ouput_url = "db://assets/script/module/" + base_name + "/" + script_base_name + "Ctrl.ts";
  Editor.log(ouput_url);
  if (Editor.assetdb.exists(ouput_url)) {
    Editor.log(`文件${ouput_url}已存在`);
  }
  else {
    let temp_template = ctrlTemplate;
    temp_template = temp_template.replace('UINAME', script_base_name);
    temp_template = temp_template.replace("'UINAME", "'" + script_base_name);
    Editor.assetdb.create(ouput_url, temp_template);
  }
}

function createModel (assetInfo, ctrlTemplate) {
  let url = assetInfo.url;
  let base_name = path.basenameNoExt(url);
  let script_base_name = base_name;
  let first_ch = script_base_name.substr(0, 1);
  let tail_str = script_base_name.substr(1);
  script_base_name = first_ch.toUpperCase() + tail_str;
  let folderName = path.join(project_path, "assets/script/module/" + base_name + "/model/");
  Editor.log(folderName);
  if (!fs.existsSync(folderName)) {
    fs.mkdirsSync(folderName);
  }
  let ouput_url = "db://assets/script/module/" + base_name + "/model/" + script_base_name + "Model.ts";
  Editor.log(ouput_url);
  if (Editor.assetdb.exists(ouput_url)) {
    Editor.log(`文件${ouput_url}已存在`);
  }
  else {
    let temp_template = ctrlTemplate;
    temp_template = temp_template.replace('UINAME', script_base_name);
    temp_template = temp_template.replace(`'UINAME`, "'" + script_base_name);
    Editor.assetdb.create(ouput_url, temp_template);
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
    'ViewCtrl' () {
      //Editor.log('Hello World!');
      let currentSelection = Editor.Selection.curSelection('asset');
      if (currentSelection.length < 1) {
        Editor.log("null");
      }
      let selectionUUid = currentSelection[0];
      let assetInfo = Editor.assetdb.assetInfoByUuid(selectionUUid);
      let assetType = assetInfo.type;
      //Editor.log(assetType);

      if (assetType === 'prefab') {
        createPrefabScript(assetInfo, script_template, 'VC');
      }
      else if (assetType === 'scene') {
        Editor.log("scene");
        createSceneScript(assetInfo);
      }
      else if (assetType === 'folder') {
        createFolder(assetInfo, script_template, 'VC');
      }
      else {
        Editor.log("please select prefab or scene");
      }
    },
    'LayerCtrl' () {
      let currentSelection = Editor.Selection.curSelection('asset');
      if (currentSelection.length < 1) {
        Editor.log("null");
      }
      let selectionUUid = currentSelection[0];
      let assetInfo = Editor.assetdb.assetInfoByUuid(selectionUUid);
      let assetType = assetInfo.type;
      //Editor.log(assetType);

      if (assetType === 'prefab') {
        createPrefabScript(assetInfo, layer_template, 'LC');
      }
      else if (assetType === 'scene') {
        Editor.log("scene");
        createSceneScript(assetInfo);
      }
      else if (assetType === 'folder') {
        createFolder(assetInfo, layer_template, 'LC');
      }
      else {
        Editor.log("please select prefab or scene");
      }
    },
    'Model' () {
      let currentSelection = Editor.Selection.curSelection('asset');
      if (currentSelection.length < 1) {
        Editor.log("null");
      }
      let selectionUUid = currentSelection[0];
      let assetInfo = Editor.assetdb.assetInfoByUuid(selectionUUid);
      let assetType = assetInfo.type;
      if (assetType === 'folder') {
        createModel(assetInfo, model_template);
      }
      else {
        Editor.log("please select prefab or scene");
      }
    },
    'Ctrl' () {
      let currentSelection = Editor.Selection.curSelection('asset');
      if (currentSelection.length < 1) {
        Editor.log("null");
      }
      let selectionUUid = currentSelection[0];
      let assetInfo = Editor.assetdb.assetInfoByUuid(selectionUUid);
      let assetType = assetInfo.type;
      if (assetType === 'folder') {
        createCtrl(assetInfo, ctrl_template);
      }
      else {
        Editor.log("please select prefab or scene");
      }
    }
  },
};