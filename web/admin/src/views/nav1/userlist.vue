<template>
  <section>

    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item >
          <el-input v-model="filters.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="ByusernameQuery">查询</el-button>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="BynameQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table 
      :data="userlist" 
      highlight-current-row 
      v-loading="listLoading" 
      style="width: 100%;"
      :border="true"
      :fit="true"
      max-height="500">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="userid" label="编号" width="100" sortable align="center">   
      </el-table-column>   
      <el-table-column prop="mobile" label="账号" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="mobile" label="手机" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="referee_name" label="推荐人" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="spread" label="推广股权" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="bonus" label="股权分红" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="activation" label="激活码" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="buypower" label="认筹权" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="integral" label="VIP分" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="createtime" label="注册时间" width="200" sortable align="center">
      </el-table-column>
      <el-table-column prop="endtime" label="最后认筹" width="200" sortable align="center">
      </el-table-column>
      <el-table-column prop="statusname" label="状态" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="blockcount" label="被封次数" width="150" sortable align="center">
      </el-table-column>
      <el-table-column 
        label="操作"
        width="180"
        align="center"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="AmountSendEdit(scope.row)">系统赠送</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-col :span="24" class="toolbar">
      <el-pagination 
      layout="prev, pager, next"
      background="true"
      @current-change="handleCurrentChange"
      :page-size="20"
      :total="total"
      :pager-count="5"
      style="float:right;">
      </el-pagination>
    </el-col>

    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="editForm.username"
            auto-complete="off"
            :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="editForm.status">
            <el-radio class="radio" label="0">正常</el-radio>
            <el-radio class="radio" label="1">未激活</el-radio>
            <el-radio class="radio" label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付宝" prop="alipay">
          <el-input 
            v-model="editForm.alipay"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input 
            v-model="editForm.wechat"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="户名" prop="name">
          <el-input 
            v-model="editForm.name"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="bank">
          <el-input 
            v-model="editForm.bank"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bank_account">
          <el-input 
            v-model="editForm.bank_account"
            auto-complete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="系统赠送" v-model="AmountSendVisible" :close-on-click-modal="false">
      <el-form :model="AmountSend" label-width="80px" :rules="AmountSendRules" ref="AmountSend">
        <el-form-item label="赠送类型" prop="type">
          <el-radio-group v-model="AmountSend.type">
            <el-radio class="radio" :label="7">股权分红</el-radio>
            <el-radio class="radio" :label="8">推广股权</el-radio>
            <el-radio class="radio" :label="15">激活码</el-radio>
            <el-radio class="radio" :label="16">认筹权</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input
            v-model="AmountSend.amount"
            auto-complete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="AmountSendVisible = false">取消</el-button>
        <el-button type="primary" @click.native="AmountSendSubmit" :loading="AmountSendLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { requestUserQuery,requestUserUpd,requestAmountSend } from '@/api/request/request';
import { timestampToTime } from '@/api/utils'
export default {
  data() {
    return {
      filters: {
        username: '',
        name: ''
      },
      userlist: [],
      listLoading: false,
      total:0,
      page:1,
      AmountSendVisible: false,
      AmountSendLoading: false,
      AmountSendRules: {
        type: [
          { type:'number', required: true, message: '请选择赠送类型', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ]
      },
      AmountSend: {
        type: 7,
        amount: 0,
        userid:''
      },
      editFormVisible: false,      
      editLoading: false,
      editFormRules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        alipay: [
          { required: false, message: '请输入支付宝', trigger: 'blur' }
        ],
        wechat: [
          { required: false, message: '请输入微信', trigger: 'blur' }
        ],
        bank: [
          { required: false, message: '请输入开户行', trigger: 'blur' }
        ],
        bank_account: [
          { required: false, message: '请输入银行卡号', trigger: 'blur' }
        ],
        name: [
          { required: false, message: '请输入户名', trigger: 'blur' }
        ]
      },
      //编辑界面数据
      editForm: {},
      editForm1: {}
    }
  },
  methods: {
    handleCurrentChange(val) {
        this.page = val;
        requestUserQuery({page:this.page,name:this.filters.name,username:this.filters.username},this.callBackrequestUserQuery)
    },
    callBackrequestUserQuery(res){
      this.userlist = res.data.data
      for ( var item in this.userlist) {
        this.$set(this.userlist[item],'createtime',timestampToTime(this.userlist[item].createtime))
        if ( this.userlist[item].endtime !== '' ){
          this.$set(this.userlist[item],'endtime',timestampToTime(this.userlist[item].endtime))
        }
      }
      this.total = Number(res.headers.total)
    },
    handleDel(){

    },
    handleEdit: function (row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      this.$set(this.editForm,'status',this.editForm.status+'')
    },
    AmountSendEdit: function (row) {
      this.AmountSendVisible = true;
      let tmp = Object.assign({}, row);
      this.AmountSend.userid = tmp.userid
    },
    callBackrequestUserUpd(res){
      this.editLoading = false;
      this.$refs['editForm'].resetFields();
      this.editFormVisible = false;
      requestUserQuery({},this.callBackrequestUserQuery)
    },
    callBackrequestUserUpdError(res){
      this.editLoading = false;
    },
    editSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            this.$set(this.editForm1,'username',this.editForm.username)
            this.$set(this.editForm1,'status',this.editForm.status)
            this.$set(this.editForm1,'alipay',this.editForm.alipay)
            this.$set(this.editForm1,'wechat',this.editForm.wechat)
            this.$set(this.editForm1,'name',this.editForm.wechat)
            this.$set(this.editForm1,'bank',this.editForm.bank)
            this.$set(this.editForm1,'bank_account',this.editForm.bank_account)
            this.$set(this.editForm1,'mobile',this.editForm.mobile)
            this.$set(this.editForm1,'userid',this.editForm.userid)
            requestUserUpd(this.editForm1,this.callBackrequestUserUpd,this.callBackrequestUserUpdError)
          })
        }
      })
    },
    callBackrequestAmountSend(res){
      this.AmountSendLoading = false;
      this.$refs['AmountSend'].resetFields();
      this.AmountSendVisible = false;
      requestUserQuery({},this.callBackrequestUserQuery)
    },
    callBackrequestAmountSendError(res){
      this.AmountSendVisible = true;
    },
    AmountSendSubmit() {
      this.$refs.AmountSend.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.AmountSendLoading = true;
            requestAmountSend(this.AmountSend,this.callBackrequestAmountSend,this.callBackrequestAmountSendError)
          })
        }
      })
    },
    ByusernameQuery(){
      requestUserQuery({username:this.filters.username},this.callBackrequestUserQuery)
    },
    BynameQuery(){
      requestUserQuery({name:this.filters.name},this.callBackrequestUserQuery)
    }
  },
  mounted() {
    requestUserQuery({},this.callBackrequestUserQuery)
  }
}

</script>

<style scope>

</style>