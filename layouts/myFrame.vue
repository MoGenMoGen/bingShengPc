<template>
  <div id="myFrame" :style="{width:bWidth?bWidth+'px':'100%'}">
    <nuxt />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        bWidth:0,
        width:0,
      }
    },
    components: {},
    computed: {
    },
    watch: {

    },
    async mounted() {
      this.getWidth()
      window.onresize = () => {
        this.getWidth()
      }
    },
    methods: {
      getWidth(){
        let data = this.until.getWidth()
        this.bWidth = data.bWidth
        this.width = data.width
        this.store.commit('changeWidth',data)
      },
    }
  }
</script>
<style lang="less">
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    background: #F3F3F3;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
  #myFrame {
    min-height: 100%;
  }
</style>
