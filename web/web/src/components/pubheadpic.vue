<template>
  <div class="all">
    <div class="headerpic" 
        :style="{'background-image' : 'url(' + img + ')'}">
      <img class="img" src="@/assets/img/touxiang.png">
      <p class="p">{{this.user.username}}    欢迎登录</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PubHeadpic',
  data () {
    return {
      img: require('@/assets/img/headPic-bg.png')
    }
  },
  methods: {
  },
  computed: {
    ...mapState(['init_data','user'])
  }
}
</script>

<style lang="stylus" scoped>
  .all
    .headerpic
      padding: 0.6rem 0 0.3rem;
      background-size: 100% 100%;
      border: 1px solid #2d9aff;
      border-radius: 0.1rem;
      margin : 0.2rem
      .img
        display: block;
        max-width: 25%;
        margin: 0 auto;
        border-radius: 50%;
      .p
        text-align: center;
        color: #fff;
        font-size: 0.27rem;
        margin-top: 0.2rem;
</style>
