<template>
  <div>
      <!--导航栏-->
      <div class="title">
          <div class="ranktitle" v-for="item in titlelist" :key="item.name" :class="{active:active==item.id}" @click="change(item.id)">{{item.name}}</div>
      </div>
      <div class="slide"></div>
      <!--排行list-->
      <div class="ranklist">
          <div class="rankitem flex-container">
              <div class="flex-container shopnum">
                  <div class="options">
                      <img src="/static/images/1.png" class="nums">
                  </div>
                  <div class="flex-container rankinfo">
                    <img src="/static/images/shop10.png" class="shopimg">
                    <div class="rankcol">
                        <p class="shopname">车御品汽车服务</p>
                        <p>
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <text>5.0分</text>
                        </p>
                    </div>
                  </div>
              </div>
              <div class="ranknums">
                  <p>688</p>
                  <p>成交数量</p>
              </div>
          </div>
          <div class="rankitem flex-container">
              <div class="flex-container shopnum">
                  <div class="options">
                      <img src="/static/images/2.png" class="nums">
                  </div>
                  <div class="flex-container rankinfo">
                    <img src="/static/images/shop10.png" class="shopimg">
                    <div class="rankcol">
                        <p class="shopname">车御品汽车服务</p>
                        <p>
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <text>5.0分</text>
                        </p>
                    </div>
                  </div>
              </div>
              <div class="ranknums">
                  <p>688</p>
                  <p>成交单数</p>
              </div>
          </div>
          <div class="rankitem flex-container">
              <div class="flex-container shopnum">
                  <div class="options">
                      <text>4</text>
                  </div>
                  <div class="flex-container rankinfo">
                    <img src="/static/images/shop10.png" class="shopimg">
                    <div class="rankcol">
                        <p class="shopname">车御品汽车服务</p>
                        <p>
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <img src="/static/images/xing.png" class="xing-point">
                            <text>5.0分</text>
                        </p>
                    </div>
                  </div>
              </div>
              <div class="ranknums">
                  <p>688</p>
                  <p>成交数量</p>
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
      active:"1",
      titlelist:[
        {id:1,name:"日榜"},{id:2,name:"周榜"},{id:3,name:"月榜"}
      ]
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "门店排行榜"
      });
    },
    change(e){
      this.active=e
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
