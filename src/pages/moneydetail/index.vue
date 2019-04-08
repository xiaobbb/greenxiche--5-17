<template>
  <div>
      <div class="flex-container recordtitle">
          <p v-for="item in recordlist" :key="item.id" :class="{active:active==item.id}" @click="change(item.id)">{{item.name}}</p>
      </div>
      <div class="slide"></div>
      <div class="recordlist">
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
          <div class="recorditem commonpad flex-container">
              <div>
                  <p>下单消费20190315000001</p>
                  <p class="minisize">2019-03-12  11:06</p>
              </div>
              <div>
                  <p class="addshort short">-300.00</p>
                  <p class="minisize">余额：300.00</p>
              </div>
          </div>


      </div>
      
  </div>
</template>

<script>
import {post} from '@/utils/index'
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
  },
  data () {
    return {
      active:"1",
      recordlist:[
        {id:1,name:"全部"},{id:2,name:"充值记录"},{id:3,name:"支出记录"}
      ]
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
      this.active=e
    },
    orderpay(){
      wx.navigateTo({ url: "/pages/locationcomplete/main" });
    },
    getRechargeList(){

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
