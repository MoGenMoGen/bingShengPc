<template>
  <!-- 导航 -->
  <div class="warp" :style="{ width: width + 'px' }">
    <div class="nav">
      <div class="navleft">
        <div class="log"><img src="../assets/img/logo.png" alt="" /></div>
        <div class="menulist">
          <ul class="clearfix">
            <li v-for="(item, index) in menulist" :key="index">
              {{ item.nm }}
              <img src="../assets/img/icon/down.png" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div class="search">
        <div class="searchmain">
          <el-select v-model="value" placeholder="产品">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="button">
            <input v-model="keyWord" :placeholder="placeHolder" />
            <i class="iconfont icon-sousuo"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import myHeader from "../components/myHeader.vue"
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
      keyWord: "",
      placeHolder: "搜索",
      options: [
        {
          value: "选项1",
          label: "test1",
        },
        {
          value: "选项2",
          label: "test2",
        },
        {
          value: "选项3",
          label: "test3",
        },
      ],
      menulist: [
        { nm: "解决方案" },
        { nm: "产品" },
        { nm: "数字化互动" },
        { nm: "关于我们" },
        { nm: "电子样本册" },
        { nm: "个人中心" },
      ],
    };
  },
  // components:{
  //   myHeader
  // },
  computed: {
    ...mapState({
      bWidth: (state) => state.cart.bWidth, //此处注意需要区分模块(cart)，不能少 .cart.
      width: (state) => state.cart.width,
    }),
  },
};
</script>

<style lang="less" scoped>
.nav {
  padding-top: 35px;
  display: flex;
  justify-content: space-between;
  .navleft {
    display: flex;
    .log {
      margin-right: 70px;
    }
    .menulist {
      li {
        float: left;
        line-height: 44px;
        margin-right: 60px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        img {
          vertical-align: middle;
          padding-left: 11px;
        }
        .search {
          .searchmain {
            font-size: 14px;
            border: 1px solid #d1d1d1;
            width: 244px;
            height: 40px;
            border-radius: 999px;
            display: flex;
            .button {
              position: relative;
              input {
                height: 100%;
                background: none;
                border: none;
                color: #909090;
                padding-left: 11px;
                width: 85%;
              }
              i {
                position: absolute;
                right: 1px;
                font-size: 24px;
                top: 7px;
                cursor: pointer;
              }
            }
          }
          /deep/.el-input__inner {
            background-color: rgba(255, 255, 255, 0.3);
            border-top-left-radius: 9999px;
            border-bottom-left-radius: 9999px;
            width: 75px;
            height: 40px;
            color: #fff;
            border: none;
            padding-right: 0;
          }
        }
      }
    }
  }
  .search {
    .searchmain {
      font-size: 14px;
      border: 1px solid #d1d1d1;
      width: 244px;
      height: 40px;
      border-radius: 999px;
      display: flex;
      .button {
        position: relative;
        input {
          height: 100%;
          background: none;
          border: none;
          color: #909090;
          padding-left: 11px;
          width: 85%;
        }
        i {
          position: absolute;
          right: 1px;
          font-size: 24px;
          top: 7px;
          cursor: pointer;
        }
      }
    }
    /deep/.el-input__inner {
      background-color: rgba(255, 255, 255, 0.3);
      border-top-left-radius: 9999px;
      border-bottom-left-radius: 9999px;
      width: 71px;
      height: 40px;
      color: #fff;
      border: none;
    }
  }
}
</style>