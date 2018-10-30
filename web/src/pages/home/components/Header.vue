<template>
  <div class="header">
    <swiper :show-dots="false" :auto="true" :aspect-ratio="400/800">
      <swiper-item class="swiper-demo-img" v-for="item in this.imgs" :key="item.id">
        <img :src="item.url">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'HomeHeader',
  components: {
    Swiper,
    SwiperItem
  },
  data () {
    return {
      imgs: [
        {
          id : 1,
          url: require("@/assets/img/banner1.jpg"),
        },
        {
          id : 2,
          url: require("@/assets/img/banner2.jpg")
        }
      ]
    }
  },
  computed: {
    ...mapState(['server_url','authorization'])
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  .header
    margin: .15rem .15rem .15rem .15rem
  .swiper-demo-img img {
    width: 100%
    height: 100%
  }
</style>
