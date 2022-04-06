<template>
  <div id="menu" >
    <ul>
       <li v-for="(item,index) in menuList" :key="index"
           :class="{gray:!item.ifShow,blue:item.ifShow}"
           @click="toPage(item)"
           @mousemove="changeLiTrans(index,1)"
           @mouseout="changeLiTrans(index,0)">
          <p class="nm" v-show="item.ifShow && item.nm!='ma'">{{item.nm}}</p>
          <p class="ma" v-show="item.ifShow && item.nm=='ma'">
            <img :src="v.imgUrl" v-for="(v,i) in item.list" :key="v.id"/>
          </p>
         <div class="img"><span><img :src="item.img"/></span></div>
       </li>
    </ul>
  </div>
</template>

<script>
  import menuAbout from './img/menuAbout.png'
  import menuAppoint from './img/menuAppoint.png'
  import menuCart from './img/menuCart.png'
  import menuMa from './img/menuMa.png'
  import menuSale from './img/menuSale.png'
  import menuService from './img/menuService.png'
  import menuTel from './img/menuTel.png'
  import menuReturn from './img/返回顶部.png'
  import biao from './img/biao.png'
  import {mapState} from "vuex";
  export default {
    // body: {
    //   script: [
    //     { src: 'https://qiyukf.com/script/56155d4339804ded7d6ddad6173e754f.js' }
    //   ],
    // },
    props:[],
    data(){
      return{
        show:false,
        menuAbout,
        menuAppoint,
        menuMa,
        menuSale,
        menuService,
        menuTel,
        menuReturn,
        menuList:[{
          nm:'在线客服',
          img:menuService
        },{
          nm:'设计预约',
          img:menuAppoint,
        },{
          nm:'购物车',
          img:menuCart,
          href:'/order/cart'
        },{
          nm:'我要出售',
          img:menuSale,
          href:'/personal/allShipList'
        },{
          type:'ma',
          nm:'ma',
          img:menuMa,
          list:[],
        },{
          nm:this.tel,
          img:menuTel
        },{
          nm:'关于我们',
          img:menuAbout,
          href:'../commonPage?id=5034191400555520'
        },{
          nm:'招投标专家系统',
          img:biao,
          href:'https://fb.ship88.cn/views/index/login.html'
        },{
          nm:'返回顶部',
          img:menuReturn,
          type:'toTop'
        }]
      }
    },
    components: {
    },
    watch:{
      $route(){

      },
      // tel(){
      //   this.menuList[5].nm = this.tel
      // }
    },
    computed: {
      ...mapState([
        'bWidth',
        'width',
        'tel'
      ])
    },
    mounted(){
      this.getServiceTel()
    },
    methods:{
      async getServiceTel(){
        let qry = this.query.new()
        let data = await this.api.serviceTel(this.query.toEncode(qry))
        this.service = data.data.list
        this.store.commit("tel",this.service[0].cont)
        this.menuList[5].nm = this.tel
        // console.log('this.tel',this.tel)
        // console.log('this.service',this.service)
        this.menuList[4].list = await this.api.getAdert('menuMa',1)
      },
      //页面跳转
      toPage(item){
        if(item.href){
          if(item.href.indexOf('http')>-1){
             window.open(item.href)
          }else {
            this.$router.push(item.href)
          }
        }else if (item.nm === '在线客服'){
          ysf('open');
        }else if(item.nm==='设计预约'){
          this.show = true
        }else if(item.nm ==='返回顶部'){
          this.$emit('toTop')
        }

      },
      close() {
        // 取消弹窗回调
        this.show = false
      },
      submit() {
        // 确认弹窗回调
        this.show = false
      },
      //鼠标滑动切换放大效果
      changeLiTrans(index,type){
        this.menuList[index].ifShow = type ? true : false
        this.$set(this.menuList,index,this.menuList[index])
      },
    }
  }
</script>


<style lang="less" scoped>
  @import url("../assets/css/init.less");
  #menu{
    width: 35px;
    /*border-top: 1px solid #E7E7E7;*/
    position: fixed;
    z-index: 999;
    right: 0;
    top:50%;
    transform: rotateY(-50%);
    -ms-transform: rotateY(-50%);
    -moz-transform: rotateY(-50%);
    -webkit-transform: rotateY(-50%);
    -o-transform: rotateY(-50%);
    ul{
      li{
        cursor: pointer;
        color: #ffffff;
        height: 35px;
        position: relative;
        margin-bottom: 1px;
        .img{
          width: 35px;
          height: 35px;
          display: flex;
          display: -webkit-flex;
          position: absolute;
          right: 0;
          z-index: 8;
          align-items: center;
          justify-content: center;

          span{
            display: block;
          }
          img{
            width: 18px;
            height: auto;
            max-width: 100%;
            max-height: 100%;
          }
        }
        p{
          position: absolute;
        }
        p.ma{
          width: 109px;
          height: 109px;
          padding: 5px;
          box-sizing: border-box;
          bottom: 0;
          border-radius: 5px;
          background: @themeColor;
          display: flex;
          display: -webkit-flex;
          img{
            margin: auto;
          }
        }
        p.nm{
          text-indent: 10px;
          font-size: 12px;
          width: 110px;
        }
      }
      .gray{
        width: 35px;
        background: rgba(0,0,0,0.5);
        p{
          display: none;
        }
      }
      .blue{
        .img{
          background: @themeColor;
        }
        p.nm{
          border-radius: 5px 0 0 5px;
          background: @themeColor;
          height: 35px;
          line-height: 35px;
          left: -110px;
          animation:mymove 0.5s;
          -webkit-animation:mymove 0.5s ; /* Safari 和 Chrome */
        }
        p.ma{

          left: -110px;
          animation:mymove 0.5s;
          -webkit-animation:mymove 0.5s ; /* Safari 和 Chrome */
        }
      }
      @keyframes mymove
      {
        from {left: 0px;}
        to {left: -110px;}
      }

      @-moz-keyframes mymove /* Firefox */
      {
        from {left: 0px;}
        to {left: -110px;}
      }

      @-webkit-keyframes mymove /* Safari 和 Chrome */
      {
        from {left: 0px;}
        to {left: -110px;}
      }

      @-o-keyframes mymove /* Opera */
      {
        from {left: 0px;}
        to {left: -110px;}
      }
    }
  }
</style>

