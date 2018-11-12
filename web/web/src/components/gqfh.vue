<template>
  <div class="pay_passwd_all">
    <pub-headpic></pub-headpic>
    <div class="pay_passwd_detail">
      <div class="pay_passwd_title">股权分红</div>
      <div class="pay_passwd_detail1">
        <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" :full-bordered="true">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th>金额</th>
              <th>时间</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.objlist" :key="item.id">
              <td>{{item.amount}}</td>
              <td>{{item.createtime}}</td>
              <td>{{item.tranname}}</td>
            </tr>
          </tbody>
        </x-table>
        <el-pagination
          layout="prev, pager, next"
          :page-size="this.page_size"
          @current-change="current_change"
          :current-page.sync="nextpage"
          :pager-count="5"
          :total="this.count"> 
        </el-pagination>
      </div>
    </div>
    <pub-tabbar></pub-tabbar>
  </div>
</template>

<script>
import PubHeadpic from './pubheadpic'
import PubTabbar from './tabbar'
import { Group,XInput,XButton,XTable } from 'vux'
import { GqfhQuery } from '@/api/request/request'
import { timestampToTime } from '@/api/utils'
export default {
  components: {
    PubHeadpic,
    PubTabbar,
    Group,
    XInput,
    XButton,
    XTable
  },
  data () {
    return {
      objlist:[],
      count:0,
      currentPage:1,
      nextpage:0,
      page_size:10
    }
  },
  computed: {
  },
  methods: {
    current_change() {
      this.currentPage = this.nextpage
      Tranlistbquery({page_size:this.page_size,page:this.currentPage,flag:2},this.callBackTranlistbquery)
    },
    callBackTranlistbquery(res) {
      this.count = Number(res.headers.total)
      this.objlist = res.data.data
      for ( var item in this.objlist) {
        this.$set(this.objlist[item],'createtime',timestampToTime(this.objlist[item].createtime))
      }
    }
  },
  mounted () {
    GqfhQuery({page_size:this.page_size,page:this.currentPage},this.callBackTranlistbquery)
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
      .pay_passwd_detail1
        border: 1px solid #2d9aff;
        border-radius: 0.1rem;
        margin: 0.2rem;
        .pay_passwd_title1
          font-size: 0.3rem;
          color: #fff;
          padding: 0 0.2rem;
          line-height: 0.6rem;
          background: #2d9aff;
          border-radius: 0.05rem 0.05rem 0 0;
</style>
