<template>
  <div>
    <!--填写订单-->
    <div class="glo-relative bg-cart">
        <img src="/static/images/cartbg5.png" class="shopbg">
        <img src="/static/images/location.png" class="location-logo">
        <img src="/static/images/cart.png" class="cart-img">
    </div>
    <!--列表-->
    <div class="list">
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">展涛科技大厦c座</span>
            <img src="/static/images/back.png" class="back" @click="chosePlace">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">请选择服务项目</span>
            <img src="/static/images/back.png" class="back" @click="choseItem">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">03-13 13:08-15:08</span>
            <img src="/static/images/back.png" class="back" @click="choseTime">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">请添加车辆</span>
            <img src="/static/images/back.png" class="back" @click="choseCar">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">价格 : 30.00</span>
            <p class="taginfo">
              <img src="/static/images/tag.png" class="tag">
              <span class="goods">充值有优惠</span>
              <img src="/static/images/white.png" class="yuan">
            </p>
            <img src="/static/images/back.png" class="back">
        </div>
        <p class="hr"></p>
        <div class="item">
             <img src="/static/images/yellow.png" class="diandian">
             <p class="location-self">姓名 <input placeholder="请输入您的姓名"/></p>
        </div>
        <p class="hr"></p>
        <div class="item">
             <img src="/static/images/yellow.png" class="diandian">
             <p class="location-self">手机 <input  placeholder="请输入您的手机号码"/></p>
        </div>
        <p class="hr"></p>
        <div class="item sign">
            <span @click="addpics">添加现场照片</span><span @click="addinfo">备注</span>
        </div>
        <div class="chase" @click="toPay">立即下单</div>
    </div>

  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
   onLoad(){
    this.setBarTitle();
  },
  data () {
    return {
     
    }
  },

  components: {
    
  },

  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "填写订单"
      });
    },
    chosePlace(){
        wx.navigateTo({ url: "/pages/locationorder/main" });
    },
    choseItem(){
        wx.navigateTo({ url: "/pages/servince/main?id=1" });
    },
    choseTime(){
        wx.navigateTo({ url: "/pages/writeorder/main" });
    },
    choseCar(){
        wx.navigateTo({ url: "/pages/mycar/main" });
    },
    addpics() {
      wx.navigateTo({ url: "/pages/sceneplace/main" });
    },
    addinfo() {
      wx.navigateTo({ url: "/pages/signinfo/main" });
    },
    toPay(){
      wx.navigateTo({ url: "/pages/orderpay/main" });
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";

</style>
