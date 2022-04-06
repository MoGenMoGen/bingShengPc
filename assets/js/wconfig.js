import Vue from 'vue';
import query from './query';
import {
  Apps,
  until,
  reg
} from "./until";

import {store}  from '~/store/store.js'
import objectFitImages from 'object-fit-images';
require('../css/common.css'); //PC
//
// function configIcon() {
//   var script = document.createElement("script");
//   script.type = "text/javascript";
//   script.src = 'https://at.alicdn.com/t/font_576267_8nkmvz1lm47snhfr.js';
//   // document.head.appendChild(script);
// }
//
// configIcon();



import { api,hostUrl } from "./api"

var App= {
  install(Vue){
    Vue.prototype.App = new Apps();
    Vue.prototype.api = new api();
    Vue.prototype.until = new until();
    Vue.prototype.reg = new reg();
    Vue.prototype.query =  query
    Vue.prototype.hostUrl =  hostUrl
    Vue.prototype.store =  store
    Vue.prototype.objectFitImages =  objectFitImages
  }
}
Vue.use(App)



