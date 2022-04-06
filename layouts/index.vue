<template>
  <div class="person" id="videoDefaults"  v-loading="loading">
    <nuxt />
  </div>
</template>
<script>
  import {mapState} from "vuex";
  export default {
    data(){
      return {}
    },
    components: { },
    computed: {
      ...mapState([
        'loading',
        'currentRole'
      ])
    },
    watch:{

    },
    async mounted(){

    },
    methods:{

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

</style>
