const axios = require('axios');
import {store}  from '~/store/store.js'
class until {
  imgStyle(cont){
    let myContent = cont.replace(/<img[^>]*>/gi, function (match, capture) {
      return match.replace(/(<img[^>]*)(\/?>)/gi, "$1style='max-width:100%;height:auto;' $2")
      // return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;height:auto;"') // 替换style
  
    })
    return myContent
  }
  //把缓存数据保存到store
  saveToStore(){

    if(this.seGet('token')){
      store.commit('token',this.seGet('token'))
    }
    if(this.seGet('userInfo')){
      store.commit('userInfo',JSON.parse(this.seGet('userInfo')))
    }
    if(this.seGet('cartNum')){
      store.commit('cartNum',this.seGet('cartNum'))
    }
    console.log(this.seGet('currentRole'))
    if(this.seGet('currentRole')){
      store.commit('currentRole',JSON.parse(this.seGet('currentRole')))
    }

  }
  //设置宽度
  getWidth() {
    let width = 0
    let bWidth = 0
    let widths = document.documentElement.clientWidth ||  document.body.clientWidth;
    bWidth = widths>1600 ? widths : 1600
    width = bWidth*0.9>1600 ? 1600 : bWidth*0.9

    // if (widths < 1000) {
    //
    //   width = 1000*0.9;
    //   bWidth = 1000;
    // }
    // if (widths >= 1000 && widths <= 1200) {
    //   width = widths*0.9;
    //   bWidth = widths;
    // }
    // if (widths > 1200) {
    //   width = 1200;
    //   bWidth = widths;
    // }
    return{width,bWidth}
  }
  //图片转base64 解决跨域
  getBase64(imgUrl) {
    return new Promise(resolve => {
      window.URL = window.URL || window.webkitURL;
      var xhr = new XMLHttpRequest();
      xhr.open("get", imgUrl, true);
      // 至关重要
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status == 200) {
          //得到一个blob对象
          var blob = this.response;
          console.log("blob", blob)
          // 至关重要
          let oFileReader = new FileReader();
          oFileReader.onloadend = function (e) {
            // 此处拿到的已经是 base64的图片了
            let base64 = e.target.result;
            console.log("方式一》》》》》》》》》", base64)
          };
          oFileReader.readAsDataURL(blob);
          //====为了在页面显示图片，可以删除====
          var img = document.createElement("img");
          img.onload = function (e) {
            window.URL.revokeObjectURL(img.src); // 清除释放
          };
          let src = window.URL.createObjectURL(blob);
          img.src = src
          console.log(src)
          resolve(src)
          //document.getElementById("container1").appendChild(img);
          //====为了在页面显示图片，可以删除====

        }
      }
      xhr.send();
    })

  }
  //ajax请求
  postData(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url,
        data,
        async: true,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        }
      })
    });
    return promise;
  }
  postImg(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        contentType: false,
        processData: false,
        url,
        data,
        cache: false,
        dataType: 'json',
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        },
      })
    });
    return promise;
  }
  post(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url,
        data,
        async: true,
        cache: false,
        dataType: 'json',
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        }
      })
    });
    return promise;
  }
  get(url, data, cache = false) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url,
        data,
        cache,
        dataType: 'json',
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        }
      })
    });
    return promise;
  }
  IsWx() {
    let u = navigator.userAgent.toLowerCase();
    let isWx = u.match(/MicroMessenger/i) == "micromessenger";
    return isWx;
  }
  //fetch请求
  async fetch(url, data) {
    if (window.fetch) {
      let body = this.param(data);
      let requestConfig = {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: "cors",
        cache: "force-cache",
        body
      }
      try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson
      } catch (error) {
        throw new Error(error)
      }
    } else {
      this.post(url, data);
    }
  }
  //fetch参数格式化
  param(data) {
    let str = "";
    Object.keys(data).forEach((index) => {
      str = str + index + "=" + data[index] + "&"
    })
    str = str.substring(0, str.length - 1);
    return str;
  }
  //是否登录
  isLogged() {
    let state = this.loGet('DD_token') ? true : false;
    return state;
  }
  //,分割数组
  cutArray(str) {
    let result = [];
    if (str.indexOf(",") > -1) {
      result = str.split(',');
    } else {
      result.push(str);
    }
    return result;
  }
  upImg(e) {
    let $q = new Promise((resolve, reject) => {
      let blob = e.target.files[0];
      if (!/^image/.test(blob.type)) {
        return reject('请选择图片文件');
      }
      let param = new FormData();
      param.append('file', blob);
      this.postImg('/general/file/upload', param)
        .then(res => {
          e.target.value = '';
          if (res.status == 500) {
            reject(res.message)
          } else {
            resolve(res.data);
          }
        }, err => {
          e.target.value = '';
          reject('上传失败');
        })
    });
    return $q;
  }
  upMoreImg(e) {
    let $q = new Promise((resolve, reject) => {
      let blob = e.target.files;
      Object.keys(blob).forEach((o) => {
        if (!/^image/.test(blob[o].type)) {
          delete blob[o];
        }
      });
      if (blob.length < 1) {
        return reject('请选择图片文件');
      }
      let param = new FormData();
      Object.keys(blob).forEach((o) => {
        let obj = blob[o];
        param.append('files', obj);
      })
      this.postImg('/general/file/upload', param)
        .then(res => {
          e.target.value = '';
          if (res.status == 500) {
            reject(res.message)
          } else {
            resolve(res.data);
          }
        }, err => {
          e.target.value = '';
          reject('上传失败');
        })
    });
    return $q;
  }
  postImg(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        contentType: false,
        processData: false,
        url,
        data,
        cache: false,
        dataType: 'json',
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        },
      })
    });
    return promise;
  }
  isLogin() {
    let token = this.loGet('DD_token');
    if (!token) {
      this.href('../entry/login.html');
      return false;
    }

    return JSON.parse(token);
  }
  //是否登录
  isLogged() {
    let token = this.loGet('DD_token');
    if (!token) {
      return false;
    }
    return JSON.parse(token);
  }
  //获取TS_token
  getToken(obj) {
    return obj.token;
  }
  getStuPk(obj) {
    return obj.userInfo.sysUserPk;
  }
  //跳转页面
  href(url) {
    // window.location.href = window.location.origin+'/sinovat'+url;
    window.location.href = window.location.origin+'/sinovat'+url; //正式部署须修改
      // window.open(url);
  }
  //后退
  back() {
    window.history.back();
  }
  //session存取
  seSave(name, obj) {
    sessionStorage.setItem(name, obj);
  }
  seGet(name) {
    return sessionStorage.getItem(name);
  }
  seRemove(name) {
    sessionStorage.removeItem(name);
  }
  //local存取
  loSave(name, obj) {
    localStorage.setItem(name, obj);
  }
  loGet(name) {
    return localStorage.getItem(name);
  }
  loRemove(name) {
    localStorage.removeItem(name);
  }
  //截取URL参数
  getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    } else {
      return null;
    }
  }
    //截取URL参数
    getQueryString2(name) {
      if(window.location.href.split('?').length<2){
        return null
      }
      let arr = window.location.href.split('?')[1].split('&')
      let obj = null
        arr.forEach(item=>{
          if(item.split('=')[0]===name){
              obj = item.split('=')[1]
          }
        })
      return obj
    }
    changeQueryString(name,val){
        if(window.location.href.split('?').length<2){
          return window.location.href+'&'+name+'='+val
        }
        let arr = window.location.href.split('?')[1].split('&')
        arr.forEach((item,index)=>{
          if(item.split('=')[0]===name){
            arr.splice(index,1)
          }
        })
        return window.location.href.split('?')[0]+'?'+arr.join('&')+'&'+name+'='+val
    }
  //判断是否空对象
  isEmptyObject(obj) {
    for (var name in obj) {
      return false; //返回false，不为空对象
    }
    return true; //返回true，为空对象
  }
  //格式化日期,返回 年 月 日 星期
  formatDate(str=""){
      if(typeof(str)=='string'){
          str = str.replace(/-/g, "/")
      }
    str = str==""?new Date():new Date(str);
      // str = str==""?new Date():new Date(str);
    let week = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
    let year =str.getFullYear();
    let month = str.getMonth()+1<10?"0"+(str.getMonth()+1):str.getMonth()+1;
    let day = str.getDate()<10?"0"+str.getDate():str.getDate();
    let hour = str.getHours()<10?"0"+str.getHours():str.getHours();
    let minite = str.getMinutes()<10?"0"+str.getMinutes():str.getMinutes();
    let second = str.getSeconds()<10?"0"+str.getSeconds():str.getSeconds();
    week = week[str.getDay()];
    return {year,month,day,hour,minite,second,week};
  }
  //指定时间倒计时(结束秒数)
  TimeSlot(count) {
    let end = new Date();
    //Date类型的valueOf(),返回当前日期毫秒数,可以直接比较
    if (count < end) {
      return {
        h: '00',
        m: '00',
        s: '00'
      }
    }

    let total = (count - end.getTime()) / 1000;
    let h = parseInt(total / (60 * 60));
    let m = parseInt(total / 60 % 60);
    let s = parseInt(total % 60);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    return {
      h,
      m,
      s
    };
  }
  TimeStep(times) {
    let start = new Date(times);
    let end = new Date();
    let count = (end.getTime() - start.getTime()) / 1000;
    let d = parseInt(count / (60 * 60) / 24);
    return d;
  }
  TimeStep2(times) {
    let start = new Date(times);
    let end = new Date();
    let count = (end.getTime() - start.getTime()) / 1000;
    return count;
  }
  //设置只能输入数字
  formatNumber(val, max) {
    max = parseInt(max);
    let reg = /^\d+$/g;
    val = val.toString();
    if (val.match(reg)) {
      return val > max ? max : Number(val);
    } else {
      if (val == "") {
        return "";
      }
      if (!val[0].match(reg)) {
        return "";
      }
      let str = "";
      for (let i = 0; i < val.length; i++) {
        str += val[i].match(reg) ? val[i] : "";
      }
      return parseInt(str);
    }
  }
  count(flag, val, max) { //加减按钮点击
    max = parseInt(max);
    if (max == 0) {
      return 0;
    }
    if (flag == "-") {
      return val == 1 ? 1 : --val;
    } else {
      return val == max ? max : ++val;
    }
  }
  //数组排序(某属性数值)
  Sort(array, flag, state = 'up') {
    let box = array.sort((v1, v2) => {
      if (state == 'up') {
        return v1[flag] - v2[flag];
      } else {
        return v2[flag] - v1[flag];
      }
    })
    return box;
  }
  //随机生成 n~m 之间的数
  Random(min, max) {
    let choices = max - min + 1;
    return Math.floor(Math.random() * choices + min);
  }
  // 格式化日期,返回年月日时分秒
  formatTen(num) {
    return num > 9 ? (num + "") : ("0" + num);
  }
  formatTime(date) {
    let myDate = new Date(date)
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let hour = myDate.getHours();
    let minute = myDate.getMinutes();
    let second = myDate.getSeconds();
    return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) + " " + this.formatTen(hour) + ":" + this.formatTen(minute) +
      ":" + this.formatTen(second);
  }
  formatDate2(date) {
    let myDate = new Date(date)
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
  }
  // 给金额加千分符
  formatNumberRgx(num) {
      let parts = num.toString().split(".")
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return parts.join(".")
  }
}
//touch判断方向
class judge {
  // 1上2下3左4右
  getDirection(startx, starty, endx, endy) {
    let angx = endx - startx;
    let angy = endy - starty;
    let result = 0;
    var angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }
    return result;
  }
  getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  }
}
class reg {
  //验证身份证号码
  checkCard(str) {
    if (!str) {
      return '请输入身份证号码';
    }
    //15位数身份证正则表达式
    let arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    //18位数身份证正则表达式
    let arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
    if (str.match(arg1) == null && str.match(arg2) == null) {
      return "请输入正确的身份证号码";
    }
    return 'ok';
  }
  //验证手机号
  checkPhone(str) {
    let regPhone = /^1[3456789]\d{9}$/;
    if (!str) {
      return "请输入手机号";
    }
    if (!regPhone.test(str)) {
      return "请填写正确的手机号";
    }
    return 'ok';
  }
  //验证用户名
  checkUserName(str) {
    let reg = /[\u4e00-\u9fa5]/g;
    if (!str) {
      return "请输入用户名";
    }
    if (reg.test(str)) {
      return "用户名不能包含中文";
    }
    return 'ok';
  }
  //验证真实姓名
  checkName(str) {
    let reg = /^[\u4E00-\u9FA5]+$/;
    if (!str) {
      return "请输入真实姓名";
    }
    if (str.length < 2) {
      return "请输入正确名字";
    }
    if (!reg.test(str)) {
      return "请输入中文名";
    }
    return 'ok';
  }
  checkLoginPwd(str) {
    if (!str) {
      return "请输入密码";
    }
    return 'ok';
  }
  //验证密码
  checkPwd(str) {
    if (!str) {
      return "请输入密码";
    }
    if (str.length < 8 || str.length > 16) {
      return "请输入8-16位任意字符密码";
    }
    return 'ok';
  }
  //验证邮箱
  checkMail(str) {
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (!str) {
      return "请输入邮箱";
    }
    if (!reg.test(str)) {
      return "请输入正确的邮箱";
    }
    return 'ok';
  }

}
class Apps {
  //调用本地java方法
  NativeInterface(name, data) {
    let $q = new Promise((resolve, reject) => {
      window.WebViewJavascriptBridge.callHandler(
        name, data, (res = undefined) => {
          res = res ? res : JSON.parse(res);
          resolve(res);
        }
      )
    });
    return $q;
  }
  //判断是否是PC
    IsPC() {
        var userAgentInfo = navigator.userAgent;
        // alert(userAgentInfo)
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
             "iPod"]; //"iPad",
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        if(!flag){
          flag = userAgentInfo.toLowerCase().indexOf('pad')>-1 ? true : false
        }
        return flag;
    }
  os() {
     var ua = navigator.userAgent;
       alert(ua)
     isWindowsPhone = /(?:Windows Phone)/.test(ua),
     isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
     isAndroid = /(?:Android)/.test(ua),
     isFireFox = /(?:Firefox)/.test(ua),
     isChrome = /(?:Chrome|CriOS)/.test(ua),
     isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
     isPhone = /(?:iPhone)/.test(ua) && !isTablet,
     isPc = !isPhone && !isAndroid && !isSymbian;
     return {
       isTablet: isTablet,
       isPhone: isPhone,
       isAndroid: isAndroid,
       isPc: isPc
     };
  }
    //判断JS环境
  IsAndroid() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    return isAndroid;
  }
  IsIos() {
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isiOS;
  }
  IsWx() {
    let u = navigator.userAgent.toLowerCase();
    let isWx = u.match(/MicroMessenger/i) == "micromessenger";
    return isWx;
  }
}
//模糊搜索
class crawler {
  /**
   * @premise 引入pinyin.js
   * @method  fuzzy
   * @for     crawler
   * @param   Key&&array || attr
   * @return  []
   * @mode    this.crawler.fuzzy(Key,array).then(res=>{console.log(res);})
   */
  // time = null;
  // //本地数据模糊搜索
  // async fuzzy(val, array, attr = "") {
  //   if (val == "") {
  //     if (this.time) {
  //       clearTimeout(this.time);
  //     }
  //     return array;
  //   } else {
  //     if (this.time) {
  //       clearTimeout(this.time);
  //     }
  //     let out = await this.buildTime(val, array, attr);
  //     return out;
  //   }
  // }
  // buildTime(val, array, attr) {
  //   let $q = new Promise((resolve, reject) => {
  //     this.time = setTimeout(() => {
  //       resolve(this.buildArray(val, array, attr));
  //     }, 1000);
  //   })
  //   return $q;
  // }
  // buildArray(val, array, attr) {
  //   let result = [],
  //     reg = /[\u4e00-\u9fa5]/g,
  //     lang = reg.test(val) ? "ch" : "en", //检测是否含有中文
  //     box = [...array];
  //   //模糊搜索筛选
  //   for (let k = box.length - 1; k > -1; k--) {
  //     let target = attr == "" ? box[k] : box[k][attr]; //检测传入的数组项是否为对象
  //     let title = pinyin.getFullChars(target),
  //       titleLower = lang == "ch" ? target : title.toLowerCase();
  //     for (let j = 0; j < val.length; j++) {
  //       let index = titleLower.indexOf(val[j]);
  //       if (index != -1) {
  //         titleLower = titleLower.substring(index + 1, titleLower.length); //检测剩余字符串
  //         if (j == val.length - 1) {
  //           result.push(box[k]);
  //         }
  //       } else {
  //         box.splice(k, 1);
  //         break;
  //       }
  //     }
  //   }
  //   //搜索排序
  //   result.forEach((val, i) => {
  //     let target = attr == "" ? result[i] : result[i][attr];
  //     let title = pinyin.getFullChars(target),
  //       titleLower = title.toLowerCase(),
  //       obj = null;
  //     if (titleLower.match(eval('/' + val + '/gi')) != null) {
  //       obj = result[i];
  //       result.splice(i, 1);
  //       result.unshift(obj);
  //     }
  //   });
  //   return result;
  // }
}
//闭包缓存处理结果,若某操作处理费时,则用闭包进行缓存
// high.attach(str);
const high = (function () {
  let cache = {},
    array = [];
  return {
    attach(str) {
      if (str in cache) {
        return change[str];
      }
      let fsb = new uikit.webctrl.SearchBox(str);
      cache[str] = fsb;
      return fsb
    }
  }
})();
class studay {
  a() {
    this.b();
  }
  b() {
    //alert(arguments.callee.caller); //显示调用此函数源代码
  }

}
export {
  until,
  reg,
  Apps,
  // crawler,
  high,
  judge
};
