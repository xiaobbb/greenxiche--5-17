<template>
  <div class="backgray setlist">
      <div class="setitem flex-container white">
          <div class="flex-container">
              <img src="/static/images/phonecon.png" class="phonecon">
              <input type="text" placeholder="请输入手机号">
          </div>
          <img src="/static/images/back.png" class="right">
      </div>
      <div class="setitem flex-container white">
          <div class="flex-container">
              <img src="/static/images/passcon.png" class="passcon">
              <input type="text" placeholder="请输入验证码">
          </div>
          <text class="getpass">获取验证码</text>
      </div>
      <div class="paybtn setbtn">确定</div>
      
      
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
        title: "设置手机号码"
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
