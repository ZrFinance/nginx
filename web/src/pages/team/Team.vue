<template>
  <div>
    <pub-headpic></pub-headpic>
    <team-team></team-team>
    <pub-tabbar></pub-tabbar>
  </div>
</template>

<script>
import TeamTeam from './components/team'
import PubHeadpic from '@/components/pubheadpic'
import PubTabbar from '@/components/tabbar'

export default {
  name: 'Team',
  components: {
    TeamTeam,
    PubHeadpic,
    PubTabbar
  }
}
</script>

<style>

</style>
