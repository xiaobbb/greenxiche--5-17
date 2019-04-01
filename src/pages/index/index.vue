<template>
  <div  class="backgray">
      <div>
        <!--顶部导航栏-->
        <div class="head white">
          <div>
            <span class="province">{{cityName}}</span>
            <img src="/static/images/bottom.png" class="img-bottom" @click="goTo(1)">
          </div>
          <div v-for="item in titlelist" :key="item.name" :class="{active:active==item.name}" @click="change(item.name)">{{item.name}}</div>
          <div class="list-img"  @click="goTo(2)">
            <img src="/static/images/right.png" class="container-img">
            <img src="/static/images/list.png" class="list">
          </div>
        </div>
        <!--中部定位图片-->
        <!-- <div class="location glo-relative">
          <img src="/static/images/tupian.png" class="dingwei">
          <img src="/static/images/location.png" class="location-logo">
          <img src="/static/images/person.png" class="mine-pic" v-if="isXiche">
          <img src="/static/images/bigcar.png" class="mine-pic" v-if="isGoshop">
          <img src="/static/images/cart.png" class="car-small" v-if="!isshow">
        </div> -->
        <div class="location glo-relative">
          <!-- <img src="/static/images/tupian.png" class="dingwei"> -->
          <map
            id="map"
            longitude="113.324520"
            latitude="23.099994"
            scale="14"
            :controls="controls"
            bindcontroltap="controltap"
            :markers="markers"
            bindmarkertap="markertap"
            :polyline="polyline"
            bindregionchange="regionchange"
            show-location
            style="width: 100%; height: 1000rpx;"
          ></map>
          <img src="/static/images/location.png" class="location-logo">
          <img src="/static/images/person.png" class="mine-pic" v-if="isXiche">
          <img src="/static/images/bigcar.png" class="mine-pic" v-if="isGoshop">
          <img src="/static/images/cart.png" class="car-small" v-if="!isshow">
        </div>
        <!--弹框遮罩-->
        <div class="mask-modal" v-if="isshow"></div>
        <!--领取会员弹框-->
        <div v-if="showmember" class="mask">
            <img src="/static/images/modal.png" class="mask-img">
            <img src="/static/images/close3.png" class="close"  @click="close">
            <div class="text text1">
              <p>优惠洗车</p>
              <p>到店洗车减免20%</p>
            </div>
            <div class="text text2">
              <p>服务卡券</p>
              <p>不定期赠送洗车的卡券</p>
            </div>
            <div class="text text3">
              <p>预约便捷</p>
              <p>预约洗车更方便快捷</p>
            </div>
        </div>
        <div v-if="showmember" @click="close">
            <img src="/static/images/vip.png" class="vipbtn"> <!--立即开通vip-->
        </div>
        <!--提示不在服务范围内-->
        <div v-if="showShop" class="maskshop">
            <div class="title">
              <text>您的当前位置不在服务范围内，无法提供上门服务，是否到店服务？</text>
            </div>
            <div class="flex-container bottombtn">
                <div>取消</div>
                <div @click="confirmDel">确认</div>
            </div>
        </div>
        <!--新用户礼券-->
        <div v-if="isnew" class="newgroup">
            <img src="/static/images/newbg.png" class="newpic">
            <img src="/static/images/close3.png" class="close"  @click="closemodal">
            <div class="tuantile">送10元立减券</div>
            <div class="tuannew">绿妞新用户专享</div>
            <div class="tuanpick" @click="closemodal">立即领取</div>
        </div>
        <!--我要洗车-->
        <div class="modal-xiche" v-if="isXiche">
          <p class="line">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">展涛科技大厦c座</span>
            <img src="/static/images/back.png" class="back">
          </p>
          <p class="wash" @click="washCar">我要洗车</p>
        </div>
        <!--到店-->
        <div class="modal-goshop" v-if="isGoshop" @click="goTo(3)">
          <div>
            <img src="/static/images/shop-img.png" class="showimg">
          </div>
          <div class="shopinfoflex">
            <p class="shopname">明新汽车服务</p>
            <p class="addressflex">
              <span>
                <img src="/static/images/xing.png" class="xing">
                <img src="/static/images/xing.png" class="xing">
                <img src="/static/images/xing.png" class="xing">
                <img src="/static/images/xing.png" class="xing">
                <img src="/static/images/xing.png" class="xing">
              </span>
              <span class="start">5.0分</span>
              <span class="time">9:00-18:00</span>
            </p>
            <p class="address">龙岗区坂田街道河背中心路...</p>
          </div>
          <div class="rights">
            <img src="/static/images/rembg.png" class="big">
            <img src="/static/images/wei.png" class="small">
            <span>989m</span>
          </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import { get, myget, mypost, post, toLogin } from "../../utils";
import amapFile from "../../utils/amap-wx"; //高德地图API调用JS SDK
import { mapState, mapMutations } from "vuex"; //vuex辅助函数
import shoplist from "@/components/shoplist";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad() {
    this.getCityName()
    this.getMapShow()
  },
  data () {
    return {
      latitude:"",
      longitude:"",
       markers: [{
        iconPath: '/resources/others.png',
        id: 0,
        latitude: this.latitude,
        longitude: this.longitude,
        width: 50,
        height: 50
      }],
      polyline: [{
        points: [{
          longitude:this.longitude,
          latitude:this.latitude
        }, {
          longitude:this.longitude,
          latitude:this.latitude
        }],
        color: '#FF0000DD',
        width: 2,
        dottedLine: true
      }],
      controls: [{
        id: 1,
        iconPath: '../../static/images/shop5.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }],
      titlelist:[
        {name:"全部"}, {name:"上门"}, {name:"到店"},
      ],
      active:'上门',
      isshow:true,
      showShop:false,
      showmember:false,
      isXiche:false,
      isGoshop:false,
      isnew:true
    }
  },
  computed:{
    ...mapState(["cityName"])
  },
  components: {
    shoplist
  },

  methods: {
    ...mapMutations(["update"]),
    getCityName(){
        var myAmapFun = new amapFile.AMapWX({
        key: "3fab6f1c5564f0c55818b26348612d3d" //高德地图注册的API KEY
      });
      myAmapFun.getRegeo({
        success:(data)=> {
          console.log(data)
          this.update({
              cityName:data[0].regeocodeData.addressComponent.city
              .toString()
              .split(" ")[0]
          })
          //console.log(this.cityName)
        },
        fail:(info)=>{
          //失败回调
          console.log(info);
          //如果用户拒绝授权
          // 默认为北京
          this.cityName = "北京市";
          this.update({ cityName: "北京市" });
        }
      });
      
    },
    getMapShow(){
        wx.getLocation({   //获取当前位置的经纬度
        type: 'wgs84', // 返回可以用于wx.openLocation的经纬度
        success:(res)=>{
          //console.log(res,"这是getLocation")
          this.latitude = res.latitude
          this.longitude = res.longitude
          wx.setStorageSync("latitude", this.latitude)
          wx.setStorageSync("longitude", this.longitude)
          console.log(this.latitude,this.longitude)
          



          
        }
      })
    },
    close:function(){
      this.isnew=true
      this.showmember=false,
      this.isXiche=false
    },
    closemodal(){
        this.isnew=false,
        this.isshow=false,
        this.showmember=false,
        this.isXiche=true
    },
    change:function(name){
      //console.log(name)
      this.active=name
      if(name=="到店"){
        //console.log(666)
        this.isXiche=false,
        this.isGoshop=true
      }else if(name=="上门"){
        this.isXiche=true,
        this.isGoshop=false
      }
    },
    washCar(){
       wx.navigateTo({ url: "/pages/location/main" });
    },
    goTo(e){
        var id=e
        if(id==1){
            wx.navigateTo({ url: "/pages/city/main" });
        }
        if(id==2){
            wx.navigateTo({ url: "/pages/shoplist/main" });
        }
        if(id==3){
            wx.navigateTo({ url: "/pages/shopdetail/main" });
        }
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
