<template>
  <div>
      <!--顶部输入框-->
      <div class="white">
          <div class="topinput">
              <input type="text" placeholder="搜索商户">
              <img src="/static/images/search.png" class="searchpic absolu">
              <img src="/static/images/cancle.png" class="canclepic absolu">
          </div>
      </div>
      <!--定位当前城市-->
      <div class="item">定位当前城市</div>
      <div class="itemlocat">
          <div class="name">{{cityname}}</div>
          <!-- <div class="chose" @click="choseCIty">
            <img src="/static/images/can.png" class="can">
            <text>重新定位</text>
          </div> -->
      </div>
      <div class="item">热门城市</div>
      <div class="flex-container cityhot">
          <div class="name">深圳</div>
          <div class="name">上海</div>
          <div class="name">杭州</div>
          <div class="name">广州</div>
          <div class="name">南京</div>
          <div class="name">武汉</div>
          <div class="name">成都</div>
          <div class="name">北京</div>
      </div>
      <!--城市列表-->
      <div class="citylist">
          <div class="citynum">
              <div class="item">A</div>
              <div class="cityindo">
                <div class="">阿坝</div>
                <div>阿克苏</div>
                <div>阿拉尔</div>
                <div>阿拉善盟</div>
              </div>
          </div>

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
        cityname:"深圳"
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "选择城市"
      });
    },
    choseCIty(){
        wx.getLocation({
        type: 'wgs84',
        success:(res) =>{
          console.log(res)
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
        }
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
