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
          <!-- <map id="map" 
              :longitude="longitude"  地图中心经度
              :latitude="latitude"  地图中心纬度
              scale="10"  地图放大倍数
              :controls="controls"  地图控件，--我的位置
              @controltap="controltap" 地图控件点击事件
              :markers="markers"  地图标记
              @markertap="markertap"    地图标记点击事件--点击之后
              @regionchange="regionchange"  视野发生变化时 
              show-location 
              style="width: 750rpx; height: 1000rpx;">
            </map> -->
            <map id="map" 
              :longitude="longitude"  
              :latitude="latitude"  
              scale="13"  
              :controls="controls"  
              @controltap="controltap" 
              :markers="markers" 
              @markertap="markertap"   
              @regionchange="regionchange"  
              show-location 
              style="width: 750rpx; height: 94vh;">
            </map>
        </div>
        <!--弹框遮罩-->
        <cover-view class="mask-modal" v-if="isshow"></cover-view>
        <!--领取会员弹框-->
        <cover-view v-if="showmember" class="mask">
            <cover-view >
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
              您的当前位置不在服务范围内，无法提供上门服务，是否到店服务？
                <cover-view style="margin-top:20rpx;">
               提供上门服务，是否到店服务？
                </cover-view>
            </cover-view>
            <cover-view class="flex-container bottombtn">
                <cover-view style="width:50%;text-align:center;height:110rpx;line-height:110rpx" @click="close">取消</cover-view>
                <cover-view @click="confirm" style="width:50%;text-align:center;height:110rpx;line-height:110rpx;color:#ff6325;border-left:1rpx solid #f5f5f5">确认</cover-view>
            </cover-view>
        </cover-view>
        <!--新用户礼券-->
        <cover-view v-if="isnew" class="newgroup">
            <cover-image src="/static/images/newbg.png" class="newpic"/>
            <cover-image src="/static/images/close3.png" class="close"  @click="closeNewModal"/>
            <cover-view class="tuantile cover-text">送10元立减券</cover-view>
            <cover-view class="tuannew cover-text">绿妞新用户专享</cover-view>
            <cover-view class="tuanpick cover-text" @click="getNewConpon">立即领取</cover-view>
        </cover-view>
        <!--我要洗车-->
        <cover-view class="modal-xiche" v-if="isXiche && shopArr.length>0">
          <cover-view class="line flex-container" @click="choseLocation">
            <cover-view class="flex-container">
                <cover-image src="/static/images/yellow.png" class="diandian"/>
                <cover-view class="location-self">{{nowPlace}}</cover-view>
            </cover-view>
            <cover-image src="/static/images/back.png" style="width:12rpx;height:22rpx;"/>
          </cover-view>
          <cover-view class="line flex-container">
            <cover-view class="flex-container">
                <cover-image src="/static/images/yellow.png" class="diandian"/>
                <cover-view class="location-self">{{name}}</cover-view>
            </cover-view>
          </cover-view>
          <cover-view class="wash" @click="washCar">我要洗车</cover-view>
        </cover-view>
        <!--到店-->
        <cover-view class="modal-goshop" v-if="isGoshop && shopArr.length>0">
          <cover-view  @click="toShopdet(doorInfo.ShopId)">
            <cover-image :src="doorInfo.Logo" class="showimg" />
          </cover-view>
          <cover-view class="shopinfoflex"  @click="toShopdet(doorInfo.ShopId)">
            <cover-view class="shopname">{{doorInfo.ShopNick}}</cover-view>
            <cover-view class="addressflex">
              <cover-view class="flex-container">
                <cover-image v-for="item in doorInfo.ServiceScore" :key="item" src="/static/images/xing.png" class="xing"/>
                <!-- <cover-image src="/static/images/xing.png" class="xing"/>
                <cover-image src="/static/images/xing.png" class="xing"/>
                <cover-image src="/static/images/xing.png" class="xing"/>
                <cover-image src="/static/images/xing.png" class="xing"/> -->
              </cover-view>
              <cover-view class="start">{{doorInfo.ServiceScore}}.0分</cover-view>
              <cover-view class="time">{{doorInfo.BusinessHours}}</cover-view>
            </cover-view>
            <cover-view class="address">{{doorInfo.Address}}</cover-view>
          </cover-view>
          <cover-view class="rights" style="z-index:999" @click="getMap">
            <cover-image src="/static/images/rembg.png" class="big"/>
            <cover-image src="/static/images/wei.png" class="small"/>
            <cover-view class="span-info">{{doorInfo.Distance>1000?'1000+':doorInfo.Distance}}km</cover-view>
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
    // this.getCityName() //获取定位位置和城市
    // this.getDoorShopinfo()//默认获取上门的门店信息
  },
  onShow(){
    wx.stopPullDownRefresh()
    this.initData()
    this.userId = wx.getStorageSync('userId');
      this.token = wx.getStorageSync('token');
      if(this.userId && this.token){
        // 初始展示上门还是到店

      if(this.$root.$mp.query.name){
        this.change(this.$root.$mp.query.name)
      }
    this.getCityName() //获取定位位置和城市
    
        if(this.active=="上门"){
          this.getDoorShopinfo() //要显示的店铺信息*******到店跟上门分开
        }else{
          this.getShopShopinfo()
        }
        console.log("userId:"+this.userId+"token:"+this.token,"首页获取token");
          Promise.all([
              // this.judgeCityName(),
              // this.getCoupon(),
              this.isNewVip(),
              //this.getCityName(),this.getMapShow(),this.getCoupon(),this.isNewVip()
          ]).then(
            ()=>{
              
              // if(this.isshow==false){
              //   this.isXiche=true
              // }else{
              //   this.isXiche=false
              // }
            }
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
    },
    
    // shopArr:function(){
    //     if(this.shopArr == ""){
    //       this.isshow=true
    //       this.showShop=true
    //   }
    // },
    // 更改城市名称
    // cityName:function(){
      // this.getMapShow()
    // }
  },
  data () {
    return {
      latitude:0,
      longitude:0,
      shopId:"",//展示的商户id
      name:"", //展示的商户名称
      shopNick:"",//导航的店铺名称
      shopLat:"",
      shopLng:"",//店铺的经纬度 用户导航
      address:"",
      userId:"",
      token:"",
      markerId: "1",
      points:"", //缩放视野以包含所有给定的坐标点  //bindmarkertap  点击标记点时触发，会返回marker的id  bindcallouttap 点击标记点对应的气泡时触发，会返回marker的id  bindcontroltap	点击控件时触发，会返回control的id
      shopArr:[],//商铺信息集合
      shopInfo:{}, //上门的店铺信息
      doorInfo:{},//到店的商铺信息
      markers: [], //不显示
      controls: [{  //控件不随着地图移动
          id: 1,
          iconPath: '/static/images/location.png',
          position: {
            left: 0,
            top: 300,
            width: 30,
            height: 30
          },
          clickable: true
      }],
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
      dddd:false,
      cityName:'定位中..'
    }
  },
  computed:{
    ...mapState(["cityName","nowPlace","longitude","latitude","showMask"])
  },
  
  methods: {
    ...mapMutations(["update"]),
    initData(){
        this.isshow=false
        this.showmember=false
        this.isnew=false
        this.isGoshop=false
        this.showShop=false
        // this.active='上门'
        this.$store.commit('update',{ latitude:0,
                        longitude:0
                        });
    },
    controltap(){  //点击地图上control 回到当前定位点
        this.getCityName()
    },
    //判断是否有城市名 没有的话就定位获取城市名 有就执行getMap
    judgeCityName(){
      // if(this.cityName=="定位中.."){
        this.getCityName()
      // }
      // else{
      //   this.getMapShow()
      // }
    },
    getCityName(){  //首次进入页面获取手机所在地城市经纬度
      wx.getLocation({
          type: 'wgs84',
          success:(data)=> {
          // console.log(data,"微信地图")
          this.latitude=data.latitude
          this.longitude=data.longitude
          this.$store.commit('update',{ latitude:data.latitude,
                        longitude:data.longitude
                        });
         console.log('重新定位',data.latitude,data.longitude);
          this.getCityinfo().then(()=>{
            console.log('获取到的name',this.$store.state.cityName)
            if(this.cityName!==this.$store.state.cityName&&this.$store.state.cityName!=='定位中..'){
            console.log('执行的name',this.$store.state.cityName)
              this.cityName=this.$store.state.cityName;
              this.isXiche=false //我要洗车
              this.isGoshop=false
              this.update({'cityName':'定位中..'})
              this.getMapShow(true).then(()=>{
                if(this.active=="上门"){
                  this.isshow=true
                   this.showShop=true
                   this.getShopShopinfo()
                }
              })
            }
          })
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
    getMapShow(status){  //根据城市名称获取地图
     return new Promise((resolved,rejected)=>{
      
       wx.request({
            url:"https://api.map.baidu.com/geocoder/v2/?ak=KpdqD9A6OzIRDWUV1Au2jcPgy9BZxDGG&address="+this.cityName+"&output=json&src=webapp.baidu.openAPIdemo&coord_type= bd09ll",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success:(res)=>{
              //console.log(res,"根据市获取地图")
              if(res.data.result){
                const _res = res.data.result.location
                this.update({ latitude:res.data.result.location.lat,
                              longitude:res.data.result.location.lng
                });
                //   //console.log(this,"选择位置页面")
                const MapContext=wx.createMapContext("map")
                MapContext.getCenterLocation({
                  success:(res)=>{
                      console.log(this.latitude,this.longitude,"经纬度中心")
                      //console.log(res,"获取地图中心位置经纬度")//还是原始位置的中心
                      let centerMarker=[]
                      centerMarker=[{
                          iconPath: "/static/images/person.png",
                          id:0,
                          latitude: this.latitude,
                          longitude: this.longitude,
                          width:40,
                          height:45
                      }]
                     // console.log(centerMarker,"中心标记")
                      // this.markers=this.markers.concat(centerMarker)
                      function sortId(a,b){
                          return a.id-b.id
                      }
                      // this.markers.sort(sortId)
                    //console.log(this.markers,this.markers.length,"markers数组")
                  }
                })
                if(!status){
                this.getCityinfo()
                }
                resolved()
              }
          }
        })
        
     })
    },
    getCityinfo(){   //根据经纬度获取城市名称nowPlace 反地理转码
    return new Promise((resolved,rejected)=>{
      const that = this;
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
                console.log(res,"地理转码")
                if(res.data.result){
                  that.cityName= res.data.result.addressComponent.city
                that.update({
                    // cityName:res.data.result.addressComponent.city,
                    nowPlace:res.data.result.formatted_address
                })
                wx.setStorageSync("cityName",that.cityName)
                }
              console.log(that.cityName,that.nowPlace,"获取城市以及中心点位置")
              resolved()
          }
        })
        
    })
    },
    //根据手机所在地经纬度获取上门周围商铺信息
    async getDoorShopinfo(){
      var res=await post("/Shop/NearbyShop",{
          Lat:this.latitude,
          Lng:this.longitude
      })
      //console.log(res,"上门所有的商铺信息")
      this.getShopArr(res)
    },
    //获取到店商铺信息
    async getShopShopinfo(){
      let res=await post("/Shop/SearchShopList",{
          Lat:this.latitude,
          Lng:this.longitude,
          Page:"1"
        })
        //console.log(res,"到店所有的商铺信息")
        this.getShopArr(res)
    },
    //店铺集合
    getShopArr(res){
       if(res.code==0){
        this.shopArr=res.data //所有店铺信息的集合
        console.log(this.shopArr,'shoparr')
        //根据上门的数组长度判断是否在服务范围之内
        if(this.shopArr.length<=0 && this.active=="上门"){
            this.isshow=true
            this.showShop=true
            return false;
        }
        this.markers=[]
        //console.log(this.shopArr,'66666666666666666666666')
        let arr=[]  //保存markers数组
        for (let i=0;i<res.data.length;i++){
          //console.log(res.data[i])
          let latitude =res.data[i].Lat; 
          let longitude =res.data[i].Lng;
          let marker= {
            iconPath: "/static/images/cart.png",
            id:i+1,
            name:res.data[i].ShopNick || '',
            latitude: latitude,
            longitude: longitude,
            width:24,
            height:27.5
          };
          arr.push(marker)
        }
        //this.markers=arr
        //console.log(arr,"商铺标记集合")
        
        this.markers=this.markers.slice(0,1).concat(arr)
        //console.log(this.markers,this.markers.length,"markers数组")
        function sortId(a,b){
            return a.id-b.id
        }
        this.markers.sort(sortId)
        if(this.active=="上门"){
          this.getNearShop() //要显示的店铺信息*******到店跟上门分开
        }else{
          this.getDoorShop()
        }
        
      }
    },
    getNearShop(){  //上门获取markers标记时的商户信息
        console.log(this.markerId,this.shopArr,"上门店铺标记id")
        this.shopInfo=this.shopArr[this.markerId-1]
        console.log(this.shopInfo,"要显示上门的商铺的信息111111111111111")
        this.name=this.shopInfo.ShopNick
        this.shopId=this.shopInfo.ShopId
    },
    getDoorShop(){  //到店获取markers标记时的商户信息
        console.log(this.markerId,this.shopArr,"到店店铺标记id")
        this.doorInfo=this.shopArr[this.markerId-1]
        console.log(this.doorInfo,"要显示到店的商铺的信息2222222222222")
        this.shopLat=this.doorInfo.Lat*1
        this.shopLng=this.doorInfo.Lng*1
        this.address=this.doorInfo.Address
        this.shopNick=this.doorInfo.ShopNick
        // this.name=this.doorInfo.ShopNick
        // this.shopId=this.doorInfo.ShopId
        this.$set(this.doorInfo,'Distance',(this.doorInfo.Distance*1).toFixed(2))
       
        if(this.doorInfo.BusinessHours.length>10){
            this.$set(this.doorInfo,'BusinessHours',this.doorInfo.BusinessHours.split(" ")[1])
            //this.doorInfo.BusinessHours=this.doorInfo.BusinessHours.split(" ")[1]
        }
        //console.log(this.doorInfo,"店铺详情")
    },
    markertap(e){  //点击标记点
        console.log(this.markers,"点击标记时")
        console.log(e,"正在点击标记")
        console.log(this.shopInfo,"点击的商户信息")
        if(e.mp.markerId==0){
          return false
        }else{
            this.markerId  = e.mp.markerId;
            this.changeMarkerColor(); //更改样式
            if(this.active=="上门"){
               this.getNearShop()
              this.isXiche=true
            }else{
              this.isGoshop=true
              this.getDoorShop()
            }
           
        }
        
    },
    changeMarkerColor() { //更改用户选中的标记样式
      this.markers.forEach((item, index) => {
        console.log(item,'遍历的商户item')
        console.log(this.latitude,this.longitude,'原来的坐标')
        if (item.id == this.markerId && this.markerId !=0){
          item.iconPath = "/static/images/bigcar.png";
          item.width=48;
          item.height=55
          this.latitude=item.latitude*1;
          this.longitude=item.longitude*1;
          this.$store.commit('update',{ latitude:item.latitude*1,
                        longitude:item.longitude*1
                        });
        console.log(this.latitude,item.latitude,'现在的坐标')
        // }else if(item.id != this.markerId&&index!==0){
        }else if(item.id != this.markerId){
          item.iconPath = "/static/images/cart.png";
          item.width=24;
          item.height=27.5
        }
      })
      // this.markers.map((item) => {
      //   //console.log(item.id)
      //   if (item.id == this.markerId){
      //     item.iconPath = "/static/images/bigcar.png";
      //     item.width=48;
      //     item.height=55
      //   }else if(item.id != 0){
      //     item.iconPath = "/static/images/cart.png";
      //     item.width=24;
      //     item.height=27.5
      //   }
      // })
      
    },
    async getCoupon(){ //判断是否是新人  三天内
          console.log(this.$store.state.showMask,"this.$store.state.showMask")
        if(!this.$store.state.showMask){
            const res=await post("/Coupon/IsNewUser",{ 
              UserId: this.userId,
              Token:this.token
          })
          console.log(res,"判断是否是新人")
          if(res.data.IsNewUser==1 && res.data.IsNewCoupon==1){
          //if(res.data.IsNewUser==1){
            this.isshow=true
            this.isnew=true
            this.showmember=false
          }
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
        // this.isshow=false
        // this.isnew=false
        this.isnew=false
        this.isshow=true
        this.showmember=true
        // this.isXiche=false
    },
    async isNewVip(){  //验证是否vip
          console.log(this.$store.state.showMask,"this.$store.state.showMask")
      if(!this.$store.state.showMask){
          let res=await post("/User/VerifyVIP",{
            UserId: this.userId,
            Token:this.token
        })
        //console.log(res,"领取vip  ")
        if(res.code==0){
          if(res.data.IsVip==0){
            //不是vip弹出领取vip点击开通vip
            if(this.isnew==true){  //如果弹出来新人框
                this.showmember=false
            }else{
                this.isshow=true
                this.showmember=true
                this.isnew=false
            }
          }
        }
        setTimeout(()=>{
          this.update({'showMask':true})
        },3000)
      }
        
    },
    closeNewModal(){  //关闭新人框
        this.isnew=false,
        this.isshow=true,
        this.showmember=true
        // this.isXiche=false
    },
    closeModal(){  //关闭vip框
        this.isnew=false,
        this.isshow=false,
        this.showmember=false
        // this.isXiche=true
    },
    close(){
      this.isshow=false
      this.showShop=false
    },
    confirm(){
      this.isshow=false
      this.showShop=false
      this.active='到店'
      this.isGoshop=false
      this.isXiche=false //我要洗车
      //this.getShopinfo()
    },
    change:function(name){
      //console.log(name)
      this.active=name
      if(name=="到店"){
        //console.log(666)
        this.isXiche=false
        this.isGoshop=false
        this.markerId="1"
        this.shopArr=[]
        //获取最近的商家显示
        this.getCityName()
        this.getShopShopinfo() //获取到店商铺标记信息
      }else if(name=="上门"){
        this.isXiche=false
        this.isGoshop=false
        this.markerId="1"
        this.shopArr=[]
        this.getCityName()
        this.getDoorShopinfo() //上门
      }
    },
    choseLocation(){
        wx.navigateTo({ url: "/pages/locationorder/main" });
    },
    washCar(){
      //console.log(this.shopId)
      wx.setStorageSync("shopInfo",this.shopInfo)
      console.log(this.shopInfo,this.shopId,"跳转我要洗车")
       wx.navigateTo({ url: "/pages/location/main?shopId="+this.shopId });
    },
    goTo(e){
        if(e==1){
            wx.navigateTo({ url: "/pages/city/main" });
        }
        if(e==2){
            wx.navigateTo({ url: "/pages/shoplist/main" });
        }
    },
    toShopdet(e){
      wx.navigateTo({ url: "/pages/shopdetail/main?shopid=" +e});
    },
    getMap(){  //导航功能
      wx.openLocation({
        latitude:this.shopLat*1,
        longitude:this.shopLng*1,
        address:this.address,
        name:this.shopNick,
        scale: 18
      })
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
  .cover-text{
    position:absolute;
    color:#fff
}
.centermark{
  width:80rpx;
  height:92rpx;
}
</style>
