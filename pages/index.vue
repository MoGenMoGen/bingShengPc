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
        <swiper class="swiper" :options="swiperOption2">
          <!-- <div style="width: 90%;overflow: hidden;"> -->
          <swiper-slide
            v-for="(item, index) in solutionList"
            :key="index"
            v-if="solutionList.length > 0"
            :style="{
              transform:
                currentIndex22 == index
                  ? 'translateY(-10px)'
                  : 'translateY(0px)',
            }"
          >
            <div
              class="productSwiper point"
              @mouseover="currentIndex22 = index"
              @mouseleave="currentIndex22 = -1"
            >
              <img :src="item.pic" class="el-images" :ref="'img2' + index" />

              <div class="showmore" v-show="currentIndex22 == index">
                <div class="title2">{{ item.title }}</div>
                <div class="content22">{{ item.content }}</div>
                <div
                  class="btn22"
                  @mouseover="currentIndex23 = index"
                  @mouseleave="currentIndex23 = -1"
                >
                  <span v-show="currentIndex23 != index">查看详情</span>
                  <span
                    v-show="currentIndex23 == index"
                    style="
                      color: #33d9b2 !important;
                      font-weight: bold !important;
                      cursor: pointer;
                    "
                    >查看详情></span
                  >
                </div>
              </div>
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
        <div class="text">
          BINGSHENG
          <div class="solution">
            <div class="line1">秉圣工业行业版图</div>
            <div class="line2">Bingsheng industrial industry map</div>
            <div class="line3">
              秉圣工业已经为多个行业及大型客户提供了碳中和、绿色智能制造，智慧城市工业互联网产品和服务
            </div>
          </div>
        </div>
        <!-- 点点定位 -->
        <div class="circle-wrap" :style="{ width: width + 'px' }">
          <div class="circle1">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>

          <div class="circle1 f1">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>

          <div class="circle1 f2">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>

          <div class="circle1 f3">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>

          <div class="circle1 f4">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>

          <div class="circle1 f5">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>

          <div class="circle1 f6">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>
          <div class="circle1 f7">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>

          <div class="circle1 f8">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>

          <div class="circle1 f9">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>

          <div class="circle1 f10">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>

          <div class="circle1 f11">
            <div class="big-circle"></div>
            <div class="small-circle"></div>
            <div class="hidde">
              <p>园区荷储一体化</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg4" :style="{ width: bWidth + 'px' }">
      <div class="content4" :style="{ width: width + 'px' }">
        <div class="text">
          BINGSHENG
          <div class="solution">
            <div class="line1">一站式工业互联网方案</div>
            <div class="line2">One-stop industrial Internet solution</div>
            <!-- <div class="line3">携手行业龙头企业，跨行业跨领域赋能</div> -->
            <div
              class="btn21"
              @mouseover="flag4 = true"
              @mouseleave="flag4 = false"
            >
              <span v-show="!flag4">查看全部</span>
              <span v-show="flag4" class="green">查看全部></span>
            </div>
          </div>
        </div>
        <swiper class="swiper" :options="swiperOption4">
          <!-- <div style="width: 90%;overflow: hidden;"> -->
          <swiper-slide
            v-for="(item, index) in industryList"
            :key="index"
            v-if="industryList.length > 0"
            :class="[currentIndex41 == index ? 'big' : 'small']"
          >
            <div class="productSwiper point" @mouseover="handleover4(index)">
              <img :src="item.pic" alt="" />
              <div class="mask"></div>
              <div class="showbox1" v-if="currentIndex41 != index">
                <div class="title">{{ item.title }}</div>
                <div class="entitle">{{ item.enTitle }}</div>
              </div>
              <div
                class="showbox2"
                :style="{
                  width: currentIndex41 == index ? '491px' : '0px',
                  height: currentIndex41 == index ? '50%' : '0%',
                  padding: currentIndex41 == index ? '25px 36px' : '0px',
                }"
              >
                <div class="title">{{ item.title }}</div>
                <div class="content">{{ item.content }}</div>
                <div
                  class="btn42"
                  @mouseover="currentIndex42 = index"
                  @mouseleave="currentIndex42 = -1"
                >
                  <span v-show="currentIndex42 != index">查看详情</span>
                  <span v-show="currentIndex42 == index" class="green"
                    >查看详情></span
                  >
                </div>
              </div>
            </div>
          </swiper-slide>
          <div
            class="swiper-button-prev swiper-button-white swiperBtn"
            style="left: 0"
            slot="button-prev"
          >
            <img src="@/assets/img/icon/l_left.png" alt="" />
          </div>
          <div
            class="swiper-button-next swiper-button-white swiperBtn"
            style="right: 0"
            slot="button-next"
          >
            <img src="@/assets/img/icon/l_right.png" alt="" />
          </div>
          <!-- </div> -->
          <!-- <div class="swiper-pagination grayColor" slot="pagination"></div> -->
        </swiper>
      </div>
    </div>
    <div class="bg5" :style="{ width: bWidth + 'px' }">
      <div class="content5" :style="{ width: width + 'px' }">
        <div class="text">
          BINGSHENG
          <div class="solution">
            <div class="line1">浏览最多的产品</div>
            <div class="line2">Most viewed products</div>
            <!-- <div class="line3">携手行业龙头企业，跨行业跨领域赋能</div> -->
            <div
              class="btn21"
              @mouseover="flag5 = true"
              @mouseleave="flag5 = false"
            >
              <span v-show="!flag5">查看全部</span>
              <span v-show="flag5" class="green">查看全部></span>
            </div>
          </div>
        </div>
        <swiper class="swiper" :options="swiperOption5">
          <!-- <div style="width: 90%;overflow: hidden;"> -->
          <swiper-slide
            v-for="(item, index) in productList"
            :key="index"
            v-if="productList.length > 0"
          >
            <div class="productSwiper point">
              <img
                src="https://tse4-mm.cn.bing.net/th/id/OIP-C.-ax4WdAGJBCZte15LZvLUgHaHa?w=180&h=180&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
              <div class="desc">{{ item.desc }}</div>
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
    <div class="bg6" :style="{ width: bWidth + 'px' }">
      <div class="content6" :style="{ width: width + 'px' }">
        <!-- <div class="btn6" @mouseover="flag6 = true" @mouseleave="flag6 = false">
          <span v-show="!flag6">查看全部</span>
          <span v-show="flag6" class="green">查看全部></span>
        </div> -->
        <!-- 数字化互动 -->
        <div class="content6-top">
          <div class="text textchange">
            BINGSHENG
            <div class="solution">
              <div class="line1">数字化互动</div>
              <div class="line2">Digital interaction</div>
              <div class="line3">查看最新秉圣工业动态</div>
            </div>
          </div>
          <div class="digital-content">
            <div class="digital-list">
              <ul>
                <li v-for="(item, index) in digitalList" :key="index">
                  <div class="image">
                    <img src="../assets/img/new.jpg" alt="" />
                  </div>
                  <div class="listtxt">
                    <dl>
                      <dt>{{ item.title }}</dt>
                      <dd>{{ item.info }}</dd>
                    </dl>
                  </div>
                  <div class="time">
                    <span>{{ item.time }}</span>
                    <div
                      class="read"
                      @mouseover="flag21 = true"
                      @mouseleave="flag21 = false"
                    >
                      <span v-show="!flag21">{{ item.read }}</span>
                      <span v-show="flag21">{{ item.read }}></span>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="digital-right">
                <div class="digTop">
                  <h2>
                    第四届中国制氢与氢能源产业大会择期召开—关于延期举办“第
                    四届中国制氢与氢能源产业大会”的通知
                  </h2>
                  <p>
                    3月19日，北京ABB低压电器有限公司光伏发电及系统集成项目实现并网。项目预计年发电量42万度，每年将减
                    少约400吨温室气体的排放。项目中运用的节能解决方案集成了ABB电动汽车充电桩及智慧能源管理技术，实现
                    了整个工化和数字化管理。
                  </p>
                  <span>2021.05.02</span>
                </div>
                <div class="digBttom">
                  <p>公司优势品牌介绍——派克parker（内附现货库存）</p>
                  <p>公司优势品牌介绍——Rexroth力士乐（内附现货库存）</p>
                  <p>碳中和赛道群雄逐鹿 美锦能源发布碳中和报告力争先锋</p>
                  <p>
                    孝义盗采煤矿透水事故已致2人遇难
                    国务院安委会将挂牌督办事故查处
                  </p>
                  <div
                    class="allBtn"
                    @mouseover="flag6 = true"
                    @mouseleave="flag6 = false"
                  >
                    <span v-show="!flag6">更多</span>
                    <span v-show="flag6" class="green">更多></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 部分品牌展示 -->
        <div class="content6-bottom">
          <div class="text textchange">
            BINGSHENG
            <div class="solution">
              <div class="line1">部分品牌展示</div>
              <div class="line2">Brand display</div>
              <div class="line3">秉圣工业合作商</div>
            </div>
          </div>
          <div class="qlog">
            <swiper class="swiper" :options="swiperOption6">
              <!-- <div style="width: 90%;overflow: hidden;"> -->
              <swiper-slide
                v-for="(item, index) in brandList"
                :key="index"
                v-if="solutionList.length > 0"
              >
                <div class="productSwiper point">
                  <img
                    :src="item.imgNm"
                    class="el-images"
                    :ref="'img' + index"
                  />
                </div>
              </swiper-slide>

              <div
                class="swiper-button-prev swiper-button-white swiperBtn"
                style="left: 0"
                slot="button-prev"
              >
                <img src="@/assets/img/icon/l_left.png" alt="" />
              </div>
              <div
                class="swiper-button-next swiper-button-white swiperBtn"
                style="right: 0"
                slot="button-next"
              >
                <img src="@/assets/img/icon/l_right.png" alt="" />
              </div>
              <!-- </div> -->
              <!-- <div class="swiper-pagination grayColor" slot="pagination"></div> -->
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <div class="bg7" :style="{ width: bWidth + 'px' }">
      <div class="content7" :style="{ width: width + 'px' }">
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
import industryA from "@/assets/img/industryA.png";

import log2 from "@/assets/img/log2.png";
import log1 from "@/assets/img/log1.png";

export default {
  data() {
    return {
      flag1: false,
      flag21: false,
      currentIndex22: -1, //显示详情
      currentIndex23: -1, //显示按钮选中
      flag3: false,
      flag4: false,
      currentIndex41: 0, //显示详情
      currentIndex42: -1, //显示按钮选中
      flag5: false,
      flag6: false,
      //模块二列表
      solutionList: [
        {
          pic: tzh,
          title: "碳中和",
          content:
            "如何有效控制碳排放量、提升能源使用效率、降低能耗， 以实现“碳中和”目标，成为企业亟待解决的问题。通过 在能源生产如何有效控制碳排放量、提升能源使用效率、降低能耗， 以实现“碳中和”目标，成为企业亟待解决的问题。通过 在能源生产",
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
      // 模块二swiper配置
      swiperOption2: {
        slidesPerView: 4,
        spaceBetween: 1,
        freeMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      //模块四列表
      industryList: [
        {
          pic: industryA,
          title: "码头行业",
          enTitle: "Port industry",
          content:
            "采用秉圣工业互联网敏捷方案该方案基于德国工业4.0的理念与中国工业互联网的标准架构...",
        },
        {
          pic: industryA,
          title: "电池行业",
          enTitle: "Battery industry",
          content:
            "采用秉圣工业互联网敏捷方案该方案基于德国工业4.0的理念与中国工业互联网的标准架构...",
        },
        {
          pic: industryA,
          title: "物流行业",
          enTitle: "The logistics industry",
          content:
            "采用秉圣工业互联网敏捷方案该方案基于德国工业4.0的理念与中国工业互联网的标准架构...",
        },
        {
          pic: industryA,
          title: "汽配行业",
          enTitle: "Ore terminal",
          content:
            "采用秉圣工业互联网敏捷方案该方案基于德国工业4.0的理念与中国工业互联网的标准架构...",
        },
      ],
      // 模块四swiper配置
      swiperOption4: {
        slidesPerView: 4,
        spaceBetween: 1,
        freeMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      //模块五列表
      productList: [
        {
          pic: tzh,
          desc: "EMG液压控制系统",
        },
        {
          pic: tzh,
          desc: "EMG智能数字控制器",
        },
        {
          pic: tzh,
          desc: "ETS328-5-100-000",
        },
        {
          pic: tzh,
          desc: "EMG数字式控制器",
        },
        {
          pic: tzh,
          desc: "EMG伺服阀",
        },
      ],
      // 模块五swiper配置
      swiperOption5: {
        slidesPerView: 5,
        spaceBetween: 1,
        freeMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      // 数字化互动
      digitalList: [
        {
          imgUrl: "new",
          title: "恭祝宁波秉圣工业正式运营",
          info: "历经7年发展，从刚开始的五人团队，到在发展为拥有50 人团队，横跨液压...",
          time: "2019-01-02",
          read: "阅读详情",
        },
        {
          imgUrl: "new",
          title: "恭祝宁波秉圣工业正式运营",
          info: "历经7年发展，从刚开始的五人团队，到在发展为拥有50 人团队，横跨液压...",
          time: "2019-01-02",
          read: "阅读详情",
        },
      ],
      // 部分品牌展示
      swiperOption6: {
        slidesPerView: 3,
        spaceBetween: 35,
        freeMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      brandList: [
        { imgNm: log2 },
        { imgNm: log1 },
        { imgNm: log2 },
        { imgNm: log1 },
      ],
    };
  },
  computed: {
    ...mapState(["bWidth", "width", "proSize"]),
  },
  methods: {
    handleover4(index) {
      this.currentIndex41 = index;
      console.log("ffff", this.currentIndex41);
    },
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
  .text {
    font-size: 100px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.08);
    line-height: 210px;
    position: absolute;
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
  .bg1 {
    background: url(~/assets/img/home/bg1.png);
    background-repeat: no-repeat;
    background-size: 100% 1052px;
    height: 1052px;
    .content1 {
      margin: 0 auto;
      position: relative;
      height: 100%;
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
        left: 25px;
        top: -120px;
      }
      .swiper {
        position: absolute;
        top: 210px;
        width: 100%;
        // overflow: hidden;
        // overflow-y: visible;
        // overflow-x: hidden;
        padding: 0 25px;
        padding-top: 20px;
        box-sizing: border-box;
        height:305px;
        .swiper-slide {
          // margin: 0 2% !important;
          width: 25% !important;
          transition: transform 1.5s;
          margin: 0 !important;
          height: 100%;

          .point {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              width: 90px;
              height: auto;
              object-fit: cover;
            }
            .showmore {
              display: flex;
              align-items: center;
              flex-direction: column;
              .title2 {
                font-size: 22px;
                font-weight: bold;
                color: #ffffff;
                line-height: 59px;
                text-align: center;
              }
              .content22 {
                width: 271px;
                height: 63px;
                font-size: 14px;
                font-weight: 400;
                color: #ffffff;
                line-height: 20px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
              .btn22 {
                width: 122px;
                height: 38px;
                background: #05ad49;
                border: 1px solid #ffffff;
                border-radius: 18px;
                font-size: 14px;
                font-weight: 400;
                color: #ffffff;
                line-height: 38px;
                text-align: center;
                margin-top: 18px;
              }
            }
          }
        }
        .swiperBtn {
          background: none;
          width: 25px;
          top: 100px;
        }
      }
    }
  }
  .text {
    font-size: 100px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.08);
    line-height: 210px;
    position: absolute;
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
        line-height: 70px;
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
  .bg3 {
    background: url(~/assets/img/home/bg3.png) no-repeat center center;
    background-size: cover;
    height: 1136px;
    .content3 {
      margin: 0 auto;
      position: relative;
      height: 100%;

      .circle-wrap {
        position: relative;
        top: 400px;
        width: 100%;
        height: 100%;
        //  圆点
        .circle1 {
          position: absolute;
          left: 420px;
          top: 42px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          .big-circle {
            width: 100%;
            height: 100%;
            background: rgba(17, 162, 222, 0.85);
            border-radius: 50%;
            animation: twinkling 1s infinite ease-in-out;
            animation-fill-mode: both;
          }
          .small-circle {
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 1);
            border: 3px solid #8a8a8a;
            opacity: 0.9;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -6px;
            margin-top: -6px;
          }
          .hidde {
            width: 119px;
            height: 91px;
            background: url(../assets/img/xf.png) no-repeat;
            position: absolute;
            top: -85px;
            left: -4px;
            font-size: 14px;
            color: #fff;
            opacity: 0;
            transition: opacity 0.5s ease;
            p {
              text-align: center;
              line-height: 90px;
            }
          }
          &:hover {
            .hidde {
              opacity: 1;
            }
          }
        }
        .f1 {
          left: 600px;
        }
        .f2 {
          top: 210px;
          left: 508px;
        }
        .f3 {
          top: 269px;
          left: 649px;
        }
        .f4 {
          top: 420px;
          left: 500px;
        }
        .f5 {
          left: 214px;
          top: 353px;
        }
        .f6 {
          left: 320px;
          top: 477px;
        }
        .f7 {
          left: 680px;
          top: 580px;
        }
        .f8 {
          left: 1088px;
          top: 536px;
        }
        .f9 {
          left: 1251px;
          top: 47px;
        }
        .f10 {
          left: 969px;
          top: 177px;
        }
        .f11 {
          left: 819px;
          top: 79px;
        }
      }
      .text {
        right: 45px;
        top: 20px;
        color: rgba(0, 0, 0, 0.08);
        .solution {
          width: 1200px;
          .line1 {
            color: #11a2de;
          }
          .line2 {
            color: #11a2de;
          }
          .line3 {
            color: #606060;
          }
          .btn21 {
            margin-top: 20px;
          }
        }
      }
    }
  }
  // 动画
  @keyframes twinkling {
    0% {
      opacity: 0.3;
      transform: scale(1);
    }

    50% {
      opacity: 0.8;
      transform: scale(1.12);
    }

    100% {
      opacity: 0.3;
      transform: scale(1);
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
      height: 100%;

      .text {
        right: 45px;
        top: 100px;
        color: rgba(0, 0, 0, 0.08);
        .solution {
          .line1 {
            color: #11a2de;
          }
          .line2 {
            color: #11a2de;
          }
          .btn21 {
            margin-top: 20px;
          }
        }
      }
      .swiper {
        position: absolute;
        top: 437px;
        width: 100%;
        height: 420px;
        padding: 0 58px;
        box-sizing: border-box;
        // overflow-y: visible;
        // overflow-x: hidden;
        // padding-top: 20px;
        .big {
          width: 491px !important;
          transition: width 0.5s;
        }
        .small {
          width: 331px !important;
          transition: width 0.5s;
        }
        .swiper-slide {
          // margin: 0 2% !important;
          width: 331px;
          height: 100%;
          .point {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 20px;
            }
            .mask {
              width: 100%;
              height: 100%;
              border-radius: 20px;
              background: rgba(0, 0, 0, 0.4);
              position: absolute;
              z-index: 100;
            }
            .showbox1 {
              position: absolute;
              z-index: 200;
              .title {
                font-size: 36px;
                font-weight: bold;
                color: #ffffff;
                line-height: 38px;
              }
              .entitle {
                font-size: 16px;
                font-weight: bold;
                color: #ffffff;
                line-height: 37px;
                opacity: 0.8;
                text-align: center;
              }
            }
            .showbox2 {
              position: absolute;
              bottom: 0px;
              z-index: 300;
              // width: 491px;
              height: 50%;
              background: #ffffff;
              opacity: 0.9;
              border-bottom-right-radius: 20px;
              border-bottom-left-radius: 20px;
              padding: 25px 36px;
              transition: all 0.5s;
              .title {
                font-size: 36px;
                font-weight: bold;
                color: #303030;
                line-height: 53px;
              }
              .content {
                width: 369px;
                height: 48px;
                font-size: 18px;
                font-weight: 400;
                color: #606060;
                line-height: 24px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .btn42 {
                width: 122px;
                height: 38px;
                background: #ffffff;
                border-radius: 18px;
                font-size: 14px;
                font-weight: 400;
                color: #606060;
                line-height: 38px;
                text-align: center;
                margin-top: 20px;
                border: 1px solid #d2d2d2;
              }
            }
          }
        }
        .swiperBtn {
          background: none;
          width: 25px;
          top: 210px;
        }
      }
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
      height: 100%;

      .text {
        left: 50%;
        transform: translateX(-50%);
        .solution {
          .btn21 {
            margin-top: 20px;
          }
        }
      }
      .swiper {
        position: absolute;
        top: 330px;
        width: 100%;
        height: 313px;
        padding: 0 25px;
        box-sizing: border-box;
        // overflow-y: visible;
        // overflow-x: hidden;
        // padding-top: 20px;

        .swiper-slide {
          // margin: 0 2% !important;
          width: 20% !important;
          height: 100%;
          .point {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: url("~/assets/img/product_bg.jpg");
            background-repeat: no-repeat;
            background-size: 280px 313px;
            background-position: center center;
            img {
              width: 130px;
              height: auto;
              object-fit: cover;
            }
            .desc {
              font-size: 16px;
              font-weight: 400;
              color: #606060;
              text-align: center;
              margin-top: 25px;
            }
          }
        }
        .swiperBtn {
          background: none;
          width: 25px;
          top: 156px;
        }
      }
    }
  }
  // 数字化互动
  .bg6 {
    background: url(~/assets/img/home/bg6.png);
    background-repeat: no-repeat;
    background-size: 100% 951px;
    height: 951px;
    .content6 {
      margin: 0 auto;
      position: relative;
      background-color: #fff;
      box-shadow: 0px 3px 65px 0px rgba(176, 176, 176, 0.75);
      border-radius: 50px;
      height: auto;
      top: -200px;
      .digital-list {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        margin-top: 80px;
        ul {
          width: 48%;
          display: flex;
          justify-content: space-between;
          li {
            width: 48%;
            border-radius: 10px;
            background-color: #f3f3f3;
            cursor: pointer;
            .image {
              overflow: hidden;
            }
            img {
              width: 100%;
              display: block;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              height: 230px;
              transition: all 0.5s ease;
            }
            dl {
              padding: 28px 19px 90px 19px;
              font-size: 14px;
              color: #909090;
              line-height: 20px;
              dt {
                font-size: 18px;
                color: #303030;
                font-weight: bold;
                line-height: 30px;
                margin-bottom: 19px;
                transition: all 0.5s ease;
              }
            }
            .time {
              padding: 0 19px 29px 19px;
              display: flex;
              justify-content: space-between;
              .read {
                width: 70px;
                span + span {
                  color: #05ad49;
                }
              }
            }

            &:hover {
              dt {
                color: #05ad49;
              }
              img {
                transform: scale(1.1);
              }
            }
          }
        }
        .digital-right {
          width: 50%;
          padding: 30px 0px;
          background: linear-gradient(0deg, #1ab781, #11a2de);
          border-radius: 10px;
          color: #fff;
          font-size: 14px;
          line-height: 24px;
          box-sizing: border-box;
          .digTop {
            padding: 0 39px 28px 39px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            h2 {
              font-size: 24px;
              font-weight: bold;
              line-height: 36px;
              margin-bottom: 12px;
            }
            span {
              color: rgba(255, 255, 255, 0.4);
              margin-top: 9px;
              display: block;
            }
          }
          .digBttom {
            padding: 28px 39px 0 39px;
            font-size: 16px;
            line-height: 24px;
            p + p {
              margin-top: 8px;
            }
            .allBtn {
              width: 120px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background: #ffffff;
              border-radius: 20px;
              color: #606060;
              margin-top: 25px;
            }
          }
        }
      }
      // 部分品牌展示
      .content6-bottom {
        position: relative;
        margin-top: 20px;
        .qlog {
          margin-top: 80px;
          padding: 0 30px 190px 30px;
          .swiper-button-prev.swiper-button-white,
          .swiper-container-rtl .swiper-button-next.swiper-button-white {
            background-image: none;
          }
          .swiper-button-next.swiper-button-white,
          .swiper-container-rtl .swiper-button-prev.swiper-button-white {
            background-image: none;
          }
          .point {
            margin-left: 85px;
            margin-right: 85px;
          }
        }
      }
    }
  }
  .textchange {
    color: rgba(0, 0, 0, 0.08);
    position: initial;
    width: 100%;
    .solution {
      .line1 {
        color: #11a2de;
      }
      .line2 {
        color: #11a2de;
      }
      .line3 {
        color: #606060;
      }
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
      top: 300px;
      height: 100%;
    }
  }
}
</style>
