<template>
  <div class="order_all">
    <div class="orders">
      <div class="order-tab">
        <ul class="ul">
          <li class="li" @click="HandleRc" :style="{'color':this.color1}">
            <img class="img" :src="img1"></img>
            <p class="p">认筹股权</p>
          </li>
          <li class="li" @click="HandleGf" :style="{'color':this.color2}">
            <img class="img" :src="img2"></img>
            <p class="p">股权分红</p>
          </li>
          <li class="li" @click="HandleWc" :style="{'color':this.color3}">
            <img class="img" :src="img3"></img>
            <p class="p">已完成</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="order_list">
      <ul class="ul" v-show='flag1'>
        <li class="li" v-for="item in this.obj" :key="item.ordercode">
          <p class="p">编号: {{item.ordercode}}</p>
          <p class="p">认筹股权: <span class="span">￥{{item.amount}}</span></p>
          <p class="p">匹配时间: {{item.createtime}}</p>
          <p class="p">收款对象: {{item.username_to}}</p>
          <p class="p">
            <span>状态:</span>
            <img class="img1" src="@/assets/img/icon-cuo.png"></img>
            <span :style="{'color':'red'}"> {{item.statusname}}</span>
          </p>
          <p class="p"
            v-show="item.status===1"
            @click="xqHandle(item)"
            :style="{'color':'#2d9aff'}">查看详情</p>
        </li>
      </ul>
      <ul class="ul" v-show='flag2'>
        <li class="li" v-for="item in this.obj" :key="item.ordercode">
          <p class="p">编号: {{item.ordercode}}</p>
          <p class="p">股权分红: <span class="span">￥{{item.amount}}</span></p>
          <p class="p">匹配时间: {{item.createtime}}</p>
          <p class="p">打款对象: {{item.username_to}}</p>
          <p class="p">
            <span>状态:</span>
            <img class="img1" src="@/assets/img/icon-cuo.png"></img>
            <span :style="{'color':'red'}"> {{item.statusname}}</span>
          </p>
          <p class="p"
            v-show="item.status===1"
            @click="xqHandle(item)"
            :style="{'color':'#2d9aff'}">查看详情</p>
        </li>
      </ul>
      <ul class="ul" v-show='flag3'>
        <li class="li" v-for="item in this.obj" :key="item.ordercode">
          <p class="p">编号: {{item.ordercode}}</p>
          <p class="p">{{item.istype}}: <span class="span">￥{{item.amount}}</span></p>
          <p class="p">匹配时间: {{item.createtime}}</p>
          <p class="p" v-show="item.trantype===1">打款对象: {{item.username1}}</p>
          <p class="p" v-show="item.trantype===0">收款对象: {{item.username2}}</p>
          <p class="p">
            <span>状态:</span>
            <img class="img1" src="@/assets/img/icon-dui.png"></img>
            <span :style="{'color':'red'}"> {{item.statusname}}</span>
          </p>
          <p class="p"
            v-show="item.status===1 || item.status===2"
            @click="xqHandle(item)"
            :style="{'color':'#2d9aff'}">查看详情</p>
        </li>
      </ul>
    </div>

    <div class="order_d">
      <x-dialog v-model="show" class="dialog-demo">
        <div class="img-box">
          <div class="pay_passwd_title1">订单信息</div>
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;" :full-bordered="true">
            <thead>
            </thead>
            <tbody>
              <tr>
                <td>交易进度</td>
                <td>{{this.type}}</td>
              </tr>
                <tr>
                <td>交易时间</td>
                <td>{{time}}</td>
              </tr>
                <tr>
                <td>付款金额</td>
                <td>{{amount}}</td>
              </tr>
                <tr>
                <td>{{this.name}}用户名</td>
                <td>{{obj_d.mobile}}</td>
              </tr>
              <tr>
                <td>{{this.name}}</td>
                <td>{{obj_d.name}}</td>
              </tr>
              <tr>
                <td>{{this.name}}号码</td>
                <td>{{obj_d.mobile}}</td>
              </tr>
              <tr>
                <td>{{this.name}}支付宝</td>
                <td>{{obj_d.alipay}}</td>
              </tr>
              <tr>
                <td>{{this.name}}微信</td>
                <td>{{obj_d.wechat}}</td>
              </tr>
              <tr>
                <td>{{this.name}}银行卡号</td>
                <td>{{obj_d.bank_account}}</td>
              </tr>
              <tr>
                <td>领导人手机</td>
                <td>{{obj_d.referee_name}}</td>
              </tr>
              <tr>
                <td colspan="2"
                :style="{'color':'red'}"
                v-show="this.obj_d.stime !== '00:00:00' && flag3!=true && this.obj_d.img===''">剩余打款时间：{{obj_d.stime}}之后未打款可投诉</td>
              </tr>
              <tr>
                <td colspan="2"
                :style="{'color':'red'}"
                v-show="flag2 && this.obj_d.stime === '00:00:00'">已过打款时间可投诉</td>
              </tr>
              <tr v-show="flag1===false">
                <td colspan="2"
                :style="{'color':'red'}">
                <p class="previewer-demo-img"
                  @click="imgshow(0)"
                  v-if="this.obj_d.img!==''">查看图片</p>
                <p v-else>未上传图片</p>
              </td>
              </tr>
              <tr v-show="flag1">
                <td colspan="2"
                :style="{'color':'red'}">
                <p class="previewer-demo-img"
                  @click="imgshow(0)"
                  v-if="f">查看图片</p>
                <p v-else>暂无图片,请上传图片</p>
                </td>
              </tr>
            </tbody>
          </x-table>
        </div>
        <div class="order_after">
          <div class="commit">
           <x-button action-type="submit" class="button" @click.native="HandlePasswd" :style="{'font-size': '.3rem'}"
           v-show="flag2 && this.obj_d.stime === '00:00:00'">投诉</x-button>
          </div>
          <div @click="confirm" class="close111">
           <x-button action-type="submit" class="button" 
           :style="{'font-size': '.3rem'}"
           v-show="flag2 && list[0].src!==''">确认</x-button>
          </div>
          <div @click="add" class="close111">
           <x-button action-type="submit" class="button" 
           :style="{'font-size': '.3rem'}"
           v-show="flag1 && list[0].src===''">上传图片</x-button>
           <input class="value" style="display:none" type="file" ref="file" accept="image/*" multiple="multiple" @change="getFile" />
          </div>
          <div @click="show=false" class="close111">
           <x-button action-type="submit" class="button" 
           :style="{'font-size': '.3rem'}">关闭</x-button>
          </div>
        </div>
      </x-dialog>
      <previewer :list="list" ref="previewer" :options="options" @on-close="open_detail"></previewer>
    </div>
  </div>
</template>

<script>
import { OrderQuery,OrderobjQuery,OrderobConfirm,upload } from '@/api/request/request'
import { timestampToTime } from '@/api/utils'
import { TransferDom,XDialog,Group,XInput,XButton,XTable,Previewer } from 'vux'
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
import store from '@/store'
export default {
  name: 'OrderOrders',
  components:{
    XDialog,
    Group,
    XInput,
    XButton,
    XTable,
    Previewer
  },
  data () {
    return {
      list: [{
        src: ''
      }],
      obj:{},
      img1: require("@/assets/img/icon-bf.png"),
      img2: require("@/assets/img/icon-tx.png"),
      img3: require("@/assets/img/icon-ywc.png"),
      color1: '#010101',
      color2: '#010101',
      color3: '#010101',
      flag1: true,
      flag2: false,
      flag3: false,
      show: false,
      obj_d:{},
      name:'',
      type:'',
      amount:'',
      time:'',
      simg:'',
      file:null,
      f:null,
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          return {x: thumbnail.clientLeft, y: thumbnail.clientTop + pageYScroll, w: thumbnail.clientWidth}
        }
      }
    }
  },
  computed: {
    ...mapState(['server_url'])
  },
  methods: {
    imgshow (index) {
      this.show=false
      this.$vux.loading.show({
        text: '加载图片中，请稍等...'
      })
      this.$refs.previewer.show(index)
      this.$vux.loading.hide()
    },
    open_detail(){
      this.show=true
      this.$refs.previewer.close()
    },
    add(){
      this.$refs.file.click()
      this.$refs.file.click()
    },
    getFile (event) {
      this.file = event.target.files[0]
      if (this.file.size / 1024 > 10000) {
        this.$vux.alert.show('图片过大不支持上传(10M以下)')
        return
      }
      const item = {
        name: this.file.name,
        size: this.file.size,
        file: this.file
      }
      this.imgPreview(this.file,item)
      this.f = item
    },
    imgPreview (file,item,callback) {

      if (!file || !window.FileReader) return;

      let self = this;
      let reader = new FileReader();
      reader.readAsDataURL(file)

      this.$set(item, 'src', this.result)

      reader.onloadend = function() {
        let result = this.result;
        let img = new Image();
        img.src = result;

        img.onload = function() {
          let data = self.compress(img,self);
          self.imgUrl = result;

          let blob = self.dataURItoBlob(data);

          var formData = new FormData();
          formData.append("file", blob);
          console.log(blob)
          formData.append('ordercode',self.obj_d.ordercode)

          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': store.state.authorization,
            }
          }
          self.$vux.loading.show({
            text: '上传图片中，请稍等...'
          })
          axios.post('/upload', formData, config).then( (res) => {
            if (res.status === 200 && res.data.rescode === '10000') {
              self.$set(self.list,0,{src:self.server_url+res.data.data.url})
              self.$vux.loading.hide()
            }else{
              self.$vux.alert.show('图片上传失败，请重试！')
              self.$vux.loading.hide()
            }
          })

        }
      }
    },
    compress(img,self) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      // console.log("*******压缩后的图片大小*******");
      // console.log(ndata)
      // console.log(ndata.length);
      return ndata;
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(base64Data.split(",")[1]);
      else byteString = unescape(base64Data.split(",")[1]);
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    confirm(){
      OrderobConfirm({ordercode:this.obj_d.ordercode},this.callBackOrderobConfirm)
    },
    callBackOrderobConfirm(res){
      this.$vux.alert.show({
        content: '已确认'
      })
      this.show=false
      if ( this.flag1 === true ){
        OrderQuery({trantype:0},this.callbackOrderQuery)
      }else if ( this.flag2 === true ){
        OrderQuery({trantype:1},this.callbackOrderQuery1)
      }else if ( this.flag3 === true ) {
        OrderQuery({trantype:2},this.callbackOrderQuery2)
      }
    },
    xqHandle(item){
      OrderobjQuery({ordercode:item.ordercode},this.callbackOrderobjQuery)
      if (item.trantype === 0 ){
        this.name='收款人'
      }else if(item.trantype === 1){
        this.name='付款人'
      }
      this.amount=item.amount
      this.time=item.updtime
      this.show=true
    },
    callbackOrderobjQuery(res){
      this.obj_d=res.data.data
      if (this.obj_d.img!==''){
        this.$set(this.list,0,{src:this.server_url+this.obj_d.img})
        this.f = true
      }
      if (this.obj_d.status === 1 && this.flag1===true && this.obj_d.img!=''){
        this.type='已打款'
      }else if (this.obj_d.status === 1 && this.flag1===true){
        this.type="待打款"
      }else if (this.obj_d.status === 1 && this.flag2===true && this.obj_d.img!=''){
        this.type='对方已打款,待确认'
      }else if(this.obj_d.status === 1 && this.flag2===true){
        this.type="等待对方待打款"
      }else if(this.obj_d.status === 2) {
        this.type="已完成"
      }
    },
    callbackOrderQuery(res) {
      this.obj = res.data.data
      for ( var item in this.obj) {
        if ( this.obj[item].status === 0) {
          this.$set(this.obj[item],'statusname','未匹配')
        }else if ( this.obj[item].status === 1 && this.obj[item].img!=='') {
          this.$set(this.obj[item],'statusname','匹配成功,对方待确认')  
        }else if ( this.obj[item].status === 1) {
          this.$set(this.obj[item],'statusname','匹配成功,待打款')        
        }
        this.$set(this.obj[item],'updtime',timestampToTime(this.obj[item].updtime))
        this.$set(this.obj[item],'createtime',timestampToTime(this.obj[item].createtime))
      }
    },
    callbackOrderQuery1(res) {
      this.obj = res.data.data
      for ( var item in this.obj) {
        if ( this.obj[item].status === 0) {
          this.$set(this.obj[item],'statusname','未匹配')
        }else if ( this.obj[item].status === 1 && this.obj[item].img!=='') {
          this.$set(this.obj[item],'statusname','匹配成功,对方已打款')  
        }else if ( this.obj[item].status === 1 ) {
          this.$set(this.obj[item],'statusname','匹配成功,待打款')  
        }

        this.$set(this.obj[item],'updtime',timestampToTime(this.obj[item].updtime))
        this.$set(this.obj[item],'createtime',timestampToTime(this.obj[item].createtime))
      }
    },
    callbackOrderQuery2(res) {
      this.obj = res.data.data
      for ( var item in this.obj) {
        this.$set(this.obj[item],'statusname','已完成')
        this.$set(this.obj[item],'updtime',timestampToTime(this.obj[item].updtime))

        this.$set(this.obj[item],'createtime',timestampToTime(this.obj[item].createtime))

        if (this.obj[item].trantype === 0){
          this.$set(this.obj[item],'istype','认筹股权')
        }else{
          this.$set(this.obj[item],'istype','股权分红')
        }
      }
    },
    HandleRc() {
      OrderQuery({trantype:0},this.callbackOrderQuery)
      this.img1 = require("@/assets/img/icon-bf-active.png")
      this.img2 = require("@/assets/img/icon-tx.png")
      this.img3 = require("@/assets/img/icon-ywc.png")
      this.color1 = '#2d9aff'
      this.color2 = '#010101'
      this.color3 = '#010101'
      this.flag1 = true
      this.flag2 = false
      this.flag3 = false
    },
    HandleGf() {
      OrderQuery({trantype:1},this.callbackOrderQuery1)
      this.img1 = require("@/assets/img/icon-bf.png")
      this.img2 = require("@/assets/img/icon-tx-active.png")
      this.img3 = require("@/assets/img/icon-ywc.png")
      this.color1 = '#010101'
      this.color2 = '#2d9aff'
      this.color3 = '#010101'
      this.flag1 = false
      this.flag2 = true
      this.flag3 = false
    },
    HandleWc() {
      OrderQuery({trantype:2,status:1},this.callbackOrderQuery2)
      this.img1 = require("@/assets/img/icon-bf.png")
      this.img2 = require("@/assets/img/icon-tx.png")
      this.img3 = require("@/assets/img/icon-ywc-active.png")
      this.color1 = '#010101'
      this.color2 = '#010101'
      this.color3 = '#2d9aff'
      this.flag1 = false
      this.flag2 = false
      this.flag3 = true
    },   
  },
  mounted () {
    this.HandleRc()
  }
}
</script>

<style lang="stylus" scoped>
  .order_all
    width:100%
    .orders
      margin: 0.2rem;
      .order-tab
        width: 100%;
        .ul
          background: #f0f0f0;
          border-radius: 0.1rem;
          display:flex
          .li
            width: 33.33%;
            text-align: center;
            font-size: 0.28rem;
            height: 0.9rem;
            line-height: 0.9rem;
            display:flex
            align-items: center;
            justify-content: center;
            .img
              height: 0.4rem;
              width: 0.5rem;
              margin-left:10%
            .p
              margin-left:5%
    .order_list
      margin: 0.2rem
      margin-bottom: 1.3rem
      .ul
        list-style: none;
        border-radius: 0.1rem;
        margin-top: 0.2rem;
        border-radius: 0.1rem;
        .li
          background: #f0f0f0;
          margin-bottom: .2rem
          padding: 0 0.1rem;
          margin-top: 0.2rem;
          border-radius: 0.1rem;
          .p
            height: 0.7rem;
            line-height: 0.7rem;
            font-size: 0.27rem;
            color: #4b4b4b;
            padding: 0 0.2rem;
            margin-bottom: 0;
            border-bottom: 1px solid #e6e6e6;
            .span
              color: #2d9aff;
            .img1
              height: 0.4rem;
              margin-left: 0.1rem
    .order_d
      .dialog-demo
        font-size: 0.22rem;
        .img-box
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
        .close111
          .vux-close
            margin-top: 8px;
            margin-bottom: 8px;
        .order_after
          display: flex
          margin: .1rem
          align-items: center;
          justify-content: center;
          .close111
            margin-left:.2rem

</style>
