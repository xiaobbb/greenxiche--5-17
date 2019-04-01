<template>
  <div>
    <shopChild :isShow="showHead" :detailinfo="detailinfo"></shopChild>
    <!--操作菜单-->
    <div class="shopmian">
        <div class="flex-container title">
            <p v-for="item in menulist" :key="item.name" :class="{active:active==item.name}" @click="change(item.name)">{{item.name}}</p>
        </div>
        <!--服务显示-->
        <div class="sershow" v-if="sershow">
            <div class="caritem">
                <text class="activecolor">洗车</text><text>内饰</text><text>除甲醛</text><text>镀晶</text>
            </div>
            <div class="ships">以下为门店服务内容</div>
            <div class="serlist">
                <div class="seritem flex-container">
                    <div class="flex-container"  @click="choseItem(1)">
                        <img src="/static/images/smallcar.png" class="smallcar">
                        <div class="flex-container col">
                            <p class="infotitle">漆面抛光研磨打蜡</p>
                            <p class="infoitem">去除车身污渍 干净透亮</p>
                            <p class="serprice">
                              <text>￥198.00</text>
                              <text>vip价:￥188</text>
                            </p>
                        </div>
                    </div>
                    <div class="pay" @click="choseItem(2)">支付</div>
                </div>
                <div class="seritem flex-container">
                    <div class="flex-container ">
                        <img src="/static/images/smallcar.png" class="smallcar">
                        <div class="flex-container col">
                            <p class="infotitle">漆面抛光研磨打蜡</p>
                            <p class="infoitem">去除车身污渍 干净透亮</p>
                            <p class="serprice">
                              <text>￥198.00</text>
                              <text>vip价:￥188</text>
                            </p>
                        </div>
                    </div>
                    <div class="pay">支付</div>
                </div>
            </div>
        </div>
        <!--套餐显示-->
        <div class="meallist" v-if="dishshow">
            <div class="mealitem">
                <img src="/static/images/meal.png" class="mealbg">
                <div class="mealbg mealinfo">
                    <div class="flex-col">
                        <div class="weight sizebig">极护 SN 5W-30 4L</div>
                        <div class="weight smallsize">小保养套餐6次</div>
                        <div class="explain">有效期720天，仅限本店使用本店拥有最终解释权</div>
                    </div>
                    <div class="linehr"></div>
                    <div class="flex-container">
                      <p class="mealprice">
                          <text>特惠价:￥</text>
                          <text>1998</text>
                      </p>
                      <p class="mealpay">立即购买</p>
                    </div>
                </div>
            </div>
            <div class="mealitem">
                <img src="/static/images/meal.png" class="mealbg">
                <div class="mealbg mealinfo">
                    <div class="flex-col">
                        <div class="weight sizebig">极护 SN 5W-30 4L</div>
                        <div class="weight smallsize">小保养套餐6次</div>
                        <div class="explain">有效期720天，仅限本店使用本店拥有最终解释权</div>
                    </div>
                    <div class="linehr"></div>
                    <div class="flex-container">
                      <p class="mealprice">
                          <text>特惠价:￥</text>
                          <text>1998</text>
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
                <p v-for="(item,index) in pointlist" :key="index" :class="{active3:first==item.id}" @click="showInfo(item.id)">{{item.name}}</p>
            </div>
            <div class="pointsheet">
                <div>
                    <pointChild></pointChild>
                </div>
                <div>
                    <pointChildpic></pointChildpic>
                </div>
                <div>
                    <pointChild></pointChild>
                    <div class="callback">
                        [商家回复]：感谢您的评价，我们的价格可以说是龙华最 低、性价比最高、服务最好的洗车店了
                    </div>
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
    this.lat=this.$root.$mp.query.lat
    this.lng=this.$root.$mp.query.lng
    this.getShopDetail()
    //console.log(this.shopid,this.lat,this.lng)
  },
  data () {
    return {
        shopid:"",
        lat:"",
        lng:"",
        detailinfo:[],
        showHead:true,
        active:"服务",
        first:1,
        menulist:[
          {id:1,name:'服务'},{id:2,name:'套餐'},{id:3,name:'评价'}
        ],
        pointlist:[
          {id:1,name:'全部(428)'},{id:2,name:'晒图(88)'},{id:3,name:'低分(60)'},{id:4,name:'最新'}
        ],
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
    async getShopDetail(){
        var res=await post("Shop/GetMerchantDetail",{
          ShopId:this.shopid,
          Lat:this.lat,
          Lng:this.lng
        })
        
        if(res.code==0){
            this.detailinfo=res.data
        }
        console.log(this.detailinfo)
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "商户详情"
      });
    },
    change(e){
      this.active=e
      if(e=="服务"){
          this.sershow=true,
          this.dishshow=false,
          this.pointshow=false
      }else if(e=="套餐"){
          this.dishshow=true,
          this.sershow=false,
          this.pointshow=false
      }else{
          this.pointshow=true,
          this.sershow=false,
          this.dishshow=false
      }
    },
    showInfo(e){
      //console.log(e)
      this.first=e
    },
    choseItem(e){
      var id=e
      if(id==1){
         wx.navigateTo({ url: "/pages/serdetail/main" });
      }
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
