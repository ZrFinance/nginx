<template>
  <div>
    <home-header></home-header>
    <home-notice></home-notice>  
    <home-flexbox></home-flexbox>
    <home-lucky></home-lucky>
    <pub-tabbar></pub-tabbar> 
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeNotice from './components/Notice'
import PubTabbar from '@/components/tabbar'
import HomeFlexbox from './components/Flexbox'
import HomeLucky from './components/Lucky'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeNotice,
    PubTabbar,
    HomeFlexbox,
    HomeLucky
  }
}
</script>

<style>

</style>
