<template>
  <div class="flex-container bigcontainer">
    <!--左菜单-->
    <div class="ser-menu" style="position:fixed;width:32%;">
        <div style="padding:30rpx 0" v-for="(item,index) in menulist" :key="index" :class="{active:active==index}" @click="change(index)" class="nemeitem">
          <text class="title">{{item.TypeName}}</text>
        </div>
    </div>
    <!--右列表-->
    <div v-if="servicelist.length<0">暂无满足条件的商品，敬请期待！</div>
    <div class="list" style="margin-left:32%;margin-bottom:100rpx;">
        <div class="flex-container intitem" v-for="(item,pindex) in servicelist" :key="item.Id">
            <div class="flex-container" style="width:85%;">
              <img :src="item.PicNo" class="carpic">
              <div class="flex-container clomn iteminfo" style="width:70%">
                  <p class="itemtitle">{{item.Name}}</p>
                  <p class="progress">
                    <text style="margin-top:10rpx" v-for="(itemtip,tindex) in item.KeywordName" :key="tindex">{{itemtip?itemtip:''}}</text>
                  </p>
                  <p class="sales">销量: {{item.SalesVolume}}</p>
                  <p class="price">￥{{item.Price}}</p>
              </div>
            </div>
            <div>
              <input type="checkbox" class="checkbox-cart" :checked="item.isSelect" @click="oneClick(pindex)"/>
            </div>
        </div>
        
        <!--底部按钮-->
        <div class="btn">
          <div class="btn-close" style="background:#fff">
            <input type="checkbox" class="checkbox-cart" @click="selectProduct()" :checked="isSelectAll"/>
            <text>全选</text>
          </div>
          <div class="btn-confirm" @click="submit">确定</div>
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
    this.latitude=this.$store.state.latitude
    this.longitude=this.$store.state.longitude
    this.shopId=this.$root.$mp.query.shopId
    this.selectArr=[] //要提交的数组
    this.setBarTitle();
    console.log(this.shopId)
  },
  onShow(){
      this.Page=1
      this.servicelist=[]
      if(wx.getStorageSync("serItem").length>0){
          this.selectArr=wx.getStorageSync("serItem")
      }
      this.getMenulist();
  },
  data () {
    return {
      latitude:"",
      longitude:"",
      shopId:"",
      Page:1,//当前页码
      PageSize:5,//数量
      pageCount:"",//商品总数
      allPage:"",//总页码
      isLoad:false,//是否加载更多数据
      menulist:[],
      TypeId:"", //获取列表种类
      servicelist:[],
      selectArr:[], //要提交的数组
      active:"0",
      isSelectAll:false
    }
  },

  components: {
    
  },
  computed:{
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "服务项目"
      });
    },
    async getMenulist(){
       var result=await post("/Server/GetCarWash",{
          BrandList:21
       })
       //console.log(result)
       if(result.code==0){
          this.menulist=result.data
          this.TypeId=this.menulist[this.active].Id
          this.getProlist()
       }
        
    },
    //获取产品列表
    async getProlist(){
       let res=await post("/Server/ChooseServiceProducts",{
          Page:this.Page,
          PageSize:this.PageSize,
          TypeId:this.TypeId,
          ShopId:this.shopId,
          // Lat:"1.000000",
          // Lng:"2.000000"
          Lat:this.latitude,
          Lng:this.longitude
      })
      console.log(res,"商品列表")
      if(res.code==0){
          this.pageCount=res.count;
          if(parseInt(this.pageCount) % this.PageSize === 0){
            this.allPage=this.pageCount / this.PageSize
          }else{
            this.allPage = parseInt(this.pageCount / this.PageSize) + 1;
          }
          this.servicelist = this.servicelist.concat(res.data)
          this.checkedSelectArr()
         // console.log("当前的页数",this.Page)
          //console.log("总页数："+this.allPage);
          if(this.allPage>=this.Page){
            this.isLoad=true
          }else{
            this.isLoad=false
          }
      }
    },
    // 查找是否满足已选择条件
    checkedSelectArr(){
        this.servicelist.map(list=>{
          this.selectArr.map(arr=>{
            if(list.Id===arr.Id){
              list.isSelect = true
            }
          })
        })
    },
    change(e){  //点击菜单获取产品列表
      this.active=e
      this.Page=1
      this.TypeId=this.menulist[e].Id
      this.servicelist=[]
      this.getProlist()
    },
    selectProduct:function(){
        //遍历servicelist，全部取反
        this.isSelectAll=!this.isSelectAll
        //console.log(this.isSelectAll)
        for (var i = 0, len = this.servicelist.length; i < len; i++) {
            this.servicelist[i].isSelect = this.isSelectAll;
            console.log(this.servicelist[i].isSelect)
        }
    },
    oneClick(i){
      if(!this.servicelist[i].isSelect){
        this.selectArr.push(this.servicelist[i])
      }else{
        this.selectArr.map((arr,index)=>{
          if(arr.Id===this.servicelist[i].Id){
            this.selectArr.splice(index,1)
          }
        })
      }
      this.servicelist[i].isSelect=!this.servicelist[i].isSelect
      let isSelectAll= true; //判断是否全选
      for(var i=0;i<this.servicelist.length;i++){
            if(!this.servicelist[i].isSelect){
                isSelectAll= false
                this.isSelectAll=false
                console.log('3')
                return false;
            }
        }
          this.isSelectAll=isSelectAll
    },
    submit(){
      //console.log(this.servicelist)
      // const serItem=[]
      // for(var i=0;i<this.servicelist.length;i++){
      //     if(this.servicelist[i].isSelect){
      //       serItem.push(this.servicelist[i])
      //     }
      // }
      wx.setStorageSync("serItem",this.selectArr)
      if(this.selectArr.length>0){
        wx.navigateBack({ url: "/pages/location/main" })
      }else{
        wx.showToast({
          title: "请选择要服务项目",
          icon: "none",
          duration: 2000
        });
        return false
      }
      // const tip=JSON.stringify(serItem)
      // if(serItem.length>0){
      //   wx.navigateTo({ url: "/pages/location/main?serItem="+tip })
      // }else{
      //   wx.showToast({
      //     title: "请选择要服务项目",
      //     icon: "none",
      //     duration: 2000
      //   });
      //   return false
      // }
         
    }

    
  },

  created () {
    // let app = getApp()
  },
  onReachBottom(){
    if(this.isLoad){
      this.Page++;
      this.getProlist();
    }else{
      wx.showToast({
          title: "没有更多商品啦。。。",
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
</style>
