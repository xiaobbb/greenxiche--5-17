<template>
  <div class="backgray">
    <!--头部切换-->
    <!--预约上门订单-->
    <div class="border" v-if="id==1">
        <div class="flex-container head white">
            <img src="/static/images/avatar.png" class="avatar">
            <div>
                <p class="person">服务技师：张若筠</p>
                <p class="time">服务时间：2019-03-19 11:00</p>
            </div>
        </div>
        <div class="white flex-container mark">
            <p>服务打分</p>
            <p>
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
            </p>
        </div>
    </div>
    <!--商城订单-->
    <div class="border" v-if="id==2">
        <div class="flex-container head white">
            <img src="/static/images/shop22.png" class="product">
            <div class="prodetail">
                <p class="person">绿妞长效镀晶9H汽车度镀晶纳米水晶镀膜包施工新全车辆车漆面德国</p>
                <p class="time">服务时间：2019-03-19 11:00</p>
                <p class="proprice">￥1288</p>
            </div>
        </div>
        <div class="white flex-container mark">
            <p>服务打分</p>
            <p>
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
            </p>
        </div>
    </div>
    <!--预约到店订单-->
    <div class="border" v-else>
        <div class="flex-container head white">
            <img src="/static/images/shop22.png" class="shopimg">
            <div>
                <p class="person">车御品汽车服务</p>
                <p class="time">服务时间：2019-03-19 11:00</p>
            </div>
        </div>
        <div class="white flex-container mark">
            <p>服务打分</p>
            <p>
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
                <img src="/static/images/xing.png" class="xing-point">
            </p>
        </div>
    </div>
    <!--图片展示-->
    <div class="comment white">
        <textarea name="" id="" cols="30" rows="10" class="commentdet" placeholder="亲，您对技师的服务表现还满意吗？给其他想做服务的 小伙伴做个参考呗~期待给您更好的服务……">
        </textarea>
        <div class="flex">
            <div class="flexitem">
                <img src="/static/images/car.png" class="pic">
                <img src="/static/images/close5.png" class="close">
            </div>
            <div class="flexitem"> 
                <img src="/static/images/car.png" class="pic">
                <img src="/static/images/close5.png" class="close">
            </div>
            <div class="flexitem">
                <img src="/static/images/car.png" class="pic">
                <img src="/static/images/close5.png" class="close">
            </div>
            <div>
                <img src="/static/images/bg1.png" class="pic">
            </div>
        </div>
        
    </div>
    <div class="flex-container checksata white">
        <img src="/static/images/nocheck.png" class="chosesate" v-if="showCheck" @click="check">
        <img src="/static/images/choose.png" class="chosesate" v-else  @click="check">
        <text>匿名评价</text>
    </div>
    <div class="paybtn commit">提交</div>
  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
    console.log(this.$root.$mp.query)
    this.id=this.$root.$mp.query.id
  },
  data () {
    return {
      id:"",
      showPerson:false,
      showCheck:true,
      showShop:false
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "发表评论"
      });
    },
    check(){
      this.showCheck=!this.showCheck
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
