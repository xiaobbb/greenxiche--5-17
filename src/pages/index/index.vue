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
          <map id="map"  :longitude="longitude" :latitude="latitude"  scale="15" :controls="controls"  :markers="markers"   @markertap="markertap"   @regionchange="regionchange"   @controltap="controltap" show-location style="width: 100%; height: 1000rpx;"></map>
          <!-- <img src="/static/images/location.png" class="location-logo"> -->
          <!-- <img src="/static/images/person.png" class="mine-pic" v-if="isXiche">
          <img src="/static/images/bigcar.png" class="mine-pic" v-if="isGoshop">
          <img src="/static/images/cart.png" class="car-small" v-if="!isshow"> -->
        </div>
        <div id="cont"></div>
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
            <span class="location-self">{{nowPlace}}</span>
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
    this.getShopinfo()
  },
  data () {
    return {
      latitude:"",
      longitude:"",
      markerId: 0,
      points:"", //缩放视野以包含所有给定的坐标点  //bindmarkertap  点击标记点时触发，会返回marker的id  bindcallouttap 点击标记点对应的气泡时触发，会返回marker的id  bindcontroltap	点击控件时触发，会返回control的id
      markers: [{
        iconPath: '/static/images/cart.png',
        id: 2,
        latitude: "23.099994",
        longitude: "113.324520",
        width: 50,
        height: 50
      }], //不显示
      circle:[{
          latitude:this.latitude,
          longitude:this.longitude,
          color:"#f00",
          fillColor:"#f4f4f4",
          radius:20,
          strokeWidth:5

      }],   //不显示
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
      showShop:false,
      showmember:false,
      isXiche:false,
      isGoshop:false,
      isnew:true
    }
  },
  computed:{
    ...mapState(["cityName","nowPlace"])
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
          console.log(data,"高德地图")
          let { name, desc, latitude, longitude } = data[0];
          let { city } =data[0].regeocodeData.addressComponent;
          this.update({
              // cityName:data[0].regeocodeData.addressComponent.city
              cityName:city.toString().split(" ")[0],
              nowPlace:name
          })
          
          this.latitude=latitude
          this.longitude=longitude
          //console.log(this.cityName)
          wx.setStorageSync("cityName",this.cityName)
          wx.setStorageSync("latitude",latitude)
          wx.setStorageSync("longitude",longitude)
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
    
    //根据手机所在地经纬度获取周围商铺信息
    async getShopinfo(){
      var res=await post("/Shop/NearbyShop",{
          Lat:this.latitude,
          Lng:this.longitude
      })
      //console.log(res)
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
          arr.push(marker)
        }
        this.markers=arr
        console.log(this.markers,"markers数组")
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
