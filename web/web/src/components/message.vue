<template>
  <div class="message_all">
    <pub-headpic></pub-headpic>
    <div class="message_detail">
      <div class="message_title">个人资料</div>
      <p class="p">警告：用户信息只可修改这一次，一经修改不可更改，请谨慎填写</p>
      <group gutter="0" class="message_group">
        <x-input :required="true" title="身份证号" v-model="obj.idcard" placeholder="请输入身份证号" type="text"></x-input>
        <x-input :required="true" title="真实姓名" v-model="obj.name" placeholder="请输入真实姓名" is-type="china-name"></x-input>
        <x-input :required="true" title="支付宝" v-model="obj.alipay" placeholder="请输入支付宝" type="text"></x-input>
        <x-input :required="true" title="微信号" v-model="obj.wechat" placeholder="请输入微信号" type="text"></x-input>
        <x-input :required="true" title="银行名称" v-model="obj.bank" placeholder="请输入银行名称" type="text"></x-input>
        <x-input :required="true" title="银行账号" v-model="obj.bank_account" placeholder="请输入银行账号" type="text"></x-input>
        <x-input :required="true" title="二级密码" v-model="obj.pay_passwd" placeholder="您注册时候的二级密码" type="password"></x-input>
        <x-button action-type="submit" class="button" @click.native="HandleUser">提交</x-button>
      </group>
    </div>
    <pub-tabbar></pub-tabbar>
  </div>
</template>

<script>
import PubHeadpic from './pubheadpic'
import PubTabbar from './tabbar'
import { Group,XInput,XButton } from 'vux'
import { Upduser,Userquery } from '@/api/request/request'
import { checkVoid } from '@/api/utils'
export default {
  name: 'PubMessage',
  components: {
    PubHeadpic,
    PubTabbar,
    Group,
    XInput,
    XButton
  },
  data () {
    return {
      obj:{
        idcard:'',
        name:'',
        alipay:'',
        wechat:'',
        bank:'',
        bank_account:'',
        pay_passwd:''
      }
    }
  },
  computed: {
  },
  methods: {
    HandleUser() {
      if ( checkVoid(this.obj.idcard, '请输入身份证号!') ) {
        return
      }
      if ( checkVoid(this.obj.name, '请输入真实姓名!') ) {
        return
      }
      if ( checkVoid(this.obj.alipay, '请输入支付宝!') ) {
        return
      }
      if ( checkVoid(this.obj.wechat, '请输入微信!') ) {
        return
      }
      if ( checkVoid(this.obj.bank, '请输入银行名称!') ) {
        return
      }
      if ( checkVoid(this.obj.bank_account, '请输入银行账号!') ) {
        return
      }
      if ( checkVoid(this.obj.pay_passwd, '请输入二级密码!') ) {
        return
      }
      this.obj.pay_passwd = this.$md5(this.obj.pay_passwd)
      Upduser(this.obj,this.callBackUpduser)
    },
    callBackUpduser(res) {
      Userquery (this.callBackUserquery)
      this.$vux.alert.show({
        content: res.data.msg
      })
    },
    callBackUserquery(res) {
      this.obj = res.data.data
    }
  },
  mounted () {
    Userquery (this.callBackUserquery)
  }
}
</script>

<style lang="stylus" scoped>
  .message_all
    width:100%
    .message_detail
      border: 1px solid #2d9aff;
      border-radius: 0.1rem;
      margin: 0.2rem;
      margin-bottom: 1.5rem
      .message_title
        font-size: 0.3rem;
        color: #fff;
        padding: 0 0.2rem;
        line-height: 0.6rem;
        background: #2d9aff;
        border-radius: 0.05rem 0.05rem 0 0;
      .p
        color:red
        margin: .15rem
      .message_group
        .button
          width: 30%
          margin-bottom: .2rem
</style>
