// const app = getApp()
// Vue.prototype.globalData = getApp().globalData
// http://ht.jiaxiangtech.com
import {
  MessageBox
} from 'element-ui'
// let hostUrl = "http://sin.jinkworld.com"
// let hostUrl = "http://sin.jinkworld.com"
const hostUrl = "https://www.ship88.cn"
let myUrl = 'https://www.ship88.cn'
if (process.client) {
  myUrl = ''
} else {
  myUrl = hostUrl
}
// console.log(process.client)
// let hostUrl = ""
const axios = require('axios');
import qs from 'qs';
import Vue from 'vue';
import {
  store
} from '~/store/store.js'
Vue.prototype.store = store

function get(url, data, noTip) {
  let header = {}
  if (process.client && window.sessionStorage.getItem('token')) {
    header = {
      "sinovat-token": window.sessionStorage.getItem("token")
    }
  }
  let myData = {};
  if (data) {
    //过滤掉空的参数
    for (let [key, val] of Object.entries(data)) {
      if (val) {
        myData[key] = val;
      }
    }
  }
  let promise = new Promise((resolve, reject) => {
    axios.get(myUrl + url, {
      params: data,
      headers: header
    })
      .then(function (res) {
        store.commit('changeLoading', false)
        if (res.data.code === 0) {
          resolve(res.data)
        } else if (res.data.code === 401) {
          MessageBox.confirm('您未登录，立即登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log('=================')
            window.location.href = '/sinovat/login/login'
          })
        } else {
          reject(res)
          if (!noTip) {
            MessageBox({
              message: res.data.msg || res.data.message,
              type: 'warning'
            });
          }
        }
      })
      .catch(function (error) {
        store.commit('changeLoading', false)
        console.log(error)
        console.log(noTip)
        if (!noTip) {
          MessageBox({
            message: JSON.stringify(error),
            type: 'warning'
          });
        }

      })

  });
  return promise;
}

function post(url, data) {
  let header = {}
  if (process.client && window.sessionStorage.getItem('token')) {
    header = {
      "sinovat-token": window.sessionStorage.getItem("token")
    }
  }

  let promise = new Promise((resolve, reject) => {
    axios.post(myUrl + url, data, {
      headers: header
    })
      .then(function (res) {
        store.commit('changeLoading', false)
        if (res.data.code === 0) {
          resolve(res.data)
        } else if (res.data.code === 401) {
          MessageBox.confirm('您未登录，立即登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            window.location.href = '/sinovat/login/login'
          })
        } else {
          MessageBox({
            message: res.data.msg || res.data.message,
            type: 'warning'
          });
        }
      })
      .catch(function (error) {
        store.commit('changeLoading', false)
        MessageBox({
          message: JSON.stringify(error),
          type: 'warning'
        });
      });
  });
  return promise;
}
class api {
  //获取省市区
  getAddr(data) {
    return new Promise((resolve, reject) => {
      get("/sys/region/api/list?query=" + data).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //广告
  getAdert(cd, num) {
    let param = {
      posCd: cd,
      adNums: num ? num : ''
    }
    return new Promise((resolve, reject) => {
      get("/sys/advertInfo/api/listAdsByPos2", param).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //注册
  register(data) {
    return new Promise((resolve, reject) => {
      post("/ship/member/api/regist", data).then(res => {

        resolve(res)
      });
    });
  }
  //登录
  login(data) {
    console.log(data)
    console.log(qs.stringify(data))
    return new Promise((resolve, reject) => {
      post("/general/access/memLogin", qs.stringify(data)).then(res => {
        window.sessionStorage.setItem("token", res.data.token)
        resolve(res.data)
        this.roleList()
        this.cartList()
      });
    });
  }
  //退出
  logout() {
    return new Promise((resolve, reject) => {
      get("/general/access/logout").then(res => {
        sessionStorage.clear()
        window.location.reload()
        window.location.href = '../sinovat'
        resolve(res)
      });
    });
  }
  //上传图片
  uploadImg(e) {
    let blob = e.target.files[0];
    let maxSize = 1024 * 1024 * 10
    if (!blob) {
      store.commit('changeLoading', false)
      return
    }
    // if (blob.size > maxSize) {
    //   MessageBox({
    //     message: '最大不能超过10M！',
    //     type: 'warning'
    //   });
    //   store.commit('changeLoading', false)
    //   return
    // }
    store.commit('changeLoading', true)
    let param = new FormData();
    param.append('file', blob);
    return new Promise(resolve => {
      post('/general/oss/upload', param).then(res => {
        resolve(res.data)
      })
    })
  }

  //上传图片(加密)
  uploadImgEnc(e) {
    let blob = e.target.files[0];
    let maxSize = 1024 * 1024 * 10
    if (!blob) {
      store.commit('changeLoading', false)
      return
    }
    // if (blob.size > maxSize) {
    //   MessageBox({
    //     message: '最大不能超过10M！',
    //     type: 'warning'
    //   });
    //   store.commit('changeLoading', false)
    //   return
    // }
    store.commit('changeLoading', true)
    let param = new FormData();
    param.append('file', blob);
    return new Promise(resolve => {
      post('/general/oss/encUpload', param).then(res => {
        resolve(res.data)
      })
    })
  }

  //上传图片
  uploadImgNew(file) {
    let blob = file
    let maxSize = 1024 * 1024 * 10
    if (!blob) {
      store.commit('changeLoading', false)
      return
    }
    // if (blob.size > maxSize) {
    //   MessageBox({
    //     message: '最大不能超过10M！',
    //     type: 'warning'
    //   });
    //   store.commit('changeLoading', false)
    //   return
    // }
    store.commit('changeLoading', true)
    let param = new FormData();
    param.append('file', blob);
    return new Promise(resolve => {
      post('/general/oss/upload', param).then(res => {
        resolve(res.data)
      })
    })
  }
  //上传图片
  uploadImg2(blob) {
    let maxSize = 1024 * 1024 * 10
    // if (blob.size > maxSize) {
    //   MessageBox({
    //     message: '最大不能超过10M！',
    //     type: 'warning'
    //   });
    //   store.commit('changeLoading', false)
    //   return
    // }
    store.commit('changeLoading', true)
    let param = new FormData();
    param.append('file', blob);
    return new Promise(resolve => {
      post('/general/oss/upload', param).then(res => {
        resolve(res.data)
      })
    })
  }

}

export {
  api,
  hostUrl
};
