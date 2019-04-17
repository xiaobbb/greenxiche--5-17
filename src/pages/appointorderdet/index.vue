<template>
  <div>
    <div class="remind">
      <text>{{info.StatusName}}</text>
    </div>
    <!--切换显示-->
    <!--上门订单-->
    <div v-if="showVisit">
        <div class="flex-container orderhead white">
            <img src="/static/images/place.png" class="place">
            <div class="flex-container clomn personinfo">
                <div class="orderuser">
                    <p>{{info.ContactName}}</p>
                    <p>{{info.TelephoneNumber}}</p>
                </div>
                <div class="mysize">{{info.Address}}</div>
            </div>
        </div>
        <div class="flex-container apointtime">
            <img src="/static/images/time11.png" class="timelogo">
            <text>{{info.AddTime}}</text>
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
    <div class="flex-container prodetail" v-for="(item,index) in info.orderDetails" :key="index">
        <div class="orderpics">
            <img :src="item.ProductImg" class="orderpics">
        </div>
        <div class="flex-container proright">
            <div class="protitle">
                <p>{{item.ProductName}}</p>
            </div>
            <div class="myright">
                <p>￥{{item.UnitPrice}}</p>
                <p class="ordercolor">x{{item.ProductCount}}</p>
            </div>
        </div>
    </div>
    <div class="orderlist">
        <div class="orderitem padtop">
            <div class="flex-container">
                <p>运费（快递）</p>
                <p>￥{{info.ExpressPrice}}</p>
            </div>
            <div class="flex-container">
                <p>订单总价</p>
                <p>￥{{info.TotalPrice}}</p>
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
        <p class="pitem">订单编号：{{info.OrderNumber}}<span class="copy">复制</span></p>
        <p class="pitem">创建时间：{{info.AddTime}}</p>
        <div v-if="shwoSuccess">
           <p class="pitem">支付时间：{{info.PayTime}}</p>
            <p class="pitem" v-if="showVisit">上门时间：{{info.FaHuoTime}}</p>
            <p class="pitem" v-if="showReachStore">到店时间：2018-04-20 17:20:59</p>
            <p class="pitem">成交时间：{{info.CompleteTime}}</p>
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
        <div class="orderbottom white" v-if="showWait">
            <p class="rightbtn" :value="title" @click="applyMoney">{{title}}</p>
        </div>
        <!--上门订单 重新预约-->
        <div class="orderbottom white" v-if="showDelOrder">
            <p class="leftbtn" >删除订单</p>
            <p class="rightbtn">重新预约</p>
        </div>
        <!--上门、到店交易成功   第一个请按照-->
        <div class="orderapybottom white " v-if="shwoSuccess">
            <p class="rightbtn" @click="addCommont">去评价</p>
        </div>
        <div class="orderapybottom white ">
            <p class="rightbtn" @click="addCommont">去评价</p>
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
import { post } from "../../utils";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.orderNo = this.$root.$mp.query.orderNo;
    console.log(this.orderNo,"预约订单详情页")
    this.getOrderDetails();
  },
  data () {
    return {
      userId:"",
      token:"",
      orderNo:"",
      info:{},
      orderItemNum:"",//发表评论的订单编号
      title:"申请退款",
      showVisit:true,
      showWait:false,//申请退款
      showHas:false,
      shwoSuccess:false,
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
    async getOrderDetails(){
      let result = await post("Order/OrderDetails",{
        UserId:this.userId,
        Token:this.token,
        OrderNo:this.orderNo
      })
      console.log(result,"预约订单详情")
      if(Object.keys(result.data).length>0){
        this.info = result.data;
        this.orderItemNum=result.data.OrderNumber
        console.log(this.orderItemNum,"子单号")
        this.hasData = true;
      }
    },
    applyMoney(e){
        console.log(e.target)
         //wx.navigateTo({ url: "/pages/applymoney/main" });
    },
    addCommont(){
         wx.navigateTo({ url: "/pages/addcomment/main?orderNo="+this.orderItemNum+"&url=addcomment"});
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
