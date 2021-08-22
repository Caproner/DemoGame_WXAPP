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
  public productID: number;
}

class Building {
  constructor(id: number = 0, price: number = 0) {
    this.id = id;
    this.price = price;
    this.employee = new Array<Employee>();
    this.products = new Array<Product>();
  }
  public id: number;
  public price: number;
  public employee: Array<Employee>;
  public products: Array<Product>;
}

let buildingMap =
{
  1: new Building(1, 100),
  2: new Building(2, 200),
  3: new Building(3, 300),
  4: new Building(4, 400)
};




export default class MapModel extends DataModel {

  public map: Array<Array<object>> = undefined;
  //public terrainLayer: Array<Array<number>> = undefined;
  //public buildingLayer: Array<Array<number>> = undefined;


  constructor() {
    super('Map');
    //this.initMap();
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

  initLayers() {
    if (!this.map) {
      return;
    }
    let row = this.map.length;
    if (row < 1) {
      return;
    }
    let col = this.map[0].length;
    if (col < 1) {
      return;
    }

    for (let r = 0; r < row; ++r) {
      for (let c = 0; c < col; ++c) {
        let obj = this.map[r][c];

      }//end for c
    }//end for l
  }

  getBuilingCost(id: number) {
    let building: Building = buildingMap[id];
    if (!building) {
      return 0;
    }
    return building.price;
  }
};