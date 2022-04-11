<template>
  <div id="footer" :style="{width:bWidth+'px'}">
      <div class="menu main" :style="{width:width+'px'}">
          <ul>
             <li v-for="(item,index) in footerList" :key="index">
               <b>{{item.nm}}</b>
               <span v-for="(v,i) in item.list" :key="i">{{v.nm}} </span>
             </li>
          </ul>
      </div>
      <div class="bottom main" :style="{width:width+'px'}">
        <p style="font-size: 12px"> © 2022 宁波秉圣工业技术有限公司 版权所有</p>
      </div>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  export default {
    props:[],
    data(){
      return{
        footerList:[
          {nm:"秉圣工业",
          list:[
            {nm:"所有产品"},
            {nm:"解决方案"},
            {nm:"免费注册"},
          ]},
          {nm:"关于我们",
          list:[
            {nm:"公司介绍"},
            {nm:"成功案例"},
            {nm:"公司地址"},
          ]},
          {nm:"解决方案",
          list:[
            {nm:"碳中和"},
            {nm:"港口港机"},
            {nm:"汽车行业"},
          ]},
          {nm:"联系我们",
          list:[
            {nm:"在线留言"},
            {nm:"关注我们"},
            {nm:"0574-00008888"},
          ]},
        ]
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
    background: rgba(43, 43, 43, 1);
    .menu{
      overflow: hidden;
      padding-top: 38px;
      padding-bottom: 40px;
      border-bottom: 1px solid rgba(247, 247, 250, 0.1);
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
             font-size: 18px;
             display: block;
             padding-bottom: 15px;
             color: #fff;
           }
           span{
             // width: auto;
             display: block;
             cursor: pointer;
             font-size: 14px;
             line-height: 26px;
             color: rgba(255, 255, 255, 0.6);
           }
           span:hover{
             color: #11A2DE;
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
      padding: 25px 0;
      line-height: 28px;
    }
  }
</style>
