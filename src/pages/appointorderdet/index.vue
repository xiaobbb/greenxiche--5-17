<template>
  <div>
    <div class="remind">
      <text v-if="showDelOrder">订单已取消</text>
      <text v-if="showWait">待接单</text>
      <text v-if="showHas">已接单</text>
      <text v-if="shwoSuccess">已完成</text>
    </div>
    <!--切换显示-->
    <!--上门订单-->
    <div v-if="showVisit">
        <div class="flex-container orderhead white">
            <img src="/static/images/place.png" class="place">
            <div class="flex-container clomn personinfo">
                <div class="orderuser">
                    <p>张三</p>
                    <p>13125252626</p>
                </div>
                <div class="mysize">广东省 深圳市 龙岗区 坂田街道 雅兰新洲社区学府花园 5期12栋</div>
            </div>
        </div>
        <div class="flex-container apointtime">
            <img src="/static/images/time11.png" class="timelogo">
            <text>2019-03-20 14:00-16:00</text>
        </div>
    </div>
    <!--到店订单-->
    <div class="flex-container shoporder white" v-else>
      <img src="/static/images/place.png" class="place">
      <div class="shopservince">
          <div class="shopservinitem">到店服务</div>
          <div class="flex-container">
              <img src="/static/images/shop5.png" class="shopbg">
              <div class="flex-container clomn placeinfo">
                  <p class="placename">车御品汽车服务</p>
                  <p>深圳市龙华区梅龙大道912号</p>
              </div>
          </div>
      </div>
    </div>
    <div class="flex-container prodetail">
        <img src="/static/images/car22.png" class="mycardet">
        <div class="flex-container clomn carright">
            <p>东风本田-思域</p>
            <p class="carnums">粤AJ6688</p>
        </div>
    </div>
    <div class="slide"></div>
    <div class="serprotitle">
        <text>服务项目</text>
    </div>
    <div class="flex-container prodetail">
        <div class="orderpics">
            <img src="/static/images/order10.png" class="orderpics">
        </div>
        <div class="flex-container proright">
            <div class="protitle">
                <p>普教(洗车)</p>
            </div>
            <div class="myright">
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
        <div v-if="shwoSuccess">
           <p class="pitem">支付时间：2018-04-20 10:20:59</p>
            <p class="pitem" v-if="showVisit">上门时间：2018-04-20 17:20:59</p>
            <p class="pitem" v-if="showReachStore">到店时间：2018-04-20 17:20:59</p>
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
            <span>拨打电话</span>
        </p>
    </div>
    <div class="slide"></div>
    <div class="backgray">
        <div class="orderbottom white" v-if="showWait">
            <p class="rightbtn" :value="title" @click="applyMoney">{{title}}</p>
        </div>
        <!--上门订单 重新预约-->
        <div class="orderbottom white" v-if="showDelOrder">
            <p class="leftbtn">删除订单</p>
            <p class="rightbtn">重新预约</p>
        </div>
        <!--上门、到店交易成功-->
        <div class="orderapybottom white " v-if="shwoSuccess">
            <p class="rightbtn" @click="toCommont">去评价</p>
        </div>
    </div>
    <!--遮罩层是否删除订单-->
    <!-- <div class="mask-modal" v-if="showMask"></div> -->
    <!--删除遮罩层-->
    <!-- <div v-if="showDelete" class="maskdelete">
        <div class="title">
          <text>您的订单尚未付款成功，确 认要取消本订单吗？</text>
        </div>
        <div class="flex-container bottombtn">
            <div>取消</div>
            <div @click="confirmDel">确认</div>
        </div>
    </div> -->
      
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
      title:"申请退款",
      showVisit:false,
      showWait:false,//申请退款
      showHas:false,
      shwoSuccess:true,
      showDelOrder:false,
      showDelete:false,
      showMask:false,
      
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
    applyMoney(e){
        console.log(e.target)
         //wx.navigateTo({ url: "/pages/applymoney/main" });
    },
    toCommont(){
        var a=1
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
