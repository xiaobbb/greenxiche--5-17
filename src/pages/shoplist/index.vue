<template>
  <div class="bggray">
    <div style="height:200rpx;">
        <!--顶部输入框-->
        <div class="white" >
            <div class="topinput">
                <input type="text" placeholder="搜索商户" v-model="seartext"  @input="searchShop">
                <img src="/static/images/search.png" class="searchpic absolu">
                <img src="/static/images/cancle.png" class="canclepic absolu" @click="trimData">
            </div>
        </div>
        <!--导航栏-->
        <div class="flex-container menu">
            <div class="menuitem">
                <div @click="changeItem(item.id)" v-for="item in list" :key="item.name">
                      <text>{{item.name}}</text>
                      <img src="/static/images/top.png" class="bottom" v-if="aa==item.id">
                      <img src="/static/images/bottom.png" class="bottom" v-else>
                  </div>
            </div>
            <!--排行榜-->
            <div @click="showBrand()"><img src="/static/images/gold.png" class="gold"></div>
        </div>
    </div>
    <!--商户列表-->
    <div class="shoplist">
      <div class="shopitem flex-container white" @click="showShopDetail(index)" v-for="(item,index) in shoplist" :key="index">
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
        <div @click="choseServe(99)" :class="{yellow:defaultactive}">全部服务</div>
        <div class="flex-container">
            <div v-for="(item,index) in serlist" :key="index" :class="{yellow:seractive==index}" @click="choseServe(index)" style="width:120rpx">{{item.TypeName}}</div>
        </div>
        
    </div>
    <!--距离-->
    <div v-if="showload" class="load">
        <div  v-for="(item,lindex) in distancelist" :key="lindex" :class="{yellow:disactive==lindex}" @click="choseDistance(lindex)">{{item.name}}</div>
    </div>
    <div v-if="showplace" class="load">
        <!-- <div >全部区域</div> -->
        <div class="ttborder">
            <span @click="chosePlace(199)" :class="{yellow:active}" class="ttborder">全部区域</span>
            <span class="dui ttborder" :class="{active1:active}">✔</span>
        </div>
        <div v-for="(item,sindex) in placelist" :key="sindex" @click="chosePlace(sindex)">
            <span :class="{active2:placeactive==sindex}" class="ttborder">{{item.Name}}</span>
            <span class="dui ttborder" :class="{active1:placeactive==sindex}">✔</span>
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
        Page:"1",
        PageSize:"5",
        PageCount:"",
        allPage:"", //页数
        isLoad:false,//是否加载更多
        ServiceType:"",//服务类型
        RegionId:"",//区域id
        SearchKey:"",//关键词
        Sort:"",//距离查询
        shoplist:[],
        seartext:"",
        list:[
          {id:1,name:"全部服务"},{id:2,name:"距离排序"},{id:3,name:"全部区域"} //导航栏
        ],
        serlist:[ ],
       
        distancelist:[
            {id:1,name:"距离排序"},{id:2,name:"订单排序"}
        ],
        placelist:[ ],
        active:'全部区域',
        defaultactive:"全部服务",
        seractive:"99999",
        disactive:"0",
        placeactive:"99999",
        isServe:false,  //遮罩层
        showserve:false,  //全部服务
        showload:false,   //距离
        showplace:false,  //区域
        aa:""  //导航栏高亮显示
    }
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
    async getShopList(){  //获取商户列表
        var result=await post("/Shop/SearchShopList",{
          Page:this.Page,
          Lat:this.latitude,
          Lng:this.longitude,
          PageSize:this.PageSize,
          ServiceType:this.ServiceType,//服务类型
          RegionId:this.RegionId,//区域id
          SearchKey:this.SearchKey,//关键词
          Sort:this.Sort,//距离查询
        })
        console.log(result)
        if(result.code==0){
          this.PageCount=result.count
          if(parseInt(this.PageCount) % this.PageSize === 0){
              this.allPage=this.PageCount / this.PageSize
          }else{
            this.allPage=parseInt(this.PageCount / this.PageSize) +1
          }
         
          if(this.allPage>this.Page){
              this.isLoad=true
          }else{
            this.isLoad=false
          }
          this.shoplist=this.shoplist.concat(result.data)
          for(let i of result.data){
            this.$set(i,"Distance",parseFloat(i.Distance).toFixed(2))
          }
        }
    },
    choseServe(e){   //选择服务列表
      //console.log(e)
      this.seractive=e
      this.defaultactive=""
      if(e==99){
        this.ServiceType=""
        this.defaultactive="全部服务"
        this.seractive=e
      }else{
        this.ServiceType=this.serlist[e].Id
      }
      this.shoplist=[]
      this.getShopList()
    },
    choseDistance(e){  //选择距离列表
      console.log(e)
      this.disactive=e
      this.Sort=e
      this.shoplist=[]
      this.getShopList()
     
    },
    chosePlace(e){   //选择区域列表
      console.log(e)
      this.placeactive=e
      this.active=""
      if(e==199){
        this.RegionId=""
        this.active="全部区域"
      }else{
        this.RegionId=this.placelist[e].Id
      }
      this.shoplist=[]
      this.getShopList()
    },
    async getPlace(){ //获取所在地的区域信息
      var result=await post("/Server/GetArea",{
        CityName:this.cityName
      })
      if(result.code==0){
        this.placelist=result.data
       console.log(this.placelist,"地区列表")
      }
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "商户列表"
      });
    },
    async getServe(){  //获取服务类型
        var result=await post("/Server/GetServerType")
        if(result.code==0){
            this.serlist=result.data
            //console.log(this.serlist)
        }
    },
    changeItem(e){   //弹框展示
      this.aa=e
      this.isServe=true
      if(e=="1"){
        if(!this.showserve){ //遮罩层没有显示
          this.showserve=true
          this.showload=false
          this.showplace=false
          }else{
            this.showserve=false
            this.isServe=false
          } 
      }else if(e=="2"){
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
 
    async choseItem(e){  //选择服务类型展示列表
      console.log(e)
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
      }
      
    },
    trimData(){
      //console.log(123)
      this.seartext=this.seartext.slice(0,-1)
      if(this.seartext=""){
          this.getShopList()
      }
    },
    closeMask(){ //关闭弹框
       setTimeout(
         ()=>{
          this.isServe=false,
          this.showserve=false,
          this.showload=false,
          this.showplace=false
         },2000)
    },
    showShopDetail(e){ //商户详情
        //console.log(e)
        var shopid=this.shoplist[e].ShopId
        wx.navigateTo({ url: "/pages/shopdetail/main?shopid="+shopid})
    },
    showBrand(){  //展示排行榜
      wx.navigateTo({ url: "/pages/shoprank/main" });
    },
    // async searchShop(){
    //   var reg= /^[\u4e00-\u9fa5]+$/
    //   reg.test(this.seartext)
    //   //console.log(reg.test(this.seartext))
    //   if(reg.test(this.seartext)){
    //       var result=await post("/Shop/SearchShopList",{
    //           Page:1,
    //           Lat:this.latitude,
    //           Lng:this.longitude,
    //           SearchKey:this.seartext
    //       })
    //       if(result.code==0){
    //             this.shoplist=result.data
    //             //console.log(result.data)
    //             this.clearText()
               
    //       }
    //   }
      
    // }
       
    
  },

  created () {
    // let app = getApp()
  },
   onReachBottom(){
     console.log("正在加载中国个古古怪怪")
    if(this.isLoad){
      this.Page++;
      this.getShopList();
    }else{
      wx.showToast({
          title: "没有更多啦。。。",
          icon: "none",
          duration: 2000
        });
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
  @import "../../css/common.css";
  .shoplist{
    height: calc(100vh - 200rpx);
    overflow: hidden;
    overflow-y:auto;
  }
</style>
