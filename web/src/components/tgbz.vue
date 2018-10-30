<template>
  <div class="pay_passwd_all">
    <pub-headpic></pub-headpic>
    <div class="pay_passwd_detail">
      <div class="pay_passwd_title">提供帮助</div>
      <group gutter="0" class="pay_passwd_group">
        <selector ref="amount" title="投资金额" :options="list" v-model="obj.amount"></selector>
        <x-input :required="true" title="需要认筹权" v-model="flag" type="text" :disabled="true"></x-input>
        <x-input :required="true" title="二级密码" v-model="pay_passwd" placeholder="请输入二级密码" type="password"></x-input>
        <x-button action-type="submit" class="button" @click.native="sqbzcommit">申请帮助</x-button>
      </group>
    </div>
    <pub-tabbar></pub-tabbar>
  </div>
</template>

<script>
import PubHeadpic from './pubheadpic'
import PubTabbar from './tabbar'
import { Group,XInput,XButton,Selector,Checker,CheckerItem } from 'vux'
import { TgbzlimitQuery,TgbzHandle1 } from '@/api/request/request'
import { checkVoid } from '@/api/utils'
export default {
  components: {
    PubHeadpic,
    PubTabbar,
    Group,
    XInput,
    XButton,
    Selector,
    Checker,
    CheckerItem
  },
  data () {
    return {
      obj:{
        amount:0
      },
      pay_passwd:'',
      list:[],
      flag:'投资额的2%'
    }
  },
  computed: {
  },
  methods: {
    callBackUpdquery(res){
      this.list=res.data.data
      this.obj.amount=this.list[0].key
    },
    sqbzcommit() {
      this.$set(this.obj, 'pay_passwd', this.$md5(this.pay_passwd));
      TgbzHandle1(this.obj)
      this.pay_passwd=''
    }
  },
  mounted () {
    TgbzlimitQuery({},this.callBackUpdquery)
  }
}
</script>

<style lang="stylus" scoped>
  .pay_passwd_all
    width:100%
    .pay_passwd_detail
      border: 1px solid #2d9aff;
      border-radius: 0.1rem;
      margin: 0.2rem;
      margin-bottom: 1.5rem
      .pay_passwd_title
        font-size: 0.3rem;
        color: #fff;
        padding: 0 0.2rem;
        line-height: 0.6rem;
        background: #2d9aff;
        border-radius: 0.05rem 0.05rem 0 0;
      .pay_passwd_group
        .button
          width: 30%
          margin-bottom: .2rem
        .p
          text-align: center;
          font-size: .26rem
          color:red
          margin-bottom: .1rem
</style>

