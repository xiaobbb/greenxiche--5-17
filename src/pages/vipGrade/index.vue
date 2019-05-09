<template>
  <div>
    <!-- 用户信息 -->
    <div class="userInfo">
          <div class="flex-container clomn avahead">
              <img v-if="memberInfo.Avatar" :src="memberInfo.Avatar" class="avatar">
              <img v-else src="/static/images/default.png" class="avatar">
              <img src="/static/images/default.png" class="avatar">
              <div class="flexs name" @click="gotoVipGrade">
                <p class="person">{{memberInfo.NickName}}</p>
                <img src="/static/images/vip_v.png" alt="">
                <p class="level">LV0</p>
              </div>
              
              <!-- <div class="person_id">ID:{{memberInfo.MemberID}}</div> -->
          </div>
    </div>
    <!-- 等级对照表 -->
    <div class="grade-tabel">

    </div>
    <!-- 权益介绍 -->
    <div class="introduction">

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
    console.log('userInfo',wx.getStorageSync('userInfo'))
    this.memberInfo= wx.getStorageSync('userInfo')
  },
  data() {
    return {
      memberInfo:{}
    }
  },
  methods:{
    setBarTitle(){
      wx.setNavigationBarTitle({
        title: "会员等级"
      });
    },
    gotoVipGrade(){
      
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "./style";
@import "../../css/common.css";
</style>
