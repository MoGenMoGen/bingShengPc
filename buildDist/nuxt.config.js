
export default {
  mode: 'universal',
  router:{
    base: '/',
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '浙江法治在线',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: '法治在线|浙江普法网|普法宣传|浙江法治|法治宣传|浙江法制报|法制在线' },
      { hid: 'description', name: 'description', content: '浙江法治在线' },
      {name:"renderer", content:"webkit"},
      {name:"baidu-site-verification", content:"rL56RVqYF3"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/zjfzol/favicon.ico' }
    ],
    script: [
      { src: 'https://ta.8531.cn/c/js/ta.js?mpid=143',id:'_trs_ta_js',async:'async',defer:'defer' },
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
    {src:'element-ui/lib/theme-chalk/index.css'},
    {src:'swiper/dist/css/swiper.css'}
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/assets/js/wconfig.js', mode: 'client' },
    { src: '~/plugins/swiper.js', mode: 'client' },
    { src: '~/assets/js/asyncApi.js'},
    { src: '~/plugins/vueqr.js', mode: 'client'},
    { src: '@/plugins/poly.js'},
    { src: '@/plugins/element.js'},
    { src: '@/plugins/axios.js',ssr: true}
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
    '@nuxtjs/proxy'
  ],
  axios: {
    // baseURL:'https://www.zjfzol.com.cn',
    proxy: true, // 表示开启代理
    // credentials: true // 表示跨域请求时是否需要使用凭证
  },

  proxy: {
    '/law': {
      target: 'http://zjfzol.zj.gov.cn/', // 目标接口域名
      pathRewrite: {
        '^/law': '/law', // 把 /api 替换成 /
        changeOrigin: true // 表示是否跨域
      }
    },
    '/sys': {
      target: 'http://zjfzol.zj.gov.cn/', // 目标接口域名
      pathRewrite: {
        '^/sys': '/sys', // 把 /api 替换成 /
        changeOrigin: true // 表示是否跨域
      }
    },
    '/theme': {
      target: 'http://zjfzol.zj.gov.cn/', // 目标接口域名
      pathRewrite: {
        '^/theme': '/theme', // 把 /api 替换成 /
        changeOrigin: true // 表示是否跨域
      }
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
    // vendor: ['axios'] // 为防止重复打包
  }
}
