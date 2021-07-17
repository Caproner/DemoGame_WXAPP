import DataModel from "../../../framework/data/DataModel";

export default class LoadingModel extends DataModel {

    constructor() {
        super('Loading');
    }

    protected getMessageListeners() {
        let map: object = {};
        return map;
    };
};