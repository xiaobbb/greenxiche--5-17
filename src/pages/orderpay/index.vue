<template>
  <div>
    <!--支付-->
    <div class="glo-relative">
        <img src="/static/images/cartbg5.png" class="shopbg">
        <img src="/static/images/location.png" class="location-logo">
        <img src="/static/images/cart.png" class="cart-img pic-center">
    </div>
    <!--item-->
    <div class="paymenu">
        <div class="ordertitle">
            <p>确认支付信息</p>
            <img src="/static/images/close.png" class="close">
        </div>
        <p class="menu">￥30.00</p>
        <div class="flex"> 
            <p class="flexitem"><img src="/static/images/wx.png" class="wx"><span>微信支付</span></p>
            <p><img src="/static/images/choose.png" class="check"></p>
        </div>
        <div class="flex border"> 
            <p class="flexitem rmbpos">
              <img src="/static/images/yu.png" class="yuebg">
              <img src="/static/images/rmb.png" class="rmb">
              <span>余额支付</span>
            </p>
            <p><img src="/static/images/nocheck.png" class="check"></p>
        </div>
        <div class="paybtn">立即支付</div>
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
        title: "支付订单"
      });
    },
    change:function(e){
      this.active=e
    },
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
