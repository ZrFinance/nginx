<template>
  <div class="notice">
    <pub-headpic></pub-headpic>
    <div class='notice_all'>
      <div class="inner_title">系统公告</div>
      <div class="inner_detail">
        <div class="news_title">
          <p class="p">{{this.title}}</p>
          <p class="p1">{{this.createtime}}</p>
        </div>
        <div class="news_detail">
          <p class="p">{{this.content}}</p>
        </div>
      </div>
    </div>
    <pub-tabbar></pub-tabbar>
  </div>
</template>

<script>
import PubHeadpic from './pubheadpic'
import PubTabbar from './tabbar'
import { getNotice } from '@/api/request/request'
import { timestampToTime } from '@/api/utils'
import { mapState } from 'vuex'
export default {
  name: 'PubNotice',
  components: {
    PubHeadpic,
    PubTabbar
  },
  data () {
    return {
      title: '',
      content: '',
      createtime: ''
    }
  },
  computed: {
    ...mapState(['init_data'])
  },
  methods: {
    meth_getNotice: function () {
      getNotice(this.callbackGetNotice)
    },
    callbackGetNotice: function (res) {
      if (res.data.data){
        this.title = res.data.data.title
        this.content = res.data.data.content
        this.createtime = '发布时间：' + timestampToTime(res.data.data.createtime)   
      }
    } 
  },
  mounted () {
    this.meth_getNotice()

  }
}
</script>

<style lang="stylus" scoped>
  .notice
    width:100%
    .notice_all
      border: 1px solid #2d9aff;
      border-radius: 0.1rem;
      margin : 0.2rem 0.2rem 2rem 0.2rem
      .inner_title
        font-size: 0.3rem;
        color: #fff;
        padding: 0 0.2rem;
        line-height: 0.6rem;
        background: #2d9aff;
        border-radius: 0.05rem 0.05rem 0 0;
      .inner_detail
        padding: 0.2rem;
        overflow:hidden
        .news_title
          text-align: center;
          .p
            font-size: 0.3rem;
            color: #000;
            padding: 0.2rem;
            display: block;
          .p1
            font-size: 0.27rem;
            color: #666;
        .news_detail
          padding: 0.2rem;
          text-indent: 0.54rem;
          font-size: 0.27rem;
          line-height: 0.5rem;
          color: #333;
          display: block;
</style>
