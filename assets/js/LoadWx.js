class setWx{
  /*调用方式
  *setWx.getWXms(url,data,interfaceList)
  *   .then(res=>{
  *     调用微信接口
  *   })
  *url:接口名称
  *data:接口所需参数（一般为页面URL地址,#号前内容）
  *interfaceList:所需要调用接口数组
  * */
  IsWx(){
    let u = navigator.userAgent.toLowerCase();
    let isWx = u.match(/MicroMessenger/i)=="micromessenger";
    return isWx;
  }
  async getWXms(url,data,interfaceList){
    //验证是否微信环境
    if(!this.IsWx()){
      throw new Error('请在微信浏览器中打开');
    }
    //加载微信js
    try {
      let state = await this.LoadWechatJs();
    }catch (e){
      throw new Error('加载微信js失败');
    }
    //获取权限验证配置
    let app = null;
    try {
      app = await this.get(url,data)
        .then(data=> data,err=>{throw new Error('no')});
    }catch (e){
      throw new Error('获取微信参数失败');
    }
    //加载微信接口
    try {
      let flag = await this.wechatConfig(app,interfaceList);
      return flag;
    }catch (e){
      throw new Error(e.errMsg);
    }

  }
  wechatConfig(data,arrays){
    let $q = new Promise((resolve,reject)=>{
      wx.config({
        debug:false,
        appId:data.appId,
        timestamp:data.timestamp,
        nonceStr:data.nonceStr,
        signature:data.signature,
        jsApiList:arrays//要调用的微信接口
      });
      wx.ready(function(){
        resolve('ok');
      });
      wx.error(function(res){
        reject(res);
      });
    });
    return $q;
  }
  LoadWechatJs(){
    let $q = new Promise((resolve,reject)=>{
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
      // document.head.appendChild(script);
      if (script.addEventListener){
        script.addEventListener('load', function () {
          resolve('ok');
        }, false);
      }else {
        reject('no');
      }
    });
    return $q;
  }
  get(url,data){
    let promise = new Promise((resolve,reject)=>{
      $.ajax({
        type:'GET',
        url,
        data,
        cache:false,
        dataType:'json',
        success(data){
          resolve(data);
        },
        error(data){
          reject(data);
        }
      })
    });
    return promise;
  }
}
export { setWx }
