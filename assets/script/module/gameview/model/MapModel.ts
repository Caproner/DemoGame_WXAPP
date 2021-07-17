import DataModel from "../../../framework/data/DataModel";
import DataCfg from "../../datacfg/DataCfg";

class Terrain {
    public id: number;
    public buildable: boolean;
}

class Product {
    public id: number;
    public price: number;
}

class Employee {
    public id: number;
}

class Building {
    public id: number;
    public employee: Array<Employee>;
    public products: Array<Product>;
}





export default class MapModel extends DataModel {

    public map: Array<Array<object>> = undefined;

    constructor() {
        super('Map');
        this.initMap();
    }

    protected getMessageListeners() {
        let map: object = {

        };
        return map;
    };

    /**
     *初始化地图,测试用,后面应该要从服务端下载数据
     *
     * @author guan
     * @date 2021/07/17
     * @memberof MapModel
     */
    initMap() {
        this.map = new Array<Array<object>>();

        for (let i: number = 0; i < 28; ++i) {
            let arr: Array<object> = new Array<object>();
            for (let j: number = 0; j < 28; ++j) {
                let obj = {
                    'terrain': 2,
                    'building': 0,
                };
                arr.push(obj);
            }
            this.map.push(arr);
        }
        for (let col: number = 1; col < 7; ++col) {
            for (let row: number = 6; row < 8; ++row) {
                let obj = {
                    'terrain': 1,
                    'building': 0,
                };
                this.map[row][col] = obj;
            }//end for row
        }//end for col
        for (let col: number = 5; col < 7; ++col) {
            for (let row: number = 8; row < 20; ++row) {
                let obj = {
                    'terrain': 1,
                    'building': 0,
                };
                this.map[row][col] = obj;
            }//end for row
        }//end for col
        for (let col: number = 7; col < 27; ++col) {
            for (let row: number = 18; row < 20; ++row) {
                let obj = {
                    'terrain': 1,
                    'building': 0,
                };
                this.map[row][col] = obj;
            }//end for row
        }//end for col
    }
};