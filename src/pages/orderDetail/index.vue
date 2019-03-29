<template>
  <div>
    <div class="remind">
      <text v-if="showDefaule">等待买家付款</text>
      <text v-if="showDelOrder">订单已取消</text>
      <text v-if="showPay">待使用</text>
      <text v-if="shwoSuccess">交易成功</text>
    </div>
    <div class="flex-container orderhead white">
        <img src="/static/images/place.png" class="place">
        <div class="flex-container clomn personinfo">
            <div class="orderuser">
                <p>张三</p>
                <p>13125252626</p>
            </div>
            <div>广东省 深圳市 龙岗区 坂田街道 雅兰新洲社区学府花园 5期12栋</div>
        </div>
    </div>
    <div class="slide"></div>
    <div class="flex-container prodetail">
        <div class="orderpics">
            <img src="/static/images/order10.png" class="orderpics">
        </div>
        <div class="flex-container proright">
            <div class="flex-container clomn protitle">
                <p>绿妞长效镀晶9H汽车度镀晶纳米水晶镀膜</p>
                <p class="ordercolor">精选1年版（全国包施工）</p>
            </div>
            <div>
                <p>￥1288.00</p>
                <p class="ordercolor">x1</p>
            </div>
        </div>
    </div>
    <div class="orderlist">
        <div class="orderitem padtop">
            <div class="flex-container">
                <p>运费（快递）</p>
                <p>￥0.00</p>
            </div>
            <div class="flex-container">
                <p>订单总价</p>
                <p>￥1288.00</p>
            </div>
            <div class="flex-container">
                <p>优惠</p>
                <p>-¥0.00</p>
            </div>
        </div>
        <div class="flex-container padtop">
              <p>需付款</p>
              <p class="pricecolor">￥1288.00</p>
        </div>
    </div>
    <div class="slide"></div>
    <div class="orderinfo">
        <p class="infotitle">订单信息</p>
        <p class="pitem">订单编号：20000054115841 <span class="copy">复制</span></p>
        <p class="pitem">创建时间：2018-04-20 09:18:30</p>
        <p class="pitem" v-if="showPay">支付时间：2018-04-20 10:20:59</p>
        <div v-if="shwoSuccess">
            <p class="pitem">到店时间：2018-04-20 17:20:59</p>
            <p class="pitem">成交时间：2018-04-20 18:20:59</p>
        </div>
    </div>
    <div class="flex-container tipmenu">
        <p class="flex-container">
            <img src="/static/images/phonecall.png" class="tippics1">
            <span>拨打电话</span>
        </p>
        <p class="flex-container">
            <img src="/static/images/kefu.png" class="tippics2">
            <span>在线客服</span>
        </p>
    </div>
    <div class="slide"></div>
    <div class="backgray">
        <div class="orderbottom white" v-if="showDefaule">
            <p @click="cancleOrder">取消订单</p>
            <p @click="goToPay">付款</p>
        </div>
        <!--删除订单 重新购买-->
        <div class="orderbottom white" v-if="showDelOrder">
            <p>删除订单</p>
            <p>重新购买</p>
        </div>
        <!--买家已付款-->
        <div class="orderapybottom white " v-if="showPay">
            <p>再次购买</p>
        </div>
        <!--交易成功-->
        <div class="orderapybottom white " v-if="shwoSuccess">
            <p @click="addCommont">去评价</p>
        </div>
    </div>
    <!--遮罩层是否删除订单-->
    <div class="mask-modal" v-if="showMask"></div>
    <!--删除遮罩层-->
    <div v-if="showDelete" class="maskdelete">
        <div class="title">
          <text>您的订单尚未付款成功，确 认要取消本订单吗？</text>
        </div>
        <div class="flex-container bottombtn">
            <div>取消</div>
            <div @click="confirmDel">确认</div>
        </div>
    </div>
    <!--拨打电话遮罩层-->
    <div v-if="showCall" class="maskcall">
        <div class="title call">
          <text>400-118-5222</text>
        </div>
        <div class="flex-container bottombtn">
            <div>取消</div>
            <div @click="confirmDel">呼叫</div>
        </div>
    </div>
      
  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
  },
  data () {
    return {
      showMask:false,
      showCall:false,
      showDefaule:false,
      showCancleorder:false,
      showPay:false,
      showDelete:false,
      showDelOrder:false,
      shwoSuccess:true
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "订单详情"
      });
    },
    cancleOrder(){
      this.showDelete=true,
      this.showMask=true,
      this.showDefaule=false
    },
    goToPay(){
      this.showPay=true,
      this.showDelete=false,
      this.showDefaule=false
    },
    confirmDel(){
      this.showMask=false,
      this.showDelete=false,
      this.showDelOrder=true
    },
    addCommont(){
      var a=2
      wx.navigateTo({ url: "/pages/addcomment/main?id="+a});
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
