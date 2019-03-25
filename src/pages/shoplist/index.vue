<template>
  <div class="bggray">
     <!--顶部输入框-->
     <div class="white">
        <div class="topinput">
            <input type="text" placeholder="搜索商户">
            <img src="/static/images/search.png" class="searchpic absolu">
            <img src="/static/images/cancle.png" class="canclepic absolu">
        </div>
    </div>
    <!--导航栏-->
    <div class="flex-container menu">
        <div class="menuitem">
            <div @click="changeItem(item.name)" v-for="item in list" :key="item.name">
                  <text>{{item.name}}</text>
                  <img src="/static/images/top.png" class="bottom" v-if="aa==item.name">
                  <img src="/static/images/bottom.png" class="bottom" v-else>
              </div>
        </div>
        <!--排行帮-->
        <div><img src="/static/images/gold.png" class="gold"></div>
    </div>
    <!--商户列表-->
    <div class="shoplist">
      <div class="shopitem flex-container white">
          <img src="/static/images/car.png" class="mycar">
          <div class="shopinfo flex-container">
              <div class="shopname">车御品汽车服务</div>
              <div class="shopclass flex-container">
                  <p>
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/gray1.png" class="xing-point">
                  </p>
                  <text class="grad">5.0分</text>
                  <text class="numb">(428条订单)</text>
              </div>
              <div class="shoplocat">
                  <text>龙岗区坂田街道河背中心路...</text><text>0.32km</text>
              </div>
          </div>
      </div>
      <div class="shopitem flex-container white">
          <img src="/static/images/car.png" class="mycar">
          <div class="shopinfo flex-container">
              <div class="shopname">车御品汽车服务</div>
              <div class="shopclass flex-container">
                  <p>
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/gray1.png" class="xing-point">
                  </p>
                  <text class="grad">5.0分</text>
                  <text class="numb">(428条订单)</text>
              </div>
              <div class="shoplocat">
                  <text>龙岗区坂田街道河背中心路...</text><text>0.32km</text>
              </div>
          </div>
      </div>
    </div>

    <!--点击导航栏弹框-->
    <div class="bigmask" v-if="isServe"></div>
    <div v-if="showserve" class="flex-container itemposit">
        <div class="yellow">全部服务</div>
        <div>洗车</div>
        <div>内饰</div>
        <div>除甲醛</div>
        <div>镀金</div>
    </div>
    <div v-if="showload" class="load">
        <div class="yellow">距离排序</div>
        <div>订单排序</div>
        
    </div>
    <div v-if="showplace" class="load">
        <div v-for="item in placelist" :key="item.name" @click="change(item.name)">
            <span :class="{active2:active==item.name}">{{item.name}}</span>
            <span class="dui" :class="{active1:active==item.name}">✔</span>
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
        list:[
          {id:1,name:"全部服务"},{id:1,name:"距离排序"},{id:1,name:"全部区域"}
        ],
        placelist:[
          {id:1,name:"全部区域"},{id:2,name:"罗湖区"},{id:3,name:"福田区"},{id:4,name:"南山区"},{id:5,name:"宝安区"},{id:6,name:"龙岗区"}
        ],
        active:'全部区域',
       isServe:false,
       showserve:false,
       showload:false,
       showplace:false,
       showdeaf:true,
       aa:""
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "商户列表"
      });
    },
    change(i){
      this.active=i
    },
    changeItem(e){
      this.aa=e
      this.isServe=true
      if(e=="全部服务"){
        if(!this.showserve){
          this.showserve=true
          this.showload=false
          this.showplace=false
          }else{
            this.showserve=false
            this.isServe=false
          } 
      }else if(e=="距离排序"){
        if(!this.showload){
          this.showload=true
          this.showserve=false
          this.showplace=false
          }else{
            this.showload=false
            this.isServe=false
          } 
      }else{
        if(!this.showplace){
          this.showplace=true
          this.showserve=false
          this.showload=false
          }else{
            this.showplace=false
            this.isServe=false
          } 
      }
      
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
