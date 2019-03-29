<template>
  <div>
      <!--顶部图片-->
      <div>
        <img src="/static/images/download.png" class="bg">
      </div>
      <div class="item">
          <div class="title">洗车-外观简单清洗</div>
          <div class="complain">整车泡沫冲洗擦干、轮胎轮毂冲洗清洁、车内吸尘、内 饰脚垫等简单除尘</div>
          <div class="flex-container iteminfo">
              <p>已售652件</p>
              <p>今日仅剩<span>100</span>件</p>
          </div>
      </div>
      <div class="hr"></div>
      <!--服务项目-->
      <div class="flex-container item">
          <div>
              <div class="sertitle">服务项目</div>
              <div class="sercomplain">洗车-外观简单清洗</div>
              <div class="flex-container iteminfo">
                  <p>
                    <img src="/static/images/gou.png" class="pics">
                    <text>未消费，随时退</text>
                  </p>
                  <p>
                    <img src="/static/images/gou.png" class="pics">
                    <text>过期退</text>
                  </p>
              </div>
          </div>
          <div class="price">￥30</div>
      </div>
      <div class="hr"></div>
      <!--位置-->
      <div class="flex-container item">
          <div>
              <p class="sertitle">车御品汽车服务</p>
              <p class="sercomplain">深圳市龙华区梅龙大道912号</p>
          </div>
          <div class="flex-container range">
            <p class="location">
                <img src="/static/images/bg9.png" class="big">
                <img src="/static/images/to.png" class="small">
            </p>
            <p>0.32km</p>
          </div>
      </div>
      <div class="slide"></div>
      <!--评分-->
      <div class="point">
        <div class="flex-container">
            <p class="left">
              <text>评分</text><text>4.0</text>
            </p>
            <p>
              <text>200条评论</text>
              <img src="/static/images/back.png" class="arrowback">
            </p>
        </div>
        <div class="flex-container userinfo">
            <div class="flex-container">
                <div>
                    <img src="/static/images/avatar.png" class="avatar">
                </div>
                <div>
                    <p>筱风月忆</p>
                    <p>
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/xing.png" class="xing-point">
                        <img src="/static/images/gray1.png" class="xing-point">
                    </p>
                </div>
            </div>
            <div class="carname">奥迪A6</div>
        </div>
        <div>工作人员很认真，服务态度很好</div>
        <div class="usertime">01-20 10:50</div>
      </div>
      <div class="slide"></div>
      <!--购买须知-->
      <div class="point pointnow">
          <div class="main">购买需知</div>
          <div class="pmenu">
              <img src="/static/images/time.png" class="tippic">
              <div>
                <p  class="fsize">适用车型</p>
                <p class="carcor">五座轿车</p>
              </div>
          </div>
          <div class="pmenu">
              <img src="/static/images/time.png" class="tippic">
              <div>
                <p  class="fsize">适用车型</p>
                <p class="carcor">五座轿车</p>
              </div>
          </div>
      </div>
      <!--支付-->
      <div class="btn"> 
          <div class="btnmoney">￥30.00</div>
          <div class="btncharge" @click="toPay">去结算</div>
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
        title: "服务详情"
      });
    },
    toPay(){
      wx.navigateTo({ url: "/pages/visitconfirmorder/main" });
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
