<template>
  <div>
    <div class="order-status">已完成</div>
    <!-- 到店服务 -->
    <div class="shop-service" v-if="!isshow">
      <div class="title">
        <div class="icon">
          <van-icon name="location-o" color="#a1a1a1" size="40rpx"></van-icon>
        </div>到店服务
      </div>
      <div class="infoBox">
        <img src="/static/images/car.png" alt>
        <div class="info">
          <div class="head">车御品汽车服务</div>
          <div class="text">深圳市龙华区梅龙大道912号</div>
        </div>
      </div>
    </div>
    <!-- 邮寄 -->
    <div class="post" v-else>
      <div class="addressBox b1">
        <div class="name">
          <div>张三</div>
          <div class="phoneNum">13125252626</div>
        </div>
        <div class="address">
        <div class="icon">
          <van-icon name="location-o" color="#a1a1a1" size="45rpx"></van-icon>
          </div>
          广东省 深圳市 龙岗区 坂田街道 雅兰新洲社区学府花园 5期12栋
          </div>
      </div>
      <div class="time b1">
        <div class="icon">
          <van-icon name="clock-o" color="#a1a1a1" size="40rpx"></van-icon>
          </div>
          2019-03-20 14:00-16:00
          </div>
    </div>

    <div class="carinfo">
      <img src="/static/images/carioc.png" alt>
      <div class="car">
        <div class="name">东风本田-思域</div>
        <div class="carNum">粤AJ6688</div>
      </div>
    </div>
    <!-- 服务项目 -->
    <div class="service plr30 b1">
      <div class="title">服务项目</div>
      <div class="infoBox">
        <img src="/static/images/car.png" alt>
        <div class="info">
          <div class="head">车御品汽车服务</div>
          <div class="text">
            <div>￥100.00</div>
            <div class="num">×2</div>
          </div>
        </div>
      </div>
    </div>
    <div class="price">
      <div class="top b1">
        <div class="item">
          <div>运费（快递）</div>
          <div>￥100.00</div>
        </div>
        <div class="item">
          <div>订单总价</div>
          <div>￥100.00</div>
        </div>
        <div class="item">
          <div>优惠</div>
          <div>￥100.00</div>
        </div>
      </div>
      <div class="bottom p30">
        <div>需付款</div>
        <div class="main">￥500.00</div>
      </div>
    </div>
    <div class="orderINfo plr30">
      <div class="title">订单信息</div>
      <div class="item">
        订单编号：20000054115841
        <div class="copy">
          <van-button plain type="warning" size="mini">复制</van-button>
        </div>
      </div>
      <div class="item">创建时间：2018-04-20 10:20:59</div>
      <div class="item">支付时间：2018-04-20 10:20:59</div>
      <div class="item">到店时间：2018-04-20 10:20:59</div>
      <div class="item">成交时间：2018-04-20 10:20:59</div>
    </div>
    <div class="phone">
      <div class="item br1">
        <img src="/static/images/phone1.png" alt>
        拨打电话
      </div>
      <div class="item">
        <img src="/static/images/service.png" alt>
        在线客服
      </div>
    </div>
    <div class="editButton">
      <div class="remove">删除订单</div>
      <!-- <div class="buy">重新购买</div> -->
      <div class="buy" @click="refund">申请退款</div>
    </div>
  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  data() {
    return {
      isshow: true
    };
  },

  components: {},
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "申请退款"
      });
    },

    refund() {
      wx.navigateTo({ url: "/pages/refund/main"});
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
