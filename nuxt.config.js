let hostUrl = 'https://www.ship88.cn'

// let hostUrl = 'http://kprrmf.natappfree.cc'//测试服务器
// let hostUrl = 'http://u2768442w0.qicp.vip'
// let hostUrl = 'http://192.168.0.18'



// let hostUrl = 'http://lwkacgr.nat.ipyingshe.com'
// let hostUrl = 'http://6b6h8h.natappfree.cc'

// let hostUrl = "http://47.101.191.248"
// let hostUrl = "http://sin.jinkworld.com"

// let hostUrl = "http://127.0.0.1"
let axiosUrl = ['/sys','/general','/ship','/ds','/search','/pay','/visual']
let myProxy = {}
axiosUrl.forEach(item=>{
  let pathRewrite={}
  pathRewrite['^' +item] = item
  myProxy[item] = {
    target: hostUrl, // 目标接口域名
    pathRewrite,
  }
})


export default {
  mode: 'universal',
  router:{
    base: '/sinovat', //正式部署须修改
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '秉圣工业',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: '新材料|玻璃钢' },
      { hid: 'description', name: 'description', content: '新材料船舶综合服务平台' },
      {name:"renderer", content:"webkit|ie-comp|ie-stand"},
      // {'http-equiv':"Content-Security-Policy", content:"upgrade-insecure-requests"},//正式部署须修改
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [

      {
        src: 'https://qiyukf.com/script/56155d4339804ded7d6ddad6173e754f.js',
        body: true
      },
      {
        src: 'https://api.map.baidu.com/api?type=webgl&v=1.0&ak=Y2gnUK6ykhGeXWAcMnm0x1OM8iazNgGr',//百度地图
        body: true
      },{
        src: 'https://www.ship88.cn/hk/jquery.js',
          body: true
      },
      {
        src: 'https://www.ship88.cn/hk/jsencrypt.js',
          body: true
      },
      {
        src: 'https://www.ship88.cn/hk/jsWebControl.js',
          body: true
      },
      {
        src:'https://cdn.jsdelivr.net/npm/hls.js@latest', //视频测试,video使用，直播在用
        body:true
      }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    {src:'@/assets/css/iconfont.css'},
    {src:'element-ui/lib/theme-chalk/index.css'},
    {src:'swiper/dist/css/swiper.css'},
    {src:'@/assets/css/common.css'},
    {src:'@/assets/css/init.less'},

    // {src:'quill/dist/quill.snow.css'},
    // {src:'quill/dist/quill.bubble.css'},
    // {src:'quill/dist/quill.core.css'},
    // {src:'static/ueditor/themes/default/css/ueditor.css'},

    // {src:'@/assets/css/aliplayer-min.css'}//视频
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/assets/js/wconfig.js', mode: 'client' },
    { src: '@/plugins/swiper.js', mode: 'client' },
    { src: '@/assets/js/asyncApi.js'},
    { src: '@/plugins/poly.js'},
    { src: '@/plugins/element.js'},
    { src: '@/plugins/axios.js',ssr: true},
    { src: '@/plugins/viewer.js'},
    {src: '@/plugins/video.js', ssr: false },
    { src: '@/plugins/vueqr.js', mode: 'client'},
    { src: '@/plugins/echarts.js', mode: 'client'},
    // { src: '@/plugins/hk/jquery.js', mode: 'client' },
    // { src: '@/plugins/hk/jsencrypt.js',  mode: 'client'},
    // { src: '@/plugins/hk/jsWebControl.js',  mode: 'client'},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  axios: {
    baseURL:hostUrl,
    proxy: true, // 表示开启代理
    prefix: '/', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy:myProxy,

  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 200000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {

    },

    // 开启打包分析
    analyze: false,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    },

    optimization: {

      splitChunks: {

        minSize: 10000,

        maxSize: 250000

      }

    },

    // vendor: ['axios'] // 为防止重复打包
  },

  //下面解决按需加载（待验证）
  render: {

    resourceHints: false,
  }
}
