<template>
  <div class="backgray">
    <div v-if="isshow">
      <!---->
      <div class="flex-container clomn  ordershophead white">
          <div class="orderserve">服务商家</div>
          <div class="flex-container ordermain">
              <img src="/static/images/shop5.png" class="ordershopimg">
              <div class="flex-container clomn orderplace">
                  <p class="placename">车御品汽车服务</p>
                  <p>深圳市龙华区梅龙大道912号</p>
              </div>
          </div>
          <div class="ordertips">(温馨提示：请核对收货地址是否正确)</div>
      </div>
      <div class="slide"></div>
      <!--订单详情-->
      <div class="white proinfo">
          <div class="orderserve">服务项目</div>
          <div class="flex-container ordermain">
              <img src="/static/images/shop5.png" class="ordershopimg">
              <div class="flex-container clomn orderplace">
                  <p class="placename detailright">普惠(洗车)</p>
                  <p>￥30.00</p>
              </div>
          </div>
          <div class="flex-container infoslide white pad">
              <div>服务车辆</div>
              <div>
                  <img src="/static/images/back.png" class="right">
              </div>
          </div>
          <div class="flex-container infoslide white pad">
              <div>优惠券</div>
              <div>
                  <img src="/static/images/back.png" class="right">
              </div>
          </div>
          <div class="flex-container infoslide white pad">
              <div>服务卡券</div>
              <div>
                  <img src="/static/images/back.png" class="right">
              </div>
          </div>
          <div class="infoslide inputbor flex-container white pad">
              <div>买家留言</div>
              <input type="text" placeholder="填写内容已和卖家协商确认" class="inputmes">
          </div>
          <div class="infoslide slideprice white pad">合计：<span>￥1288.00</span></div>
      </div>
      <!--底部按钮-->
      <div class="botbtn">
          <div class="price white">合计: <span>￥1288.00</span></div>
          <div class="btnconfir" @click="goPay">提交订单</div>
      </div>
    </div>
    <div v-else>
        <div class="lasttime white">剩余支付时间  <span>29</span> : <span>29</span></div>
        <div class="flex-container white commonpad">
            <p class="strong">应付金额</p>
            <p class="shouldpay">￥30.00</p>
        </div>
        <div class="slide"></div>
        <div class="white">
            <div class="itempay commonpad">选择第三方支付，剩余支付<span class="shouldpay">¥30.00</span>元</div>
            <div>
              <div class="flex-container payitem commonpad">
                  <img src="/static/images/wx.png" class="payimg">
                  <input type="radio" :checked="a==4" @click="change(4)">
              </div>
              <div class="flex-container payitem commonpad"> 
                  <img src="/static/images/rmbbg.png" class="payimg">
                  <input type="radio" :checked="a==5" @click="change(5)">
              </div>
          </div>
        </div>
        <div class="btncharge">立即支付</div>
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
      isshow:true,
      a:4,
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "确认订单"
      });
    },
    change(e){
      //console.log(e.target)
      this.a=e
    },
    goPay(){
      this.isshow=false
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
