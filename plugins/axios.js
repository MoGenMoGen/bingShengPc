//使用qs将请求从参数转化位字符串

import qs from"qs";

export default function({ $axios, redirect }){

  $axios.onRequest(config=>{

    config.data = qs.stringify(config.data, {

      allowDots:true

    });

    returnconfig;

  });

  $axios.onResponse(response=>{

    returnPromise.resolve(response.data);

  });

  $axios.onError(error=>{

    returnPromise.reject(error);

  });

}
