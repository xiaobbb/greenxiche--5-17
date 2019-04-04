<template>
  <div class="backgray">
      <div class="avatarbg">
          <div class="flex-container clomn avahead">
              <img src="/static/images/ava2.png" class="avatar">
              <p class="person">筱风月忆</p>
          </div>
          <div class="flex-container avaitem">
              <div class="flex-container clomn">
                  <p class="nums">0</p>
                  <p class="itemname">余额</p>
              </div>
              <div class="flex-container clomn">
                  <p class="nums">0</p>
                  <p class="itemname">积分</p>
              </div>
          </div>
      </div>
      <!--菜单-->
      <div class="flex-container white around">
          <div class="flex-container clomn" @click="choseItem(1)">
              <img src="/static/images/myorder.png" class="logo1">
              <p>我的订单</p>
          </div>
          <div class="flex-container clomn" @click="choseItem(2)">
              <img src="/static/images/mycar.png" class="logo2">
              <p>购物车</p>
          </div>
          <div class="flex-container clomn" @click="choseItem(3)">
              <img src="/static/images/l1.png" class="logo3">
              <p>服务卡券</p>
          </div>
          <div class="flex-container clomn" @click="choseItem(4)">
              <img src="/static/images/l5.png" class="logo4">
              <p>优惠券</p>
          </div>
      </div>
      <!--切换-->
      <div class="flex-container caritem white">
          <div class="flex-container">
              <img src="/static/images/car22.png" class="car">
              <p v-if="showCar">我的车辆</p>
              <div class="flex-container clomn carinfo" v-else>
                  <p>东风本田-思域</p>
                  <p>粤AJ6688</p>
              </div>
          </div>
          <img src="/static/images/back.png" class="right" @click="choseItem(5)">
      </div>
      <!--组-->
      <div class="white minelist">
          <div class="mineitem" @click="goItem(1)">
              <img src="/static/images/purple.png" class="mine1">
              <p>我的钱包</p>
          </div>
          <div class="mineitem" @click="goItem(2)">
              <img src="/static/images/msg.png" class="mine2">
              <p>消息</p>
          </div>
          <div class="mineitem">
              <img src="/static/images/ser.png" class="mine3">
              <p>客服</p>
          </div>
          <div class="mineitem" @click="goItem(3)">
              <img src="/static/images/set.png" class="mine4">
              <p>设置</p>
          </div>
      </div>
  </div>
</template>

<script>
import {post} from '@/utils/index'
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
  },
  data () {
    return {
      showCar:true
    }
  },
 
  components: {
    
  },
  mounted(){
      const data ={
          Mobile:'18123769378',
          PassWord:'123456'
      }
    //   登录，设置缓存
      post('Login/LoginByMobile',data).then(res=> {
          wx.setStorageSync('userid',res.data.UserId)
          wx.setStorageSync('token',res.data.Token)
      })
      console.log(wx.getStorageSync('userid'),wx.getStorageSync('token'))
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的"
      });
    },
    goItem(e){
        console.log(e)
      var a=e
      if(a==1){
          wx.navigateTo({ url: "/pages/wallet/main" });
      }
      if(a==2){
          wx.navigateTo({ url: "/pages/message/main" });
      }
      if(a==3){
          wx.navigateTo({ url: "/pages/installinfo/main" });
      }
      
    },
    choseItem(e){
      var a=e
      if(a==1){
          wx.navigateTo({ url: "/pages/myorder/main" });
      }
      if(a==2){
          wx.navigateTo({ url: "/pages/shopcart/main" });
      }
      if(a==3){
          wx.navigateTo({ url: "/pages/certical/main" });
      }
      if(a==4){
          wx.navigateTo({ url: "/pages/coupons/main" });
      }
      if(a==5){
          wx.navigateTo({ url: "/pages/mycar/main" });
      }
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
