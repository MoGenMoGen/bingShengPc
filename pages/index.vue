<template>
  <div class="page_home">
    <div class="bg1" :style="{ width: bWidth + 'px' }">
      <div class="content1" :style="{ width: width + 'px' }">
        <div class="title1">
          <div class="zh_cn">碳中和</div>
          <div class="en">Carbon neutral</div>
        </div>
        <div class="btn1" @mouseover="flag1 = true" @mouseleave="flag1 = false">
          <img src="@/assets/img/icon/consult.png" alt="" />
          <span v-show="!flag1">立即咨询</span>
          <span v-show="flag1" class="green">立即咨询></span>
        </div>
      </div>
    </div>
    <div class="bg2" :style="{ width: bWidth + 'px' }">
      <div class="content2" :style="{ width: width + 'px' }">
        <div class="text">
          BINGSHENG
          <div class="solution">
            <div class="line1">行业解决方案</div>
            <div class="line2">Industry Solutions</div>
            <div class="line3">携手行业龙头企业，跨行业跨领域赋能</div>
            <div
              class="btn21"
              @mouseover="flag21 = true"
              @mouseleave="flag21 = false"
            >
              <span v-show="!flag21">查看全部</span>
              <span v-show="flag21" class="green">查看全部></span>
            </div>
          </div>
        </div>
        <swiper class="swiper" :options="swiperOption">
          <!-- <div style="width: 90%;overflow: hidden;"> -->
          <swiper-slide
            v-for="(item, index) in solutionList"
            :key="index"
            v-if="solutionList.length > 0"
          >
            <div class="productSwiper point">
                <img :src="item.pic" class="el-images" :ref="'img' + index" />
            </div>
          </swiper-slide>

          <!-- <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-black" slot="button-next"></div> -->
          <!-- <div
            class="swiper-button-prev swiper-button-white swiperBtn"
            style="left: 0"
            slot="button-prev"
          > -->
          <div
            class="swiper-button-prev swiper-button-white swiperBtn"
            style="left: 0"
            slot="button-prev"
          >
            <img src="@/assets/img/icon/w_left.png" alt="" />
          </div>
          <div
            class="swiper-button-next swiper-button-white swiperBtn"
            style="right: 0"
            slot="button-next"
          >
            <img src="@/assets/img/icon/w_right.png" alt="" />
          </div>
          <!-- </div> -->
          <!-- <div class="swiper-pagination grayColor" slot="pagination"></div> -->
        </swiper>
      </div>
    </div>
    <div class="bg3" :style="{ width: bWidth + 'px' }">
      <div class="content3" :style="{ width: width + 'px' }">
        <div class="btn3" @mouseover="flag3 = true" @mouseleave="flag3 = false">
          <span v-show="!flag3">查看全部</span>
          <span v-show="flag3" class="green">查看全部></span>
        </div>
      </div>
    </div>
    <div class="bg4" :style="{ width: bWidth + 'px' }">
      <div class="content4" :style="{ width: width + 'px' }">
        <div class="btn4" @mouseover="flag4 = true" @mouseleave="flag4 = false">
          <span v-show="!flag4">查看全部</span>
          <span v-show="flag4" class="green">查看全部></span>
        </div>
      </div>
    </div>
    <div class="bg5" :style="{ width: bWidth + 'px' }">
      <div class="content5" :style="{ width: width + 'px' }">
        <div class="btn5" @mouseover="flag5 = true" @mouseleave="flag5 = false">
          <span v-show="!flag5">查看全部</span>
          <span v-show="flag5" class="green">查看全部></span>
        </div>
      </div>
    </div>
    <div class="bg6" :style="{ width: bWidth + 'px' }">
      <div class="content6" :style="{ width: width + 'px' }">
        <div class="btn6" @mouseover="flag6 = true" @mouseleave="flag6 = false">
          <span v-show="!flag6">查看全部</span>
          <span v-show="flag6" class="green">查看全部></span>
        </div>
      </div>
    </div>
    <div class="bg7" :style="{ width: bWidth + 'px' }">
      <div class="content7" :style="{ width: width + 'px' }">
        <div class="btn7" @mouseover="flag7 = true" @mouseleave="flag7 = false">
          <span v-show="!flag7">查看全部</span>
          <span v-show="flag7" class="green">查看全部></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import tzh from "@/assets/img/tzh.png";
import znzz from "@/assets/img/znzz.png";
import zhcs from "@/assets/img/zhcs.png";
import jjfa from "@/assets/img/jjfa.png";

export default {
  data() {
    return {
      flag1: false,
      flag21: false,
      flag22: false,
      flag3: false,
      flag4: false,
      flag5: false,
      flag6: false,
      flag7: false,
      solutionList: [
        {
          pic: tzh,
          title: "碳中和",
          content:
            "如何有效控制碳排放量、提升能源使用效率、降低能耗， 以实现“碳中和”目标，成为企业亟待解决的问题。通过 在能源生产",
        },
        {
          pic: znzz,
          title: "绿色智能制造",
          content:
            "如何有效控制碳排放量、提升能源使用效率、降低能耗， 以实现“碳中和”目标，成为企业亟待解决的问题。通过 在能源生产",
        },
        {
          pic: zhcs,
          title: "智慧城市",
          content:
            "如何有效控制碳排放量、提升能源使用效率、降低能耗， 以实现“碳中和”目标，成为企业亟待解决的问题。通过 在能源生产",
        },
        {
          pic: jjfa,
          title: "IoT通用解决方案",
          content:
            "如何有效控制碳排放量、提升能源使用效率、降低能耗， 以实现“碳中和”目标，成为企业亟待解决的问题。通过 在能源生产",
        },
      ],
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 1,
        freeMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  computed: {
    ...mapState(["bWidth", "width", "proSize"]),
  },
};
</script>

<style lang="less" scoped>
.page_home {
  .green {
    color: #05ad49 !important;
    font-weight: bold !important;
    cursor: pointer;
  }
  .bg1 {
    background: url(~/assets/img/home/bg1.png);
    background-repeat: no-repeat;
    background-size: 100% 1052px;
    height: 1052px;
    .content1 {
      margin: 0 auto;
      position: relative;
      .title1 {
        position: absolute;
        top: 285px;
        left: 170px;
        .zh_cn {
          font-size: 65px;
          font-weight: 400;
          color: #ffffff;
          text-shadow: 0px 4px 5px rgba(24, 164, 77, 0.38);
          line-height: 112px;
        }
        .en {
          font-size: 26px;
          font-weight: 400;
          color: #ffffff;
          text-shadow: 0px 4px 5px rgba(24, 164, 77, 0.38);
        }
      }
      .btn1 {
        position: absolute;
        top: 480px;
        left: 170px;
        width: 135px;
        height: 44px;
        background: rgba(17, 168, 78, 0);
        border: 1px solid #ffffff;
        border-radius: 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 15px;
        padding-right: 15px;
        box-sizing: border-box;
        img {
          width: 18px;
          height: 18px;
          object-fit: cover;
        }
        span {
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          width: 70px;
        }
      }
    }
  }
  .bg2 {
    background: url(~/assets/img/home/bg2.png);
    background-repeat: no-repeat;
    background-size: 100% 578px;
    height: 578px;
    .content2 {
      margin: 0 auto;
      position: relative;
      height: 100%;
      .text {
        font-size: 100px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.08);
        line-height: 210px;
        position: absolute;
        left: 25px;
        top: -120px;
        display: flex;
        align-items: center;
        justify-content: center;

        .solution {
          position: absolute;
          top: 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .line1 {
            font-size: 48px;
            font-weight: bold;
            color: #ffffff;
            line-height: 68px;
          }
          .line2 {
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            line-height: 8px;
            opacity: 0.7;
          }
          .line3 {
            font-size: 18px;
            font-weight: 400;
            color: #ffffff;
            line-height: 79px;
          }
          .btn21 {
            width: 122px;
            height: 38px;
            background: #ffffff;
            border-radius: 18px;
            font-size: 14px;
            font-weight: 400;
            color: #606060;
            line-height: 38px;
            text-align: center;
          }
        }
      }
      .swiper {
        position: absolute;
        top: 256px;
        width:100%;
        .swiper-slide {
          // margin: 0 2% !important;
          width: 50% !important;
          .point{
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
              max-width: 90px;
              height: auto;
              object-fit: cover;
            }
          }
        }
        .swiperBtn {
          background: none;
          width: 25px;
          top: 42%;
        }
      }
    }
  }
  .bg3 {
    background: url(~/assets/img/home/bg3.png);
    background-repeat: no-repeat;
    background-size: 100% 1136px;
    height: 1136px;
    .content3 {
      margin: 0 auto;
      position: relative;
    }
  }
  .bg4 {
    background: url(~/assets/img/home/bg4.png);
    background-repeat: no-repeat;
    background-size: 100% 875px;
    height: 875px;
    .content4 {
      margin: 0 auto;
      position: relative;
    }
  }
  .bg5 {
    background: url(~/assets/img/home/bg5.png);
    background-repeat: no-repeat;
    background-size: 100% 949px;
    height: 949px;
    .content5 {
      margin: 0 auto;
      position: relative;
    }
  }
  .bg6 {
    background: url(~/assets/img/home/bg6.png);
    background-repeat: no-repeat;
    background-size: 100% 951px;
    height: 951px;
    .content6 {
      margin: 0 auto;
      position: relative;
    }
  }
  .bg7 {
    background: url(~/assets/img/home/bg7.png);
    background-repeat: no-repeat;
    background-size: 100% 1046px;
    height: 1046px;
    .content7 {
      margin: 0 auto;
      position: relative;
    }
  }
}
</style>
