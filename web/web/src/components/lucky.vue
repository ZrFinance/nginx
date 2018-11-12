<template>
  <div>
    <div class="container">
        <div class="lucky-wheel">
            <div class="lucky-title"></div>
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                     <div class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
                </div>               
                <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">                   
                    <div class="prize-list">
                        <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                            <div class="prize-pic">
                                <img :src="item.icon">
                            </div>
                            <div class="prize-count" v-if="item.count">
                                {{item.count}}
                            </div>
                            <div class="prize-type">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="main-bg"></div>
            <div class="bg-p"></div>
            <div class="content">
                <div class="lottery_ticket1"
                @click="HandlexsLuckylist" v-show="xsrc_flag">新手认筹</div>
                <div class="lottery_ticket" @click="HandleLuckylist">点击查看抽奖记录</div>
            </div>
            <div v-show="false" class="tip">
                <div class="tip-title">活动规则</div>
                <div class="tip-content">
                    <p> 1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废。 2.金币抽奖，每10个金豆可兑换一次大转盘机会。</p>
                    <p> 2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会</p>
                    <p> 3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品</p>
                </div>
            </div>
        </div>
        <div class="toast" v-show="toast_control">
            <div class="toast-container">
                <img :src="toast_pictrue" class="toast-picture">
                <div class="close" @click="close_toast()"></div>
                <div class="toast-title">
                    {{toast_title}}
                </div>
                <div v-if="btn_flag == false" class="toast-btn">
                    <div class="toast-cancel"  @click="close_toast">取消</div>
                </div>
                <div v-else class="toast-btn1">
                    <div class="toast-commit"  @click="commit_toast">确认</div>
                    <div class="toast-cancel"  @click="close_toast">取消</div>
                </div>
            </div>
        </div>
        <div class="toast-mask" v-show="toast_control"></div>
    </div>
    <pub-tabbar></pub-tabbar>
  </div>
</template>
<script>
import { getLuckyIndex, ClickLucky,XsrcQuery } from '@/api/request/request'
import PubTabbar from '@/components/tabbar'
export default {
  name: 'PubLucky',
  components: {
    PubTabbar
  },
  data() {
    return {
      easejoy_bean: 0, //金豆
      lottery_ticket: 0, //抽奖次数
      prize_list: [
        {
          icon: require("../assets/img/give_up.png"),
          count: 0,
          name: "再来一次",
          isPrize: 0
        },
        {
          icon: require("../assets/img/bean_500.png"),
          count: 1000,
          name: "",
          isPrize: 1
        },
        {
          icon: require("../assets/img/give_up.png"),
          count: 0,
          name: "再来一次",
          isPrize: 0
        },
        {
          icon: require("../assets/img/bean_500.png"),
          count: 5000,
          name: "",
          isPrize: 1
        },
        {
          icon: require("../assets/img/give_up.png"),
          count: 0,
          name: "再来一次",
          isPrize: 0
        },
        {
          icon: require("../assets/img/bean_500.png"),
          count: 2000,
          name: "",
          isPrize: 1
        },
        {
          icon: require("../assets/img/give_up.png"),
          count: 0,
          name: "再来一次",
          isPrize: 0
        },
        {
          icon: require("../assets/img/bean_500.png"),
          count: 10000,
          name: "",
          isPrize: 1
        }
      ], //奖品列表
      toast_control: false, //抽奖结果弹出框控制器
      hasPrize: false, //是否中奖
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      start_rotating_degree_pointer: 0, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      click_flag: true, //是否可以旋转抽奖
      index: 0,
      btn_flag: false,
      xsrc_flag: false
    };
  },
  computed: {
    toast_title() {
      return this.hasPrize
        ? "恭喜您，获得" +this.prize_list[this.index].count + ' ' + this.prize_list[this.index].name
        : "未中奖";
    },
    toast_pictrue() {
      return this.hasPrize
        ? require("../assets/img/congratulation.png")
        : require("../assets/img/sorry.png");
    }
  },
  created() {
    this.init_prize_list();
    getLuckyIndex({flag:0},this.callbackgetLuckyIndex,this.callbackerrorgetLuckyIndex) //指定每次旋转到的奖品下标
    XsrcQuery(this.callBackXsrcQuery)
  },
  methods: {
    HandlexsLuckylist(){
      this.$router.push('/xsrc')
    },
    callBackXsrcQuery(res){
      if (res.data.data.flag === 2){
        this.xsrc_flag = true
      }
    },
    callbackerrorgetLuckyIndex(res){
      this.click_flag=false
    },
    callbackgetLuckyIndex(res) {
      this.index = res.data.data.index
      this.click_flag=true
    },
    //此方法为处理奖品数据
    init_prize_list(list) {},
    rotate_handle() {
      this.rotating();
    },
    rotating() {
      if (!this.click_flag) return;
      var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var during_time = 5; // 默认为1s
      var random = Math.floor(Math.random() * 7);
      var result_index = this.index ; // 最终要旋转到哪一块，对应prize_list的下标
      var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
      var rand_circle = 6; // 附加多转几圈，2-3
      this.click_flag = false; // 旋转结束前，不允许再次触发
      if (type == 0) {
        // 转动盘子
        var rotate_angle =
          this.start_rotating_degree +
          rand_circle * 360 +
          result_angle[result_index] -
          this.start_rotating_degree % 360;
        this.start_rotating_degree = rotate_angle;
        this.rotate_angle = "rotate(" + rotate_angle + "deg)";
        var that = this;
        // 旋转结束后，允许再次触发
        setTimeout(function() {
          that.click_flag = true;
          that.game_over();
        }, during_time * 1000 + 1500); // 延时，保证转盘转完
      } else {
        //
      }
    },
    game_over() {
      this.toast_control = true;
      this.hasPrize = this.prize_list[this.index].isPrize
      if ( this.hasPrize ) {
        this.btn_flag = true
      }else{
        this.btn_flag = false
      }
    },
    //关闭弹窗
    close_toast() {
      this.toast_control = false;
      getLuckyIndex({flag:0},this.callbackgetLuckyIndex,this.callbackerrorgetLuckyIndex) //指定每次旋转到的奖品下标
    },
    commit_toast() {
      this.toast_control = false;
      ClickLucky({},this.callbackgetLuckyIndex)
    },
    HandleLuckylist() {
      this.$router.push('/luckylist')
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
}
.lucky-wheel {
  width: 100%;
  height: 10.5625rem;
  background: rgb(252, 207, 133) url("../assets/img/color_pillar.png") no-repeat
    center bottom;
  background-size: 100%;
  padding-top: .5625rem;
}
.lucky-title {
  width: 100%;
  height: 2.125rem;
  background: url("../assets/img/lucky_title.png") no-repeat center top;
  background-size: 100%;
}
.wheel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.wheel-bg {
  width: 5.4375rem;
  height: 5.4375rem;
  background: url("../assets/img/draw_wheel.png") no-repeat center top;
  background-size: 100%;
  color: #fff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: transform 3s ease;
}
.wheel-pointer-box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -60%);
  width: 1.3125rem;
  height: 1.3125rem;
}
.wheel-pointer {
  width: 1.3125rem;
  height: 1.3125rem;
  background: url("../assets/img/draw_btn.png") no-repeat center top;
  background-size: 100%;
  transform-origin: center 60%;
}
.wheel-bg div {
  text-align: center;
}
.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.prize-list .prize-item:first-child {
  top: -.9rem;
  left: 3rem;
  transform: rotate(20deg);
}
.prize-list .prize-item:nth-child(2) {
  top: .9rem;
  left: 4.9rem;
  transform: rotate(67deg);
}
.prize-list .prize-item:nth-child(3) {
  top: 3.4rem;
  left: 4.9rem;
  transform: rotate(-250deg);
}
.prize-list .prize-item:nth-child(4) {
  top: 5.3rem;
  left: 3.3rem;
  transform: rotate(-210deg);
}
.prize-list .prize-item:nth-child(5) {
  top: 5.4rem;
  left: .5rem;
  transform: rotate(-160deg);
}
.prize-list .prize-item:nth-child(6) {
  top: 3.4875rem;
  left: -1.4rem;
  transform: rotate(-111deg);
}
.prize-list .prize-item:nth-child(7) {
  top: 1rem;
  left: -1.3rem;
  transform: rotate(-69deg);
}
.prize-list .prize-item:nth-child(8) {
  top: -.9rem;
  left: .53rem;
  transform: rotate(-20deg);
}
.prize-item {
  width: 1.875rem;
  height: 1rem;
}

.prize-pic img {
  width: 1.0625rem;
  height: .5rem;
  margin-top: 1.5625rem;
}
.prize-count {
  font-size: 0.4rem;
}
.prize-type {
  font-size: 0.3rem;
}
.main {
  position: relative;
  width: 100%;
  min-height: 14.25rem;
  background: rgb(243, 109, 86);
  padding-bottom: 1.6875rem;
}
.main-bg {
  width: 100%;
  height: 8.5625rem;
  position: absolute;
  top: -1.4375rem;
  left: 0;
  background: url("../assets/img/luck_bg.png") no-repeat center top;
  background-size: 100%;
}
.bg-p {
  width: 100%;
  height: 2.95rem;
  background: rgb(252, 207, 133);
}
.content {
  position: absolute;
  top: 0.175rem;
  left: 0;
  background: rgb(243, 109, 86);
  width: 100%;
  height: 5.1875rem;
  font-size: .4rem;
  color: #ffeb39;
  padding-left: 2.1rem;
  text-decoration: underline;
}
.content div {
  text-align: left;
}
.lottery_ticket1 {
  text-align: right;
  margin-bottom: .5rem
}
.tip {
  position: relative;
  margin: 2.5rem auto 0;
  width: 17.5rem;
  border: 1px solid #fbc27f;
}
.tip-title {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1rem;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 0.3125rem 0.625rem;
}
.tip-content {
  padding: 1.5625rem 0.625rem;
  font-size: 0.875rem;
  color: #fff8c5;
  line-height: 1.5;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 4.4375rem;
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  background-color: rgb(252, 244, 224);
  height:2.7rem
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted #fccc6e;
}
.toast-picture {
  position: absolute;
  top: -3rem;
  left: -1rem;
  width: 6.75rem;
  height: 3.5625rem;
}
.toast-pictrue-change {
  position: absolute;
  top: -1.5rem;
  left: -1.375rem;
  width: 17.5rem;
  height: 3.125rem;
}
.toast-title {
  padding: .5125rem 0 .4rem;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9375rem;
}
.toast-btn div{
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );

  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 2.6875rem;
  height: .875rem;
  border-radius: 2.875rem;
  text-align: center;
  line-height: .875rem;
  color: #fff;
}
.toast-btn1{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.9375rem;
  margin-left: .3rem;
  margin-right: .3rem;
}
.toast-btn1 div{
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );

  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 1.6875rem;
  height: .875rem;
  border-radius: 2.875rem;
  text-align: center;
  line-height: .875rem;
  color: #fff;
}
.close {
  position: absolute;
  top: -0.6075rem;
  right: -0.6075rem;
  width: .6rem;
  height: .6rem;
  background: url("../assets/img/close_store.png") no-repeat center top;
  background-size: 100%;
}
</style>

