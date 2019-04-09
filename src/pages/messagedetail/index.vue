<template>
  <div class="commonpad" v-if="hasData">
      <div class="title">{{info.Title}}</div>
      <div class="flex-container tips">
          <text>{{time}}</text>
          <text>{{info.BrowseNum}}人浏览</text>
      </div>
       
      <div class="content" v-html="info.ContentDetails"></div>
      <div class="btnset flex-container">
          <div class="flex-container">
              <img src="/static/images/zan.png" class="zan">
              <text>60</text>
          </div>
          <button class="flex-container" open-type="share">
              <img src="/static/images/share.png" class="share">
              <text>分享</text>
          </button>
      </div>
  </div>
</template>

<script>
import { post,filePath,getCurrentPageUrlWithArgs } from "@/utils/index";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.id = this.$root.$mp.query.id;
    this.setBarTitle();
    this.getNewsInfo();
   this.curPage = getCurrentPageUrlWithArgs();
  },
  data () {
    return {
      id:"",
      info:{},
      time:"",
      hasData:false,
      curPage: ""
    }
  },
 
  components: {

  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "消息详情"
      });
    },
    
    orderpay(){
      wx.navigateTo({ url: "/pages/locationcomplete/main" });
    },
    async getNewsInfo(){
      let result = await post("News/FindNewsList",{
        FindId:this.id,
        page:1,
        pagesize:1
      });

      this.info = result.data[0];
      this.time = this.info.Addtime.split("T").join(" ");
      this.hasData = true;
    }
  },

  created () {
    // let app = getApp()
  },
   onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.info.Title,
      imageUrl: filePath+this.info.PicNo,
      path: this.curPage
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
  @import "../../css/common.css";
</style>
