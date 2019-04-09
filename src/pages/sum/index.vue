<template>
  <div class="backgray">
    <div class="suminfo white">
      <div class="title">
        <span>充值账户:</span>
        <span class="yellow" v-if="isHasInfo">{{memberInfo.Mobile}}</span>
      </div>
      <div class="flex-container charge" v-if="list.length>0">
        <div
          class="flex-container clomn chargeitem"
          :class="{'active':active===index}"
          v-for="(item,index) in list"
          :key="index"
          @click="shiftActive(index)"
        >
          <p class="money">{{item.RechargeAmount}}元</p>
          <p class="minicoupon">多送{{item.ActualBalance-item.RechargeAmount}}元现金</p>
        </div>
      </div>
      <div class="flex-container chosepay">
        <div class="flex-container">
          <img src="/static/images/wx2.png" class="wxlogo">
          <p>微信支付</p>
        </div>
        <input type="checkbox" :checked="true" class="checkbox-cart">
      </div>
    </div>
    <div class="white botbtn flex-container">
      <div class="total">
        合计：
        <span>￥100.00</span>
      </div>
      <div class="btncharge">立即充值</div>
    </div>
  </div>
</template>

<script>
import { post } from "@/utils/index";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad() {
    this.setBarTitle();
    this.getMemberInfo();
    this.getRechargeList();
  },
  data() {
    return {
      userId: wx.getStorageSync("userId"),
      token: wx.getStorageSync("token"),
      page: 1,
      pageSize: 20,
      list: [],
      active: 0,
      isHasInfo:false,
      memberInfo:{}
    };
  },

  components: {},
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "余额充值"
      });
    },
    orderpay() {
      wx.navigateTo({ url: "/pages/locationcomplete/main" });
    },
    shiftActive(index) {
      this.active = index;
    },
    async getRechargeList() {
      let result = await post("Recharge/RechargeList", {
        UserId: this.userId,
        Token: this.token,
        page: this.page,
        pageSize: this.pageSize
      });
      if (result.data.length > 0) {
        this.list = this.list.concat(result.data);
      }
      console.log(result);
    },
    async getMemberInfo() {
      let result = await post("User/GetMemberInfo", {
        UserId: this.userId,
        Token: this.token
      });
      if (Object.keys(result.data).length > 0) {
        this.isHasInfo = true;
        this.memberInfo = result.data;
      }
      //   console.log(result);
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
@import "./style";
@import "../../css/common.css";
</style>
