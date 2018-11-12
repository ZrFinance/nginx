<template>
  <div class="all">
    <div class="cd1">
      <ul class="ul">
        <li class="li" :style="{'border': '1px solid #ff8a00'}"
          @click="tggqClick">
          <img
          class="img" src="@/assets/img/icon-tggq.png"> 推广股权</img>
        </li>
        <li class="li" :style="{'border': '1px solid #ff5959'}"
          @click="gqfhClick">
          <img  class="img" src="@/assets/img/icon-gqfh.png"> 股份分红</img>
        </li>
        <li class="li" :style="{'border': '1px solid #ffba00'}"
          @click="vipClick">
          <img  class="img" src="@/assets/img/icon-vipf.png"> VIP分</img>
        </li>
        <li class="li" :style="{'border': '1px solid #0090ff'}"
          @click="rcqClick">
          <img  class="img" src="@/assets/img/icon-rgq.png"> 认筹权</img>
        </li>
        <li class="li" :style="{'border': '1px solid #38c283'}"
          @click="jhmClick">
          <img  class="img" src="@/assets/img/icon-jhm.png"> 激活码</img>
        </li>
        <li class="li" :style="{'border': '1px solid #01c5e2'}"
          @click="tgljClick">
          <img  class="img" src="@/assets/img/icon-tglj.png"> 推广链接</img>
        </li>
      </ul>
    </div>
    <div class="cd2">
      <ul class="ul">
        <li 
          class="li1" 
          :style="{'backgroundImage':'url(' + this.img + ')'}"
          @click="tgbzHandle">
          <img class="img" src="@/assets/img/icon-tgbz.png"> 提供帮助</img>
        </li>
        <li 
          class="li2" 
          :style="{'backgroundImage' : 'url(' + this.img1 + ')'}"
          @click="sqbzHandle">
          <img  class="img" src="@/assets/img/icon-sqbz.png"> 申请帮助</img>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Flexbox, FlexboxItem } from 'vux'
export default {
  name: 'HomeFlexbox',
  components: {
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      img: require('@/assets/img/tgbz-bg.png'),
      img1: require('@/assets/img/sqbz-bg.png')
    }
  },
  methods: {
    tggqClick(){
      this.$router.push('/tggq')
    },
    tgljClick(){
      this.$router.push('/team')
    },
    jhmClick(){
      this.$router.push('/activation')    
    },
    rcqClick(){
      this.$router.push('/buypower')
    },
    vipClick(){
      this.$router.push('/vip')
    },
    gqfhClick(){
      this.$router.push('/gqfh')
    },
    sqbzHandle(){
      this.$router.push('/sqbz')
    },
    tgbzHandle(){
      this.$router.push('/tgbz')
    }
  },
  computed: {
    ...mapState(['init_data','user'])
  }
}
</script>

<style lang="stylus" scoped>
  .all
    .cd1
      height: 2.5rem
      margin: .15rem
      border: 0.05rem solid #f0f0f0
      .ul
        display: block;
        height: 100%
        list-style: none;
        .li
          float: left;
          width: 26%
          height: .5rem
          margin: 0.13rem;
          padding: 0.2rem 0.1rem;
          border-radius: 0.1rem;
          display: block;
          text-align: center;
          font-size: 0.27rem;
          .img
            height: 0.5rem;
            width: 0.52rem;
            margin-right: 0.1rem;
            border: 0 none;
            vertical-align: middle;
            margin: 0 auto;
            padding: 0;
            box-sizing: border-box;
    .cd2
      margin: .15rem
      height: 1.5rem
      border: 0.05rem solid #f0f0f0
      .ul
        display: block;
        height: 100%
        list-style: none;
        .li1
          float: left;
          width: 43%
          height: .5rem
          margin: .28rem 0.13rem 0.13rem 0.13rem;
          padding: 0.2rem 0.1rem;
          border-radius: 0.1rem;
          display: block;
          text-align: center;
          font-size: 0.27rem;
          background-size: 100% 100%;
          font-size: 0.3375rem;
          .img
            height: 0.5rem;
            width: 0.52rem;
            margin-right: 0.1rem;
            border: 0 none;
            vertical-align: middle;
            margin: 0 auto;
            padding: 0;
            box-sizing: border-box;
          .p
            font-size: .22rem
            margin-left: 2rem
            margin-top: -.1rem
        .li2
          float: left;
          width: 43%
          height: .5rem
          margin: .28rem 0.13rem 0.13rem 0.13rem;
          padding: 0.2rem 0.1rem;
          border-radius: 0.1rem;
          display: block;
          text-align: center;
          font-size: 0.27rem;
          background-size: 100% 100%;
          font-size: 0.3375rem;
          .img
            height: 0.5rem;
            width: 0.52rem;
            margin-right: 0.1rem;
            border: 0 none;
            vertical-align: middle;
            margin: 0 auto;
            padding: 0;
            box-sizing: border-box;
</style>

