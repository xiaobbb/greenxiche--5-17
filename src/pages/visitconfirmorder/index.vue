<template>
  <div class="backgray">
    <div v-if="isshow">
      <!---->
      <div class="flex-container clomn  ordershophead white">
          <div class="orderserve">服务商家</div>
          <div class="flex-container ordermain">
              <img :src="orderinfo[0].ShopData[0].Logo" class="ordershopimg">
              <div class="flex-container clomn orderplace">
                  <p class="placename">{{orderinfo[0].ShopData[0].ShopNick}}</p>
                  <p>{{orderinfo[0].ShopData[0].Address}}</p>
              </div>
          </div>
          <div class="ordertips">(温馨提示：请核对收货地址是否正确)</div>
      </div>
      <div class="slide"></div>
      <!--订单详情-->
      <div class="white proinfo">
          <div class="orderserve">服务项目</div>
          <div class="flex-container ordermain">
              <img :src="orderinfo[0].PicNo" class="ordershopimg">
              <div class="flex-container clomn orderplace">
                  <p class="placename detailright">{{orderinfo[0].Name}}</p>
                  <p>￥{{orderinfo[0].Price}}</p>
              </div>
          </div>
          <div class="flex-container infoslide white pad" @click="choseItem(1)">
              <div>服务车辆</div>
              <div>
                  <img src="/static/images/back.png" class="right">
              </div>
          </div>
          <div class="flex-container infoslide white pad" @click="choseItem(3)">
              <div>优惠券</div>
              <div>
                  <img src="/static/images/back.png" class="right">
              </div>
          </div>
          <div class="flex-container infoslide white pad" @click="choseItem(5)">
              <div>服务卡券</div>
              <div>
                  <img src="/static/images/back.png" class="right">
              </div>
          </div>
          <div class="infoslide inputbor flex-container white pad" @click="choseItem(4)">
              <div>买家留言</div>
              <input type="text" placeholder="填写内容已和卖家协商确认" class="inputmes">
          </div>
          <div class="infoslide slideprice white pad">合计：<span>￥{{orderinfo[0].Price}}</span></div>
      </div>
      <!--底部按钮-->
      <div class="botbtn">
          <div class="price white">合计: <span>￥{{orderinfo[0].Price}}</span></div>
          <div class="btnconfir" @click="goPay">提交订单</div>
      </div>
    </div>
    <div v-else>
        <div class="lasttime white">剩余支付时间  <span>{{minute}}</span> : <span>{{second}}</span></div>
        <div class="flex-container white commonpad">
            <p class="strong">应付金额</p>
            <p class="shouldpay">￥{{orderParmar.Total}}</p>
        </div>
        <div class="slide"></div>
        <div class="white">
            <div class="itempay commonpad">选择第三方支付，剩余支付<span class="shouldpay">¥{{orderParmar.Wallet}}</span>元</div>
            <!-- <div>
              <div class="flex-container payitem commonpad">
                  <img src="/static/images/wx.png" class="payimg">
                  <input type="radio" :checked="a==4" @click="change(4)">
              </div>
              <div class="flex-container payitem commonpad"> 
                  <img src="/static/images/rmbbg.png" class="payimg">
                  <input type="radio" :checked="a==5" @click="change(5)">
              </div>
          </div> -->
          <radio-group class="radio-group" @change="radioChange">
            <label class="radio" v-for="item in payitems" :key="item.id">
              <div class="flex-container payitem commonpad">
                  <div class="flex-container">
                      <img src="/static/images/wx.png" class="payimg" v-if="item.id==1">
                      <img src="/static/images/rmbbg.png" class="payimg" v-if="item.id==2">
                      <text style="margin-left:20rpx;"> {{item.value}}</text>
                  </div>
                  <radio :value="item.id" :checked="item.checked"/>
              </div>
            </label>
          </radio-group>
        </div>
        <div class="btncharge" @click="payMoney">立即支付</div>
    </div>
  </div>
</template>

<script>
import { get, myget, mypost, post, toLogin } from "../../utils";
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
    this.Password=wx.getStorageSync('password');
    this.getOrderInfo()
    console.log(this.proid,this.Token,this.UserId)
    this.changeTime()
  },
  data () {
    return {
      isshow:false,
      proid:"", //产品id
      CarInfoId:"",//车辆id
      CouponId:"",//优惠券id
      CardTicketId:"",//服务卡券id
      Token:"",
      UserId:"",
      OrderNo:"",
      Password:"",
      orderinfo:[],
      orderParmar:"",
      minute:10,
      second:'00',
      timer:"",
      a:4,
      payitems:[
        {id:1,value:"微信支付",checked:'true'},{id:2,value:"余额支付"}
      ]
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "确认订单"
      });
    },
    async getOrderInfo(){
      var result=await post("/Order/ServiceProductsFirmOrder",{
        UserId:this.UserId,
        Token:this.Token,
        ProductId:this.proid
      })
      if(result.code==0){
        this.orderinfo=result.data
        //console.log(result.data)
        this.CouponId=result.data.CouponData.CouponId
        this.CardTicketId=result.data.CardTicketData.CardTicketId  //优惠券卡券只能选择一个
        this.CarInfoId= result.data.CarInfoData.Id
      }
    },
    choseItem(e){
      if(e==1){   //我的车辆
           wx.navigateTo({ url: "/pages/mycar/main?url=visitconfirmorder/main"});
      }else if(e==3){ //优惠券
           wx.navigateTo({ url: "/pages/coupons/main?url=visitconfirmorder/main"});
      }else{   //服务卡券
           wx.navigateTo({ url: "/pages/certical/main?url=visitconfirmorder/main"});
      }
    },
    radioChange(e){
      for(const x in this.payitems){
        if(this.payitems[x].id==e.target.value){
          this.payitems[x].checked=true
        }else{
          this.payitems[x].checked=false
        }
      }
    },
    async goPay(){
      //this.isshow=false
      var result=await post("/Order/ServiceProductsPlaceOrder",{
          UserId:this.UserId,
          Token:this.Token,
          ProductId:this.proid,
          CarInfoId:this.CarInfoId,
          CouponId:this.CouponId,
          CardTicketId:this.CardTicketId,
      })
      console.log(result,"发起支付请求")
      if(result.code==0){
          this.OrderNo=result.data
          this.getOrderParam()
      }
    },
    async getOrderParam(){  //获取订单支付金额及支付剩余时间
        if(this.OrderNo){
            var result=await post("/Order/GetOrderParam",{
              UserId:this.UserId,
              Token:this.Token,
              OrderNo:this.OrderNo
            })
            console.log(result,"获取订单金额 剩余支付时间")
            if(result.code==0){
              this.orderParmar=result.data
              this.minute=result.data.ExpireTime
          }
        }
    },
    //定时器支付时间变化
    changeTime(){
      this.timer=setInterval(
        ()=>{
        if(this.second==='00'){
          this.second=59
          this.minute--
        }
        this.second--
        if(!this.second.toString()[1]){
          this.second=`0${this.second}`
        }
        if(!this.minute.toString()[1]){
          this.minute=`0${this.minute}`
        }
        if(this.minute==="00"){
          clearInterval(this.timer)
        }
      },1000)
    },
    async payMoney(){
       for(const x in this.payitems){
         if(this.payitems[x].checked){
           if(x==0){
             var result=await post("") //微信支付接口
           }
           if(x==1){
             var result=await post("/Order/PaymentOrder",{
                UserId:this.UserId,
                Token:this.Token,
                OrderNo:this.OrderNo,
                Password:this.Password
             })
             console.log(result,"这是余额支付的结果")
             if(result.code==0){
               wx.wx.showToast({
                 title: result.data,
                 icon: 'none',
                 duration: 1500,
                 mask: false,
                 success: (result)=>{

                 },
                 fail: ()=>{},
                 complete: ()=>{}
               });
             }
           }
         }
          
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
