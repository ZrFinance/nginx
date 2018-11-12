<template>
  <div class="pay_passwd_all">
    <pub-headpic></pub-headpic>
    <div class="pay_passwd_detail">
      <div class="pay_passwd_title">登录密码修改</div>
      <group gutter="0" class="pay_passwd_group">
        <x-input :required="true" title="原密码" v-model="obj.passwd" placeholder="请输入原密码" type="password"></x-input>
        <x-input :required="true" title="新登录密码" v-model="obj.new_passwd" placeholder="请输入新登录密码" type="password"></x-input>
        <x-input :required="true" title="确认新密码" v-model="obj.new_passwd1" placeholder="请输入新密码" type="password"></x-input>
        <x-button action-type="submit" class="button" @click.native="HandlePasswd">提交</x-button>
      </group>
    </div>
    <pub-tabbar></pub-tabbar>
  </div>
</template>

<script>
import PubHeadpic from './pubheadpic'
import PubTabbar from './tabbar'
import { Group,XInput,XButton } from 'vux'
import { Updpasswd } from '@/api/request/request'
import { checkVoid } from '@/api/utils'
export default {
  name: 'PubPaypasswd',
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
        passwd:'',
        new_passwd:'',
        new_passwd1:''
      },
      obj1:{}
    }
  },
  computed: {
  },
  methods: {
    HandlePasswd() {
      if ( checkVoid(this.obj.passwd, '请输入原密码!') ) {
        return
      }
      if ( checkVoid(this.obj.new_passwd, '请输入新二级密码!') ) {
        return
      }
      if ( checkVoid(this.obj.new_passwd1, '请输入确认二级密码!') ) {
        return
      }
      if ( this.obj.new_passwd !== this.obj.new_passwd1 ) {
        this.$vux.alert.show({
          content: '确认新密码有误！'
        })
        return
      }
      this.$set(this.obj1, 'passwd', this.$md5(this.obj.passwd));
      this.$set(this.obj1, 'new_passwd', this.$md5(this.obj.new_passwd));
      this.$set(this.obj1, 'new_passwd1', this.$md5(this.obj.new_passwd1));
      Updpasswd(this.obj1,this.callBackUpduser)
    },
    callBackUpduser(res) {
      this.$vux.alert.show({
        content: res.data.msg
      })
      this.$set(this.obj, 'passwd', '');
      this.$set(this.obj, 'new_passwd', '');
      this.$set(this.obj, 'new_passwd1', '');
    }
  },
  mounted () {
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
</style>
