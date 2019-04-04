<template>
  <div class="backgray">
      <div class="msglist">
          <div class="mesitem flex-container clomn" @click="showDetail">
              <div class="time">3月15日</div>
              <div class="itemdesc white">
                  <div class="title">爱车有道-涡轮增压</div>
                  <div class="flex-container">
                      <img src="/static/images/content.png" class="infomsg">
                      <p class="infodesc">带涡轮的汽车保养时，注意一下几点，可以 多开几年>></p>
                  </div>
              </div>
          </div>
          <div class="mesitem flex-container clomn">
              <div class="time">{{time}}</div>
              <div class="itemdesc white">
                  <div class="title">爱车有道-涡轮增压</div>
                  <div class="flex-container">
                      <img src="/static/images/voice.png" class="infomsg">
                      <p class="infodesc">带涡轮的汽车保养时，注意一下几点，可以 多开几年>></p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { post } from "@/utils/index";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
    this.getData()
  },
  data () {
    return {
      time:""
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的消息"
      });
    },
    async getData(){
      const res = await post('')
    },
    showDetail(){
      wx.navigateTo({ url: "/pages/messagedetail/main" });
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
