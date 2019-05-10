<template>
  <div>
    <!-- 用户信息 -->
    <div class="userInfo flexs-align">
              <img v-if="memberInfo.Avatar" :src="memberInfo.Avatar" class="avatar">
              <img v-else src="/static/images/default.png" class="avatar">
              <div class="ml30">
                 <div class="flexs-align name">
                <p class="person">{{memberInfo.NickName}}</p>
                <img src="/static/images/vip_v.png" alt="">
                <p class="level">LV0</p>
              </div>
              
              <div class="person_id">ID:{{memberInfo.MemberID}}</div>
              </div>
             
         
    </div>
    <div class="plr30">
      <!-- 等级对照表 -->
      <div class="grade-tabel">
        <h3>等级对照表</h3>
        <p>会员升级与购买产品直接相关。</p>
        <p>不同会员的等级如下图所示：</p>
        <div class="tabel">
          <div class="head flexs-align">
            <div class="left">会员等级</div>
            <div class="right">升级条件</div>
          </div>
          <div class="bodys">
            <div class="item flexs-align" v-for="(item,index) in gradeTabel" :key="index">
              <div class="left">{{item.level}}</div>
              <div class="right flexs-align" @click="gotoProduct">{{item.content}} <van-icon name="arrow" class="mt8"></van-icon>  </div>
              </div>
          </div>
        </div>
      </div>
      <!-- 权益介绍 -->
      <div class="introduction">
        <h3>权益介绍</h3>
        <p>会员体系是为了给处于不同阶段的用户提供更贴心，
更强大的服务，以满足不同阶段用户的需求。不同等级
的VIP会员享受不同的优惠权益，级别越高，优惠越大。</p>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../../utils";
import "../../css/common.css";
import "../../css/global.css";
export default {
  data() {
    return {
      memberInfo:{},
      gradeTabel:[
        {
          level:'LV0',
          content:'购买绿妞长效镀晶普通版'
        },
        {
          level:'LV1',
          content:'购买绿妞长效镀晶经典版'
        },
        {
          level:'LV2',
          content:'购买绿妞长效镀晶旗舰版'
        },
        {
          level:'LV3',
          content:'购买绿妞长效镀晶至尊版'
        },
      ]
    }
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    console.log('userInfo',wx.getStorageSync('userInfo'))
    this.memberInfo= wx.getStorageSync('userInfo')
  },
  methods:{
    setBarTitle(){
      wx.setNavigationBarTitle({
        title: "会员等级"
      });
    },
    gotoProduct(){

    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "./style";
@import "../../css/common.css";
</style>
