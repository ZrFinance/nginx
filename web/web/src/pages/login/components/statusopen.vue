<template>
  <div
    class="login" 
    :style="{
      'height':this.init_data.screenHeight,
      'width':this.init_data.screenWidth,
      'background-image': 'url(' + login_pg + ')'}">
    <div class="user">
      <div class="user1">
        <img class="img" src="@/assets/img/logo.png">
        <div class="user2">
          <div class="user-group">
            <img class="img" src="@/assets/img/icon-form-user.png">
            <input class="input" type="text" placeholder="请输入手机号" v-model="mobile">
          </div>
          <div class="vercode">
            <input class="input" type="text" value style="width: 60%" placeholder="请输入手机验证码" v-model="smscode">
            <div
            class="button"
            @click='smscodeHandle' v-show="show">
            发送短信
            </div>
            <div v-show="!show" class="button">
            {{count}} s
            </div>
          </div>
        </div>
        <div class="user3">
          <input class="input" type="submit" value="提交" @click="Register">
          <ul class="ul">
            <li class="li1" @click=Handlelogin>登录</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getSmsCode, statusopen } from '@/api/request/request'
import { checkVoid } from '@/api/utils'
export default {
  name: 'LoginStatusopen',
  data () {
    return {
      screenWidth: '',
      screenHeight: '',
      show: true,
      count: '',
      timer: null,
      mobile: '',
      passwd: '',
      paypasswd: '',
      mobile1:'',
      smscode: '',
      user1: {
        username: ''
      },
      login_pg: require('@/assets/img/login-bg.jpg')
    }
  },
  computed: {
    ...mapState(['server_url', 'init_data'])
  },
  methods: {
    ...mapMutations(['handleAuthorization','handleUser']),
    Handlelogin: function (){
      this.$router.push('/')
    },
    //申请解冻
    Register: function () {
      if ( checkVoid(this.mobile, '请输入手机号!') ) {
        return
      }
      if ( checkVoid(this.smscode, '请输入手机验证码!') ) {
        return
      }

      statusopen({
        mobile: this.mobile,
        verification_code: this.smscode
      }, this.callbackRegister)
    },
    //注册后回调函数
    callbackRegister: function (res) {
      this.$router.push('/')
    },
    //获取手机验证码
    smscodeHandle: function () {
      if ( checkVoid(this.mobile, '请输入手机号!') ) {
        return
      }
      getSmsCode({mobile:this.mobile})

      //验证码读秒处理
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  .login
    background-size:100% 100%
    .user
      height: 100%;
      width: 100%
      margin:0 auto;
      position:relative;
      .user1
        position: absolute;
        left:50%;
        top:30%;
        margin-left: -35%
        margin-top:-50%
        .img
          max-width: 40%;
          margin: 0 auto;
          display:block
        .user2
          width: 100%;
          height: 70%
          background: rgba(255,255,255,.4);
          border-radius: 0.2rem;
          padding: 0.5rem 0 0.1rem;
          margin-top: 3%;
          .user-group
            width: 85%;
            margin: 0 auto;
            height: 25%
            position: relative;
            margin-bottom: 0.4rem;
            .img
              position: absolute;
              left: 0.2rem;
              top: 0.25rem;
              height: 0.4rem;
            .input
              width: 80%;
              display: block;
              height: 0.9rem;
              border: none;
              font-size: 0.3rem;
              border-radius: 0.1rem;
              padding-left: 0.8rem;
              color: #666;
          .vercode
            width: 85%;
            margin: 0 auto;
            height: 25%
            position: relative;
            margin-bottom: 0.4rem;
            display: flex;
            .input
              width: 80%;
              display: block;
              height: 0.9rem;
              border: none;
              font-size: 0.3rem;
              border-radius: 0.1rem;
              color: #666;
            .img
              width: 100%;
              height: 0.9rem;
              position: absolute;
              right: -65%;
              top: 0.01rem;
              left: 0.2rem;
              border: 0 none;
              vertical-align: middle;
            .button
              background-color: #fe7327;
              font-size: .24rem;
              color: #fff;
              width: 30%;
              height: 0.9rem;
              border: .02rem solid #fe7327;
              position: absolute;
              top: 0.01rem;
              left: 65%;
              border: 0 none;
              vertical-align: middle;
              border-radius: .32rem;
              text-align: center;
              line-height: .9rem;
        .user3
          width:100%
          .input
            display: block;
            width: 100%;
            margin: .4rem auto;
            padding-left: 0;
            height: 0.9rem;
            border: none;
            background: #ff4e4e;
            font-size: 0.35rem;
            text-align: center;
            border-radius: 0.5rem;
            color: #fff;
          .ul
            list-style: none;
            display: flex;
            width: 100%
            .li1
              color: white
            .li2
              color: white
              margin-left:25%
            .li3
              color: white
              margin-left: 5%
</style>
