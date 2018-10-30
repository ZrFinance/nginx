<template>
  <div class="notice">
    <router-link class="p" to="/notice">系统通知: 通知 ! ! ! ..</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeNotice',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  .notice
    width:90%
    margin-top: .15rem
    margin-left: .15rem
    margin-right: .15rem
    padding: .08rem .2rem .08rem;
    border: 1px solid #ff2424;
    border-radius: 0.1rem;
    .p
      height: 0.5rem;
      line-height: 0.5rem;
      display: block;
      font-size: 0.27rem;
      color: #ff0000;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
</style>
