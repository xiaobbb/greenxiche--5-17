<template>
  <div  class="backgray">
      <div>
        <!--顶部导航栏-->
        <div class="head white">
            <div @click="goTo(1)">
              <span class="province">{{cityName}}</span>
              <img src="/static/images/bottom.png" class="img-bottom">
            </div>
            <div v-for="item in titlelist" :key="item.name" :class="{active:active==item.name}" @click="change(item.name)">{{item.name}}</div>
            <div class="list-img"  @click="goTo(2)">
              <img src="/static/images/right.png" class="container-img">
              <img src="/static/images/list.png" class="list">
            </div>
        </div>
        <div class="location glo-relative">
            <map id="map" :longitude="longitude" :latitude="latitude"  scale="13" :controls="controls" :markers="markers" @markertap="markertap"   @regionchange="regionchange"   @controltap="controltap" show-location style="width: 750rpx; height: 1000rpx;"></map>
        </div>
        <!--弹框遮罩-->
        <cover-view class="mask-modal" v-if="isshow"></cover-view>
        <!--领取会员弹框-->
        <cover-view v-if="showmember" class="mask">
            <cover-view >
                <cover-image src="/static/images/modal.png" class="mask-img"/>
                <cover-image src="/static/images/close3.png" class="close" style="border:1px solid blue"  @click="closeModal"/>
                <cover-view class="text text1">
                  <cover-view>优惠洗车</cover-view>
                  <cover-view>到店洗车减免20%</cover-view>
                </cover-view>
                <cover-view class="text text2">
                  <cover-view>服务卡券</cover-view>
                  <cover-view>不定期赠送洗车的卡券</cover-view>
                </cover-view>
                <cover-view class="text text3">
                  <cover-view>预约便捷</cover-view>
                  <cover-view>预约洗车更方便快捷</cover-view>
                </cover-view>
            </cover-view>
            <!-- <cover-view @click="close">
              <cover-image src="/static/images/vip.png" class="vipbtn"/>
            </cover-view> -->
        </cover-view>
        
        <!--提示不在服务范围内-->
        <cover-view v-if="showShop" class="maskshop">
            <cover-view class="title">
              <cover-view>您的当前位置不在服务范围内，无法提供上门服务，是否到店服务？</cover-view>
            </cover-view>
            <cover-view class="flex-container bottombtn">
                <cover-view>取消</cover-view>
                <cover-view @click="confirmDel">确认</cover-view>
            </cover-view>
        </cover-view>
        <!--新用户礼券-->
        <cover-view v-if="isnew" class="newgroup">
            <cover-image src="/static/images/newbg.png" class="newpic"/>
            <cover-image src="/static/images/close3.png" class="close"  @click="closeModal"/>
            <cover-view class="tuantile cover-text">送10元立减券</cover-view>
            <cover-view class="tuannew cover-text">绿妞新用户专享</cover-view>
            <cover-view class="tuanpick cover-text" @click="getNewConpon">立即领取</cover-view>
        </cover-view>
        <!--我要洗车-->
        <cover-view class="modal-xiche" v-if="isXiche">
          <cover-view class="line flex-container" style="padding:30rpx">
            <cover-view class="flex-container"  @click="choseLocation">
                <cover-image src="/static/images/yellow.png" class="diandian"/>
                <cover-view class="location-self">{{nowPlace}}</cover-view>
            </cover-view>
            <cover-image src="/static/images/back.png" style="width:12rpx;height:22rpx;border:1px solid red"/>
          </cover-view>
          <cover-view class="wash" @click="washCar">我要洗车</cover-view>
        </cover-view>
        <!--到店-->
        <cover-view class="modal-goshop" v-if="isGoshop" @click="goTo(3)">
          <cover-view>
            <img :src="shopInfo.Logo" class="showimg">
          </cover-view>
          <cover-view class="shopinfoflex">
            <cover-view class="shopname">{{shopInfo.ShopNick}}</cover-view>
            <cover-view class="addressflex">
              <cover-view class="flex-container">
                <cover-image src="/static/images/xing.png" class="xing"/>
                <cover-image src="/static/images/xing.png" class="xing"/>
                <cover-image src="/static/images/xing.png" class="xing"/>
                <cover-image src="/static/images/xing.png" class="xing"/>
                <cover-image src="/static/images/xing.png" class="xing"/>
              </cover-view>
              <cover-view class="start">5.0分</cover-view>
              <cover-view class="time">{{shopInfo.BusinessHours}}</cover-view>
            </cover-view>
            <cover-view class="address">{{shopInfo.Address}}</cover-view>
          </cover-view>
          <cover-view class="rights">
            <cover-image src="/static/images/rembg.png" class="big"/>
            <cover-image src="/static/images/wei.png" class="small"/>
            <cover-view class="span-info">{{shopInfo.Distance}}m</cover-view>
          </cover-view>
        </cover-view>
    </div>
    
  </div>
</template>


<script>
import { get, myget, mypost, post, toLogin } from "../../utils";
import amapFile from "../../utils/amap-wx"; //高德地图API调用JS SDK
import { mapState, mapMutations } from "vuex"; //vuex辅助函数
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad() {
    
   
  },
  onShow(){
    this.userId = wx.getStorageSync('userId');
    this.token = wx.getStorageSync('token');
    if(this.userId && this.token){
      console.log("userId:"+this.userId+"token:"+this.token);
        Promise.all([
            this.getCityName(), this.isNewVip(),this.getCoupon()
        ]).then(
          this.isXiche=true
         
        )
       
    }else{
      wx.navigateTo({ url :"/pages/login/main"})
    }
    
  },
  watch:{
    '$store.state':{
      handler:function() {   
        const state = this.$store.state;
        this.longitude = state.longitude;
        this.latitude = state.latitude;
        // if(this.longitude||this.latitude){
        //   this.getCityinfo();
        // }
        },
        deep: true 
    }
  },
  data () {
    return {
      userId:"",
      token:"",
      markerId: 0,
      points:"", //缩放视野以包含所有给定的坐标点  //bindmarkertap  点击标记点时触发，会返回marker的id  bindcallouttap 点击标记点对应的气泡时触发，会返回marker的id  bindcontroltap	点击控件时触发，会返回control的id
      shopArr:[],//商铺信息集合
      shopInfo:{}, //marker店铺信息
      markers: [], //不显示
      controls: [],
      titlelist:[
       {name:"上门"}, {name:"到店"},
      ],
      active:'上门',
      isshow:false,
      showShop:false, //提示不在服务范围
      showmember:false,  //是否是vip
      isXiche:false,  //我要洗车
      isGoshop:false,//到店洗车最近的一家商铺
      isnew:false,   //是否是新人
    }
  },
  computed:{
    ...mapState(["cityName","nowPlace","longitude","latitude"])
  },
  
  methods: {
    ...mapMutations(["update"]),
    
    controltap(){  //点击地图上control 回到当前定位点
        this.getCityName()
    },
    choseLocation(){
        wx.navigateTo({ url: "/pages/locationorder/main" });
    },
    getCityName(){
      wx.getLocation({
          type: 'wgs84',
          success:(data)=> {
          // console.log(data,"微信地图")
          // this.latitude=data.latitude
          // this.longitude=data.longitude
          this.$store.commit('update',{ latitude:data.latitude,
                        longitude:data.longitude
                        });
          this.getCityinfo()
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
    getCityinfo(){
       //console.log(this.latitude,this.longitude,"首页")
      // KpdqD9A6OzIRDWUV1Au2jcPgy9BZxDGG
         wx.setStorageSync("latitude",this.latitude)
         wx.setStorageSync("longitude",this.longitude)
       //console.log(this.latitude,this.longitude,"首页获取商户")
        wx.request({
            url: "https://api.map.baidu.com/geocoder/v2/?ak=KpdqD9A6OzIRDWUV1Au2jcPgy9BZxDGG&location="+this.latitude+","+this.longitude+"&output=json&src=webapp.baidu.openAPIdemo",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success:(res)=>{
                //console.log(res,"地理转码")
                if(res.data.result){
                this.update({
                    cityName:res.data.result.addressComponent.city,
                    nowPlace:res.data.result.formatted_address
                })
                wx.setStorageSync("cityName",this.cityName)
                }
              console.log(this.cityName,this.nowPlace)
          }
        })
        
    },
    //根据手机所在地经纬度获取周围商铺信息
    async getShopinfo(){
      var res=await post("/Shop/NearbyShop",{
          Lat:this.latitude,
          Lng:this.longitude
      })
      console.log(res)
      if(res.code==0){
        this.shopArr=res.data
        this.getNearShop()
        let arr=[]  //保存markers数组
        for (let i=0;i<res.data.length;i++){
          //console.log(res.data[i])
          let latitude =res.data[i].Lat; 
          let longitude =res.data[i].Lng;
          let marker= {
            iconPath: "/static/images/cart.png",
            id:i,
            // name:res.data[i].ShopNick || '',
            latitude: latitude,
            longitude: longitude,
            width:48,
            height:55
          };
          arr.push(marker)
        }
        this.markers=arr
        console.log(this.markers,"markers数组")
      }
    },
    getNearShop(){  //获取markers标记时的商户信息
        this.shopInfo=this.shopArr[this.markerId]
        this.$set(this.shopInfo,'Distance',this.shopInfo.Distance.toFixed(2))
        this.$set(this.shopInfo,'BusinessHours',this.shopInfo.BusinessHours.split(" ")[1])
        console.log(this.shopInfo,"店铺详情")
    },
    markertap(e){  //点击标记点
        console.log(e)
        this.markerId  = e.mp.markerId;
        // //this.showMarkerInfo(marker);//展示标记的信息
        this.changeMarkerColor(); //更改样式
        this.getNearShop()
    },
    changeMarkerColor() { //更改用户选中的标记样式
      this.markers.forEach((item, index) => {
        item.iconPath = "/static/images/cart.png";
        if (index == this.markerId){
          item.iconPath = "/static/images/bigcar.png";
          item.width=80;
          item.height=95
        }else{
          item.iconPath = "/static/images/cart.png";
          item.width=24;
          item.height=27.5
        }
      })
      
    },
    async getCoupon(){ //判断是否是新人  三天内
      const res=await post("/Coupon/IsNewUser",{ 
          UserId: this.userId,
          Token:this.token
      })
      //console.log(res,"判断是否是新人")
      if(res.data.IsNewUser==1 && res.data.IsNewCoupon==1){
         this.isshow=true
         this.isnew=true
      }
    },
    async getNewConpon(){  //领取新人礼券
        let res=await post("/Coupon/GetNewCoupon",{
            UserId: this.userId,
            Token:this.token
        })
        console.log(res,"领取新人礼券")
        if(res.code==0){
          wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 2000,
            complete: function (){
              
            }
          });
        }
    },
    async isNewVip(){  //验证是否vip
        let res=await post("/User/VerifyVIP",{
            UserId: this.userId,
            Token:this.token
        })
        console.log(res,"领取vip  ")
        if(res.code==0){
          if(res.data.IsVip==1){
            //不是vip弹出领取vip点击开通vip
            this.isshow=true
            this.showmember=true
          }
        }
    },
    close:function(){
      this.isnew=true
      this.showmember=false,
      this.isXiche=false
    },
    closeModal(){
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
        this.isGoshop=true,
        //获取最近的商家显示
        this.getShopinfo() //获取地图上的商铺标记信息
      }else if(name=="上门"){
        this.isXiche=true,
        this.isGoshop=false,
        this.markers=[]
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
  .cover-text{
    position:absolute;
    color:#fff
}
.centermark{
  width:80rpx;
  height:92rpx;
}
</style>
