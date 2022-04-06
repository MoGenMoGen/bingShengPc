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
  //注册获取验证码
  getCode(data) {
    return new Promise((resolve, reject) => {
      get("/general/sms/sendVcodeRegister?mob=" + data).then(res => {
        resolve(res)
      });
    });
  }
  //修改密码获取验证码
  getCode2(data) {
    return new Promise((resolve, reject) => {
      get("/general/sms/sendVcodeLogin?mob=" + data).then(res => {
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
  //修改密码
  changePWD(data) {
    return new Promise((resolve, reject) => {
      post("/sys/user/api/repassword", data).then(res => {
        resolve(res.data)
      });
    });
  }
  //登录后修改密码
  changePWD2(data) {
    return new Promise(resolve => {
      post('/sys/user/apis/repassword', data).then(res => {
        resolve(res)
      })
    })
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
  //船舶/设备分类列表   船舶管理
  getClassify(data) {
    return new Promise((resolve, reject) => {
      get("/ds/cat/api/list?query=" + data).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //船舶/设备分类列表 树形
  getClassify2() {
    return new Promise(resolve => {
      get('/ds/cat/listItemTreeNode?tid=4942035725390848').then(res => {
        resolve(res.data.list)
      })
    })
  }
  //我要入驻身份列表
  getRoleList() {
    return new Promise((resolve, reject) => {
      get("/sys/cat/api/listItmTreeNode?cd=identity").then(res => {
        let list = res.data.list.filter(item => {
          return !item.arg5 || item.arg5 != 1
        })
        resolve(list)
      });
    });
  }
  //入驻机构分页（所有的）
  getRoleAll(data) {
    return new Promise((resolve, reject) => {
      get("/ship/orgEnter/api/page?query=" + data).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //入驻详情（需要登录）
  getRoleDetail(id) {
    return new Promise((resolve, reject) => {
      get("/ship/orgEnter/apis/detail/" + id).then(res => {
        resolve(res.data)
      });
    });
  }
  //入驻详情（不登录）
  getRoleDetail2(id) {
    return new Promise((resolve, reject) => {
      get("/ship/orgEnter/api/info/" + id).then(res => {
        resolve(res.data)
      });
    });
  }
  //我要入驻新增
  settleInAdd(data) {
    return new Promise(resolve => {
      post('/ship/orgEnter/apis/add', data).then(res => {
        resolve(res)
      })
    })
  }
  //入驻身份更新
  settleInUpd(data) {
    return new Promise(resolve => {
      post('/ship/orgEnter/apis/upd', data).then(res => {
        resolve(res)
      })
    })
  }
  //商城 在线交易类
  shopHomeAdert() {
    return new Promise((resolve, reject) => {
      get("/ds/open/bannerImg").then(res => {
        resolve(res.data.list)
      });
    });
  }
  //优质店铺
  shopGoodStore() {
    return new Promise((resolve, reject) => {
      get("/ds/open/niceShops").then(res => {
        resolve(res.data.list)
      });
    });
  }
  //店铺列表分页
  shopList(data) {
    return new Promise(resolve => {
      get("/ds/shops/api/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //店铺列表不分页
  shopList2(data) {
    return new Promise(resolve => {
      get("/ds/shops/api/list?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //店铺详情
  shopDetail(id) {
    return new Promise(resolve => {
      get("/ds/shops/api/info/" + id, '',).then(res => {
        resolve(res.data)
      })
    })
  }
  //商品分类（全部，包含船舶和产品）
  shopClassify() {
    return new Promise((resolve, reject) => {
      get("/ds/open/catTree").then(res => {
        resolve(res.data.list)
      });
    });
  }
  //商品分类（排除船舶）
  goodClassify() {
    return new Promise(resolve => {
      get('/ds/open/goodsCatTree').then(res => {
        resolve(res.data.list)
      })
    })
  }
  //通过分类id查询分类信息
  catInfoById(id) {
    return new Promise(resolve => {
      get('/ds/cat/api/infoById?id=' + id).then(res => {
        resolve(res.data)
      })
    })
  }


  //产品交易列表
  goodList(data) {
    return new Promise(resolve => {
      get('/ds/open/goodsPage?query=' + data).then(res => {
        resolve(res)
      })
    })
  }
  //客户档案列表分页
  custInfoList(data) {
    return new Promise(resolve => {
      get('/ship/custInfo/apis/page?query=' + data).then(res => {
        resolve(res)
      })
    })
  }
  //客户档案列表不分页
  custInfoList2(data) {
    return new Promise(resolve => {
      get('/ship/custInfo/apis/list?query=' + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //每日特价列表
  shopDailySpecials() {
    return new Promise((resolve, reject) => {
      get("/ds/open/speGoods").then(res => {
        resolve(res.data.list)
      });
    });
  }
  //折扣产品列表
  shopDiscountPro() {
    return new Promise((resolve, reject) => {
      get("/ds/open/saleGoods").then(res => {
        resolve(res.data.list)
      });
    });
  }
  //发现好货商品列表
  shopGoodPro() {
    return new Promise((resolve, reject) => {
      get("/ds/open/niceGoods").then(res => {
        resolve(res.data.list)
      });
    });
  }
  //新品首发商品列表
  shopNewPro() {
    return new Promise((resolve, reject) => {
      get("/ds/open/newsGoods").then(res => {
        resolve(res.data.list)
      });
    });
  }
  //重点推荐商品列表
  shopRecomdPro() {
    return new Promise((resolve, reject) => {
      get("/ds/open/recGoods").then(res => {
        resolve(res.data.list)
      });
    });
  }
  //首页为你推荐
  forYouGoods() {
    return new Promise((resolve, reject) => {
      get("/ds/open/forYou").then(res => {
        resolve(res.data.list)
      });
    });
  }

  //产品列表 品牌列表
  brandList(id) {
    return new Promise((resolve, reject) => {
      get("/ds/open/brandListByCatId?catId=" + id).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //产品详情
  productDetail(id) {
    return new Promise((resolve, reject) => {
      get("/ds/open/goodsInfo?id=" + id).then(res => {
        resolve(res.data)
      });
    });
  }
  //产品详情
  productGetVr(id) {
    return new Promise((resolve, reject) => {
      get("/ds/open/getVR?id=" + id).then(res => {
        resolve(res)
      });
    });
  }
  //本店精选
  proDetailChoice(id) {
    return new Promise((resolve, reject) => {
      get("/ds/open/shopTopGoods?id=" + id).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //看了又看
  proDetailLook(id) {
    return new Promise((resolve, reject) => {
      get("/ds/open/lookAndSee?id=" + id).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //检测证书
  proDetailCeList(id) {
    return new Promise((resolve, reject) => {
      get("/ds/open/goodsCert?id=" + id).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //店铺简介
  shopIntro(id) {
    return new Promise(resolve => {
      get("/ds/open/shopInfo?id=" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //关注店铺
  followShop(data) {
    return new Promise(resolve => {
      post('/ship/favorite/apis/add', data).then(res => {
        resolve(res)
      })
    })
  }
  //取消关注店铺
  delFollow(id) {
    return new Promise(resolve => {
      get("/ship/favorite/apis/delByTargetId?id=" + id).then(res => {
        resolve(res)
      })
    })
  }




  //店铺商品分类列表
  shopCatList(id) {
    return new Promise(resolve => {
      get("/ds/open/catInShop?id=" + id).then(res => {
        resolve(res.data.list)
      })
    })
  }

  //店铺商品分页列表
  shopGoodList(data) {
    return new Promise(resolve => {
      get("/ds/open/shopGoodsPage?query=" + data).then(res => {
        resolve(res)
      })
    })
  }

  //在线交易 船舶详情
  tradeShipDetail(id) {
    return new Promise(resolve => {
      get("/ds/open/goodsInfo?id=" + id).then(res => {
        if (res.data) {
          resolve(res.data)
        } else {
          resolve(null)
        }

      })
    })
  }
  //船舶详细描述
  shipInfo(id) {
    return new Promise(resolve => {
      get("/ds/open/shipInfo?id=" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //船舶检测证书
  shipDetailCeList(id) {
    return new Promise((resolve, reject) => {
      get("/ds/open/shipCert?id=" + id).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //船舶品质保障
  shipDetailSurvey(id) {
    return new Promise((resolve, reject) => {
      get("/ds/open/shipSurvey?id=" + id).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //船舶详情的设备分类列表
  shipDetailEqupClassify(id) {
    return new Promise((resolve, reject) => {
      get("/ds/open/shipDeviceCat?id=" + id).then(res => {
        resolve(res.data)
      });
    });
  }
  //船舶详情的设备列表
  shipDetailEqupList(param, query) {
    return new Promise((resolve, reject) => {
      get("/ds/open/shipDevice?query=" + query, param).then(res => {
        resolve(res)
      });
    });
  }
  //个人信息查看
  personInfo() {
    return new Promise(resolve => {
      get("/ship/member/apis/detail", '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        // store.commit('userInfo',res.data)
        resolve(res.data)
      })
    })
  }
  //收藏总数
  favoriteTotal() {
    return new Promise(resolve => {
      get("/ship/favorite/apis/total").then(res => {
        resolve(res.data)
      })
    })
  }


  //个人信息修改
  personInfoChange(data) {
    return new Promise(resolve => {
      post("/ship/member/apis/upd", data).then(res => {
        resolve(res)
      })
    })
  }
  //身份角色列表
  roleList() {
    return new Promise(resolve => {
      get("/ship/memberOrgEnterLink/apis/listIdentities", '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        window.sessionStorage.setItem("currentRoleList", JSON.stringify(res.data.list))
        // console.log('diaoyong',window.sessionStorage.getItem('currentRole'))
        if (res.data.list.length > 0) {
          store.commit('currentRole', res.data.list[0])
        }
        resolve(res.data.list)
      })
    })
  }
  //留言提交
  msgAdd(data) {
    return new Promise(resolve => {
      post("/ship/msgBoard/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //选型报价项目工程列表
  xuanxingProjectList() {
    return new Promise(resolve => {
      get('/ship/selectionProjCat/apis/list').then(res => {
        resolve(res.data.list)
      })
    })
  }
  //商城全部设备（含规格）
  xuanxingProductList() {
    return new Promise(resolve => {
      get('/ship/soluDevice/apis/goodSkuAll').then(res => {
        resolve(res.data.list)
      })
    })
  }
  //选型报价新增
  xuanxingAdd(data) {
    return new Promise(resolve => {
      post("/ship/selectionBill/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //选型记录列表
  xuanxingList(data) {
    return new Promise(resolve => {
      get("/ship/selectionBill/apis/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //选型记录复制
  xuanxingCopy(id) {
    return new Promise(resolve => {
      get('/ship/selectionBill/apis/copyNew?id=' + id).then(res => {
        resolve(res)
      })
    })
  }
  //选型记录详情
  xuanxingDetail(id) {
    return new Promise(resolve => {
      get("/ship/selectionBill/apis/info/" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //系统消息未读
  msgUnRead() {
    return new Promise(resolve => {
      get("/ship/msgSend/apis/unread").then(res => {
        store.commit('changeMsgNum', res.data)
      })
    })
  }
  //系统消息列表
  msgList(data) {
    return new Promise(resolve => {
      get("/ship/msgSend/apis/page?query=" + data, '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //系统消息详情
  msgDetail(id) {
    return new Promise(resolve => {
      get("/ship/msgSend/apis/info/" + id, '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res.data)
      })
    })
  }
  //删除系统消息
  delMsg(ids) {
    return new Promise(resolve => {
      get("/ship/msgSend/del" ,ids, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //签到接口
  signIn() {
    return new Promise(resolve => {
      post("/ship/signIn/apis/add", '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res.data)
      })
    })
  }
  //签到分页列表
  signList(data) {
    return new Promise(resolve => {
      get("/ship/signIn/apis/page?query=" + data, '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res.data)
      })
    })
  }

  //我的合同列表
  contractList(query, data) {
    return new Promise(resolve => {
      get("/ship/contract/apis/page?query=" + query, data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //船舶的合同列表
  shipContractList(query, data) {
    return new Promise(resolve => {
      get("/ship/contract/apis/docsPage?query=" + query, data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //船舶的合同列表总金额
  shipContractSum(data) {
    return new Promise(resolve => {
      get("/ship/contract/apis/allSum", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //我的合同详情
  contractDetail(id) {
    return new Promise(resolve => {
      get("/ship/contract/apis/info/" + id, '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res.data)
      })
    })
  }
  //加入购物车
  addCart(data) {
    return new Promise((resolve, reject) => {
      post("/ds/cart/addSelf", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
        this.cartList()
      });
    });
  }
  //购物车列表
  cartList() {
    return new Promise(resolve => {
      get("/ds/cart/myList", '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res.data.list)
        let num = 0
        res.data.list.forEach(item => {
          item.items.forEach(v => {
            num += v.qty
          })
        })
        store.commit('cartNum', num)
      })
    })
  }
  //购物车修改数量
  cartChangeNum(data) {
    return new Promise((resolve, reject) => {
      get("/ds/cart/changeQty", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
        this.cartList()
      }).catch((err) => {
        reject(err)
      })
    })
  }
  //购物车修改规格
  cartChangeSku(data) {
    return new Promise(resolve => {
      post("/ds/cart/updCart", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //购物车删除
  cartDelet(data) {
    return new Promise(resolve => {
      get("/ds/cart/del", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //购物车内结算优惠券列表
  //ids 购物车列表
  cartUsable(ids) {
    return new Promise(resolve => {
      get("/ds/memberCoupon/cartUsable?ids=" + ids).then(res => {
        resolve(res)
      })
    })
  }
  byNewUsable(price, skuId) {
    return new Promise(resolve => {
      get("/ds/memberCoupon/byNewUsable?price=" + price + "&skuId=" + skuId).then(res => {
        resolve(res)
      })
    })
  }


  //新增收货地址
  addrAdd(data) {
    return new Promise(resolve => {
      post("/sys/addr/addSelf", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //修改收货地址
  addrUpd(data) {
    return new Promise(resolve => {
      post("/sys/addr/updSelf", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //修改默认收货地址
  addrUpdDef(data) {
    return new Promise(resolve => {
      get("/sys/addr/updDef", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //收货地址列表
  addrList(data) {
    return new Promise(resolve => {
      get("/sys/addr/pageSelf?query=" + data, '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //删除地址
  delAddr(data) {
    return new Promise(resolve => {
      get("/sys/addr/delSelf", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }

  //购物车提交订单
  orderCrearCart(data) {
    return new Promise(resolve => {
      post("/ds/order/submitOrderToCart", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //购物车查询运费
  cartFare(data) {
    return new Promise(resolve => {
      post("/ds/order/fareToCart", data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }

  //立即下单
  orderCreat(data) {
    return new Promise(resolve => {
      post('/ds/order/buyNew', data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res.data)
      })
    })
  }
  //快速下单——立即下单
  quickOrderCreat(data) {
    return new Promise(resolve => {
      post('/ds/order/quickBuyNew', data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //立即下单计算运费
  byNewFare(data) {
    return new Promise(resolve => {
      post('/ds/order/buyNewFare', data, {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }


  //验证订单状态和信息是否正确
  orderCheck(id) {
    return new Promise(resolve => {
      get("/ds/order/verifyOrder?ids=" + id, '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      })
    })
  }
  //首页领券中心
  couponList() {
    return new Promise(resolve => {
      get("/ds/open/getCouponList").then(res => {
        resolve(res.data.list)
      })
    })
  }
  //首页领券中心专题页
  couponListSpe() {
    return new Promise(resolve => {
      get("/ds/open/couponList").then(res => {
        resolve(res.data.list)
      })
    })
  }
  //领取优惠券
  receiveCoupon(id) {
    return new Promise(resolve => {
      get("/ds/memberCoupon/receive?couponId=" + id).then(res => {
        resolve(res)
      })
    })

  }


  //船舶管理 船舶列表分页
  shipList(data) {
    return new Promise(resolve => {
      get("/ship/solutions/api/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //船舶管理 船舶列表不分页
  shipList2(data) {
    return new Promise(resolve => {
      get("/ship/solutions/api/list?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //船舶管理 船舶详情
  shipDetail(id) {
    return new Promise(resolve => {
      get("/ship/solutions/api/info/" + id, '',).then(res => {
        resolve(res.data)
      })
    })
  }
  //行业信息栏目列表
  infoList(data) {
    return new Promise(resolve => {
      get("/ship/indusInfoCat/api/list?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //行业信息分页
  tradeInfo(data) {
    return new Promise(resolve => {
      get("/ship/indusInfo/api/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //行业信息无分页
  tradeInfo2(data) {
    return new Promise(resolve => {
      get("/ship/indusInfo/api/list", data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //行业信息详情
  detailInfo(id) {
    return new Promise(resolve => {
      get("/ship/indusInfo/api/info/" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //客服电话
  serviceTel(data) {
    return new Promise(resolve => {
      get("/ship/serviceTel/api/list?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //平台规则 类目
  ruleCatList() {
    return new Promise(resolve => {
      get('/ship/ruleCat/api/list').then(res => {
        resolve(res.data.list)
      })
    })
  }
  //平台规则 列表
  ruleList(data) {
    return new Promise(resolve => {
      get('/ship/ruleCont/api/list?query=' + data).then(res => {
        let list = res.data.list.filter(item => item.isShow)
        resolve(list)
      })
    })
  }
  //平台规则 详情
  ruleDetail(id) {
    return new Promise(resolve => {
      get('/ship/ruleCont/api/info/' + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //  新增客户
  addCustomer(data) {
    return new Promise(resolve => {
      post('/ship/custInfo/apis/add', data).then(res => {
        resolve(res.data)
      })
    })
  }
  //  我的预约列表
  subscribeList(data) {
    return new Promise(resolve => {
      get('/ship/designAppointment/apis/page?query=' + data).then(res => {
        resolve(res)
      })
    })
  }
  // 我的预约详情
  subscribeDetail(id) {
    return new Promise(resolve => {
      get('/ship/designAppointment/apis/info/' + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //维保服务新增
  addDocsMaint(data) {
    return new Promise(resolve => {
      post('/ship/docsMaint/apis/add', data).then(res => {
        resolve(res.data)
      })
    })
  }
  //船舶设备 分页
  shipCatList(data) {
    return new Promise(resolve => {
      get('/ds/cat/api/listDeviceCat?query=' + data).then(res => {
        resolve(res)
      })
    })
  }
  //数据字典-查询下一级列表
  dataDictionary(cd) {
    return new Promise(resolve => {
      get("/sys/cat/api/listByPcd?cd=" + cd).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //预约设计提交
  designAdd(data) {
    return new Promise(resolve => {
      post("/ship/designAppointment/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //diy报价
  diyOffer(data) {
    return new Promise(resolve => {
      post('/ship/diyQuoteRecords/apis/quote', data).then(res => {
        resolve(res.data)
      })
    })
  }
  //船舶分类
  shipClassify() {
    return new Promise(resolve => {
      get('/ds/open/goodsShipCat').then(res => {
        resolve(res.data)
      })
    })
  }
  //船舶列表
  shipTradeList(data) {
    return new Promise(resolve => {
      get('/ds/open/shipGoodsPage?query=' + data).then(res => {
        resolve(res)
      })
    })
  }
  //规范/设计列表分页
  standardList(data) {
    return new Promise(resolve => {
      get('/ship/norm/api/page?query=' + data).then(res => {
        resolve(res)
      })
    })
  }
  //规范/设计详情
  standardDetail(id) {
    return new Promise(resolve => {
      get('/ship/norm/api/info/' + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //店铺搜索分页列表
  storeSearch(data) {
    return new Promise((resolve, reject) => {
      get("/search/shops/api/page", data).then(res => {
        resolve(res)
      });
    });
  }
  //船舶设计方案分页列表
  programSearch(data) {
    return new Promise((resolve, reject) => {
      get("/search/solutions/api/page", data).then(res => {
        resolve(res)
      });
    });
  }
  //商品/船舶搜索
  goodsSearch(data) {
    return new Promise((resolve, reject) => {
      get("/search/goods/api/page", data).then(res => {
        resolve(res)
      });
    });
  }
  //行业资讯-分页
  infoSearch(data) {
    return new Promise((resolve, reject) => {
      get("/search/indusInfo/api/page", data).then(res => {
        resolve(res)
      });
    });
  }
  //个人中心-我的订单
  myOrderP(query) {
    return new Promise((resolve, reject) => {
      get("/ds/order/myPage?query=" + query, '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      });
    });
  }
  //订单分页列表(设计订单,建造订单等)
  shipOderPage(query, data) {
    return new Promise(resolve => {
      get("/ship/order/apis/page?query=" + query, data).then(res => {
        resolve(res)
      })
    })
  }
  shipOrderDetail(id) {
    return new Promise(resolve => {
      get('/ship/order/apis/info/' + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //热搜关键词
  keyWords(data) {
    return new Promise((resolve, reject) => {
      get("/ship/keyWords/api/list", data).then(res => {
        resolve(res)
      });
    });
  }
  //微信支付
  wxPay(id) {
    return new Promise((resolve, reject) => {
      get("/pay/wxPay/qrPay?ids=" + id).then(res => {
        resolve(res)
      });
    });
  }
  //检测微信是否支付完成
  wxPayStatus(id) {
    return new Promise((resolve, reject) => {
      get("/pay/wxPay/wxPayStatus?ids=" + id).then(res => {
        resolve(res)
      });
    });
  }
  //取消待支付订单
  cancelPay(id) {
    return new Promise((resolve, reject) => {
      get("/ds/order/cancelOrder?orderId=" + id).then(res => {
        resolve(res)
      });
    });
  }
  //删除订单
  delOrder(id) {
    return new Promise((resolve, reject) => {
      get("/ds/order/delOrderFlag?id=" + id).then(res => {
        resolve(res)
      });
    });
  }

  //订单详情
  orderDetail(id, cd) {
    return new Promise((resolve, reject) => {
      get("/ds/order/orderInfo?id=" + id + '&orderCd=' + cd, '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res.data)
      });
    });
  }

  //查看物流信息
  trace(com, num) {
    return new Promise((resolve, reject) => {
      get('/ds/logi/query?com=' + com + '&num=' + num).then(res => {
        resolve(res)
      });
    });
  }


  //在线交易——排行榜单
  goodsRank() {
    return new Promise((resolve, reject) => {
      get("/ds/open/goodsTop").then(res => {
        resolve(res.data.list)
      });
    });
  }
  //排行榜单专题
  goodsRank30() {
    return new Promise((resolve, reject) => {
      get("/ds/open/goodsTop30").then(res => {
        resolve(res.data.list)
      });
    });
  }
  //在线交易——平台成交总量
  volume() {
    return new Promise((resolve, reject) => {
      get("/ds/open/getVolume").then(res => {
        resolve(res.data)
      });
    });
  }
  //在线交易——平台成交总量--船舶
  volumeShip() {
    return new Promise((resolve, reject) => {
      axios.get("/visual/sales/api/ships").then(res => {
        console.log(res)
        resolve(res.data.value)
      });
    });
  }
  //在线交易——平台成交总量--产品
  volumePro() {
    return new Promise((resolve, reject) => {
      axios.get("/visual/sales/api/prods").then(res => {
        resolve(res.data.value)
      });
    });
  }
  //在线交易——平台成交总量--其他
  volumeOther() {
    return new Promise((resolve, reject) => {
      axios.get("/visual/sales/api/other").then(res => {
        resolve(res.data.value)
      });
    });
  }
  //在线交易——平台成交总量--总额
  volumeTotal() {
    return new Promise((resolve, reject) => {
      axios.get("/visual/sales/api/total").then(res => {
        resolve(res.data.value)
      });
    });
  }
  //个人中心——全部船舶
  allShip(query, data) {
    return new Promise((resolve, reject) => {
      get("/ship/docs/apis/page?query=" + query, data).then(res => {
        resolve(res)
      });
    });
  }
  //船舶资料——船舶基本资料
  shipInfoBasic(id, data) {
    return new Promise((resolve, reject) => {
      get("/ship/docs/apis/info/" + id, data).then(res => {
        resolve(res.data)
      });
    });
  }
  //船舶资料——机构详情
  orgInfoBasic(data) {
    return new Promise((resolve, reject) => {
      get("/ship/orgEnter/apis/basicInfo", data).then(res => {
        resolve(res.data)
      });
    });
  }
  //建造过程 不分页列表
  buildStep(query) {
    return new Promise((resolve, reject) => {
      get("/ship/docsBuild/apis/list?query=" + query).then(res => {
        resolve(res.data.list)
      });
    });
  }

  //建造过程 -全状态列表
  buildStatusAll(query) {
    return new Promise((resolve, reject) => {
      get("/ship/docsBuild/apis/listAll?query=" + query).then(res => {
        resolve(res.data.list)
      });
    });
  }


  //建造过程(审核未通过) 分页列表
  buildStepNo(query) {
    return new Promise((resolve, reject) => {
      get("/ship/docsBuild/apis/pageNotpass?query=" + query).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //品质保障 不分页列表
  qualityList(query) {
    return new Promise((resolve, reject) => {
      get("/ship/docsSurvey/api/list?query=" + query).then(res => {
        resolve(res.data.list)
      });
    });
  }

  //品质保障 不分页列表-全状态
  qualityListAll(query) {
    return new Promise((resolve, reject) => {
      get("/ship/docsSurvey/api/listAll?query=" + query).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //品质保障未通过 分页列表
  qualityListNo(query) {
    return new Promise((resolve, reject) => {
      get("/ship/docsSurvey/apis/pageNotpass?query=" + query).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //维保记录 分页列表
  maintenR(query, data) {
    return new Promise((resolve, reject) => {
      get("/ship/taskNote/api/page?query=" + query, data).then(res => {
        resolve(res)
      });
    });
  }
  //派单负责人
  toRepairMan(id) {
    return new Promise((resolve, reject) => {
      get("/ship/taskNote/api/list/findMemAccount/infos?handleOrgId=" + id).then(res => {
        resolve(res.data.list)
      });
    });
  }
  //维保派单
  toDispatch(data) {
    return new Promise(resolve => {
      get('/ship/taskNote/api/distribute', data).then(res => {
        resolve(res)
      })
    })
  }
  //维保工单详情
  taskNoteDetail(id) {
    return new Promise(resolve => {
      get('/ship/taskNote/api/infoAll/' + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //维保工单完成
  taskNoteFinish(data) {
    return new Promise(resolve => {
      post('/ship/taskNote/api/finishMaintain', data).then(res => {
        resolve(res)
      })
    })
  }
  //新增维保服务
  taskNoteAdd(data) {
    return new Promise(resolve => {
      post('/ship/taskNote/api/add', data).then(res => {
        resolve(res)
      })
    })
  }
  //对维保记录进行评价
  toRepair(data) {
    return new Promise((resolve, reject) => {
      post("/ship/taskQues/apis/add", data).then(res => {
        resolve(res)
      });
    });
  }
  //船舶资料——检测证书
  certificate(query) {
    return new Promise((resolve, reject) => {
      get("/ship/docsCertificate/apis/page?query=" + query).then(res => {
        resolve(res)
      });
    });
  }
  //个人中心——收付款记录分页列表   有商城和非商城的记录
  payment(query, data) {
    return new Promise((resolve, reject) => {
      get("/ds/moneyPlan/apis/page?query=" + query, data).then(res => {
        resolve(res)
      });
    });
  }
  //个人中心——收款记录分页列表   有商城和非商城的记录
  payment2(data) {
    return new Promise((resolve, reject) => {
      get("/ds/moneyPlan/apis/page1", data).then(res => {
        resolve(res)
      });
    });
  }
  // 个人中心-收付款记录分页列表 有商城和非商城的记录
  payment3(query, data) {
    return new Promise((resolve, reject) => {
      get("/ship/paymentPlan/apis/page?query=" + query, data).then(res => {
        resolve(res)
      });
    });
  }
  //个人中心-提交确认/确认收款
  confirm(data) {
    return new Promise(resolve => {
      post("/ship/payment/apis/audit", data).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-设计流程列表
  designDeptList(data) {
    return new Promise(resolve => {
      get("/ship/docsDesign/apis/list?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }


  //个人中心-设计流程列表-全状态
  designDeptListAll(data) {
    return new Promise(resolve => {
      get("/ship/docsDesign/apis/listAll?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //个人中心-设计流程新增
  designDeptAdd(data) {
    return new Promise(resolve => {
      post("/ship/docsDesign/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-设计流程修改
  designDeptUpd(data) {
    return new Promise(resolve => {
      post("/ship/docsDesign/apis/upd", data).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-建造流程新增
  buildDeptAdd(data) {
    return new Promise(resolve => {
      post("/ship/docsBuild/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-建造流程修改
  buildDeptUpd(data) {
    return new Promise(resolve => {
      post("/ship/docsBuild/apis/upd", data).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-建造流程删除
  buildDeptDel(id) {
    return new Promise(resolve => {
      get("/ship/docsBuild/apis/del?ids=" + id).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-品质保障新增
  quaGuarAdd(data) {
    return new Promise(resolve => {
      post("/ship/docsSurvey/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-品质保障修改
  quaGuarUpd(data) {
    return new Promise(resolve => {
      post("/ship/docsSurvey/apis/upd", data).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-品质保障删除
  quaGuarDel(id) {
    return new Promise(resolve => {
      get("/ship/docsSurvey/apis/del?ids=" + id).then(res => {
        resolve(res)
      })
    })
  }
  //金融保险
  financeApplic(data) {
    return new Promise(resolve => {
      post("/ship/financeApplic/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //我的收藏-船舶设计方案
  collect1(data, nm) {
    return new Promise(resolve => {
      get('/ship/favorite/apis/page?query=' + data + '&nm=' + nm).then(res => {
        resolve(res)
      })
    })
  }
  //我的收藏-船舶/设备
  collect2(data, nm) {
    return new Promise(resolve => {
      get('/ship/favorite/apis/page2?query=' + data + '&nm=' + nm).then(res => {
        resolve(res)
      })
    })
  }
  //我的收藏-店铺
  collect3(data, nm) {
    return new Promise(resolve => {
      get('/ship/favorite/apis/page3?query=' + data + '&nm=' + nm).then(res => {
        resolve(res)
      })
    })
  }
  //我的收藏-学习-课件分页查询
  collect4(data, nm) {
    return new Promise(resolve => {
      get('/ship/favorite/apis/page4?query=' + data + '&nm=' + nm).then(res => {
        resolve(res)
      })
    })
  }
  //我的收藏-学习-直播分页查询
  collect5(data, nm) {
    return new Promise(resolve => {
      get('/ship/favorite/apis/page5?query=' + data + '&nm=' + nm).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-检验检测列表
  jianyanList(data) {
    return new Promise(resolve => {
      get("/ship/docsCertificate/apis/page?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }

  //个人中心-检验检测列表-全状态
  jianyanListAll(data) {
    return new Promise(resolve => {
      get("/ship/docsCertificate/apis/pageAll?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //个人中心-检验检测列表
  jianyanList2(data) {
    return new Promise(resolve => {
      get("/ship/docsCertificate/apis/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }

  //个人中心-检验检测列表-全状态
  jianyanListAll2(data) {
    return new Promise(resolve => {
      get("/ship/docsCertificate/apis/pageAll?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-船舶资料 设备及其他证书 未通过（这个接口接口文档上写的是建造档案检验证书 但是事实上是设备及其他证书的）
  jianyanListNo(data) {
    return new Promise(resolve => {
      get("/ship/docsCertificate/apis/pagePartsNotpass?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //个人中心-船舶资料 建造档案 检测报告 未通过
  jianyanListNo2(data) {
    return new Promise(resolve => {
      get("/ship/docsCertificate/apis/pageNotpass?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //证书通用接口(无需登录)
  certNotLoginList(data) {
    return new Promise(resolve => {
      get("/ship/docsCertificate/api/page?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }

  //个人中心-检验证书新增
  inspectAdd(data) {
    return new Promise(resolve => {
      post("/ship/docsCertificate/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-检验证书修改
  inspectUpd(data) {
    return new Promise(resolve => {
      post("/ship/docsCertificate/apis/upd", data).then(res => {
        resolve(res)
      })
    })
  }
  //个人中心-检验证书修改
  inspectDel(id) {
    return new Promise(resolve => {
      get("/ship/docsCertificate/apis/del?ids=" + id).then(res => {
        resolve(res)
      })
    })
  }
  //看了又看
  lookAndLook(data) {
    return new Promise(resolve => {
      get('/ds/open/catLookAndSee', data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //产品精选
  proSelect(data) {
    return new Promise(resolve => {
      get('/ds/open/selected', data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //投标管理分页列表
  bidManage(query, data) {
    return new Promise(resolve => {
      get("/ship/bid/apis/page?query=" + query, data).then(res => {
        resolve(res)
      })
    })
  }
  //投标报名
  bidApply(data) {
    return new Promise(resolve => {
      post("/ship/bidApply/apis/apply", data).then(res => {
        resolve(res)
      })
    })
  }
  //投标报价
  bidOffer(data) {
    return new Promise(resolve => {
      post("/ship/bidOffer/apis/offer", data).then(res => {
        resolve(res)
      })
    })
  }
  //投标报价更新
  bidOfferUpd(data) {
    return new Promise(resolve => {
      post("/ship/bidOffer/apis/upd", data).then(res => {
        resolve(res)
      })
    })
  }
  //报价单详情
  bidOfferInfo(id) {
    return new Promise((resolve, reject) => {
      get("/ship/bid/apis/info/" + id, '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      });
    });
  }
  //个人中心查看中标详情
  bidOfferDetail(data) {
    return new Promise(resolve => {
      get("/ship/bidOffer/apis/detail", data).then(res => {
        resolve(res)
      })
    })
  }
  //品牌搜索
  brandSearch(data) {
    return new Promise((resolve, reject) => {
      get("/search/brand/api/page", data).then(res => {
        resolve(res)
      });
    });
  }
  //分类属性列表
  getCatList(id) {
    return new Promise((resolve, reject) => {
      get("/ds/open/attrAndValListByCatId?catId=" + id, '', {
        "sinovat-token": window.sessionStorage.getItem("token")
      }).then(res => {
        resolve(res)
      });
    });
  }
  //讲师库-分页列表
  getTeacherPage(data) {
    return new Promise(resolve => {
      get("/ship/studyTeacher/api/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //讲师库-列表
  getTeacher(data) {
    return new Promise(resolve => {
      get("/ship/studyTeacher/api/list?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //学习资源分类列表
  getStudyCont(data) {
    return new Promise(resolve => {
      get("/ship/studyCont/api/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //学习资源浏览访问
  studyCont(id) {
    return new Promise((resolve, reject) => {
      get("/ship/studyCont/apis/visit/" + id).then(res => {
        resolve(res)
      });
    });
  }
  //学习资源-播放/下载计数
  studyContPlay(id) {
    return new Promise((resolve, reject) => {
      get("/ship/studyCont/apis/play/" + id).then(res => {
        resolve(res)
      });
    });
  }
  //在线直播分类
  studyCat() {
    return new Promise(resolve => {
      get("/ship/studyLiveCat/api/list").then(res => {
        resolve(res.data.list)
      })
    })
  }
  //在线直播分页列表
  studyLive(data) {
    return new Promise(resolve => {
      get("/ship/studyLive/api/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //在线直播-详情查询
  livePlay(id) {
    return new Promise((resolve, reject) => {
      get("/ship/studyLive/apis/info/" + id).then(res => {
        resolve(res)
      });
    });
  }
  //视频hls
  getVideoUrl(data) {
    return new Promise(resolve => {
      get('/sys/hik/previewURLs?code=' + data).then(res => {
        resolve(res.data.data.url)
      })
    })
  }
  //在线学习栏目列表
  studyContCat(data) {
    return new Promise(resolve => {
      get("/ship/studyContCat/api/list?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //在线学习学习资源-课件上传
  learningUpload(data) {
    return new Promise(resolve => {
      post("/ship/studyCont/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }

  //销售订单(供应商)
  shopOrder(data) {
    return new Promise(resolve => {
      get("/ds/purchase/pageBySupplier?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //销售订单详情(基本信息)
  shopBasicDetail(id) {
    return new Promise(resolve => {
      get("/ds/purchase/info/" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //销售订单详情(产品信息)
  shopProductDetail(data) {
    return new Promise(resolve => {
      get("/ds/purchaseItm/list?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //物流公司列表
  logiList() {
    return new Promise(resolve => {
      get("/ds/logi/list").then(res => {
        resolve(res.data.list)
      })
    })
  }
  //销售订单发货
  shopDelivery(data) {
    return new Promise(resolve => {
      post('/ds/order/shipInvent', data).then(res => {
        resolve(res.data)
      })
    })
  }
  //销售出库订单(供应商)
  outgoingList(data) {
    return new Promise(resolve => {
      get("/ds/purchaseWh/accountPageOver?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //生成对账单
  createOrder(id) {
    return new Promise(resolve => {
      get("/ds/purchaseAccount/addAccount?ids=" + id).then(res => {
        resolve(res)
      })
    })
  }
  //申请分期
  applyStaging(id) {
    return new Promise(resolve => {
      get("/ds/order/applyStaging?orderId=" + id).then(res => {
        resolve(res)
      })
    })
  }
  //分期详情
  stageInfo(id) {
    return new Promise(resolve => {
      get("/ds/order/stageInfo?orderId=" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //分期付款确认
  stageConfirm(data) {
    return new Promise(resolve => {
      get("/ds/orderStage/updVoucher", data).then(res => {
        resolve(res)
      })
    })
  }
  //线下支付
  payXX(data) {
    return new Promise(resolve => {
      get("/ds/order/offline", data).then(res => {
        resolve(res)
      })
    })
  }
  //对账单列表
  statList(data) {
    return new Promise(resolve => {
      get("/ds/purchaseAccount/myPage?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //对账单详情
  statDetail(id) {
    return new Promise(resolve => {
      get("/ds/purchaseAccount/accountInfo?id=" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //确认收货
  confirmGoods(id) {
    return new Promise(resolve => {
      get("/ds/order/buyerReceipt?orderId=" + id).then(res => {
        resolve(res)
      })
    })
  }
  //退货
  orderReturn(data) {
    return new Promise(resolve => {
      post("/ds/orderRtn/rtn", data).then(res => {
        resolve(res)
      })
    })
  }
  //补贴申请-分页列表
  subsidiesList(query) {
    return new Promise(resolve => {
      get("/ship/pilotApplication/apis/page?query=" + query).then(res => {
        resolve(res)
      })
    })
  }
  //补贴申请-详情
  subsidiesDetail(id) {
    return new Promise(resolve => {
      get("/ship/pilotApplication/apis/info/" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //试点服务栏目
  serviceColumn(query) {
    return new Promise(resolve => {
      get("/ship/serviceInfoCat/api/page?query=" + query).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //试点服务内容
  serviceContent(query) {
    return new Promise(resolve => {
      get("/ship/serviceInfo/api/page?query=" + query).then(res => {
        resolve(res)
      })
    })
  }
  //试点服务内容详情
  serviceDetail(id) {
    return new Promise(resolve => {
      get("/ship/serviceInfo/api/info/" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //试点服务列表 树形结构
  serviceInfoList(query) {
    return new Promise(resolve => {
      get("/ship/serviceInfoCat/api/listTreeNode?query=" + query).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //补贴申请-新增
  subsidiesAdd(data) {
    return new Promise(resolve => {
      post("/ship/pilotApplication/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //子账号维护
  //子账户信息-分页列表
  getAccountList(data) {
    return new Promise(resolve => {
      get("/ship/member/apis/findSubAccount?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //新增子账户
  addSubAccount(data) {
    return new Promise(resolve => {
      post('/ship/member/apis/addSubAccount', data).then(res => {
        resolve(res.data)
      })
    })
  }
  //修改子账户
  updSubAccount(data) {
    return new Promise(resolve => {
      post('/ship/member/apis/updSubAccount', data).then(res => {
        resolve(res.data)
      })
    })
  }
  //删除子账户
  delSubAccount(ids) {
    return new Promise(resolve => {
      get('/ship/member/apis/delSubAccount?ids=' + ids).then(res => {
        resolve(res.data)
      })
    })
  }
  //查看账户权限
  getAuthz(data) {
    return new Promise(resolve => {
      get("/general/auth/getAuthz", data).then(res => {
        resolve(res.data)
      })
    })
  }
  //获取子账号的所有权限列表
  getjuri(query) {
    return new Promise(resolve => {
      get("/sys/rsco/list?query=" + query).then(res => {
        resolve(res.data.list)
      })
    })
  }

  //获取权限列表和修改时权限回显
  getRsco(data) {
    return new Promise(resolve => {
      get("/sys/rsco/apis/getRsco", data).then(res => {
        resolve(res.data.list)
      })
    })
  }

  //船舶设计方案 新增设备时的列表
  designCatList(query, data) {
    return new Promise(resolve => {
      get("/ship/soluDevice/apis/goodSku?query=" + query, data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //新增船舶设计方案
  addDesignFile(data) {
    return new Promise(resolve => {
      post('/ship/solutions/apis/addSolutionAndDevice', data).then(res => {
        resolve(res)
      })
    })
  }

  //我的推荐
  myRecommend(data) {
    return new Promise(resolve => {
      get('/ds/view/Commission/apis/page?query=' + data).then(res => {
        resolve(res)
      })
    })
  }
  //我的推荐 推荐人总数
  myRecommendTotal(data) {
    return new Promise(resolve => {
      get('/ds/view/Commission/apis/commissionNum').then(res => {
        resolve(res.data.num)
      })
    })
  }
  //我的跟进记录
  myCustFollow(data) {
    return new Promise(resolve => {
      get('/ship/custFollow/apis/page?query=' + data).then(res => {
        resolve(res)
      })
    })
  }
  //新增跟进记录
  custFollwAdd(data) {
    return new Promise(resolve => {
      post('/ship/custFollow/apis/add', data).then(res => {
        resolve(res)
      })
    })
  }
  //商机列表不分页
  custProjectList(data) {
    return new Promise(resolve => {
      get('/ship/custProject/apis/list?query=' + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //商机列表 分页
  custProjectPage(data) {
    return new Promise(resolve => {
      get('/ship/custProject/apis/page?query=' + data).then(res => {
        resolve(res)
      })
    })
  }
  //新增商机
  custProjectAdd(data) {
    return new Promise(resolve => {
      post('/ship/custProject/apis/add', data).then(res => {
        resolve(res)
      })
    })
  }
  //商机修改
  custProjectUpd(data) {
    return new Promise(resolve => {
      post('/ship/custProject/apis/upd', data).then(res => {
        resolve(res)
      })
    })
  }

  //船舶设计方案详情
  designFileDetail(id) {
    return new Promise(resolve => {
      get("/ship/solutions/api/info/" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //船舶设计方案  设备列表（设计方案）
  designGoodsList(query) {
    return new Promise(resolve => {
      get("/ship/soluDevice/api/list?query=" + query).then(res => {
        resolve(res)
      })
    })
  }
  //船舶设计方案  设备列表（设计方案）
  designGoodsPage(query) {
    return new Promise(resolve => {
      get("/ship/soluDevice/api/page?query=" + query).then(res => {
        resolve(res)
      })
    })
  }
  //我要出售
  toSale(data) {
    return new Promise(resolve => {
      post('/ship/saleApplication/apis/add', data).then(res => {
        resolve(res)
      })
    })
  }
  //申请开票
  invoiceApply(data) {
    return new Promise(resolve => {
      post('/ds/invoiceApplication/apis/add', data).then(res => {
        resolve(res)
      })
    })
  }
  //申请开票时的单位列表
  invoiceCompany(data) {
    return new Promise(resolve => {
      get('/ds/invoiceInfo/apis/list?query=' + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //更新船舶设计方案
  updDesignFile(data) {
    return new Promise(resolve => {
      post('/ship/solutions/apis/updSolutionAndDevice', data).then(res => {
        resolve(res)
      })
    })
  }
  //船舶档案  设备列表(个人中心船舶档案)
  fileDeviceList(query, data) {
    return new Promise(resolve => {
      get("/ship/docsDevice/apis/pageShopDeviceNew?query=" + query, data).then(res => {
        resolve(res)
      })
    })
  }
  //船舶档案  设备列表(个人中心船舶档案)
  fileDeviceList2(query, data) {
    return new Promise(resolve => {
      // get("/ship/docsDevice/apis/pageShopDevice?query="+query,data).then(res=>{
      get("/ship/docsDevice/listTreeNode?query=" + query, data).then(res => {
        resolve(res)
      })
    })
  }
  //删除船舶设计方案
  delDesignFile(id) {
    return new Promise(resolve => {
      get("/ship/solutions/apis/del?ids=" + id).then(res => {
        resolve(res)
      })
    })
  }
  //浏览记录
  viewHistory(data) {
    return new Promise(resolve => {
      get("/ds/history/myPage?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //个人中心看了又看
  personLook() {
    return new Promise(resolve => {
      get("/ds/open/myLookAndSee").then(res => {
        resolve(res.data.list)
      })
    })
  }
  //DIY报价记录列表
  diyList(data) {
    return new Promise(resolve => {
      get("/ship/diyQuoteRecords/apis/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //DIY报价记录详情
  diyDetail(id) {
    return new Promise(resolve => {
      get("/ship/diyQuoteRecords/apis/info/" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //DIY报价-价格调整系数列表
  diyParamList(data) {
    return new Promise(resolve => {
      get("/ship/diyCoef/apis/list?query=" + data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //DIY报价-价格调整系数详情
  diyParamDetail(data) {
    return new Promise(resolve => {
      get("/ship/diyCoef/apis/infoByParams", data).then(res => {
        resolve(res.data)
      })
    })
  }
  //船厂详情里的推荐船型
  factoryRecom(id, query) {
    return new Promise(resolve => {
      get("/ship/soluReco/api/page?orgEnterId=" + id + '&query=' + query).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //分类id查询商品品牌
  listByCat(data) {
    return new Promise(resolve => {
      get("/ds/brand/listByCatId", data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //子账户维护的角色选择
  listIdent(id) {
    return new Promise(resolve => {
      get("/ship/memberOrgEnterLink/apis/subAccount/listIdentities?subAccountId=" + id).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //大屏摄像头列表
  videoList(query) {
    return new Promise(resolve => {
      if (query) {
        get("/visual/camera/api/list?query=" + query).then(res => {
          resolve(res.data.list)
        })
      } else {
        get("/visual/camera/api/list").then(res => {
          resolve(res.data.list)
        })
      }

    })
  }
  //大屏建造船厂和摄像头数量
  videoFactory() {
    return new Promise(resolve => {
      get("/visual/camera/api/dockYards").then(res => {
        resolve(res.data)
      })
    })
  }
  //大额支付
  toPayBank(data) {
    return new Promise(resolve => {
      post('/pay/zsBank/smartPay', data).then(res => {
        resolve(res.data)
      })
    })
  }
  //大额支付2
  toPayBank2(url, data) {
    return new Promise(resolve => {
      post(url, data).then(res => {
        resolve(res.data)
      })
    })
  }
  //随机产品
  proRank(query, num) {
    return new Promise(resolve => {
      get('/ds/open/randGoods?query=' + query + '&num=' + num).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //缓存保存 对象
  toSave(key, data) {
    return new Promise(resolve => {
      post('/general/cache/objSave?key=' + key, data).then(res => {
        resolve(res)
      })
    })
  }
  //缓存读取
  toGet(data) {
    return new Promise(resolve => {
      get('/general/cache/get?key=' + data).then(res => {
        resolve(res.data)
      })
    })
  }
  //检验手机号是否重复
  checkMob(data) {
    return new Promise((resolve, reject) => {
      get('/ship/member/api/checkMob?mob=' + data, '', true).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err.data.msg)
      })
    })
  }
  //检验用户名是否重复
  checkUser(data) {
    return new Promise((resolve, reject) => {
      get('/ship/member/api/checkUsername?username=' + data, '', true).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err.data.msg)
      })
    })
  }
  //船舶节点通知
  shipNotice(data) {
    return new Promise(resolve => {
      post('/ship/docsNotice/apis/add', data).then(res => {
        resolve(res)
      })
    })
  }
  //获取通知后台管理员
  adminUserList(query) {
    return new Promise(resolve => {
      get('/sys/user/list?query=' + query).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //子账号维护 获取权限列表和修改时权限回显.
  getAccRsco(data) {
    return new Promise(resolve => {
      get("/sys/rsco/apis/getRsco", data).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //快速下单——列表
  getQuickOrder() {
    return new Promise(resolve => {
      get("/ds/quickbuyStore/apis/list").then(res => {
        resolve(res.data.list)
      })
    })
  }
  //快速下单——分页列表
  quickOrderPage(query) {
    return new Promise(resolve => {
      get("/ds/quickbuyStore/apis/page?query=" + query).then(res => {
        resolve(res)
      })
    })
  }
  //快速下单的产品列表
  getQuickGoods() {
    return new Promise(resolve => {
      get("/ds/goods/list").then(res => {
        resolve(res.data.list)
      })
    })
  }
  //快速下单的产品列表(直接规格)
  getQuickGoodsSku(query) {
    return new Promise(resolve => {
      get("/ds/goodsSku/pageAGoods?query=" + query).then(res => {
        resolve(res)
      })
    })
  }
  //快速下单通过商品id获得规格
  getSkuList(id) {
    return new Promise(resolve => {
      get("/ds/goodsSku/listByGoodsId?id=" + id).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //快速下单——添加
  addQuickOrder(data) {
    return new Promise(resolve => {
      post("/ds/quickbuyStore/apis/add", data).then(res => {
        resolve(res.data)
      })
    })
  }
  //快速下单——修改
  updQuickOrder(data) {
    return new Promise(resolve => {
      post("/ds/quickbuyStore/apis/upd", data).then(res => {
        resolve(res.data)
      })
    })
  }

  //快速下单——删除
  delQuickOrder(id) {
    return new Promise(resolve => {
      get("/ds/quickbuyStore/apis/del?ids=" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //船舶档案——变更记录
  bianRecords(query) {
    return new Promise(resolve => {
      get('/ship/docsChgRecords/apis/page?query=' + query).then(res => {
        resolve(res)
      })
    })
  }
  //商品对应的配件
  getPartsList(id) {
    return new Promise(resolve => {
      get("/ds/goodsSkuPartLink/api/list?skuId=" + id).then(res => {
        resolve(res.data.list)
      })
    })
  }
  //获取整改单号
  getCd() {
    return new Promise(resolve => {
      get("/ship/docsRectify/apis/getCd").then(res => {
        resolve(res.data)
      })
    })
  }
  //获取整改单位
  getRecitifyList(data) {
    return new Promise(resolve => {
      get('/ship/orgEnter/getOrg?docsId=' + data).then(res => {
        resolve(res)
      })
    })
  }
  //获取检验检测机构
  getRecitifyListTest(data) {
    return new Promise(resolve => {
      get('/ship/orgEnter/getOrgTest?docsId=' + data).then(res => {
        resolve(res)
      })
    })
  }
  //开票资料详情
  getQualiInfo(data) {
    return new Promise(resolve => {
      get("/ds/invoiceInfo/apis/infoByOrgEnterId", data).then(res => {
        resolve(res)
      })
    })
  }
  //开票资料新增
  qualiAdd(data) {
    return new Promise(resolve => {
      post("/ds/invoiceInfo/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //开票资料更新
  qualiUpd(data) {
    return new Promise(resolve => {
      post("/ds/invoiceInfo/apis/upd", data).then(res => {
        resolve(res)
      })
    })
  }
  //开票资料删除
  qualiDel(data) {
    return new Promise(resolve => {
      get("/ds/invoiceInfo/apis/del", data).then(res => {
        resolve(res)
      })
    })
  }
  //开票资料地址新增
  qualiAddrAdd(data) {
    return new Promise(resolve => {
      post("/ds/invoiceAddr/apis/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //开票资料地址更新
  qualiAddrUpd(data) {
    return new Promise(resolve => {
      post("/ds/invoiceAddr/apis/upd", data).then(res => {
        resolve(res)
      })
    })
  }
  //开票资料地址删除
  qualiAddrDel(data) {
    return new Promise(resolve => {
      get("/ds/invoiceAddr/apis/del", data).then(res => {
        resolve(res)
      })
    })
  }
  //获取整改单位人员列表
  getRecitifyPeople(query) {
    return new Promise(resolve => {
      get('/ship/memberOrgEnterLink/api/listA?query=' + query).then(res => {
        resolve(res)
      })
    })
  }
  //开票资料详情
  getQualiAddrInfo(data) {
    return new Promise(resolve => {
      get("/ds/invoiceAddr/apis/listByOrderId", data).then(res => {
        resolve(res)
      })
    })
  }
  //新增整改单
  rectifyAdd(data) {
    return new Promise(resolve => {
      post('/ship/docsRectify/apis/add', data).then(res => {
        resolve(res)
      })
    })
  }
  // 开票结果
  getInvoiceResult(data) {
    return new Promise(resolve => {
      get("/ds/invoiceResult/apis/listByOrderId", data).then(res => {
        resolve(res)
      })
    })
  }
  //发票帮助中心列表
  getBillHelpList(query) {
    return new Promise(resolve => {
      get('/ds/invoiceSupport/apis/page?query=' + query).then(res => {
        resolve(res.data)
      })
    })
  }

  //发票帮助中心详情
  getBillHelpDetail(query) {
    return new Promise(resolve => {
      get('/ds/invoiceSupport/apis/info/' + query).then(res => {
        resolve(res.data)
      })
    })
  }

  // 整改单列表
  getrectifyList(condition, msg, issueTm) {
    return new Promise(resolve => {
      get("/ship/docsRectify/apis/page?query=" + condition + "&msg=" + msg + "&issueTm=" + issueTm).then(res => {
        resolve(res)
      })
    })
  }
  // 整改详情
  getRectifyDetail(id) {
    return new Promise(resolve => {
      get("/ship/docsRectify/apis/info/" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  // 整改上报
  handleRectifyReport(body) {
    return new Promise(resolve => {
      post("/ship/docsRectify/apis/rectifyReport", body).then(res => {
        resolve(res)
      })
    })
  }
  // 整改确认结案
  handlerectifyClose(body) {
    return new Promise(resolve => {
      post("/ship/docsRectify/apis/rectifyClose", body).then(res => {
        resolve(res)
      })
    })
  }
  // 整改再次下发
  handleRectifyReturn(body) {
    return new Promise(resolve => {
      post("/ship/docsRectify/apis/rectifyReturn", body).then(res => {
        resolve(res)
      })
    })
  }
  // 历史图片审核通过分页列表
  getHisPicAdoptList(data) {
    return new Promise(resolve => {
      get("/ship/docsImgs/apis/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  // 运行记录审核通过分页列表
  getRunAdoptList(data) {
    return new Promise(resolve => {
      get("/ship/docsOprRecord/apis/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  // 云检验审核通过分页列表
  getCloudTestAdoptList(data) {
    return new Promise(resolve => {
      get("/ship/docsInsp/apis/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  //云检验详情
  getDocsInspDetail(data) {
    return new Promise(resolve => {
      get("/ship/docsInsp/apis/info/" + data).then(res => {
        resolve(res)
      })
    })
  }
  // 首页招标公告分页列表
  getZbggList(data) {
    return new Promise(resolve => {
      get("/ship/bidAffiche/apis/api/pageWithStatus?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  // 新闻咨询招标分页列表
  getBidList(data) {
    return new Promise(resolve => {
      get("/ship/bid/apis/api/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  // 招标公告分页列表
  getBidAfficheList(data) {
    return new Promise(resolve => {
      get("/ship/bidAffiche/apis/api/list?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  // 招标公告分页列表
  getBidAfficheList2(data) {
    return new Promise(resolve => {
      get("/ship/bidAffiche/list?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  // 招投标详情
  getBidInfo(data, orgId) {
    return new Promise(resolve => {
      get("/ship/bid/apis/api/info/" + data + "?orgId=" + orgId).then(res => {
        resolve(res)
      })
    })
  }
  // 我的投标报名列表
  getMyBidApplyList(data) {
    return new Promise(resolve => {
      get("/ship/bidApply/page?query=" + data).then(res => {
        resolve(res)
      })
    })
  }
  // 全部投标，投标结果列表
  getMyBidList(data, id) {
    return new Promise(resolve => {
      get("/ship/bid/pageOfMy?query=" + data + '&id=' + id).then(res => {
        resolve(res)
      })
    })
  }
  //保证金上传
  bidBail(data) {
    return new Promise(resolve => {
      post("/ship/bidDeposit/add", data).then(res => {
        resolve(res)
      })
    })
  }
  //保证金修改
  bidBailUpd(data) {
    return new Promise(resolve => {
      post("/ship/bidDeposit/upd", data).then(res => {
        resolve(res)
      })
    })
  }
  //签到
  bidSign(data) {
    return new Promise(resolve => {
      get("/ship/bidSignin/bidSignin/" + data).then(res => {
        resolve(res)
      })
    })
  }
  //获取状态
  getListItmTreeNode() {
    return new Promise(resolve => {
      get("sys/cat/listItmTreeNode?pid=4988846313624576").then(res => {
        resolve(res)
      })
    })
  }
  //获取个人中心数量
  getNum() {
    return new Promise(resolve => {
      get("/ds/order/orderNum").then(res => {
        resolve(res)
      })
    })
  }
}

export {
  api,
  hostUrl
};
