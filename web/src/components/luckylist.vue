<template>
  <div>
    <div class="container">
        <div class="lucky-wheel" :style="{'height':this.init_data.screenHeight}">
            <div class="lucky-title"></div>
        </div>
        <ul class="ul1">
          <li class="li2">
            <p class="p3">内容</p>
            <p class="p4">时间</p>
          </li>
          <li class="li1" v-for="item in this.luckylist" :key="item.id">
            <p class="p1">{{item.name}}</p>
            <p class="p2">{{item.createtime}}</p>
          </li>
        </ul>
    </div>
    <pub-tabbar></pub-tabbar>
  </div>
</template>
<script>
import { QueryLucky } from '@/api/request/request'
import { mapState } from 'vuex'
import { timestampToTime } from '@/api/utils'
import PubTabbar from '@/components/tabbar'
export default {
  name: 'PubLuckylist',
  components: {
    PubTabbar
  },
  data() {
    return {
      luckylist : []
    };
  },
  computed: {
    ...mapState(['init_data'])
  },
  created() {
    QueryLucky(this.callbackQueryLucky)
  },
  methods: {
    callbackQueryLucky(res) {
      this.luckylist= res.data.data
      for ( var item in this.luckylist) {
        this.$set(this.luckylist[item],'createtime',timestampToTime(this.luckylist[item].createtime))
      }
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
}
.lucky-wheel {
  width: 100%;
  background: rgb(252, 207, 133) url("../assets/img/color_pillar.png") no-repeat
    center bottom;
  background-size: 100%;
  padding-top: .9625rem;
}
.lucky-title {
  width: 100%;
  height: 2.125rem;
  background: url("../assets/img/lucky_title.png") no-repeat center top;
  background-size: 100%;
}
.ul1 {
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.9375rem;
  position: fixed;
  left: 15%;
  top:20%;
}
.li1 {
  display: flex;
  margin-bottom: .2rem;
}
.p1 {
  font-weight:900;
}
.p2 {
  margin-left: .5rem;
  font-weight:900;
}
.li2 {
  display: flex;
  margin-top: .2rem;
  margin-bottom: .4rem;
}
.p3 {
  font-weight:900;
  margin-left: .6rem;
  color:red;
}
.p4 {
  margin-left: 2.3rem;
  font-weight:900;
  color:red;
}
</style>

