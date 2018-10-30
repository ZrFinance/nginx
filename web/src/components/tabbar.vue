<template>
  <tabbar>
    <tabbar-item selected link="/home">
      <img slot="icon" src="@/assets/img/icon-index-active.png">
      <span slot="label">主页</span>
    </tabbar-item>
    <tabbar-item selected link="/order">
      <img slot="icon" src="@/assets/img/icon-order.png">
      <span slot="label">订单</span>
    </tabbar-item>
    <tabbar-item selected link="/team">
      <img slot="icon" src="@/assets/img/icon-team.png">
      <span slot="label">团队</span>
    </tabbar-item>
    <tabbar-item selected link="/userdetails">
      <img slot="icon" src="@/assets/img/icon-member.png" >
      <span slot="label">会员</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem } from 'vux'
export default {
  name: 'PubTabbar',
  components: {
    Tabbar,
    TabbarItem,
    ViewBox
  }
}
</script>

<style lang="stylus" scoped>
</style>

<style>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>