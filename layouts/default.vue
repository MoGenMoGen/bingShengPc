<template>
  <div id="default" :style="{width:bWidth?bWidth+'px':'100%'}" v-loading="loading"  ref="scroll">
    <!--右边的悬浮菜单-->
    <!--<top v-show="topShow"></top>-->

      <div :class="{headercontent,active}" @scroll="handleScroll">
        <my-header v-show="headerShow"></my-header>
        <my-menu v-show="headerShow" @toTop="toTop"></my-menu>
      </div>
  
   
      <div class="container">
        <div id="defaultScroll">
          <nuxt />
          <my-footer v-show="footerShow"></my-footer>
        </div>
      </div>

  </div>
</template>
<script>
  import myHeader from '~/components/myHeader.vue'
  import myFooter from '~/components/myFooter.vue'
  import myMenu from '~/components/myMenu.vue'
  import {mapState} from "vuex";
  export default {
    data(){
      return{
        bWidth:0,
        width:0,
        headercontent:true,
        active:false,
        headerShow:true,
        topShow:true,
        footerShow:true,
        currentCd:'',
        currentCd2:'',

      }
    },
    computed: {
      ...mapState([
        'loading',
        'currentRole'
      ])
    },
    components: {
      myHeader,
      myFooter,
      myMenu
    },
    watch:{
      $route(e){
        this.changeDevice()
        document.getElementById('default').scrollIntoView()
        let arr = e.path.split('/')
        this.currentCd = arr[1] ? arr[1] : 'index'
        this.currentCd2 = arr[2] ? arr[2] : 'index'
      },

      currentCd:{
        handler:function (e) {

            if(e=='login' || e=='settleIn' || e=='changePWD' || e=='register' ){
              this.headerShow = false
            }else {
              this.headerShow = true
            }
            if(e=='login'){
              this.footerShow = false
            }else {
              this.footerShow = true
            }
            if(e=='login'){
              this.topShow = false
            }else {
              this.topShow = true
            }
         },
        immediate:true
      },
      currentCd2:{
        handler:function (e) {
          if(this.currentCd != 'login' && this.currentCd!='order'){
            return
          }
          console.log('this.e',e)
          if(e=='login' || e=='changePWD' || e=='register' || e=='toPay'){
            this.headerShow = false
          }else {
            this.headerShow = true
          }
          if(e=='login'){
            this.footerShow = false
          }else {
            this.footerShow = true
          }
          if(e=='login'  || e=='toPay'){
            this.topShow = false
          }else {
            this.topShow = true
          }
        },
        immediate:true
      },
    },
    created(){
    },
    mounted(){
      // 页面滚动监听事件
      window.addEventListener('scroll', this.handleScroll)

      if(this.until.getQueryString('inviCd')){ //有邀请码
        this.until.seSave('inviCd',this.until.getQueryString('inviCd'))
      }
      let arr = this.$route.path.split('/')
      this.currentCd = arr[1] ? arr[1] : 'index'
      this.currentCd2 = arr[2] ? arr[2] : 'index'
      this.until.saveToStore()
      this.getWidth()
      this.changeDevice()
      window.onresize = () => {
        this.getWidth()
        this.changeDevice()
      }
    },
   
    methods:{
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // var offsetTop = document.querySelector('#searchBar').offsetTop
        if (scrollTop > 120) {
          this.active = true
        } else {
          this.active = false
        }
      },
      //切换设备
      changeDevice() {
        // console.log("=========== "+window.location.pathname+" ===========" )
        let isPC=this.App.IsPC()
        // let isOs = this.App.os()
        // let isPC = isOs.isTablet || isOs.isPc
        // alert(JSON.stringify(isOs))
        // alert(isPC)
        // return
        if(!isPC){
          if(window.location.pathname==='/sinovat/'){  //首页
            window.location.href = window.location.origin+'/mob/views/home/index.html'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/shipMan'){  //船舶管理
            window.location.href = window.location.origin+'/mob/views/shipMan/index.html'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/shipDesign'){  //船舶设计
            window.location.href = window.location.origin+'/mob/views/shipMan/shipDesign.html'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/shipBuild'){  //船舶建造
            window.location.href = window.location.origin+'/mob/views/shipMan/shipBuild.html'
          }
          if(window.location.pathname==='/sinovat/Trade/onlinetrading'){  //装备在线
            window.location.href = window.location.origin+'/mob/views/trading/index.html'
          }
          if(window.location.pathname==='/sinovat/safe/safe'){  //金融保险
            window.location.href = window.location.origin+'/mob/views/safe/safe.html'
          }
          if(window.location.pathname==='/sinovat/commonPage2'){  //通用页面
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/common/commonPage.html?id='+id
          }
          if(window.location.pathname==='/sinovat/pilotService/pilotService'){  //试点服务
            window.location.href = window.location.origin+'/mob/views/pilot/index.html'
          }
          if(window.location.pathname==='/sinovat/wisdom/wisdom'){  //智慧船舶
            window.location.href = window.location.origin+'/mob/views/wisdom/index.html'
          }
          if(window.location.pathname==='/sinovat/service/service'){  //平台服务
            window.location.href = window.location.origin+'/mob/views/service/index.html'
          }
          if(window.location.pathname==='/sinovat/tradeInfo/tradeInfo'){  //新闻资讯
            window.location.href = window.location.origin+'/mob/views/tradeInfo/index.html'
          }
          if(window.location.pathname==='/sinovat/learning/learning'){  //在线学习
            window.location.href = window.location.origin+'/mob/views/learning/index.html'
          }
          if(window.location.pathname==='/sinovat/settleIn'){  //我要入驻
            window.location.href = window.location.origin+'/mob/views/home/settleln.html'
          }
          if(window.location.pathname==='/sinovat/settleIn/settleIn'){  //入驻身份
            let type=this.until.getQueryString('type')
            window.location.href = window.location.origin+'/mob/views/home/settlelnForm.html?type='+type
          }
          if(window.location.pathname==='/sinovat/tradeInfo/infoDetail'){  //新闻详情
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/tradeInfo/infoDetail.html?id='+id
          }
          if(window.location.pathname==='/sinovat/shipDisplay/shipCat'){  // 船舶展示
            window.location.href = window.location.origin+'/mob/views/shipMan/shipShow.html'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/shipShow'){  //船舶展示——分类
            if(this.until.getQueryString('cId')){//2级
              let cId=this.until.getQueryString('cId')
              let cNm=this.until.getQueryString('cNm')
              let cImg=this.until.getQueryString('cImg')
              window.location.href = window.location.origin+'/mob/views/shipMan/shipList.html?cid2='+cId+'&nm='+cNm+'&img='+cImg
            }else if(this.until.getQueryString('cId3')){//3级
              let cId=this.until.getQueryString('cId3')
              let cNm=this.until.getQueryString('cNm')
              let cImg=this.until.getQueryString('cImg')
              window.location.href = window.location.origin+'/mob/views/shipMan/shipList.html?cid3='+cId+'&nm='+cNm+'&img='+cImg
            }
          }
          if(window.location.pathname==='/sinovat/shipDisplay/showDetail'){  //船舶方案详情
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/shipMan/shipDetail.htm?id='+id
          }
          if(window.location.pathname==='/sinovat/Trade/productDetail'){  //产品详情
            let type = this.until.getQueryString('type')
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/trading/shipDetail.html?id='+id
          }
          if(window.location.pathname==='/sinovat/Trade/storeHome'){  //店铺首页
            let id = this.until.getQueryString('shopId')
            window.location.href = window.location.origin+'/mob/views/trading/storeHome.html?id='+id
          }
          if(window.location.pathname==='/sinovat/Cooperation/Cooperation'){  //协同创新
            // window.location.href = window.location.origin+'/mob/views/'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/shipDIY'){  //diy报价
            window.location.href = window.location.origin+'/mob/views/shipMan/diyQuote.html'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/designRule'){  //设计规范
            window.location.href = window.location.origin+'/mob/views/shipMan/designRule.html'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/designDetail'){  //设计规范详情
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/shipMan/desRuleDetail.html?id='+id+'&titleNm=设计规范详情'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/buildRule'){  //建造规范
            window.location.href = window.location.origin+'/mob/views/shipMan/designRule.html'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/ruleDetail'){  //建造规范详情
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/shipMan/desRuleDetail.html?id='+id+'&titleNm=建造规范详情'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/ALLDesign'){  //设计院总览
            window.location.href = window.location.origin+'/mob/views/shipMan/allDesign.html'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/design'){  //设计院详情
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/shipMan/design.html?id='+id
          }
          if(window.location.pathname==='/sinovat/shipDisplay/allShipyard'){  //船厂总览
            window.location.href = window.location.origin+'/mob/views/shipMan/allShipYard.html'
          }
          if(window.location.pathname==='/sinovat/shipDisplay/shipyard'){  //船厂详情
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/shipMan/shipYard.html?id='+id
          }

          if(window.location.pathname==='/sinovat/Trade/shipTrade'){  //装备在线——船舶分类
            let id = this.until.getQueryString('id') ? JSON.parse(this.until.getQueryString('id')) : []
            if(id.length==3){
              id.splice(0,1)
            }
            window.location.href = window.location.origin+'/mob/views/trading/shipTrade.html?ids='+JSON.stringify(id)
          }
          if(window.location.pathname==='/sinovat/Trade/productTrading'){  //装备在线——产品分类
            let id = this.until.getQueryString('id') ? JSON.parse(this.until.getQueryString('id')) : []
            window.location.href = window.location.origin+'/mob/views/trading/productTrade.html?ids='+JSON.stringify(id)
          }
          if(window.location.pathname==='/sinovat/Trade/starting'){  //新品首发
            window.location.href = window.location.origin+'/mob/views/trading/news.html'
          }
          if(window.location.pathname==='/sinovat/Trade/ranking'){  //排行榜单
            window.location.href = window.location.origin+'/mob/views/trading/leaderboard.html'
          }
          if(window.location.pathname==='/sinovat/Trade/qualityStore'){  //优质店铺
            window.location.href = window.location.origin+'/mob/views/trading/quality.html'
          }
          if(window.location.pathname==='/sinovat/login/login'){  //登录
            window.location.href = window.location.origin+'/mob/views/home/login.html'
          }
          if(window.location.pathname==='/sinovat/login/register'){  //注册
            window.location.href = window.location.origin+'/mob/views/home/register.html'
          }
          if(window.location.pathname==='/sinovat/login/changePWD'){  //忘记密码
            window.location.href = window.location.origin+'/mob/views/home/forgetPWD.html'
          }
          if(window.location.pathname==='/sinovat/order/cart'){  //购物车
            window.location.href = window.location.origin+'/mob/views/cart/index.html'
          }
          if(window.location.pathname==='/sinovat/order/payment'){  //订单结算页
            let type = this.until.getQueryString('payType')
            window.location.href = window.location.origin+'/mob/views/trading/orderSubmit.html?payType='+type
          }
          if(window.location.pathname==='/sinovat/pilotService/accessProduct'){  //试点服务——产品准入
            window.location.href = window.location.origin+'/mob/views/pilot/access.html'
          }
          if(window.location.pathname==='/sinovat/pilotService/applyFor'){  //试点服务——补贴申请
            window.location.href = window.location.origin+'/mob/views/pilot/applyFor.html'
          }
          if(window.location.pathname==='/sinovat/pilotService/onlineInquiry'){  //试点服务——补贴查询
            window.location.href = window.location.origin+'/mob/views/pilot/applyInfo.html'
          }
          if(window.location.pathname==='/sinovat/pilotService/serviceInfo'){  //试点服务——信息公开、标准建设
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/pilot/list.html?id='+id
          }
          if(window.location.pathname==='/sinovat/pilotService/infoDetail'){  //试点服务——信息公开、标准建设详情
            let id = this.until.getQueryString('sid')
            window.location.href = window.location.origin+'/mob/views/pilot/referenceDetail.html?id='+id
          }
          if(window.location.pathname==='/sinovat/learning/fishery'){  //在线学习——视频学习、课件学习...
            let nm = this.until.getQueryString('nm')
            if(nm=='课件学习'){
              window.location.href = window.location.origin+'/mob/views/learning/video.html?type=1'
            }else if(nm=='视频学习'){
              window.location.href = window.location.origin+'/mob/views/learning/video.html?type=2'
            }else{
              let cid = this.until.getQueryString('cid')
              window.location.href = window.location.origin+'/mob/views/learning/reference.html?nm='+nm+'&cid='+cid
            }
          }
          if(window.location.pathname==='/sinovat/learning/videoDetail'){  //直播详情
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/learning/detail.html?id='+id
          }
          if(window.location.pathname==='/sinovat/learning/lessonDetail'){  //课件详情
            let id = this.until.getQueryString('id')
            let type = this.until.getQueryString('type')
            window.location.href = window.location.origin+'/mob/views/learning/liveDetail.html?id='+id+'&type='+type
          }
          if(window.location.pathname==='/sinovat/learning/infoDetail'){  //法律法规、标准规范、文献资料详情
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/learning/referenceDetail.htm?id='+id
          }
          if(window.location.pathname==='/sinovat/learning/video2'){  //视频
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/learning/lookLive.html?id='+id
          }
          if(window.location.pathname==='/sinovat/learning/liveList'){  //在线学习——列表
            window.location.href = window.location.origin+'/mob/views/learning/index.html'
          }
          if(window.location.pathname==='/sinovat/search/shipSearch'){  //搜索——船舶
            let keyWord = this.until.getQueryString('keyWord')
            window.location.href = window.location.origin+'/mob/views/search/ship.html?keyWord='+keyWord
          }
          if(window.location.pathname==='/sinovat/search/productSearch'){  //搜索——产品
            let keyWord = this.until.getQueryString('keyWord')
            window.location.href = window.location.origin+'/mob/views/search/product.html?keyWord='+keyWord
          }
          if(window.location.pathname==='/sinovat/search/infoSearch'){  //搜索——资讯
            let keyWord = this.until.getQueryString('keyWord')
            window.location.href = window.location.origin+'/mob/views/search/info.html?keyWord='+keyWord
          }
          if(window.location.pathname==='/sinovat/search/programSearch'){  //搜索——方案
            let keyWord = this.until.getQueryString('keyWord')
            window.location.href = window.location.origin+'/mob/views/search/program.html?keyWord='+keyWord
          }
          if(window.location.pathname==='/sinovat/search/storeSearch'){  //搜索——店铺
            let keyWord = this.until.getQueryString('keyWord')
            window.location.href = window.location.origin+'/mob/views/search/store.html?keyWord='+keyWord
          }
          if(window.location.pathname==='/sinovat/order/toPay'){  //去支付
            let id = this.until.getQueryString('id')
            window.location.href = window.location.origin+'/mob/views/trading/toPay.html?id='+id
          }

          // if(window.location.pathname===''){  //
          //   window.location.href = window.location.origin+'/mob/views/'
          // }


        }

      },
      toTop(){
        document.getElementById('default').scrollIntoView()
      },
      //获取宽度
      getWidth(){
        let data = this.until.getWidth()
        this.bWidth = data.bWidth
        this.width = data.width
        this.store.commit('changeWidth',data)
      },
    }
  }
</script>
<style lang="less">
  
.headercontent{
      background: rgba(0, 0, 0, 0);
      position: fixed;
      top: 0;
      width: 100%;
      padding-bottom: 30px;
      z-index: 2000;
}
.headercontent.active{
  background: rgba(0, 0, 0, 0.85);
  box-shadow: 5px 0 16px rgba(255,255,255,0.4);
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.el-scrollbar__wrap {
    overflow-x: hidden;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
  #default{
    min-height: 100%;
    overflow: hidden;
    /*display: flex;*/
    /*display: -webkit-flex;*/
    /*flex-direction: column;*/
   
  }
</style>
