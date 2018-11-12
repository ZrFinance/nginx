<template>
  <div class="lucky" @click="LuckyHandle">
    <img class="img" src="@/assets/img/lucky.png"></img>
  </div>
</template>

<script>
export default {
  name: 'HomeLucky',
  methods: {
    LuckyHandle: function() {
      this.$router.push('/lucky')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .lucky
    margin: .15rem
    margin-bottom: 1.5rem
    .img
      width: 100%;
      height: 100%
      display:block;
</style>
