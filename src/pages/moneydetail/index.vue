<template>
  <div>
      <div class="flex-container recordtitle">
          <p v-for="item in recordlist" :key="item.id" :class="{active:active===item.id}" @click="change(item.id)">{{item.name}}</p>
      </div>
      <div class="slide"></div>
      <div class="recordlist" v-if="list.length>0">
          <div class="recorditem commonpad flex-container">
              <div>
                  <p>充值入账</p>
                  <p class="minisize">2019-03-12  11:06</p>
              </div>
              <div>
                  <p class="addshort add">＋300.00</p>
                  <p class="minisize">余额：300.00</p>
              </div>
          </div>
      </div>
      <p style="text-align:center;font-size:30rpx;color:#666;padding:120rpx 20rpx 80rpx;" v-if="list.length===0">暂无数据</p>
      <p class="ovedMsg" v-if="isOved" style="text-align:center;padding:20rpx;font-size:26rpx;color:#666;">我也是有底线的</p> 
  </div>
</template>

<script>
import {post} from '@/utils/index'
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.list = [];
    this.setBarTitle();
    this.getRechargeList();
  },
  data () {
    return {
      userId:wx.getStorageSync('userId'),
      token:wx.getStorageSync('token'),
      page:1,
      pageSize:15,
      isLoad:false,
      isOved:false,
      count:0,
      allPage:0,
      active:0,
      recordlist:[
        {id:0,name:"全部"},{id:1,name:"充值记录"},{id:2,name:"支出记录"}
      ],
      list:[]
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "资金明细"
      });
    },
    change(e){
      this.active=e;
      this.page = 1;
      this.isLoad = false;
      this.isOved = false;
      this.count = 0;
      this.allPage = 0;
      this.list = [];
      this.getRechargeList();
    },
    orderpay(){
      wx.navigateTo({ url: "/pages/locationcomplete/main" });
    },
    async getRechargeList(){
      let result = await post("Recharge/GetRechargeList",{
         UserId:this.userId,
         Token:this.token,
         page:this.page,
         pageSize:this.pageSize,
         Type:this.active
      });
      this.count = result.count;
      if (parseInt(this.count) % this.pageSize === 0) {
        this.allPage = this.count / this.pageSize;
      } else {
        this.allPage = parseInt(this.count / this.pageSize) + 1;
      }
      if(result.data.length>0){
        this.list = this.list.concat(result.data);
      }
      if(this.allPage > this.page){
        this.isLoad = true;
      }else{
        this.isLoad = false;
      }
    }
  },

  created () {
    // let app = getApp()
  },
   onReachBottom(){
    if(this.isLoad){
      this.page++;
      this.getRechargeList();
    }else{
      if (this.page > 1) {
        this.isOved = true;
      } else {
        this.isOved = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
  @import "../../css/common.css";
</style>
