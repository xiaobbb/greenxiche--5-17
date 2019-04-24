<template>
  <div>
    <!--支付-->
    <div class="glo-relative">
        <map id="map"  :longitude="longitude" :latitude="latitude"  scale="15" :controls="controls"  :markers="markers"   @markertap="markertap"   @regionchange="regionchange"   @controltap="controltap" show-location style="width: 100%; height:610rpx;"></map>
    </div>
    <div class="orderPay">
      <!--item-->
      <div class="paymenu">
          <div class="ordertitle">
              <p>确认支付信息</p>
              <img src="/static/images/close.png" class="close" @click="colsePay">
          </div>
          <p class="menu">￥{{price}}</p>
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
          <div class="paybtn" style="margin-top:50rpx;" @click="payMoney">立即支付</div>
      </div>
      <!--密码输入框-->
      <div class="mypopup" v-if="showPass">
        <div class="content">
            <div class="close_btn" @click="closePop">X</div>
            <div class="main">
                <div>请输入支付密码验证</div>
                <div class="pwipt">
                    <input type="password" @input="judgePassword" v-model="password" autofocus maxlength='6'>
                    <div class="border-right">
                        <span v-if="show1"></span>
                    </div>
                    <div class="border-right">
                        <span v-if="show2"></span>
                    </div>
                    <div class="border-right">
                        <span v-if="show3"></span>
                    </div>
                    <div class="border-right">
                        <span v-if="show4"></span>
                    </div>
                    <div class="border-right">
                        <span v-if="show5"></span>
                    </div>
                    <div>
                        <span v-if="show6"></span>
                    </div>
                </div>
                <div class="forgetpw" @click="findPass">忘记密码？</div>
            </div>
        </div>
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
    this.userId = wx.getStorageSync('userId');
    this.token = wx.getStorageSync('token');
    this.password=wx.getStorageSync('password');
    this.setBarTitle();
    this.orderNo=this.$root.$mp.query.orderNo
    this.price=this.$root.$mp.query.price
  },
  onShow(){
    this.showPass=false
  },
  data () {
    return {
      latitude: wx.getStorageSync("latitude"),
      longitude: wx.getStorageSync("longitude"),
      showPass:false,//密码输入框
      orderNo:"",//订单编号
      price:"",
      userId:"",
      token:"",
      password:"", //会员支付密码
      autofocus: true,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6:false,
      controls: [{  //控件不随着地图移动
          id: 1,
          iconPath: '/static/images/location.png',
          position: {
            left: 0,
            top: 500,
            width: 30,
            height: 30
          },
          clickable: true
      }],
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
        title: "支付订单"
      });
    },
    colsePay(){
        // wx.navigateTo({
        //     url:"/pages/myorder/main?orderBigType=2&status=1"
        // });
        wx.navigateBack();
    },
    payMoney(){
        //判断哪种支付方法
        for(let i=0;i<this.payitems.length;i++){
          if(this.payitems[i].checked){
            console.log(i,"哪种支付方式")
            if(i==0){
              this.wxPay()
            }else{
              this.showPass=true
              this.otherPay()
            }
          }
        }
    },
    async wxPay(){
      var res=await post("/Order/ConfirmWeiXinSmallPay",{
          UserId:this.userId,
          Token:this.token,
          //OrderNo:"201904111028561742883"
          OrderNo:this.orderNo
        })
        console.log(res,"微信支付")
        if(res.code==0){
            let payData=JSON.parse(res.data.JsParam);
            wx.requestPayment({
            timeStamp: payData.timeStamp,
            nonceStr: payData.nonceStr,
            package: payData.package,
            signType: payData.signType,
            paySign: payData.paySign,
            success(res) { 
              wx.navigateTo({
                url:"/pages/myorder/main?orderBigType=2&status=1"
              });
            },
            fail(res) {

            }
          })
        }
    },
    async otherPay(){
      console.log(this.password,"支付密码")
      var res=await post("/Order/PaymentOrder",{
          UserId:this.userId,
          Token:this.token,
          //OrderNo:"201904111028561742883",
          Password:this.password, //会员支付密码
          OrderNo:this.orderNo
        })
        console.log(res,"余额支付")
        if(res.code==0){
          //余额支付成功
          wx.navigateTo({url:"/pages/myorder/main?orderBigType=2"});
        } else if(res.code=='9'){
            this.showPass=false
        }
    },
    radioChange:function(e){
      for(const x in this.payitems){
        if(this.payitems[x].id==e.target.value){
          this.payitems[x].checked=true
        }else{
          this.payitems[x].checked=false
        }
      }
    },
    //关闭密码输入清空输入
    closePop: function() {
        this.password = '';
        this.judgePassword();
    },
    findPass(){
      wx.navigateTo({url:"/pages/setpassword/main?url=orderpay"});
    },
    judgePassword: function() {
      console.log(this.password,this.password.length)
        if(this.password.length == 0) {
            this.show1 = false;this.show2 = false;this.show3 = false;this.show4 = false;this.show5 = false;this.show6 = false;
        }
        if(this.password.length == 1) {
            this.show1 = true;this.show2 = false;this.show3 = false;this.show4 = false;this.show5 = false;this.show6 = false;
        }
        if(this.password.length == 2) {
            this.show1 = true;this.show2 = true;this.show3 = false;this.show4 = false;this.show5 = false;this.show6 = false;
        }
        if(this.password.length == 3) {
            this.show1 = true;this.show2 = true;this.show3 = true;this.show4 = false;this.show5 = false;this.show6 = false;
        }
        if(this.password.length == 4) {
            this.show1 = true;this.show2 = true;this.show3 = true;this.show4 = true;this.show5 = false;this.show6 = false;
        }
        if(this.password.length == 5) {
            this.show1 = true;this.show2 = true;this.show3 = true;this.show4 = true;this.show5 = true;this.show6 = false;
        }
        if(this.password.length == 6) {
            this.show1 = true;this.show2 = true;this.show3 = true;this.show4 = true;this.show5 = true;this.show6 = true;
            console.log(this.show6)
            // 接口校验密码
            this.otherPay()
        }
    },
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
  @import "../../css/common.css";
  .payimg{
    width:56rpx;
    height:56rpx;
}
.mypopup {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}
.mypopup .content {
    position: relative;
    background: #fff;
    width: 75%;
    height:300rpx;
    border-radius: 10rpx;
}
.mypopup .content .main {
    padding: 40rpx 30rpx;
    font-size: 32rpx;
    text-align: center;
}
.mypopup .content .main h3 {
    font-size: 18rpx;
    line-height: 32rpx;
    font-weight: 700;
}
.mypopup .content .main .tip {
    color: #EE4A4A;
    margin-bottom: 10rpx;
    font-size:20rpx;
}
.mypopup .content .main .pwipt {
    font-size: 0;
    height: 80rpx;
    line-height: 80rpx;
    width: 95%;
    margin:0 auto;
    border: 1rpx solid #ccc;
}
.mypopup .content .main .pwipt div {
    display: inline-block;
    width: 16.2%;
    height: 80rpx;
    position: relative;
}
.mypopup .content .main .pwipt .border-right {
    border-right: 1rpx solid #ccc;
}
.mypopup .content .main .pwipt div>span {
    position: absolute;
    width: 20rpx;
    height: 20rpx;
    background: #000;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    margin-top: -10rpx;
    margin-left: -10rpx;
}
.mypopup .content .main .pwipt input {
    outline: none;
    border: 0;
    background: none;
    width: 700rpx;
    height: 0;
    padding: 22rpx 0;
    text-align: center;
    position: absolute;
    left: -500rpx;
    right: 0;
    z-index: 1000;
    color:transparent;
    text-indent: -999em;
}
.mypopup .content .close_btn {
    position: absolute;
    top: 14rpx;
    right: 14rpx;
    width: 14rpx;
    height: 14rpx;
    z-index: 1000;
}
.forgetpw {
    font-size: 14px;
    color: #008AFF;
    margin-top: 10rpx;
    text-align: right;
}
</style>
