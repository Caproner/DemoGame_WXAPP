import DataModel from "../../../framework/data/DataModel";

export default class ExampleModel extends DataModel {

    private num: number = 0;
    constructor() {
        super('Example');
    }

    protected getMessageListeners() {
        let map: object = {};
        return map;
    };

    public add(num: number) {
        this.num += num;
    }

    public get(): number {
        return this.num;
    }
};