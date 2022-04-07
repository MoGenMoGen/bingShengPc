<template>
   <!-- 头 -->
    <div class="header">
        <div class="warp" :style="{width:width+'px'}">
            <div class="header-top">
                <div class="tel"><img src="../assets/img/icon/tel.png" alt="">0574-89073917</div>
                <div class="header-right">
                <div class="login">
                    <p><img src="../assets/img/icon/login.png" alt="">请登录</p>
                    <span></span>
                    <p>注册</p>
                </div>
                <div class="info-cart">
                    <p><img src="../assets/img/icon/info.png" alt="">消息提醒</p>
                    <p><img src="../assets/img/icon/price.png" alt="">询价车</p>
                </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
// import myHeader from "../components/myHeader.vue"
import {mapState} from "vuex";
export default {
   data() {
      return {
        
      }
    },
  // components:{
  //   myHeader
  // },
  computed: {
    ...mapState([
      'bWidth',
      'width',
      "proSize"
    ])
  },
}
</script>

<style lang="less" scoped>
 // 头部
  .header{
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    .header-top{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .tel{
      img{width: 17px;height: 21px; vertical-align: middle;margin-right: 5px;}
    }
    .header-right{
      display: flex;
      align-content: center;
      justify-content: flex-end;
      img{width: 21px;height: 21px; vertical-align: middle;margin-right: 10px;}
      span{width: 1px;height: 14px;background-color: rgba(255, 255, 255, 0.2);display: inline-block;margin: 0 8px;}
      p{display: inline-block; cursor: pointer;}
      .info-cart{
        margin-left: 40px;
        img{width: 15px;height: 15px;}
        p+p{margin-left: 38px;}
      }
    }
  }
  
  

</style>