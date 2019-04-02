<template>
  <div class="bggray">
     <!--顶部输入框-->
     <div class="white">
        <div class="topinput">
            <input type="text" placeholder="搜索商户" v-model="seartext"  @input="searchShop">
            <img src="/static/images/search.png" class="searchpic absolu">
            <img src="/static/images/cancle.png" class="canclepic absolu" @click="trimData">
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
        <!--排行榜-->
        <div @click="showBrand()"><img src="/static/images/gold.png" class="gold"></div>
    </div>
    <!--商户列表-->
    <div class="shoplist">
      <div class="shopitem flex-container white" @click="showItem(index)" v-for="(item,index) in shoplist" :key="index">
          <img :src="item.Logo" class="mycar">
          <div class="shopinfo flex-container">
              <div class="shopnamelist">{{item.ShopNick}}</div>
              <div class="shopclass flex-container">
                  <p>
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/xing.png" class="xing-point">
                    <img src="/static/images/gray1.png" class="xing-point">
                  </p>
                  <text class="grad">{{item.ServiceScore}}.0分</text>
                  <text class="numb">({{item.TransactionNumber}}条订单)</text>
              </div>
              <div class="shoplocat">
                  <text>{{item.Address}}</text><text>{{item.Distance}}km</text>
              </div>
          </div>
      </div>
      
    </div>

    <!--点击导航栏弹框-->
    <div class="bigmask" v-if="isServe"></div>
    <div v-if="showserve" class="flex-container itemposit">
        <div @click="choseItem(99)" :class="{yellow:defaultactive}">全部服务</div>
        <div class="flex-container">
            <div v-for="item in serlist" :key="item.name" :class="{yellow:seractive==item.TypeName}" @click="choseItem(item.TypeName)" style="width:120rpx">{{item.TypeName}}</div>
        </div>
        
    </div>
    <div v-if="showload" class="load">
        <div  v-for="item in distancelist" :key="item.name" :class="{yellow:disactive==item.name}" @click="choseItem(item.name)">{{item.name}}</div>
    </div>
    <div v-if="showplace" class="load">
        <!-- <div >全部区域</div> -->
        <div @click="choseItem(199)" :class="{yellow:defaultactive}" class="ttborder">
            <span @click="choseItem(199)" :class="{yellow:defaultactive}" class="ttborder">全部区域</span>
            <span class="dui ttborder" :class="{active1:defaultactive}">✔</span>
        </div>
        <div v-for="item in placelist" :key="item.Name" @click="choseItem(item.Name)">
            <span :class="{active2:active==item.Name}" class="ttborder">{{item.Name}}</span>
            <span class="dui ttborder" :class="{active1:active==item.Name}">✔</span>
        </div>
    </div>



  </div>
</template>

<script>
import { get, myget, mypost, post, toLogin } from "../../utils";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
    this.latitude=wx.getStorageSync('latitude');
    this.longitude=wx.getStorageSync('longitude');
    this.cityName=wx.getStorageSync("cityName")
    this.getServe()
    this.getShopList()
    this.getPlace()
  },
  data () {
    return {
        latitude:"",
        longitude:"",
        cityName:"",
        shoplist:[],
        seartext:"",
        list:[
          {id:1,name:"全部服务"},{id:1,name:"距离排序"},{id:1,name:"全部区域"} //导航栏
        ],
        serlist:[ ],
       
        distancelist:[
            {id:1,name:"距离排序"},{id:2,name:"订单排序"}
        ],
        placelist:[ ],
        active:'全部区域',
        defaultactive:"全部服务",
        defaultplace:"全部区域",
        seractive:"",
        disactive:"距离排序",
        isServe:false,
        showserve:false,
        showload:false,
        showplace:false,
        aa:""
    }
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
    async getShopList(){
        var result=await post("/Shop/SearchShopList",{
          Page:1,
          Lat:this.latitude,
          Lng:this.longitude,
          //Sort:0
        })
        //console.log(result)
        if(result.code==0){
            this.shoplist=result.data
            //console.log(result.data)
        }
    },
    async getPlace(){
      var result=await post("/Server/GetArea",{
        CityName:this.cityName
      })
      if(result.code==0){
        this.placelist=result.data
      }
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "商户列表"
      });
    },
    async getServe(){
        var result=await post("/Server/GetServerType")
        if(result.code==0){
            this.serlist=result.data.slice(0,-1)
            //console.log(this.serlist)
        }
    },
    changeItem(e){   //弹框展示
      this.aa=e
      this.isServe=true
      if(e=="全部服务"){
        if(!this.showserve){
          this.showserve=true
          this.defaultactive=true
          this.seractive=false
          this.showload=false
          this.showplace=false
          }else{
            this.showserve=false
            this.isServe=false
          } 
      }else if(e=="距离排序"){
        if(!this.showload){
          this.showload=true
          this.disactive="距离排序"
          this.showserve=false
          this.showplace=false
          }else{
            this.showload=false
            this.isServe=false
          } 
      }else{
        if(!this.showplace){
          this.showplace=true
          this.active="全部区域"
          this.showserve=false
          this.showload=false
          }else{
            this.showplace=false
            this.isServe=false
          } 
      }
      
    },
    showBrand(){  
        wx.navigateTo({ url: "/pages/shoprank/main" });
    },
    async choseItem(e){  //选择服务类型展示列表
      this.seractive=e
      this.disactive=e
      this.active=e
      //console.log(e)
      if(e==99){
          //console.log(666)
          this.defaultactive=true
          this.getShopList()
          this.isServe=false
      }else if(e==199){
           this.defaultplace=true
           this.getShopList()
           this.isServe=false
      }   
      else{
            this.defaultactive=false
            var result=await post("/Shop/SearchShopList",{
              Page:1,
              Lat:this.latitude,
              Lng:this.longitude,
              ServiceType:e
          })
          //console.log(result)
          if(result.code==0){
              this.shoplist=result.data
              //setTimeout(this.closeMask(),6000)
              this.closeMask()
          }
          
      }
      
    },
   
    showItem(e){
        //console.log(e)
        var shopid=this.shoplist[e].ShopId
        // var lat="1.000"
        // var lng="2.000"
        //console.log(typeof(lat))
        //console.log(shopid,lat,lng)
        wx.navigateTo({ url: "/pages/shopdetail/main?shopid="+shopid})
    },
    trimData(){
      //console.log(123)
      this.seartext=this.seartext.slice(0,-1)
      if(this.seartext=""){
          this.getShopList()
      }
    },
    closeMask(){
       setTimeout(
         ()=>{
          this.isServe=false,
          this.showserve=false,
          this.showload=false,
          this.showplace=false
          
         },2000)
         
    },
    async searchShop(){
      var reg= /^[\u4e00-\u9fa5]+$/
      reg.test(this.seartext)
      //console.log(reg.test(this.seartext))
      if(reg.test(this.seartext)){
          var result=await post("/Shop/SearchShopList",{
              Page:1,
              Lat:this.latitude,
              Lng:this.longitude,
              SearchKey:this.seartext
          })
          if(result.code==0){
                this.shoplist=result.data
                //console.log(result.data)
                this.clearText()
               
          }
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
