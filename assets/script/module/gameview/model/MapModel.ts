import DataModel from "../../../framework/data/DataModel";
import DataCfg from "../../datacfg/DataCfg";

class Terrain {
  constructor(id: number = 1, name: string = "草地", buildable: false) {
    this.id = id;
    this.name = name;
    this.buildable = buildable;
  }
  public id: number;
  public name: string;
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
  constructor(id: number = 0, price: number = 0, name: string = "") {
    this.id = id;
    this.name = name;
    this.price = price;
    this.employee = new Array<Employee>();
    this.products = new Array<Product>();
  }
  public id: number;
  public name: string;
  public price: number;
  public employee: Array<Employee>;
  public products: Array<Product>;
}


let buildings = [
  {
    'id': 1,
    'name': '药水店',
    'price': 100
  },
  {
    'id': 2,
    'name': '刀剑店',
    'price': 200
  },
  {
    'id': 3,
    'name': '铠甲店',
    'price': 300
  },
  {
    'id': 4,
    'name': '饰品店',
    'price': 400
  }
];

let defaultTerrainIdTable: Array<Array<number>> =
  [
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

let terrainIdNameMap =
{
  '1': '草地',
  '2': '道路',
  '3': '建筑用地'
}


export default class MapModel extends DataModel {

  public map: any = undefined;
  //public terrainLayer: Array<Array<number>> = undefined;
  //public buildingLayer: Array<Array<number>> = undefined;
  constructor() {
    super('Map');
    this.initDefaultMap();
  }

  protected getMessageListeners() {
    let map: object = {

    };
    return map;
  };

  private initDefaultMap() {


    //console.log(defaultTerrainIdTable);
    this.map = {};
    for (let r: number = 0; r < 27; ++r) {
      let arr = new Array<any>();
      for (let c: number = 0; c < 15; ++c) {
        let obj =
        {
          'terrain':
          {
            'id': 1,
            'name': "草地"
          }//,
          // 'building':
          // {
          //   'id': 0,
          //   'name': "",
          //   'price': 0
          // }
        };
        obj.terrain.id = defaultTerrainIdTable[r][c];
        obj.terrain.name = terrainIdNameMap[obj.terrain.id];
        this.map[`${r},${c}`] = obj;
      }
    }
    //console.log(this.map);
  }

  public getBuilingCost(id: number) {
    if (id < 1 || id > buildings.length) {
      return 0;
    }
    return buildings[id - 1]['price'];
  }

};