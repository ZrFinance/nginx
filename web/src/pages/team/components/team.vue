<template>
  <div class="team_all">
    <div class="team_title">我的团队</div>
    <div class="team_detail">
      <div class="tg_link">
        <p class="p">我的推广链接</p>
        <input class="input" type="text" v-model="this.url"></input>
        <button class="button" type="button"     
          v-clipboard:copy="this.url"
          v-clipboard:success="onCopy">复制
        </button>
        <div id="qrcode" class="qrcode1" ref="qrcode"></div>
        <p class="p1">一代会员：<span class="span">{{this.level1count}}</span>人</p>

        <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" :full-bordered="true">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th>账号</th>
              <th>注册时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.level1" :key="item.id">
              <td>{{item.mobile}}</td>
              <td>{{item.createtime}}</td>
              <td>{{item.status}}</td>
              <td @click="HandleActivation(item.mobile)">激活</td>
            </tr>
          </tbody>
        </x-table>

        <p class="p1">二代会员：<span class="span">{{this.level2count}}</span>人</p>

        <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" :full-bordered="true">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th>账号</th>
              <th>注册时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.level2" :key="item.id">
              <td>{{item.mobile}}</td>
              <td>{{item.createtime}}</td>
              <td>{{item.status}}</td>
              <td @click="HandleActivation">激活</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { TeamQuery,Activation } from '@/api/request/request'
import { timestampToTime } from '@/api/utils'
import { XTable } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'TeamtTeam',
  components: {
    QRCode,
    XTable
  },
  data () {
    return {
      level1count: '0',
      level2count: '0',
      level1:{},
      level2:{}
    }
  },
  computed: {
    ...mapState(['server_url', 'user']),
    url () {
      return this.server_url + '/' + this.user.username
    }
  },
  methods: {
    onCopy: function(e) {
      this.$vux.alert.show('复制成功')
    },
    qrcode () {
      let qrcode = new QRCode('qrcode', {  
          width: 180,
          height: 180,
          text: this.url
      })  
    },
    callBackTeamQuery(res) {
      this.level1count = res.data.data.level1count
      this.level2count = res.data.data.level2count
      this.level1 = res.data.data.level1
      for ( var item in this.level1) {
        this.$set(this.level1[item],'createtime',timestampToTime(this.level1[item].createtime))
      }
      this.level2 = res.data.data.level2
      for ( var item in this.level2) {
        this.$set(this.level2[item],'createtime',timestampToTime(this.level2[item].createtime))
      }
    },
    HandleActivation(mobile) {
      Activation({mobile:mobile},this.callBackActivation)
    },
    callBackActivation(res){
      TeamQuery(this.callBackTeamQuery)
      this.$vux.alert.show({
        content: res.data.msg
      })
    }
  },
  mounted () {
    this.$nextTick (function () {
       this.qrcode();
    })
    TeamQuery(this.callBackTeamQuery)
  }
}
</script>

<style lang="stylus" scoped>
  .team_all
    border: 1px solid #2d9aff;
    border-radius: 0.1rem;
    margin: 0.2rem;
    .team_title
      font-size: 0.3rem;
      color: #fff;
      padding: 0 0.2rem;
      line-height: 0.6rem;
      background: #2d9aff;
      border-radius: 0.05rem 0.05rem 0 0;
    .team_detail
      padding: 0.2rem;
      margin-bottom: .5rem
      .tg_link
        font-size: 0.27rem;
        color: #000;
        line-height: 0.7rem;
        text-align: center;
        margin-bottom: 0.3rem;
        .input
          width: 100%;
          display: inline-block;
          color: #999;
          overflow-x: hidden;
          height: 0.55rem;
          padding-left: 0.05rem;
          font-size: 12px;
          border: 1px solid #2d9aff;
          border-radius: 0.1rem;
          overflow-y: auto;
        .button
          margin-top: .1rem
          width: 1rem
        .qrcode1
          margin-top:.2rem
          margin-bottom: .3rem
          display: flex;
          justify-content: center;
          align-items: center;
        .p1
          font-size: 0.27rem;
          color: #000;
          line-height: 0.8rem;
          text-align: left;
          font-weight: 900
          .span
            font-size: 0.35rem;
            color: #2d9aff;
</style>
