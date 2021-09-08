import axios from "./Axios"
//for test
//request
let requestArray = ["request all data :\n", "request loop sync :\n", "request money sync :\n", "request lv sync :\n", "request builds sync :\n", "request npc sync :\n", "request maps syncv", "request money get :\n", "request money opt :\n"]
let Protocols = ["120011", "130001", "130011", "130021", "130031", "130041", "130051", "140011", "140021"]
let data = {
  Lv: 1,
  Exp: 10,
  Money: {},
  Builds: [],
  Npcs: [],
  Maps: null,
}
  //request all data
  /*
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    data: {
      Proto: '120011',
      OpenID: "info.data.OpenID"
    }
  }).then(res => { console.log(res) }) //if success, res = AxiosResponse
    .catch(err => { console.log(err) }) //if error err = AxiosError
  
  
  //request loop sync 
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    data: {
      Proto: '130001',
      OpenID: "info.data.OpenID",
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  //request money sync
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    method: 'POST',
    data: {
      Proto: '130011',
      OpenID: "info.data.OpenID",
      Money: { 0: 100, 1: 1000 }
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    data: {
      Proto: '120011',
      OpenID: "info.data.OpenID"
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  
  //request lv sync
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    method: 'POST',
    data: {
      Proto: '130021',
      OpenID: "info.data.OpenID",
      Lv: 2,
      Exp: 10
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    data: {
      Proto: '120011',
      OpenID: "info.data.OpenID"
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  
  //request builds sync
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    method: 'POST',
    data: {
      Proto: '130031',
      OpenID: "info.data.OpenID",
      Builds: [1, 2, 3]
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    data: {
      Proto: '120011',
      OpenID: "info.data.OpenID"
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  
  //request npcs sync
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    method: 'POST',
    data: {
      Proto: '130041',
      OpenID: "info.data.OpenID",
      Npcs: [2, 3, 4]
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    data: {
      Proto: '120011',
      OpenID: "info.data.OpenID"
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  
  //request maps sync
  let build: object = { "肉铺": {} };
  let point: string = "1,2";
  let map: object = {};
  map[point] = build;
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    method: 'POST',
    data: {
      Proto: '130051',
      OpenID: "info.data.OpenID",
      maps: { map }
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  axios({
    url: 'http://1.15.40.65:17263/player/action',
    data: {
      Proto: '120011',
      OpenID: "info.data.OpenID"
    }
  }).then(res => { console.log(res) })
    .catch(err => { console.log(err) })
  
  
      //request Money get
    //no find right proto
      axios({
        url: 'http://1.15.40.65:17263/player/action',
        data: {
          Proto: '140011',
          OpenID: info.data.OpenID,
          Type: 0
        }
      }).then(res => { console.log(res) })
        .catch(err => { console.log(err) })
  */