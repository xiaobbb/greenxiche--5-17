<template>
  <div class="backgray">
      <div class="suminfo white">
          <div class="title">
              <span>充值账户:</span><span class="yellow">13222563654</span>
          </div>
          <div class="flex-container charge">
              <div class="flex-container clomn chargeitem active">
                  <p class="money">100.00元</p>
                  <p class="minicoupon">送5元现金券</p>
              </div>
              <div class="flex-container clomn chargeitem">
                  <p class="money">200.00元</p>
                  <p class="minicoupon">送10元现金券</p>
              </div>
              <div class="flex-container clomn chargeitem">
                  <p class="money">300.00元</p>
                  <p class="minicoupon">送20元现金券</p>
              </div>
              <div class="flex-container clomn chargeitem">
                  <p class="money">500.00元</p>
                  <p class="minicoupon">送40元现金券</p>
              </div>
          </div>
          <div class="flex-container chosepay">
              <div class="flex-container">
                  <img src="/static/images/wx2.png" class="wxlogo">
                  <p>微信支付</p>
              </div>
              <input type="checkbox" :checked="true" class="checkbox-cart">
          </div>
      </div>
      <div class="white botbtn flex-container">
          <div class="total">合计：<span>￥100.00</span></div>
          <div class="btncharge">立即充值</div>
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
    this.userId = wx.getStorageSync('userId');
    this.token = wx.getStorageSync('token');
    this.getRechargeList();
  },
  data () {
    return {
      userId:"",
      token:"",
      page:1,
      pageSize:20
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "余额充值"
      });
    },
    orderpay(){
      wx.navigateTo({ url: "/pages/locationcomplete/main" });
    },
    async getRechargeList(){
      let result = await post("Recharge/GetRechargeList",{
        UserId:this.userId,
        Token:this.token,
        page:this.page,
        pageSize:this.pageSize
      });
      console.log(result);
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
