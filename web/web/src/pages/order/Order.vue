<template>
  <div>
    <order-orders></order-orders>
    <pub-tabbar></pub-tabbar>
  </div>
</template>

<script>
import OrderOrders from './components/Orders'
import PubTabbar from '@/components/tabbar'

export default {
  name: 'Order',
  components: {
    OrderOrders,
    PubTabbar
  }
}
</script>

<style>

</style>
