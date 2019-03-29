<template>
  <div class="backgray">
    <!--商城订单-->
    <div v-if="showShop">
        <div class="menuhead flex-container white">
          <p v-for="item in menulist" :key="item.id" :class="{active:active==item.id}">{{item.name}}</p>
        </div>
        <div class="shoplist">
            <div class="shopitem white" @click="toOrderDetail(1)">
                <div class="flex-container commonpad">
                    <p class="number">订单编号：TH53316886</p>
                    <p class="tips">待付款</p>
                </div>
                <div class="bgindo">
                    <orderChild :showButton="showButton"></orderChild>
                </div>
                <div class="itemtotal">共1件商品(含配送费)<span> 合计￥1300.00</span></div>
                <div class="menubtn flex-container">
                    <text>取消订单</text><text>付款</text>
                </div>
            </div>
            <div class="shopitem white">
                <div class="flex-container commonpad">
                    <p class="number">订单编号：TH53316886</p>
                    <p class="tips">待付款</p>
                </div>
                <div class="bgindo">
                    <orderChild :showButton="showButton"></orderChild>
                </div>
                <div class="itemtotal">共1件商品(含配送费)<span> 合计￥1300.00</span></div>
                <div class="menubtn flex-container">
                    <text>取消订单</text><text>付款</text>
                </div>
            </div>
        </div>
    </div>
    <!--预约订单-->
    <div v-if="showVisit">
        <div class="menuhead flex-container white visit">
          <p v-for="item in visitlist" :key="item.id" :class="{active:active==item.id}" @click="change(item.id)">{{item.name}}</p>
        </div>
        <div class="shoplist">
            <div class="shopitem white" @click="toOrderDetail(2)">
                <div class="flex-container commonpad">
                    <p class="number">订单编号：TH53316886</p>
                    <p class="tips">待付款</p>
                </div>
                <!--切换上门服务-->
                <div class="seritem" v-if="active==1">
                    <p>项目：外观简单清洗洗车</p>
                    <p>地址：广东省深圳市福田区福华三路116号</p>
                    <p>车辆：别克-凯越 红色 粤AH6688</p>
                    <p>时间：2019-03-18 14:00-16:00</p>
                    <p>手机号：13682293390</p>
                </div>
                <!--切换到店服务-->
                <div class="seritem" v-if="active==2">
                    <p>项目：外观简单清洗洗车</p>
                    <p>门店：车御品汽车服务</p>
                    <p>车辆：别克-凯越 红色 粤AH6688</p>
                    <p>手机号：13682293390</p>
                </div>
                <div class="menubtn flex-container">
                    <text class="leftbtn">取消订单</text><text class="rightbtn">付款</text>
                </div>
            </div>
            
        </div>

    </div>  
      
  </div>
</template>

<script>
import orderChild from "@/components/orderChild.vue"
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
  },
  data () {
    return {
      showShop:false,
      showVisit:true,
      active:"1",
      showButton:true,
      menulist:[
        {id:1,name:"全部"},{id:2,name:"待使用"},{id:3,name:"代付款"},{id:4,name:"待评价"},{id:5,name:"已完成"}
      ],
      visitlist:[
        {id:1,name:"上门服务"},{id:2,name:"到店服务"}
      ]
    }
  },
 
  components: {
    orderChild
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的订单"
      });
    },
    change(e){
      //console.log(e)
      this.active=e
    },
    toOrderDetail(e){
      if(e==1){
        wx.navigateTo({ url: "/pages/orderdetail/main"});
      }
      if(e==2){
        wx.navigateTo({ url: "/pages/appointorderdet/main"});
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
