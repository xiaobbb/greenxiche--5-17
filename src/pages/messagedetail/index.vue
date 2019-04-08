<template>
  <div class="commonpad">
      <div class="title">买了带涡轮的汽车保养注意事项，做到以下几点使用寿命延长很多年</div>
      <div class="flex-container tips">
          <text>03-15 09:30</text>
          <text>5000人浏览</text>
      </div>
      <div class="question">
          现在带涡轮的车越来越多,问涡轮增压的质量也越来越好,提前带涡轮的车走十万公里就报废车了,而且涡轮更换的价格也不低。而现在的涡轮现在带涡轮的车越来越多,问涡轮增压的质量也越来越好,提前带涡轮的车走十万公里就报废车了,而且涡轮更换的价格也不低。而现在的涡轮现在带涡轮的车越来越多,问涡轮增压的质量也越来越好,提前带涡轮的车走十万公里就报废车了,而且涡轮更换的价格也不低。而现在的涡轮
      </div>
      <img src="/static/images/112.png" class="pic1">
      <div class="question whitebg">
          小义用加就使用什么级别的。要是随车手册没有写的话,那么我们可以看看4S店换润滑油的时候使用的是什么型号,不过一般带涡轮的汽车都提前带涡轮的车走十万公里就报废车了,而且涡轮更换的价格也不低。而现在的涡轮现在带涡轮的车越来越多,问涡轮增压的质量也越来越好,提前带涡轮的车走十万公里就报废车了,而且涡轮更换的价格也不低。而现在的涡轮
      </div>
      <img src="/static/images/111.png" class="pic1">
      <div class="question whitebg">
          而且全合成的润滑油对涡轮的保障也比较好。润滑油更换时间不能说过一段时间,因为润滑油要是使用公里跟时间到了以后,润滑油是有杂质的轮的车走十万公里就报废车了,而且涡轮更换的价格也不低。而现在的涡轮现在带涡轮的车越来越多,问涡轮增压的质量也越来越好,提前带涡轮的车走十万公里就报废车了,而且涡轮更换的价格也不低。而现在的涡轮
      </div>
      <div class="btnset flex-container">
          <div class="flex-container">
              <img src="/static/images/zan.png" class="zan">
              <text>60</text>
          </div>
          <div class="flex-container">
              <img src="/static/images/share.png" class="share">
              <text>分享</text>
          </div>
      </div>
  </div>
</template>

<script>
import { post,filePath } from "@/utils/index";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.id = this.$root.$mp.query.id;
    this.setBarTitle();
    this.getNewsInfo();
  },
  data () {
    return {
      id:"",
      info:{}
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
        FindId:this.id
      })
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
