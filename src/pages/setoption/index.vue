<template>
  <div class="backgray setlist">
      <div class="commonpad white">
          <div>
              <textarea name="" id="" cols="20" rows="5" placeholder="请输入您的反馈问题及建议..."></textarea>
              <p class="nums">0/20</p>
          </div>
      </div>
      <div class="relate white commonpad ">
          <div class="flex-container comtitile">
              <p>相关截图（选填）</p>
              <p class="nums">0/4</p>
          </div>
          <p class="flex-container">
              <img src="/static/images/bg20.png" class="compics">
          </p>
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
        title: "意见反馈"
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
