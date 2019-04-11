<template>
  <div>
    <!--支付-->
    <div class="glo-relative">
        <map id="map"  :longitude="longitude" :latitude="latitude"  scale="15" :controls="controls"  :markers="markers"   @markertap="markertap"   @regionchange="regionchange"   @controltap="controltap" show-location style="width: 100%; height:610rpx;"></map>
        <cover-view>
            <cover-image src="/static/images/cart.png" class="cart-img"/>
        </cover-view>
    </div>
    <!--item-->
    <div class="paymenu">
        <div class="ordertitle">
            <p>确认支付信息</p>
            <img src="/static/images/close.png" class="close">
        </div>
        <p class="menu">￥{{price || 0}}</p>
        <radio-group class="radio-group" @change="radioChange">
            <label class="radio" v-for="item in payitems" :key="item.id">
              <div class="flex-container payitem commonpad">
                  <div class="flex-container">
                      <img src="/static/images/wx.png" class="payimg" v-if="item.id==1">
                      <img src="/static/images/rmbbg.png" class="payimg" v-if="item.id==2">
                      <text style="margin-left:20rpx;"> {{item.value}}</text>
                  </div>
                  <radio :value="item.id" :checked="item.checked"/>
              </div>
            </label>
          </radio-group>
        <div class="paybtn" style="margin-top:50rpx;">立即支付</div>
    </div>
  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
    this.orderNo=this.$root.$mp.query.orderNo
    this.price=this.$root.$mp.query.orderNo
  },
  data () {
    return {
      latitude: wx.getStorageSync("latitude"),
      longitude: wx.getStorageSync("longitude"),
      orderNo:"",
      price:"",
      controls: [{  //控件不随着地图移动
          id: 1,
          iconPath: '/static/images/location.png',
          position: {
            left: 0,
            top: 500,
            width: 30,
            height: 30
          },
          clickable: true
      }],
      payitems:[
        {id:1,value:"微信支付",checked:'true'},{id:2,value:"余额支付"}
      ]
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
  .payimg{
    width:56rpx;
    height:56rpx;
}
</style>
