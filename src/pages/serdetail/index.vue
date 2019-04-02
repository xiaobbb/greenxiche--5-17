<template>
  <div>
      <!--顶部图片-->
      <div>
        <img :src="detailinfo.PicData[0].PicUrl" class="bg">
      </div>
      <div class="item">
          <div class="title">{{detailinfo.Name}}</div>
          <div class="complain">{{detailinfo.Synopsis}}</div>
          <div class="flex-container iteminfo">
              <p>已售652件</p>
              <p>今日仅剩<span>{{detailinfo.Stock}}</span>件</p>
          </div>
      </div>
      <div class="hr"></div>
      <!--服务项目-->
      <div class="flex-container item">
          <div>
              <div class="sertitle">服务项目</div>
              <div class="sercomplain">{{detailinfo.Name}}</div>
              <div class="flex-container iteminfo">
                  <p>
                    <img src="/static/images/gou.png" class="pics">
                    <text>未消费，随时退</text>
                  </p>
                  <p>
                    <img src="/static/images/gou.png" class="pics">
                    <text>过期退</text>
                  </p>
              </div>
          </div>
          <div class="price">￥{{detailinfo.Price}}</div>
      </div>
      <div class="hr"></div>
      <!--位置-->
      <div class="flex-container item">
          <div>
              <p class="sertitle">{{detailinfo.ShopData[0].ShopNick}}</p>
              <p class="sercomplain">{{detailinfo.ShopData[0].Address}}</p>
          </div>
          <div class="flex-container range">
            <p class="location">
                <img src="/static/images/bg9.png" class="big">
                <img src="/static/images/to.png" class="small">
            </p>
            <p>{{detailinfo.ShopData[0].Distance}}km</p>
          </div>
      </div>
      <div class="slide"></div>
      <!--评分-->
      <div class="point" v-if="detailinfo.CommentData.length>0">
        <div class="flex-container">
            <p class="left">
              <text>评分</text><text>4.0</text>
            </p>
            <p>
              <text>{{detailinfo.CommentData.length}}条评论</text>
              <img src="/static/images/back.png" class="arrowback">
            </p>
        </div>
        <div class="pointsheet">
              <div v-for="(item,lindex) in detailinfo.CommentData" :key="lindex">
                  <pointChildpic :iteminfo="item"></pointChildpic>
              </div>
        </div>
      </div>
      <div class="slide"></div>
      <!--购买须知-->
      <div class="point pointnow">
          <div class="main">购买需知</div>
          <div class="pmenu">
              <img src="/static/images/time.png" class="tippic">
              <div>
                <p  class="fsize">适用车型</p>
                <p class="carcor">五座轿车</p>
              </div>
          </div>
          <div class="pmenu">
              <img src="/static/images/time.png" class="tippic">
              <div>
                <p  class="fsize">适用车型</p>
                <p class="carcor">五座轿车</p>
              </div>
          </div>
      </div>
      <!--支付-->
      <div class="btn"> 
          <div class="btnmoney">￥{{detailinfo.Price}}</div>
          <div class="btncharge" @click="toPay(detailinfo.Id)">去结算</div>
      </div>

  </div>
</template>

<script>
import { get, myget, mypost, post, toLogin } from "../../utils";
import pointChildpic from "@/components/pointChildpic"; //公用评论带图片组件
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
    this.proid=this.$root.$mp.query.proid;
    this.lat=wx.getStorageSync('latitude');
    this.lng=wx.getStorageSync('longitude');
    this.Token=wx.getStorageSync('token');
    this.UserId=wx.getStorageSync('userid');
    this.getSerdetail()
  },
  data () {
    return {
       proid:"",
       lat:"",
       lng:"",
       Token:"",
       UserId:"",
       detailinfo:[]
    }
  },
 
  components: {
    pointChildpic
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "服务详情"
      });
    },
    async getSerdetail(){
        var result=await post("/Server/ServiceProductsDetails",{
            UserId:this.UserId,
            Token:this.Token,
            ProductId:this.proid,
            Lat:this.lat,
            Lng:this.lng
        })
        //console.log(result)
        if(result.code==0){
            this.detailinfo=result.data[0]
            //console.log(this.detailinfo)
        }
    },
    toPay(e){
      wx.navigateTo({ url: "/pages/visitconfirmorder/main?proid="+e });
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
