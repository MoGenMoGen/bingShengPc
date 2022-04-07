import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const axios = require('axios');
const store = new Vuex.Store({
  state: {
    userInfo:null,
    token:'',
    ifLogin:false,
    bWidth:1920,
    width:1600,
    loading:false,//加载动画，数据加载使用，提交时使用
    cartNum:0,
    proSize:1,//产品图比例
    shipSize:190/270,//船舶方案图比例
    shipSize2:496/800,//船舶产品图比例
    typeSize:1.09,//船型比例
    currentRole:null,//当前身份
    tel:'',//客服电话
    msgNum:0,//未读消息总数
    price:0//当价格是这个时显示“价格面议”
  },
  mutations:{
    userInfo:(state,data)=>{
      state.userInfo = JSON.parse(JSON.stringify(data))
      window.sessionStorage.setItem('userInfo',JSON.stringify(data))
    },
    token:(state,data)=>{
      // console.log('保存===========')
      state.token = data
      window.sessionStorage.setItem('token',data)
      state.ifLogin = data ? true : false
    },
    changeWidth:(state,data)=>{
      state.bWidth = data.bWidth
      state.width = data.width
    },
    changeMsgNum:(state,data)=>{
      state.msgNum = data
    },
    changeLoading:(state,data)=>{
      state.loading = data
    },
    cartNum:(state,data)=>{
      state.cartNum = data
      window.sessionStorage.setItem('cartNum',data)
    },
    currentRole:(state,data)=>{
      state.currentRole = JSON.parse(JSON.stringify(data))
      window.sessionStorage.setItem('currentRole',JSON.stringify(data))
    },
    tel:(state,data) => {
      state.tel = data
      window.sessionStorage.setItem('tel',data)
    }
  },
  actions:{
    save({ commit },data){
      // console.log(data)
      axios.post('/general/cache/objSave?key=currentInfo',data).then(res=>{
        commit('currentRole',data)
      })
    }
  }
});

export {
  store
}
