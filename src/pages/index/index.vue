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
        <div class="location glo-relative">
          <!-- <img src="/static/images/tupian.png" class="dingwei"> -->
          <!-- <div v-if="dddd"> -->
            <map id="map" :longitude="114.06031" :latitude="22.72174"  scale="5" :controls="controls"  :markers="markers"   @markertap="markertap"   @regionchange="regionchange"   @controltap="controltap" show-location style="width: 750rpx; height: 1000rpx;"></map>
          <!-- </div> -->
          <!-- <img src="/static/images/location.png" class="location-logo"> -->
          <!-- <img src="/static/images/person.png" class="mine-pic" v-if="isXiche">
          <img src="/static/images/bigcar.png" class="mine-pic" v-if="isGoshop">
          <img src="/static/images/cart.png" class="car-small" v-if="!isshow"> -->
        </div>
        <div id="cont"></div>
        <!--弹框遮罩-->
        <cover-view class="mask-modal" v-if="isshow"></cover-view>
        <!--领取会员弹框-->
        <cover-view v-if="showmember" >
            <cover-view class="mask">
                <cover-image src="/static/images/modal.png" class="mask-img"/>
                <cover-image src="/static/images/close3.png" class="close"  @click="closeModal"/>
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
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad() {
    this.userId = wx.getStorageSync('userId');
    this.token = wx.getStorageSync('token');
    this.getCityName()
    this.getShopinfo()
    this.getCoupon()//是否新用户
    this.isNewVip() //是否vip
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
      // latitude:"",
      // longitude:"",
      userId:"",
      token:"",
      markerId: 0,
      points:"", //缩放视野以包含所有给定的坐标点  //bindmarkertap  点击标记点时触发，会返回marker的id  bindcallouttap 点击标记点对应的气泡时触发，会返回marker的id  bindcontroltap	点击控件时触发，会返回control的id
      markers: [
        {
          height:55,
          width:48,
          iconPath:"http://www.sc-mall.net/static/f2.png",
          id:0,
          latitude:"21.642603",
          longitude:"113.031730",
          name:"家味康旗舰店"
        },
        {
          height:55,
          width:48,
          iconPath:"http://www.sc-mall.net/static/f2.png",
          id:1,
          latitude:"22.650543",
          longitude:"113.031730",
          name:"家味康旗舰店"
        }
      ], //不显示
      controls: [{  //控件不随着地图移动
        id: 1,
        iconPath: '/static/images/location.png',
        position: {
          left: 0,
          top: 200,
          width: 40,
          height: 40
        },
        clickable: true
      }],
      titlelist:[
        {name:"全部"}, {name:"上门"}, {name:"到店"},
      ],
      active:'上门',
      isshow:true,
      showShop:false, //提示不在服务范围
      showmember:true,  //是否是vip
      isXiche:false,  //我要洗车
      isGoshop:false,//到店洗车最近的一家商铺
      isnew:false,   //是否是新人
      dddd:false
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
                        console.log(data.latitude,data.longitude);
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
      console.log("bbbbbbbbbbbbbb");
      console.log(res)
      if(res.code==0){
        let arr=[]
        for (let i=0;i<res.data.length;i++){
          //console.log(res.data[i])
          let latitude =res.data[i].Lat; 
          let longitude =res.data[i].Lng;
          let marker= {
            iconPath: "/static/images/cart.png",
            id:i || 0,
            name:res.data[i].ShopNick || '',
            latitude: latitude,
            longitude: longitude,
            width:48,
            height: 55
          };
          // arr.push(marker)
        }
        // this.markers=arr;
        // let bb = {
        //   height:55,
        //   width:48,
        //   iconPath:"/static/images/cart.png",
        //   id:0,
        //   latitude:"21.642603",
        //   longitude:"113.031730",
        //   name:"家味康旗舰店"
        // }
        // this.markers.push(bb);
        this.dddd = true;

        console.log("markers");
        console.log(this.markers);
        //console.log(this.markers,"markers数组")
      }
    },
    
    makertap(e){  //点击标记点
        console.log(e)
        let { markerId } = e;
        let { markers } = this.data;
        let marker = markers[markerId];
        this.showMarkerInfo(marker);//展示标记的信息
        this.changeMarkerColor(markerId); //更改样式
    },
    changeMarkerColor(markerId) { //更改用户选中的标记样式
      let { markers } = this.data;
      markers.forEach((item, index) => {
        item.iconPath = "/static/images/cart.png";
        if (index == markerId){
          item.iconPath = "/static/images/bigcar.png";
          item.width=80;
          item.height=95
        } 
      })
      //this.setData({ markers, markerId });
      this.markers=markers
      this.markerId=markerId
    },
    async getCoupon(){ //判断是否是新人  三天内
      const res=await post("/Coupon/IsNewUser",{ 
          UserId: this.userId,
          Token:this.token
      })
      //console.log(res,"判断是否是新人")
      if(res.data.IsNewUser==0){
        //   wx.showToast({
        //     title: '您已经不是新用户啦。。。',
        //     icon: 'none',
        //     duration: 2000,
        //     complete: function (){
              
        //     }
        // });
        // 
      }else{
        //是新人 弹出领取新人礼券
        this.isshow=true
        this.isnew=true
        if(res.data.IsNewCoupon==0){
            wx.showToast({
            title: '活动已经结束啦。。。',
            icon: 'none',
            duration: 2000,
            complete: function (){
            }
          });
        return false
        }else{
          this.getNewConpon()
        }
      }
      
    },
    async getNewConpon(){  //领取新人礼券
        let res=await post("/Coupon/GetNewCoupon",{
            UserId: this.userId,
            Token:this.token
        })
       // console.log(res,"领取新人礼券")
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
        //console.log(res,"领取vip  ")
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
        this.getNearShopInfo()
      }else if(name=="上门"){
        this.isXiche=true,
        this.isGoshop=false
      }
    },
    washCar(){
       wx.navigateTo({ url: "/pages/location/main" });
    },
    getNearShopInfo(){

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
</style>
