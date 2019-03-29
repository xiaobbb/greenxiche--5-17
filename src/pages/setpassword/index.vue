<template>
  <div class="backgray setlist">
      <div class="setitem flex-container white">
          <input type="text" placeholder="请输入手机号">
          <img src="/static/images/back.png" class="right">
      </div>
      <div class="setitem flex-container white">
          <input type="text" placeholder="请输入验证码">
          <text class="getpass">获取验证码</text>
      </div>
      <div class="setitem white">
          <input type="text" placeholder="请输入6位数字密码">
      </div>
      <div class="setitem white">
          <input type="text" placeholder="确认密码">
          
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
        title: "设置支付密码"
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
