import { until } from "assets/js/until";
import { msg } from 'hero';

require ('assets/css/config.less');

function configIcon(){
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = 'http://at.alicdn.com/t/font_576267_nxw7ozgp9shv9529.js';
  // document.head.appendChild(script);
}

configIcon();


export default function (Vue) {
  Vue.use(msg);

  Vue.prototype.until = new until();
}
