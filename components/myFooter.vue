<template>
  <div id="footer" :style="{width:bWidth+'px'}">
      <div class="menu main" :style="{width:width+'px'}">
          <ul>
             <li v-for="(item,index) in menuList" :key="index">
               <b>{{item.nm}}</b>
               <span v-for="(v,i) in item.list" :key="i" @click="toPage(v)">{{v.nm}}</span>
             </li>
          </ul>
          <div class="ma">
            <p v-for="(item,index) in qrList" :key="index" @click="toPage2(item.locUrl)">
              <img :src="item.imgUrl"/>
              <span>{{item.nm}}</span>
            </p>
          </div>
      </div>
      <div class="bottom main" :style="{width:width+'px'}">
        <p style="font-size: 12px">  Copyright © 国家渔业装备科技创新联盟版权所有&nbsp;&nbsp;&nbsp;
        <a style="color: #999999" href="https://sinovat.oss-cn-shanghai.aliyuncs.com/c92cd8ddd30f4803b7ecb24e53b9604a_ICPEDI%E8%AF%81%E4%B9%A6.pdf" target="_blank" class="cursor">增值电信业务经营许可证：浙B2-20210502</a>&nbsp;&nbsp;&nbsp;
        <a style="color: #999999" href="https://beian.miit.gov.cn" target="_blank" class="cursor">浙ICP备20025027号-7</a> </p>
        <p style="font-size: 12px">聚联科技有限公司技术支持</p>
      </div>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  export default {
    props:[],
    data(){
      return{
        menuList:[],
        qrList:[]
      }
    },
    components: {
    },
    watch:{
      $route(){

      }
    },
    computed: {
      ...mapState([
        'bWidth',
        'width'
      ])
    },
    mounted(){
      // this.getData()
    },
    methods:{
      async getData(){
        this.menuList=[]
         this.qrList = await this.api.getAdert('foot')
         // console.log('二维码')
         // console.log(this.qrList)
         let data = await this.api.ruleCatList()
         data.forEach(item=>{
           if(item.status){
             this.menuList.push(item)
           }
         })
         for(let i=0;i<this.menuList.length;i++){
           let qry = this.query.new()
           this.query.toW(qry,'cid',this.menuList[i].id,'EQ')
           this.menuList[i].list = await this.api.ruleList(this.query.toEncode(qry))
           this.$set(this.menuList,i,this.menuList[i])
         }
         // console.log('底部')
         // console.log(this.menuList)
      },
      //页面跳转
      toPage(item){
        if(item.type==1){ //文本内容
          this.until.href('/commonPage?id='+item.id)
        }else { //链接
          window.location.href = item.link
        }
      },
      toPage2(url){
        if(url){
          window.location.href = url
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import url("../assets/css/init.less");
  #footer{
    border-top: 1px solid #E7E7E7;
    background: #ffffff;
    .menu{
      overflow: hidden;
      border-bottom: 1px solid #E7E7E7;
      padding-top: 30px;
      padding-bottom: 25px;
      display: flex;
      align-items: center;
       ul{
          padding-left: 80px;
         flex: 1;
         display: flex;
         display: -webkit-flex;
         justify-content: space-around;
         li{
           display: inline-block;
           // flex: 1;
           b{
             font-size: 16px;
             display: block;
             padding-bottom: 15px;
           }
           span{
             // width: auto;
             display: block;
             cursor: pointer;
             font-size: 12px;
             line-height: 26px;
             color: #999999;
           }
           span:hover{
             color: @themeColor;
           }
         }
       }
      .ma{
        >p{
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          margin-right: 60px;
          cursor: pointer;
          img{
            width: 120px;
            height: auto;
          }
          span{
            margin-top: 5px;
            font-weight: 600;
          }
          &:last-of-type{
            margin-right: 0;
          }
        }
      }
    }
    .bottom{
      text-align: center;
      font-size: 14px;
      color: #999999;
      padding: 10px 0;
      line-height: 28px;
    }
  }
</style>
