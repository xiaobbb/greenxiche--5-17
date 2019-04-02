<template>
  <div>
    <shopChild :detailinfo="detailinfo" v-if="detailinfo.length>0"></shopChild>
    <!--操作菜单-->
    <div class="shopmian">
        <div class="flex-container title">
            <p v-for="item in menulist" :key="item.name" :class="{active:active==item.name}" @click="change(item.name)">{{item.name}}</p>
        </div>
        <!--服务显示-->
        <div class="sershow" v-if="sershow">
            <div class="caritem"> <!--洗车分类-->
                <text v-for="item in barlist" :key="item.Id" :class="{activecolor:activecolor==item.Id}" @click="showItemServe(item.Id)">{{item.TypeName}}</text>
            </div>
            <div class="ships">以下为门店服务内容</div>
            <div class="serlist">
                <div class="seritem flex-container" v-for="item in servincelist" :key="item.Id">
                    <div class="flex-container"  style="width:80%" @click="goServiceProductsDetail(item.Id)">
                        <img src="/static/images/smallcar.png" class="smallcar">
                        <div class="flex-container col">
                            <p class="infotitle">{{item.Name}}</p>
                            <p class="infoitem">{{item.Synopsis}}</p>
                            <p class="serprice">
                              <text>￥{{item.MarketPrice}}</text>
                              <text>vip价:￥{{item.Price}}</text>
                            </p>
                        </div>
                    </div>
                    <div class="pay" @click="choseItem(2)">支付</div>
                </div>
            </div>
        </div>
        <!--套餐显示-->
        <div class="meallist" v-if="dishshow">
            <div class="mealitem" v-for="item in meallist" :key="item.Id">
                <img src="/static/images/meal.png" class="mealbg">
                <div class="mealbg mealinfo">
                    <div class="flex-col">
                        <div class="weight sizebig">极护 SN 5W-30 4L</div>
                        <div class="explain">有效期720天，仅限本店使用本店拥有最终解释权</div>
                    </div>
                    <div class="linehr"></div>
                    <div class="flex-container">
                      <p class="mealprice">
                          <text>特惠价:￥</text>
                          <text>{{item.Price}}</text>
                      </p>
                      <p class="mealpay" @click="choseItem(2)">立即购买</p>
                    </div>
                </div>
            </div>

        </div>
        <!--评价显示-->
        <div v-if="pointshow" class="dish">
            <div class="head flex-container">
                <div class="titleline">
                  <p class="shot"></p>
                  <p class="main">商户服务评价</p>
                  <p class="shot"></p>
                </div>
                <div class="flex-container">
                    <p>
                      <img src="/static/images/xing.png" class="xing-point bigs">
                      <img src="/static/images/xing.png" class="xing-point bigs">
                      <img src="/static/images/xing.png" class="xing-point bigs">
                      <img src="/static/images/xing.png" class="xing-point bigs">
                      <img src="/static/images/xing.png" class="xing-point bigs">
                    </p>
                    <text class="grad">5.0分</text>
                </div>
            </div>
            <div class="flex-container pointmenu">
                <p v-for="(item,index) in pointlist" :key="index" :class="{active3:first==index}" @click="showInfo(index)">{{item.name}}</p>
            </div>
            <div class="pointsheet">
                <div v-for="(item,index) in commonlist" :key="index">
                    <pointChildpic :iteminfo="item"></pointChildpic>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { get, myget, mypost, post, toLogin } from "../../utils";
import shopChild from "@/components/shopChild"; //公用组件
import pointChild from "@/components/pointChild"; //公用评论组件
import pointChildpic from "@/components/pointChildpic"; //公用评论带图片组件
import "../../css/common.css";
import "../../css/global.css";

export default {
  onLoad(){
    this.setBarTitle();
    this.shopid=this.$root.$mp.query.shopid
    console.log(this.shopid,"详情页接收")
    this.lat=wx.getStorageSync('latitude');
    this.lng=wx.getStorageSync('longitude');
    this.Token=wx.getStorageSync('token');
    this.UserId=wx.getStorageSync('userid');
    this.getShopDetail()
    this.getBarlist()
    this.showItem()
  },
  data () {
    return {
        shopid:"",
        lat:"",
        lng:"",
        detailinfo:[],
        typeid:"33",
        active:"服务",
        activecolor:"33",
        servincelist:"",
        meallist:"",
        first:0,
        Token:"",
        UserId:"",
        barlist:[], //洗车分类
        menulist:[
          {id:1,name:'服务'},{id:2,name:'套餐'},{id:3,name:'评价'}
        ],
        pointlist:[
          {id:1,name:'全部(428)'},{id:2,name:'晒图(88)'},{id:3,name:'低分(60)'},{id:4,name:'最新'}
        ],
        commonlist:[],
        sershow:true,
        dishshow:false,
        pointshow:false
    }
  },
 
  components: {
    shopChild,
    pointChild,
    pointChildpic
  },
  methods: {
    showItem(){
      wx.request({
        url:"http://carapi.wtvxin.com/api/Server/ServiceProducts" ,//服务列表
        method: "POST",
        data: {
           Page:1,
          //  ShopId:this.shopid,
          //  TypeId:this.typeid
           TypeId:this.typeid,
           ShopId:'7A3E932977BF3C5A',
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
       
        success:(res)=> {
          if(res.data.code==0){
              this.servincelist=res.data.data
              //console.log(res.data.data)
          }
        }
      })
       
    },
    async getShopDetail(){
        var res=await post("Shop/GetMerchantDetail",{
          ShopId:this.shopid,
          Lat:this.lat,
          Lng:this.lng
        })
        
        if(res.code==0){
            this.detailinfo=res.data
        }
        //console.log(this.detailinfo)
    },
    async getBarlist(){
        var res=await post("Server/GetCarWash",{
        })
        if(res.code==0){
          this.barlist=res.data.slice(0,-2)
        }
    },
    async showItemServe(e){
      console.log(e)
        this.activecolor=e
        this.typeid=e
        this.showItem()
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "商户详情"
      });
    },
    async change(e){
      console.log(e)
      this.active=e
      if(e=="服务"){
          this.sershow=true,
          this.dishshow=false,
          this.pointshow=false,
          this.getBarlist()
          this.showItem()
      }else if(e=="套餐"){
          this.dishshow=true,
          this.sershow=false,
          this.pointshow=false
          var res=await post("/Server/ServiceMealProducts",{
            Page:1,
              ShopId:this.shopid
          })
          if(res.code==0){
            this.meallist=res.data
          }

      }else{
          this.pointshow=true,
          this.sershow=false,
          this.dishshow=false
          var res=await post("/Server/ServiceCommentList",{
            Page:1,
            PageSize: 12,
            //ShopId:this.shopid
            ShopId:'7A3E932977BF3C5A',
          })
          console.log(res)
          if(res.code==0){
            this.commonlist=res.data
          }

      }
    },
    async showInfo(e){
      console.log(e)
      this.first=e
      var res=await post("/Server/ServiceCommentList",{
            Page:1,
            //ShopId:this.shopid
            ShopId:'7A3E932977BF3C5A',
            CommentType:this.first
      })
      //console.log(res)
      if(res.code==0){
        this.commonlist=res.data
      }
    },
    async goServiceProductsDetail(e){
        wx.navigateTo({ url: "/pages/serdetail/main?proid="+e});  //获取商户服务产品详情
    },
    choseItem(e){
      var id=e
     
      if(id==2){
         wx.navigateTo({ url: "/pages/visitconfirmorder/main" });
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
