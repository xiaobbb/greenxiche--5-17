<template>
  <div>
    <!--填写订单-->
    <div class="glo-relative">
        <!-- <img src="/static/images/cartbg5.png" class="shopbg"> -->
        <map id="map"  :longitude="longitude" :latitude="latitude"  scale="15" :controls="controls"  :markers="markers"   @markertap="markertap"   @regionchange="regionchange"   @controltap="controltap" show-location style="width: 100%; height:480rpx;"></map>
    </div>
    <!--列表-->
    <div class="list">
        <div class="item" @click="chosePlace">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">{{nowPlace}}</span>
            <img src="/static/images/back.png" class="back" >
        </div>
        <p class="hr"></p>
        <div class="item" @click="choseItem">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self" style="width:90%;">{{serTip}}</span>
            <img src="/static/images/back.png" class="back" >
        </div>
        <p class="hr"></p>
        <div class="item"  @click="choseTime">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">{{timetip}}</span>
            <img src="/static/images/back.png" class="back">
        </div>
        <p class="hr"></p>
        <div class="item"  @click="choseCar">
            <img src="/static/images/yellow.png" class="diandian">
            <span class="location-self">{{cartip}}</span>
            <img src="/static/images/back.png" class="back">
        </div>
        <p class="hr"></p>
        <div class="item"  @click="choseMoney">
            <img src="/static/images/yellow.png" class="diandian">
            <p class="location-self">价格 : {{total}}</p>
            <div style="width:40%; margin-left:230rpx;text-align:right">
                <p class="taginfo">
                  <img src="/static/images/tag.png" class="tag">
                  <span class="goods">充值有优惠</span>
                </p>
                <img src="/static/images/back.png" class="back">
            </div>
            
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
            <span @click="addpics">添加现场照片 ({{PicList.length}})</span><span @click="addinfo">备注信息: {{Remarks}}</span>
        </div>
        <div class="chase" @click="toPay">立即下单</div>
    </div>
     <!-- <Pay :showPay.sync="showPay" :orderNumber="orderNumber" 
    :total="total" :successUrl="'/pages/myorder/main'" :closeUrl="'/pages/myorder/main'"
    ></Pay> -->
  </div>
</template>

<script>
import Pay from "@/components/pay.vue";
import "../../css/common.css";
import "../../css/global.css";
import { get, myget, mypost, post, toLogin } from "../../utils";
import { mapState, mapMutations } from "vuex"; //vuex辅助函数
export default {
  onLoad(){
    this.setBarTitle();
    this.personName=""
    this.personPhone=""
    this.ServiceItem=""
    this.AppointmentStartTime=""
    this.AppointmentEndTime=""
    this.PicList=""
    this.Remarks=""
    //this.cartip = "请选择车辆";
    this.timetip = "请选择服务时间";
    this.serTip = "请选择服务项目";
    this.total="0.00"
    
  },
  onShow() {
    console.log(this.latitude,this.longitude,"填写订单")
    this.showPay = false;
    this.shopId=this.$root.$mp.query.shopId
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.latitude=this.$store.state.latitude
    this.longitude=this.$store.state.longitude
    
    if(wx.getStorageSync("CarInfo").length>0){
         //获取车辆信息
          this.getCar();
    }else{
        this.CarInfoId=wx.getStorageSync("carId")
        //获取默认车辆的信息
        this.getDefaultCar()
    }
    //转换时间
    this.changeTime();
    //服务项目
    this.getSerItem();
    //备注
    const textinfo = this.$root.$mp.query.textinfo;
    if (textinfo) {
      this.Remarks = textinfo;
      //console.log(this.Remarks,"接收的备注")
    }
   
    //获取上门服务的地址
    this.address = this.$store.state.nowPlace;
    //console.log(this.latitude);
  },

  watch: {
    //图片
    "$store.state.pList": {
      handler: function() {
        const state = this.$store.state;
        this.PicList = state.pList;
        //console.log(this.PicList,"添加图片")
      },
      deep: true
    },
    "$store.state.nowPlace": {
      handler: function() {
        const state = this.$store.state;
        this.address = state.nowPlace;
        //console.log(this.address, "地址");
      },
      deep: true
    }
  },

  data() {
    return {
      showPay: false,
      address: "",
      serTip: "",  //服务项目
      timetip: "", //服务时间
      cartip: "",  //车辆
      total: "",  //总价
      userId: "",
      token: "",
      shopId:"",
      orderNumber: "", //订单编号
      personName: "", //姓名
      personPhone: "", //手机
      CarInfoId: "", //车子id
      ServiceItem: "", //服务项目id
      AppointmentStartTime: "", //预约开始时间
      AppointmentEndTime: "", //预约结束时间
      PicList: "", //图片合集; JsonString格式(多图)
      Remarks: "", //备注
      controls: [{
          //控件不随着地图移动
          id: 1,
          iconPath: "/static/images/location.png",
          position: {
            left: 0,
            top: 100,
            width: 30,
            height: 30
          },
          clickable: true
        }],
      markers:[{
        iconPath: "/static/images/person.png",
        id:1,
        latitude: this.latitude,
        longitude: this.longitude,
        width:40,
        height:45
      }],
    };
  },
  computed: {
    ...mapState(["cityName", "nowPlace", "longitude", "latitude"])
  },
  components: {
    Pay
  },

  methods: {
    ...mapMutations(["update"]),
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "填写订单"
      });
    },
    async getDefaultCar(){
      console.log(this.CarInfoId,"默认车辆id")
      let res=await post("/User/GetCarIdInfo",{
        UserId:this.userId,
        Token:this.token,
        CarId:this.CarInfoId
      })
      console.log(res,"获取默认车辆")
      if(res.code==0){
          this.cartip=res.data.CarBrand+res.data.CarType+res.data.CarMumber
      }
    },
    getCar() {
      //获取车辆
      const car = wx.getStorageSync("CarInfo");
      if (typeof car == "object") {
        this.cartip = car.CarBrand +" " +car.CarType + " " +car.CarColor +" " +car.CarMumber;
        this.CarInfoId = car.Id;
      }

      //console.log(this.cartip)
    },
    getSerItem() {
      //转换服务项目
      const Service = wx.getStorageSync("serItem");
      if (typeof Service == "object" && Service.length>0) {
        const SerItembox = [];
        const SerTipbox = [];
        let Serpricebox = 0;
        for (let i = 0; i < Service.length; i++) {
          SerItembox.push(Service[i].Id);
          SerTipbox.push(Service[i].Name);
          //console.log(typeof(this.Service[i].Price ))
          Serpricebox += Service[i].Price * 1 || 0;
        }
        this.total = Serpricebox.toFixed(2);
        this.serTip = SerTipbox.join(" ");
        this.ServiceItem = SerItembox.join(",");
      }
    },
    changeTime() {
      //转换时间格式
      const d = new Date();
      const year = d.getFullYear();
      let _time = wx.getStorageSync("timearr"); //时间
      let _date = wx.getStorageSync("datearr"); //日期
      //console.log(typeof _time, typeof _date,_time, _date,"页面接收");

      if (typeof _time === "object") {
        if (_time.length > 0) {
          let _mon = _date.split("月")[0]; //月份
          let _dd = _date.split("月")[1].split("日")[0]; //日期
          _mon.length < 2 ? (_mon = "0" + _mon) : _mon;
          _dd.length < 2 ? (_dd = "0" + _dd) : _dd;
          const tt = _mon + "-" + _dd;
          const time1 = [];
          for (let i of _time) {
            if (i.toString().length < 2) {
              i = "0" + i;
            }
            time1.push(i);
          }

          let mm = time1[0] + ":" + time1[1] + "-" + time1[2] + ":" + time1[3]; //时间
          if (tt && mm) {
            this.timetip = tt + "  " + mm;
            //开始时间结束时间
            this.AppointmentStartTime =year + "-" + tt + " " + mm.split("-")[0];
            this.AppointmentEndTime = year + "-" + tt + " " + mm.split("-")[1];
          }
          //console.log(this.AppointmentStartTime);
        }
      }
    },
    chosePlace() {
      wx.navigateTo({ url: "/pages/locationorder/main" });
    },
    choseItem() {
      //选择服务项目
      wx.navigateTo({ url: "/pages/servince/main?shopId=" + this.shopId});
    },
    choseMoney() {
      wx.navigateTo({ url: "/pages/sum/main?url=location" }); //充值
    },
    choseTime() {
      wx.navigateTo({ url: "/pages/writeorder/main" }); //时间
    },
    choseCar() {
      wx.navigateTo({ url: "/pages/mycar/main?url=location" }); //我的车辆
    },
    addpics() {
      wx.navigateTo({ url: "/pages/sceneplace/main" }); //添加图片
    },
    addinfo() {
      wx.navigateTo({ url: "/pages/signinfo/main" }); //添加备注
    },
    checkPhone() {
      //验证手机号
      const phoneNum = this.personPhone;
      if (!/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(phoneNum)) {
        wx.showToast({
          title: "请输入正确的手机号码！",
          icon: "none",
          duration: 2000
        });
        this.personPhone = "";
        return false;
      }
    },
    async toPay() {
      wx.setStorageSync("serItem", " ");
      wx.setStorageSync("CarInfo", " ");
      wx.setStorageSync("timearr", " ");
      wx.setStorageSync("datearr", " ");
      const _picList = JSON.stringify(this.PicList);
      //console.log(this.latitude, this.address, "经度信息");
      const params = {
        UserId: this.userId,
        Token: this.token,
        Lat: this.latitude,
        Lng: this.longitude,
        Addr: this.address,
        CarInfoId: this.CarInfoId,
        Remarks: this.Remarks,
        ServiceItem: this.ServiceItem,
        ContactName: this.personName,
        Tel: this.personPhone,
        //pList:_picList,
        AppointmentStartTime: this.AppointmentStartTime, //开始时间
        AppointmentEndTime: this.AppointmentEndTime
      };
      // const numsTure=this.userId && this.token && this.latitude && this.longitude && this.address && this.CarInfoId  && this.ServiceItem && this.AppointmentStartTime && this.AppointmentEndTime && this.personName && this.personPhone
      // console.log(this.numsTure)
      if(this.CarInfoId&&this.ServiceItem&&this.AppointmentEndTime){
        var res = await post("/Order/SubmitDoorOrders", params);
        // console.log(res);
        //如果有订单编号跳转支付页面
        if (res.code == 0) {
          this.orderNumber = res.data;
          //this.showPay = true; //支付组件
          wx.navigateTo({url:"/pages/orderpay/main?price="+this.total+"&orderNo="+this.orderNumber})
        }
      }else{
        wx.showToast({
          title: "请填写相关内容！",
          icon: "none",
          duration: 2000
        });
        return false
      }
      
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
@import "./style";
@import "../../css/common.css";
</style>
