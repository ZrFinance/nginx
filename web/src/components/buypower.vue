<template>
  <div class="pay_passwd_all">
    <pub-headpic></pub-headpic>
    <div class="pay_passwd_detail">
      <div class="pay_passwd_title">认筹权管理</div>
      <group gutter="0" class="pay_passwd_group">
        <x-input :required="true" title="可用认筹权" v-model="buypower" placeholder="请输入可用认筹权" type="text" :disabled="true"></x-input>
        <x-input :required="true" title="转账至" v-model="obj.username" placeholder="请输入对方账户" type="text"></x-input>
        <x-input :required="true" title="转账总额" v-model="obj.amount" placeholder="请输入转账数量" type="number"></x-input>
        <x-input :required="true" title="二级密码" v-model="pay_passwd" placeholder="请输入二级密码" type="password"></x-input>
        <x-button action-type="submit" class="button" @click.native="HandlePasswd">提交</x-button>
      </group>
      <div class="pay_passwd_detail1">
        <div class="pay_passwd_title1">认筹权转账记录</div>
        <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" :full-bordered="true">
          <thead>
            <tr style="background-color: #F7F7F7">
              <th>日期</th>
              <th>收入/支出</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.objlist" :key="item.id">
              <td>{{item.createtime}}</td>
              <td>{{item.amount}}</td>
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
import { Buypowerupd,Userquery,Tranlistbquery } from '@/api/request/request'
import { checkVoid,timestampToTime } from '@/api/utils'
export default {
  name: 'PubBypower',
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
      obj:{
        username:'',
        amount:'',
        pay_passwd:''
      },
      pay_passwd:'',
      buypower:'',
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
      Tranlistbquery({page_size:this.page_size,page:this.currentPage,flag:0},this.callBackTranlistbquery)
    },
    HandlePasswd() {
      if ( checkVoid(this.obj.username, '请输入对方账号!') ) {
        return
      }
      if ( checkVoid(this.obj.amount, '请输入转账金额!') ) {
        return
      }
      if ( checkVoid(this.pay_passwd, '请输入二级密码!') ) {
        return
      }
      this.$set(this.obj, 'pay_passwd', this.$md5(this.pay_passwd));
      Buypowerupd(this.obj,this.callBackUpduser)
    },
    callBackUpduser(res) {
      Userquery(this.callBackUpdquery)
      Tranlistbquery({page_size:this.page_size,page:this.currentPage,flag:0},this.callBackTranlistbquery)
      this.$vux.alert.show({
        content: res.data.msg
      })
      this.pay_passwd=''
      this.$set(this.obj, 'username', '');
      this.$set(this.obj, 'amount', '');
    },
    callBackUpdquery(res){
      this.buypower = res.data.data.buypower
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
    Userquery(this.callBackUpdquery)
    Tranlistbquery({page_size:this.page_size,page:this.currentPage,flag:0},this.callBackTranlistbquery)
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
