<template>
  <div>
    <!--填写订单-->
    <div class="glo-relative bg-cart">
        <!-- <img src="/static/images/cartbg5.png" class="shopbg"> -->
        <map id="map"  :longitude="longitude" :latitude="latitude"  scale="15" :controls="controls"  :markers="markers"   @markertap="markertap"   @regionchange="regionchange"   @controltap="controltap" show-location style="width: 100%; height:560rpx;"></map>
        <cover-view>
            <cover-image src="/static/images/cart.png" class="cart-img"/>
        </cover-view> 
        
    </div>
    <!--列表-->
    <div class="list">
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">{{nowPlace}}</span>
            <img src="/static/images/back.png" class="back" @click="chosePlace">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">请选择服务项目</span>
            <img src="/static/images/back.png" class="back" @click="choseItem">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">{{timetip}}</span>
            <img src="/static/images/back.png" class="back" @click="choseTime">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">请添加车辆</span>
            <img src="/static/images/back.png" class="back" @click="choseCar">
        </div>
        <p class="hr"></p>
        <div class="item">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">价格 : 30.00</span>
            <p class="taginfo">
              <img src="/static/images/tag.png" class="tag">
              <span class="goods">充值有优惠</span>
              <img src="/static/images/white.png" class="yuan">
            </p>
            <img src="/static/images/back.png" class="back" @click="choseMoney">
        </div>
        <p class="hr"></p>
        <div class="item">
             <img src="/static/images/yellow.png" class="diandian">
             <p class="location-self">姓名 <input placeholder="请输入您的姓名" v-model="personName"/></p>
        </div>
        <p class="hr"></p>
        <div class="item">
             <img src="/static/images/yellow.png" class="diandian">
             <p class="location-self">手机 <input  placeholder="请输入您的手机号码" v-model="personPhone" @blur="checkPhone"/></p>
        </div>
        <p class="hr"></p>
        <div class="item sign">
            <span @click="addpics">添加现场照片 ({{PicList.length}})</span><span @click="addinfo">{{Remarks}}</span>
        </div>
        <div class="chase" @click="toPay">立即下单</div>
    </div>

  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
import { mapState, mapMutations } from "vuex"; //vuex辅助函数
export default {
   onLoad(){
    this.userId = wx.getStorageSync('userId');
    this.token = wx.getStorageSync('token');
    this.setBarTitle();
    //时间
    const tt=this.$root.$mp.query.tt
    const mm=this.$root.$mp.query.mm
    if(tt&&mm){
       this.timetip=tt+"  "+mm
    }
    //备注
    const textinfo=this.$root.$mp.query.textinfo
    if(textinfo){
      this.Remarks=textinfo
      console.log(this.Remarks,"接收的备注")
    }else{
      this.Remarks="备注信息"
    }
    //图片
    //const pList=this.$root.$mp
  },
  watch:{
    '$store.state.pList':{
        handler:function(){
          const state=this.$store.state
          this.PicList=state.pList
          //console.log(this.PicList,"添加图片")
        },
        deep:true
    }
  },
 
  data () {
    return {
        latitude: wx.getStorageSync("latitude"),
        longitude: wx.getStorageSync("longitude"),
        timetip:"请选择服务时间",
        userId:"",
        token:"",
        personName:"",//姓名
        personPhone:"",//手机
        CarInfoId:"",//车子id
        ServiceItem:"",//服务项目id
        AppointmentStartTime:"",//预约开始时间
        AppointmentEndTime:"",//预约结束时间
        PicList:"",//图片合集; JsonString格式(多图)
        Remarks:"备注信息",//备注
        controls: [{  //控件不随着地图移动
          id: 1,
          iconPath: '/static/images/location.png',
          position: {
            left: 0,
            top: 100,
            width: 30,
            height: 30
          },
          clickable: true
      }],
    }
  },
  computed:{
    ...mapState(["cityName","nowPlace"])
  },
  components: {
    
  },

  methods: {
    ...mapMutations(["update"]),
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "填写订单"
      });
    },
    chosePlace(){
        wx.navigateTo({ url: "/pages/locationorder/main" });
    },
    choseItem(){  //选择服务项目
        wx.navigateTo({ url: "/pages/servince/main?url=location"});
    },
    choseMoney(){
      wx.navigateTo({ url: "/pages/sum/main" }); //充值
    },
    choseTime(){
        wx.navigateTo({ url: "/pages/writeorder/main" }) //时间
    },
    choseCar(){
        wx.navigateTo({ url: "/pages/mycar/main" }); //我的车辆
    },
    addpics() {
      wx.navigateTo({ url: "/pages/sceneplace/main" }); //添加图片
    },
    addinfo() {
      wx.navigateTo({ url: "/pages/signinfo/main" });//添加备注
    },
    checkPhone(){ //验证手机号
      const phoneNum = this.personPhone;
      if (!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(phoneNum))) {
        wx.showToast({
          title: "请输入正确的手机号码！",
          icon: "none",
          duration: 2000
        });
        this.personPhone=""
        return false
        
      } 
    },
    async toPay(){
      console.log("支付啦")
      //验证手机号
      if(this.personName&&this.personPhone&&this.CarInfoId&&this.ServiceItem&&this.PicList&&this.Remarks&&this.timetip){
      let res=await post("/Order/SubmitDoorOrders",{
          UserId:this.UserId
      }) 
      //如果有订单编号跳转支付页面
        //wx.navigateTo({ url: "/pages/orderpay/main" });
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

</style>
