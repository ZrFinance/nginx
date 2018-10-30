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
            <input class="input" type="text" placeholder="请输入手机号/用户名" v-model="mobile">
          </div>
          <div class="user-group">
            <img class="img" src="@/assets/img/icon-form-pwd.png">
            <input class="input" type="password" placeholder="请输入密码" v-model="passwd">
          </div>
          <div v-show="false" class="vercode">
            <input class="input" type="text" value style="width: 60%" placeholder="请输入图形验证码" maxlength="13">
            <img class="img" src="">
          </div>
        </div>
        <div class="user3">
          <input class="input" type="submit" value="立即登录" @click=HandleLogin>
          <ul class="ul">
            <li class="li1" @click=HandleRegister>申请注册</li>
            <li class="li2" @click=Handlestatusopen>申请解冻</li>
            <li class="li3" @click="resetpasswd">忘记密码?</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPicVercode, login } from '@/api/request/request'
import { mapState, mapMutations } from 'vuex'
import { checkVoid } from '@/api/utils'
import { XInput,Group } from 'vux'
export default {
  name: 'LoginLogin',
  components: {
    Group,
    XInput
  },
  data () {
    return {
      screenWidth: '',
      screenHeight: '',
      mobile: '',
      passwd: '',
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
    resetpasswd() {
      this.$router.push('/resetpasswd')
    },
    Handlestatusopen(){
      this.$router.push('/statusopen')
    },
    ...mapMutations(['handleAuthorization','handleUser']),
    HandleRegister: function () {
      this.$router.push('/register/0')
    },
    HandleLogin: function () {
      if ( checkVoid(this.mobile, '请输入手机号!') ) {
        return
      }
      if ( checkVoid(this.passwd, '请输入密码!') ) {
        return
      }
      login({
        mobile: this.mobile, 
        passwd: this.$md5(this.passwd)
      },this.callbackHandleLogin)
    },
    callbackHandleLogin (res) {
      this.handleAuthorization(res.headers.authorization)
      this.user1.username = res.data.data.username
      this.handleUser(this.user1)
      this.$router.push('/home')
    }
  },
  mounted () {
      localStorage.authorization=''
      localStorage.username=''
      this.handleAuthorization('')
      this.handleUser({username:''})
      this.$router.push('/')
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
        top:35%;
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
