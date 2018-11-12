<template>
  <div>
    <pub-headpic></pub-headpic>
    <details-card></details-card>
    <pub-tabbar></pub-tabbar>
  </div>
</template>

<script>
import PubHeadpic from '@/components/pubheadpic'
import DetailsCard from './components/Card'
import PubTabbar from '@/components/tabbar'

export default {
  name: 'UserDetails',
  components: {
    DetailsCard,
    PubHeadpic,
    PubTabbar
  }
}
</script>

<style>

</style>
