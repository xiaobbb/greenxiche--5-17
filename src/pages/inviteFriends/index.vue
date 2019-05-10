<template>
  <div class="boxs" >
    <div class="bgimg">
      <img src="/static/images/friends-bg.jpg" alt="">
    </div>
    <div class="content">
    <div class="obtain p40">
        <div class="flexs-align top">
          <div class="item">
            <div class="number">10</div>
            <p>积分</p>
          </div>
          <div class="b2-eae2df"></div>
          <div class="item">
            <div class="number">20</div>
            <p>服务卡券</p>
          </div>
        </div> 
        <div class="checked">查看</div>
    </div>
    <div class="wx">
      <img src="/static/images/friend.png" alt="">
      <p>微信邀请</p>
    </div>
    <div class="rule">
      <h2>推荐规则</h2>
      <p v-for="(item,index) in rule" :key="index">{{index+1}}、{{item}}</p>
    </div>
    </div>
  </div>
</template>

<script>
import { post } from "../../utils";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
  },
  data() {
    return {
      rule:[
        '每成功推荐1位好友注册，好友和推荐人同时获得积分 或服务卡券。',
        '推荐的好友需通过推荐人的邀请码、二维码、发送的链 接，才可建立推荐关系。',
        '若发现恶意注册推荐好友获得奖励，平台有权取消该奖励。'
      ]
    }
  },
  methods:{
    setBarTitle(){
      wx.setNavigationBarTitle({
        title: "邀请好友"
      });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "./style";
@import "../../css/common.css";
</style>
