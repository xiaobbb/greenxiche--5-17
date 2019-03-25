<template>
  <div class="contain">
    <!--大图片-->
    <div class="glo-relative bg-cart">
        <img src="/static/images/cartbg5.png" class="shopbg">
        <img src="/static/images/location.png" class="location-logo">
        <img src="/static/images/cart.png" class="cart-img pic-center">
    </div>
   <!--预约时间-->
    <div class="appoint">预约时间</div>
   <!--时间-->
    <div class="timeflex">
      <div v-for="item in datelist" :key="item" :class="{active:active==item}" @click="changebg(item)">{{item}}</div>
    </div>
    <!--开始时间 结束时间-->
    <div class="tagflex">
      <div>开始时间</div>
      <div>结束时间</div>
    </div>
    <!--滑动选择时间-->
    <div class="choosetime">
      <div class="chooseitem">
        <div>7点</div>
        <div>8点</div>
        <div class="itemshow">9点</div>
        <div>10点</div>
        <div>11点</div>
      </div>
      <div class="chooseitem">
        <div class="itemshow">00分</div>
        <div>01分</div>
        <div>02分</div>
      </div>
      <div class="chooseitem">
          <div>7点</div>
          <div>8点</div>
          <div class="itemshow">9点</div>
          <div>10点</div>
          <div>11点</div>
      </div>
      <div class="chooseitem">
          <div class="itemshow">00分</div>
          <div>01分</div>
          <div>02分</div>
      </div>
    </div>
    <!--底部按钮组-->
    <div class="tagflex">
        <div class="btn-cancle">取消</div>
        <div class="btn-order">立即下单</div>
    </div>
  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
    this.choosedate()
  },
  data () {
    return {
      datelist:[],
      active:'3月19日'
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
    orderpay(){
      wx.navigateTo({ url: "/pages/orderpay/main" });
    },
    changebg(item){
      this.active=item
    },
    choosedate(){
      var d=new Date()
      //console.log(date)
      var month=d.getMonth()+1
      var date=d.getDate()
      for(var n=0;n<5;n++){
        var i=`${month}`+'月'+`${date}`+'日'
        this.datelist.push(i)
        date++
      }
      //console.log(this.datelist)
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
