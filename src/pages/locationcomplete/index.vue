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
            <img src="/static/images/back.png" class="back">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">外观简单清洗</span>
            <img src="/static/images/back.png" class="back">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">03-13 13:08-15:08</span>
            <img src="/static/images/back.png" class="back">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">东风标志 3008 白色 粤A8888</span>
            <img src="/static/images/back.png" class="back">
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
             <p class="location-self">姓名 <input placeholder="请输入您的姓名" value="张三"/></p>
        </div>
        <p class="hr"></p>
        <div class="item">
             <img src="/static/images/yellow.png" class="diandian">
             <p class="location-self">手机 <input  placeholder="请输入您的手机号码" value="13025698523"/></p>
        </div>
        <p class="hr"></p>
        <div class="item sign">
            <span>添加现场照片(6)</span><span class="textoverflow">备注:车很脏，洗好就一定...</span>
        </div>
        <div class="chase">立即下单</div>
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
