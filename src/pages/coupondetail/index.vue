<template>
  <div>
    <div class="top flex-container">
        <div class="tophead">
            <img src="/static/images/infocard.png" class="cardbg">
            <div>清洗卡套餐</div>
        </div>
        <div class="title">
            <p>绿妞洗车养护套餐卡</p>
            <p>包含车内外全车清洁内容</p>
        </div>
        <div class="price">
            <span>￥</span>198
        </div>
    </div>
    <div class="slide"></div>
    <div>
        <div class="titleinfo">
            <img src="/static/images/fontborder.png" class="itemtitle">
            <p>绿妞洗车养护套餐卡</p>
        </div>
        <div class="flex-container iteminfo">
            <div>普通外观清洗</div>
            <div class="flex-container inforight">
                <div>5次</div>
                <div>150元</div>
            </div>
        </div>
        <div class="flex-container iteminfo infpborder">
            <div>前挡风玻璃镀膜</div>
            <div class="flex-container inforight">
                <div>1次</div>
                <div>150元</div>
            </div>
        </div>
        <div class="infoprice">
            <p>价值¥300</p>
            <p>购卡仅需¥<span>198</span></p>
        </div>
    </div>
    <div class="linetop">
        <div class="titleinfo">
            <img src="/static/images/border2.png" class="itemtitle">
            <p>购卡须知</p>
        </div>
        <div class="tips">
            <p>1.套餐卡购买成功后，可直接在APP内使用；</p>
            <p>2.使用套餐卡下单时，其他所有促销、优惠券均不可叠加；</p>
            <p>3.套餐卡已经使用后不可退款，请确认后使用；</p>
            <p>4.购卡权益会以服务卡券的形式发放至账户内；</p>
            <p>5.本套餐卡自购买之日起一年内有效，请在有效期内使用；</p>
        </div>
    </div>
    <div class="slide"></div>
    <div class="">
        <div class="botbtn">立即购买</div>
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
        title: "清洗卡套餐"
      });
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
