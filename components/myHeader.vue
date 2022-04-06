<template>
  <div id="header" :style="{width:bWidth+'px'}">

      <div class="top main" :style="{width:width+'px'}">
        <img :src="logoNew" @click="toPage('/')"/>
        <div class="loginInfo" v-if="userInfo && userInfo.username">
          <p @click="toPage('../personal/')"><img :src="user"/>{{userInfo.username}}</p>
          <span></span>
          <p @click="toLogout">退出</p>
        </div>
        <div class="loginInfo" v-else>
          <p @click="toPage('../login/login')"><img :src="user"/>登录</p>
          <span></span>
          <p  @click="toPage('../login/register')"><img :src="register"/>注册</p>
        </div>
        <p class="msgP" @click="toPage('../personal/message')">
          <img :src="msgI" alt="">
          <span class="msgNum" v-show="msgNum>0">{{msgNum}}</span>
        </p>
        <div class="search">
          <div class="searchMain">
            <el-select v-model="selectCheck" placeholder="请选择">
              <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span></span>
            <input v-model="keyWord" :placeholder="placeHolder" />
            <button @click="toSeacrh"> <i class="el-icon-search"></i> </button>
          </div>
          <!-- <p ><span v-for="(v,s) in list" :key="s" :class="{choose:icd == s}" @click="keySearch(v,s)">{{v.keyWords}}</span></p> -->
        </div>

        <div class="cart"  @click="toPage('../order/cart')">
           <p><img :src="cart"/><span>{{cartNum>99?'99+':cartNum}}</span> </p>
          <span>购物车</span>
        </div>
        <img :src="menuService" style="width: 24px;height: 24px;margin-left: 20px;margin-right: 0;" @click="openService">
      </div>
      <div class="nav" v-show="ifMenu">
         <nav :style="{width:width+'px'}" class="main">
           <ul>
             <li v-for="(item,index) in navList" :key="index"
             :class="{active:item.cd==currentCd}" @click="toPage(item)"
             @mouseenter="changeLiTrans(index,1)"
             @mouseleave="changeLiTrans(index,0)">
               <p class="title"><span>{{item.nm}}</span><span class="enSpan">{{item.enNm}}</span></p>
               <span class="line" v-if="index!=navList.length-1"></span>
               <p class="jianImgBox" v-show="item.ifShow && item.listA.length>0"><img :src="jian" alt=""></p>
               <p  class="listBox" v-show="item.ifShow && item.listA.length>0" :style="{bottom:-(item.listA.length*28+33)+'px'}">

                 <span v-for="v in item.listA" @click.stop="toPage(v,index)">
                   {{v.nm}}
                 </span>
               </p>
             </li>
           </ul>
         </nav>
      </div>
  </div>
</template>
<script>
  import cart from './img/cart.png'
  import register from './img/register.png'
  import user from './img/user.png'
  import msgI from './img/消息.png'
  import jian from '@/assets/img/箭头.png'
  import logo from '@/assets/img/logo.png'
  import {mapState} from "vuex";
  import menuService from './img/menuService2.png'
  export default {
    props:[],
    data(){
      return{
        menuService,
        register,
        user,
        msgI,
        jian,
        ifTransIndex:false,//是否是装备在线首页，是的话全部分类点击不弹出下拉
        classifyShow:false,
        ifMenu:true,
        // logoNew:'https://sinovat.oss-cn-shanghai.aliyuncs.com/0875a132ec924b17b73aae3d9c644a81_logo.png', //聚联logo
        logoNew:logo,
        icd: 0,
        cart,
        keyWord:'',
        resou:{
          types:1,
          num:5
        },
        list:[],
        selectCheck:'2',
        placeHolder:'请输入关键词查询',
      // (1: 船舶, 2:产品, 3:机构, 4:资讯, 5:设计方案, 6:学习, 7.店铺, 8.品牌)
        selectList:[{
          value: '1',
          // label: '船舶方案'
          label:'船舶'
        },{
          value: '2',
          // label: '船舶'
          label:'产品'
        }, {
          value: '4',
          // label: '产品'
          label:'资讯'
        }, {
          value: '5',
          // label: '店铺'
          label:'方案'
        }, {
          value: '7',
          // label: '资讯'
          label:'店铺'
        },
        //   {
        //   value: '8',
        //   label:'品牌'
        // }
        ],
        navList:[
          //index 0
          {
          nm:'首页',
          enNm:'Home',
          href:'/',
          cd:'index',
          ifShow:false,
          listA:[]
        },
          //index 1
          {
          nm:'船舶管理',
          enNm:'Control',
          href:'/shipDisplay/shipMan',
          cd:'shipDisplay',
          ifShow:false,
          listA:[
            {nm:'船舶设计',href:'/shipDisplay/shipDesign'},
            {nm:'船舶建造',href:'/shipDisplay/shipBuild'},
            {nm:'建造监理',href:'/personal/'},
            {nm:'检验检测',href:'/personal/'}
            // {nm:'建造监理',href:'/shipDisplay/vision'},
            // {nm:'检验检测',href:'/shipDisplay/detect'}
            ]
        },{
          nm:'装备在线',
          // nm:'装备商城',
          enNm:'Equipment',
          href:'/Trade/onlinetrading',
          cd:'Trade',
          ifShow:false,
          listA:[]
        },
        {
          nm:'金融保险',
          enNm:'Financial',
          href:'../safe/safe',
          cd:'safe',
          ifShow:false,
          listA:[{nm:'租赁',href:'../safe/safe'},
            {nm:'保理',href:'../safe/safe'},
            {nm:'金融',href:'../safe/safe'},
            {nm:'保险',href:'../safe/safe'}]
        },
        {
          // nm:'协同创新',
          // enNm:'Idea',
          // href:'../Cooperation/Cooperation',
          // cd:'Cooperation',
          // ifShow:false,
          // listA:[{nm:'产品开发',href:'../Cooperation/Cooperation'},
          //   {nm:'创意征集',href:'../Cooperation/Cooperation'},
          //   {nm:'成果推广',href:'../Cooperation/Cooperation'},
          //   {nm:'专家评审',href:'../Cooperation/Cooperation'},
          //   {nm:'评奖排名',href:'../Cooperation/Cooperation'}]
          nm:'协同创新',
          enNm:'Innovate',
          // href:'../pilotService/pilotService',
          href:'../Cooperation/Cooperation',
          // cd:'pilotService',
          cd:'Cooperation',
          ifShow:false,
          listA:[]
        },{
          nm:'智慧船舶',
          enNm:'Smart',
          href:'../wisdom/wisdom',
          ifShow:false,
          cd:'wisdom',
          listA:[{nm:'船舶安全',href:'/wisdom/wisdom'},
            {nm:'远程服务',href:'/wisdom/wisdom'},
            {nm:'能效管理',href:'/wisdom/wisdom'},
            {nm:'智能航行',href:'/wisdom/wisdom'}]
        },{
          nm:'平台服务',
          enNm:'Services',
          href:'../service/service',
          cd:'service',
          ifShow:false,
          listA:[{nm:'安全管理',href:'/service/service'},
            {nm:'人力资源',href:'/service/service'},
            {nm:'资源共享',href:'/service/service'},
            {nm:'维护保养',href:'/service/service'},
            {nm:'回收利用',href:'/service/service'},
          ]
        },{
          nm:'新闻资讯',
          enNm:'News',
          href:'../tradeInfo/tradeInfo?cid=5002994345202688',
          cd:'tradeInfo',
          ifShow:false,
          // listA:[{nm:'政策法规',href:''},
          //   {nm:'政策文件',href:''},
          //   {nm:'政策通知',href:''},
          //   {nm:'行业资讯',href:''}]
          listA:[]
        },{
          nm:'在线学习',
          enNm:'Learning',
          href:'../learning/learning',
          cd:'learning',
          ifShow:false,
          listA:[]
        },{
          nm:'我要入驻',
          enNm:'Move Into',
          href:'../settleIn',
          ifShow:false,
          listA:[]
        }],
        currentCd:'index'
      }
    },
    components: {
    },
    watch:{
      keySearch(){
        this.keySearch()
      },
      selectCheck(e){
        if(e == 1){
          this.resou.types = 1
          this.getKeyWords()
        }else if(e == 2){
          this.resou.types = 2
          this.getKeyWords()
        }else if(e == 4){
          this.resou.types = 4
          this.getKeyWords()
        }else if(e == 5){
          this.resou.types = 5
          this.getKeyWords()
        }else if(e == 7){
          this.resou.types = 7
          this.getKeyWords()
        }else if(e == 8){
          this.resou.types = 8
          this.getKeyWords()
        }
      },
      $route(e){
        this.classifyShow = false
        this.ifTransIndex = e.path.indexOf('Trade/onlinetrading')>-1 ? true :false
        this.selectCheck = this.until.getQueryString('selectCheck')
        this.setMenu()
      },
    },
    computed: {
      ...mapState([
        'bWidth',
        'width',
        'cartNum',
        'msgNum',
        "ifLogin",
        'userInfo',
      ])
    },
   async mounted(){
      console.log('header')
      this.ifTransIndex = window.location.pathname.indexOf('Trade/onlinetrading')>-1 ? true :false
      let arr = this.until.getQueryString('selectCheck')
      if(!this.arr){
        this.selectCheck =arr
      }else {
        this.getKeyWords()
      }
      let logo = await this.api.getAdert('logo')
      this.logoNew = logo[0].imgUrl
      this.getList()
      this.setMenu()
      this.getInfoTab()
    },
    methods:{
      openService() {
        ysf('open')
      },
      //鼠标滑动弹出弹框
      changeLiTrans(index,type) {
        this.navList[index].ifShow = type ? true : false
        this.$set(this.navList, index, this.navList[index])
      },
      //退出
      toLogout(){
        this.api.logout().then(()=>{
          this.$message({
            message: '退出成功',
            type: 'success',
            duration:'1500'
          });
          this.store.commit('token',null)
          this.store.commit('userInfo',null)
          this.until.seRemove('token')
          this.until.seRemove('userInfo')
          setTimeout(()=>{
            this.$router.push('../')
          },1500)
        })
      },
      //获取在线学习栏目列表
      async getList(){
        let qry = this.query.new()
        let data = await this.api.studyContCat(this.query.toEncode(qry))
        data.data.list.forEach(item=>{
          item.href = '/learning/fishery?cid='+item.id+'&nm='+item.nm+'&type='+item.showType
        })
        this.navList[8].listA = data.data.list

        //入驻角色
        let roleList = await this.api.getRoleList()
        roleList.forEach(item=>{
          item.href = '/settleIn/settleIn?type='+item.cd
        })
        this.navList[9].listA = roleList

        //金融保险
        let qry2 = this.query.new()
        this.query.toW(qry2,'cid','5164329942291456','EQ')
        let data2 = await this.api.ruleList(this.query.toEncode(qry2))
        data2.forEach(item=>{
          if(item.type!=2){
            item.href = '/commonPage2?id='+item.id+'&pUrl=/safe/safe'
          }else {
            item.href = item.link
          }
        })
        // this.navList[3].listA = data2

        //智慧船舶
        let qry3 = this.query.new()
        this.query.toW(qry3,'cid','5164330286371840','EQ')
        let data3 = await this.api.ruleList(this.query.toEncode(qry3))
        data3.forEach(item=>{
          if(item.type!=2){
            item.href = '/commonPage2?id='+item.id+'&pUrl=/wisdom/wisdom'
          }else {
            item.href = item.link
          }
        })
        this.navList[5].listA = data3

        //平台服务
        let qry4 = this.query.new()
        this.query.toW(qry4,'cid','5164330398520320','EQ')
        let data4 = await this.api.ruleList(this.query.toEncode(qry4))
        data4.forEach(item=>{
          if(item.type!=2){
            item.href = '/commonPage2?id='+item.id+'&pUrl=/service/service'
          }else {
            item.href = item.link
          }
        })
        this.navList[6].listA = data4
      },
      //设置导航栏是否显示
      setMenu(){
        let arr = this.$route.path.split('/')
        this.currentCd = arr[1] ? arr[1] : 'index'
        if(arr[1]=='order' || arr[2]=='storeHome' || arr[2]=='productDetail'){
          this.ifMenu = false
        }else {
          this.ifMenu = true
        }
        if(arr[2]=='infoSearch2'){ //资讯
          this.selectCheck = '4'
        }else if(arr[2]=='storeSearch'){ //店铺
          this.selectCheck = '7'
        }else if(arr[2]=='productSearch2'){ //产品
          this.selectCheck = '2'
        }else if(arr[2]=='shipSearch2'){ //船舶
          this.selectCheck = '1'
        }else if(arr[2]=='programSearch2'){
          this.selectCheck = '5'
        }else if(arr[2]=='brandSearch'){
          this.selectCheck = '8'
        }else if(arr[1]=='tradeInfo'){
          this.selectCheck = '4'
        }else if(arr[2] == 'qualityStore'){
          this.selectCheck = '7'
        }else if(arr[2] == 'shipTrade'){
          this.selectCheck = '1'
        }else if(arr[2] == 'productTrading'){
          this.selectCheck = '2'
        }else{ //船舶方案
          this.selectCheck = '2'
        }
      },
      keySearch(v,s){
        this.icd = s
        this.keyWord = v.keyWords
        this.toSeacrh()
      },
      //搜索
      toSeacrh(){
        if(this.selectCheck == 5){
          this.$router.push('../search/programSearch2?keyWord='+this.keyWord + "&selectCheck=" + this.selectCheck+'&time='+new Date().getTime())
        }else if(this.selectCheck == 1){
          this.$router.push('../search/shipSearch2?keyWord='+this.keyWord + "&selectCheck=" + this.selectCheck+'&time='+new Date().getTime())
        }else if(this.selectCheck == 2){
          this.$router.push('../search/productSearch2?keyWord='+this.keyWord + "&selectCheck=" + this.selectCheck+'&time='+new Date().getTime())
        }else if(this.selectCheck == 7){
          this.$router.push('../search/storeSearch?keyWord='+this.keyWord + "&selectCheck=" + this.selectCheck+'&time='+new Date().getTime())
        }else if(this.selectCheck == 4){
          this.$router.push('../search/infoSearch2?keyWord='+this.keyWord + "&selectCheck=" + this.selectCheck+'&time='+new Date().getTime())
        }else if(this.selectCheck == 8){
          this.$router.push('../search/brandSearch?keyWord='+this.keyWord + "&selectCheck=" + this.selectCheck+'&time='+new Date().getTime())
        }
      },
      //获取热搜关键词
      async getKeyWords(){
        let data = await this.api.keyWords(this.resou)
        this.list = data.data.list
      },
      //页面跳转
      toPage(item,index){
        let url = item.href || item
        if(!this.ifLogin && (url.indexOf('personal')>-1 || url.indexOf('settleIn')>-1)){
          this.$confirm('您未登录，立即登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('../login/login')
          })
          return
        }
        if(url.indexOf('http')>-1){
          window.open(url)
        }else {
          this.$router.push(url)
        }
        // if(this.navList.nm == '新闻资讯'){
        //   this.$router.push('../tradeInfo/tradeInfo?cid='+ item.listA[index].id)
        // }
      },
      //鼠标滑动
      changeMenu(index,type){
        if(type && this.menuList[index].item && this.menuList[index].item.length>0){
          this.menuList[index].show = true
        }else {
          this.menuList[index].show = false
        }
        this.$set(this.menuList,index,this.menuList[index])
      },
      async getInfoTab(){
        let qry = this.query.new()
        let data = await this.api.infoList(this.query.toEncode(qry))
        data.push({
          id: 1,
          nm: '招标公告'
        })
        this.navList[7].listA = data
        this.navList[7].listA.forEach(item =>{
          item.href = '../tradeInfo/tradeInfo?cid='+item.id
          this.$set(this.navList[7].listA,'href',item.href)

        })
      },
    }
  }
</script>
<style lang="less">
  @import url("../assets/css/init.less");

  #header{
    .el-select .el-input {
      width: 80px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }

    .el-button{
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }

  }
</style>
<style lang="less" scoped>
  @import url("../assets/css/init.less");
  #header{
    background: #ffffff;
     .top{
       padding: 27px 0;
       display: flex;
       display: -webkit-flex;
       align-items: center;
       // align-items: flex-start;
       justify-content: space-between;
       overflow: hidden;
       >img{
         width: 450px;
         cursor: pointer;
         margin-right: 20px;
       }
       .loginInfo{
         display: flex;
         display: -webkit-flex;
         align-items: center;
         height: 40px;
         /*margin: 0 auto;*/
         flex-shrink: 0;
         // width: 200px;   //ddd
         // justify-content: center;    //ddd
         width: 150px;
         justify-content: flex-end;
         span{
           margin: 0 10px;
           width: 1px;
           background: rgba(0,0,0,0.1);
           display: inline-block;
           height: 11px;
         }
         p{
           vertical-align: middle;
           cursor: pointer;
           display: inline-block;
           font-size: 12px;
           img{
             width: 12px;
             margin-right: 7px;
           }
         }
       }
       .msgP{
         width: 16px;
         height: 14px;
         position: relative;
         margin: 0 10px;
         cursor: pointer;
         img{
            width: 16px;
            height: 14px;
         }
         span{
           position: absolute;
           z-index: 8;
           right: 0;
           top:0;
           transform: translate(50%,-50%);
           display: block;
           background: #E4393C;
           color: #ffffff;
           border-radius: 50%;
           font-size: 10px;
           padding: 3px;
           line-height: 14px;
         }
       }
       .search{
         /*flex: 1;*/
         // margin: auto; //ddd
         width: 350px;
         margin: 0 10px;
         .searchMain{
           overflow: hidden;
           line-height: 38px;
           border: 1px solid @themeColor;
           border-right: 0;
           border-radius: 2px;
           display: flex;
           display: -webkit-flex;
           align-items: center;
           // margin-bottom: 5px;
           /deep/.el-select{
             width: 80px;
           }
           /deep/.el-input__inner{
             border: none;
           }
           >span{
             width: 1px;
             height: 18px;
             background: rgba(0,0,0,0.2);
           }
           >input{
             border: none;
             flex: 1;
             text-indent: 15px;
           }
           button{
             background: @themeColor;
             color: #ffffff;
             border: none;
             height: 40px;
             padding: 0 20px;
             border-radius: 0 2px 2px 0;
             cursor: pointer;
           }
         }
         >p{
           span{
             color: #999999;
             font-size: 12px;
             margin-right: 29px;
             padding-top: 8px;
             cursor: pointer;
           }
           .choose{
             color: #E4393C;
           }
         }
       }
        .cart{
          height: 38px;
          border: 1px solid @themeColor;
          border-radius: 2px;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: space-between;
          padding: 9.9px 12px;
          color: #E4393C;
          font-size: 12px;
          cursor: pointer;
          width:115px;
          flex-shrink: 0;
          >span{
            display: inline-block;
            // width: 50px;
            text-align: center;
          }
          p{
            position: relative;
            margin-right: 10px;
            // display: flex;
            height: 100%;
            width: 23px;
            img{
              width: 16px;
            }
            span{
              position: absolute;
              z-index: 8;
              right: 0;
              top:0;
              transform: translate(63%,-25%);
              display: block;
              background: #E4393C;
              color: #ffffff;
              border-radius: 10px;
              font-size: 10px;
              padding: 0 3px;
              min-width: 16px;
              text-align: center;
              // line-height: 14px;
            }
          }
        }
     }
    .nav{
      width: 100%;
      background: @themeColor;
      nav{
        display: flex;
        display: -webkit-flex;
        // height: 42px;
        >div{
          width: 132px;
          height: 41px;
          /*background: #ffffff;*/
          color:#ffffff;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          .classify{
            position: absolute;
            z-index: 99;
            left: 0;
            top:41px;
          }
          i{
            margin-right: 10px;
          }
        }
        ul{
          flex: 1;
          display: flex;
          display: -webkit-flex;
          li{
            flex: 1;
            text-align: center;
            padding: 8px 0;
            // line-height: 40px;
            cursor: pointer;
            color: rgba(255,255,255,0.7);
            display: flex;
            align-items: center;
            position: relative;
            font-weight: bold;
            .title{
              flex:1;
              >span{
                display: block;
                font-size: 16px;
              }
              .enSpan{
                font-size: 14px;
              }
            }
            .jianImgBox{
              position: absolute;
              line-height: 0;
              width: 100%;
              margin-left: -4px;
              bottom: 1px;
              opacity: 0.8;
              left: 50%;
              transform: translateX(-50%);
            }
            .listBox{
              position: absolute;
              font-size: 15px;
              background-color: rgba(255,255,255,0.8);
              color: #303030;
              box-shadow:0px 2px 8px 0px rgba(15,37,76,0.36);
              // width: 100%;
              margin-left: -4px;
              font-weight: normal;
              padding: 17px 16px;
              line-height: 28px;
              z-index: 10;
              border-radius: 3px;
              left: 50%;
              min-width: 100px;
              transform: translateX(-50%);
              >span{
                // line-height: 20px;
                cursor: pointer;
                display:block;
                white-space:nowrap;
              }
              >span:last-child{
                margin-bottom: 0;
              }
              >span:hover{
                color: #2778BE;
              }
            }
            .line{
              width: 1px;
              height: 50%;
              background-color: rgba(255,255,255,0.3);
              margin: 0 4px;
            }
          }
          .active{
            color: #ffffff;

          }
        }
      }
    }
  }
</style>
