export default new cc.EventTarget();

class EventInfo {
    public name: string = undefined;//消息名
    public callback: Function = undefined;//回调函数
    public target: any = undefined;//目标

    constructor(name: string, callback: Function, target: any) {
        this.name = name;
        this.callback = callback;
        this.target = target;
    }
}

const { ccclass } = cc._decorator;

/**
 *事件管理器(简单的)
 *同一个脚本内不需要用这个类进行事件监听，可以直接使用cc.SystemEvent
 * @author guan
 * @date 2021/07/11
 * @class EventManagerBase
 */
@ccclass
class EventManagerBase {
    private eventArrMap: Map<string, Array<EventInfo>> = new Map<string, Array<EventInfo>>();
    private toAddArr: Array<EventInfo> = new Array<EventInfo>();
    private toDelArr: Array<EventInfo> = new Array<EventInfo>();

    public on(name: string, callback: Function, target: any) {
        let arr = this.eventArrMap.get(name);
        if (undefined == arr) {
            arr = new Array<EventInfo>();
            this.eventArrMap.set(name, arr);
            arr = this.eventArrMap.get(name);
        }//end if

        for (let item of arr) {
            if (item.callback === callback && item.target === target) {
                return;
            }
        }//end for i

        let info = new EventInfo(name, callback, target);
        arr.push(info);
        return;
    }

    public off(name: string, callback: Function, target: any) {
        let arr = this.eventArrMap.get(name);
        if (undefined == arr) {
            return;
        }
        for (let i = 0; i < arr.length; ++i) {
            let item = arr[i];
            if (item.callback === callback && item.target === target) {
                arr.splice(i, 1);
                return;
            }
        }//end for i
        return;
    }

    public emit(name: string, ...data: any) {
        //console.log(data);
        let arr = this.eventArrMap.get(name);
        if (undefined == arr) {
            return;
        }
        for (let i = arr.length - 1; i > -1; --i) {
            if (arr[i].callback && arr[i].target) {
                arr[i].callback.apply(arr[i].target, [data]);
            }
        }
        return;
    }

    public offTarget(target: any) {
        this.eventArrMap.forEach((value) => {
            for (let i = value.length - 1; i > -1; --i) {
                if (value[i].target === target) {
                    value.splice(i, 1);
                }
            }
        });
    }

}

//export let EventManager: EventManagerBase = new EventManagerBase();



