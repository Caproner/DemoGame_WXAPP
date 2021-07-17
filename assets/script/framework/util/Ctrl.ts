import EventManager from "../manager/EventManager";

export default class Ctrl {

    public name: string = 'Ctrl';
    constructor(name: string = 'Ctrl') {
        this.name = name;
        this.registerListeners();
    }

    private registerListeners() {
        let msgTable = this.getMessageListeners();
        for (const key in msgTable) {
            if (msgTable.hasOwnProperty(key)) {
                EventManager.on(key.toString(), function (msg: any) {
                    msgTable[key](msg);
                })
            }
        }
    }

    protected getMessageListeners() {
        return {};
    };

    public getName(): string {
        return this.name;
    }

}
