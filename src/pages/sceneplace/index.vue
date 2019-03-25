<template>
  <div>
    <!--备注-->
    <div class="signtitle">
      <p>上传现场照片有助于洗车员快速找到车辆位置~</p>
      <p>不添加现场照片也可以提交订单</p> 
    </div>
    <!--图片列表-->
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
    <div class="paybtn" @click="orderpay">确定</div>
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
        title: "添加现场图片"
      });
    },
    orderpay(){
      wx.navigateTo({ url: "/pages/locationcomplete/main" });
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
