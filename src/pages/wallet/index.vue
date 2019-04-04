<template>
  <div class="backgray">
      <div class="orange flex-container clomn">
        <p class="hint">余额(元)</p>
        <p class="score">0.00</p>
     </div>
     <div class="white">
        <div class="flex-container waitem" @click="toSum">
            <img src="/static/images/sum.png" class="walletlogo">
            <p>余额充值</p>
        </div>
        <div class="flex-container waitem" @click="toMoneyDetail">
            <img src="/static/images/capital.png" class="walletlogo">
            <p>资金明细</p>
        </div>
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
        title: "我的钱包"
      });
    },
    toSum(){
      wx.navigateTo({ url: "/pages/sum/main" });
    },
    toMoneyDetail(){
      wx.navigateTo({ url: "/pages/moneydetail/main" });
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
