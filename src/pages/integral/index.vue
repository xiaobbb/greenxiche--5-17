<template>
  <div>
     <div class="orange flex-container clomn">
        <p>当前可用积分</p>
        <p><span class="score">160</span>分</p>
     </div>
     <div class="scorerecord"><text>积分记录</text></div>
     <div class="scorelist">
        <div class="scoreitem flex-container">
            <div class="flex-container clomn iteminfo">
                <p>注册会员</p>
                <p>2019-03-12</p>
            </div>
            <div class="itembig">+50</div>
        </div>
        <div class="scoreitem flex-container">
            <div class="flex-container clomn iteminfo">
                <p>注册会员</p>
                <p>2019-03-12</p>
            </div>
            <div class="itembig active">+50</div>
        </div>
     </div>

  </div>
</template>

<script>
import { post } from "@/utils/index";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.scoreList = [];
    this.setBarTitle();
    this.getScoreList();
  },
  data () {
    return {
      userId:wx.getStorageSync('userId'),
      token:wx.getStorageSync('token'),
      page:1,
      pageSize:15,
      scoreList:[]
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的积分"
      });
    },
    async getScoreList(){
      let result = await post("user/ScoreList",{
        UserId:this.userId,
        Token:this.token,
        page:this.page,
        pageSize:this.pageSize
      })
    }
    
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
  @import "../../css/common.css";
</style>
