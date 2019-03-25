<template>
  <div>
    <!--填写订单-->
    <div class="glo-relative">
        <img src="/static/images/shangmen.png" class="shopbg">
        <img src="/static/images/location.png" class="location-logo">
    </div>
    <!--列表-->
    <div class="list">
        <div class="item" v-for="item in locationlist" :key="item.id"  @click="change(item.id)">
            <div class="iteminfo">
              <span class="location-self">{{item.name}}</span>
              <p class="sub">{{item.subname}}</p>
            </div>
            <img src="/static/images/choose2.png" class="choose" :class="{active:active==item.id}">
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
      locationlist:[
        {id:1,name:"展涛科技大厦C座(深圳市龙华区)"},
        {id:2,name:"展涛科技大厦B座",subname:"广东省深圳市龙华区民治大道1079展涛科技大厦"},
        {id:3,name:"展涛科技大厦A座",subname:"广东省深圳市龙华区民治大道1079展涛科技大厦"},
        {id:4,name:"锦湖大厦B座",subname:"广东省深圳市龙华区民治大道1079展涛科技大厦"},
      ],
      active:'1',
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "位置"
      });
    },
    change:function(e){
      this.active=e
    },
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";

</style>
