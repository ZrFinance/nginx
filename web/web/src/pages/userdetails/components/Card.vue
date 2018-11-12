<template>
  <div class="all">
    <card class="card1">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          股份分红
          <br/>
          <span>{{this.obj.bonus}}</span>
        </div>
        <div class="vux-1px-r">
          推广股权/冻结
          <br/>
          <span>{{this.obj.spread}}/{{this.obj.spreadstop}}</span>
        </div>
        <div class="vux-1px-r">
          认筹权
          <br/>
          <span>{{this.obj.buypower}}</span>
        </div>
        <div>
          激活码/VIP分
          <br/>
          <span>{{this.obj.activation}}/{{this.obj.integral}}</span>
        </div>
      </div>
    </card>
    <group class="card2">
      <cell title="个人资料" is-link link="/message">
        <img slot="icon" width="20" style="display:block;margin-right:.3rem;" src="@/assets/img/icon-m-grzl.png">
      </cell>
      <cell title="安全密码修改" is-link link="/pay_passwd">
        <img slot="icon" width="20" style="display:block;margin-right:.3rem;" src="@/assets/img/icon-m-aqmmxg.png">
      </cell>
      <cell title="登录密码修改" is-link link="/passwd">
        <img slot="icon" width="20" style="display:block;margin-right:.3rem;" src="@/assets/img/icon-m-dlmmxg.png">
      </cell>
      <cell title="转让认筹权" is-link link="/buypower">
        <img slot="icon" width="20" style="display:block;margin-right:.3rem;" src="@/assets/img/icon-m-zrrggq.png">
      </cell>
      <cell title="转让激活码" is-link link="/activation">
        <img slot="icon" width="20" style="display:block;margin-right:.3rem;" src="@/assets/img/icon-m-zrjhm.png">
      </cell>
      <cell title="会员注册" is-link :link="'/register/'+this.user.username">
        <img slot="icon" width="20" style="display:block;margin-right:.3rem;" src="@/assets/img/icon-m-register.png">
      </cell>
      <cell title="联系客服" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:.3rem;" src="@/assets/img/icon-m-lxkf.png">
      </cell>
      <cell title="退出登录" is-link link="/">
        <img slot="icon" width="20" style="display:block;margin-right:.3rem;" src="@/assets/img/icon-m-tcdl.png">
      </cell>
    </group>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import { Card,Cell,Group,XInput } from 'vux'
import { Userquery } from '@/api/request/request'
export default {
  name: 'DetailsCard',
  components: {
    Card,
    Cell,
    Group
  },
  data () {
    return {
      obj:{}
    }
  },
  methods: {
    ...mapMutations(['handleAuthorization']),
    callBackBalquery(res) {
      this.obj = res.data.data
    }
  },
  computed: {
    ...mapState(['init_data','user'])
  },
  mounted () {
    Userquery(this.callBackBalquery)
  }
}
</script>

<style lang="stylus" scoped>
  .all
    width:100%
</style>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: .28rem; 
  }
  .card-demo-flex span {
    color: #f74c31;
  }
  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card1 {
    margin-bottom: 0rem;
  }
</style>

<style lang="stylus" scoped>
  .all
    .card1
      margin-bottom: 0rem
    .card2
      margin-bottom: 2rem
</style>
