<template>
  <div class="backgray">
      <!--地址栏-->
      <div class="flex-container clomn orderhead white">
          <div class="orderuser">
              <p>收货人：张三</p>
              <p>13125252626</p>
          </div>
          <div class="flex-container">
              <img src="/static/images/place.png" class="place">
              <text class="placeinfo">收货地址：广东省深圳市龙岗区坂田街道中心路十里花园5期12栋</text>
              <img src="/static/images/back.png" class="right">
          </div>
          <div class="ordertips">(温馨提示：请核对收货地址是否正确)</div>
      </div>
      <div class="slide"></div>
      <!--订单详情-->
      <div class="gray proorder">
          <div class="protitle white pad">绿妞长效镀晶</div>
          <div class="proinfo flex-container pad">
              <div>
                <img src="/static/images/orderimg.png" class="orderimg">
              </div>
              <div class="inforight">
                  <div class="infotitle">绿妞长效镀晶9H汽车度镀晶纳米水晶镀膜包施工新全车辆车漆面德国</div>
                  <div class="infospec">精选1年版（全国包施工） </div>
                  <div class="infoprice flex-container">
                      <p>￥1288</p>
                      <p>x1</p>
                  </div>
              </div>
          </div>
          <div class="flex-container infoslide white pad">
              <div>购买数量</div>
              <div>
                  <img src="/static/images/add5.png" class="specpic"> 
                  <text class="num">1</text>
                  <img src="/static/images/shot5.png" class="specpic">
              </div>
          </div>
          <div class="flex-container infoslide white pad">
              <div>支付方式</div>
              <div class="infoway">在线支付</div>
          </div>
          <div class="flex-container infoslide white pad">
              <div>优惠券</div>
              <div>
                  <img src="/static/images/back.png" class="right">
              </div>
          </div>
          <div class="infoslide inputbor flex-container white pad">
              <div>买家留言</div>
              <input type="text" placeholder="填写内容已和卖家协商确认" class="inputmes">
          </div>
          <div class="infoslide slideprice white pad">共计1件商品  合计：<span>￥1288.00</span></div>
      </div>
      <!--底部按钮-->
      <div class="botbtn">
          <div class="price white">合计: <span>￥1288.00</span></div>
          <div class="btnconfir" @click="goPay">提交订单</div>
      </div>
      <!--遮罩层-->
      <div class="mask-modal" v-if="isshow"></div>
        <!--确认付款-->
      <div v-if="showpay" class="paymask white">
          <div class="paytile">
              <img src="/static/images/close.png" class="close" @click="closeMask">
              <text>确认付款</text>
          </div>
          <div class="maskprice">￥1288.00</div>
          <div class="flex-container maskitem">
              <div class="fontclolr">帐号</div>
              <div>150******08</div>
          </div>
          <div class="flex-container maskitem">
              <div class="fontclolr">付款方式</div>
              <div  @click="goWay">
                  <text class="wx">微信</text>
                  <img src="/static/images/back.png" class="right">
              </div>
          </div>
          <div class="paybtn btnbottom">确认付款</div>
      </div>
      <!--选择付款方式-->
      <div v-if="showway" class="paymask white">
          <div class="paytile">
              <img src="/static/images/leftarrow.png" class="leftarrow leftposi" @click="backPage">
              <text>选择支付方式</text>
          </div>
          <div>
              <div class="flex-container payitem">
                  <img src="/static/images/wx.png" class="payimg">
                  <input type="radio" :checked="a==4" @click="change($event)">
              </div>
              <div class="flex-container payitem"> 
                  <img src="/static/images/rmbbg.png" class="payimg">
                  <input type="radio" :checked="a==5" @click="change($event)">
              </div>
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
      isshow:false,
      showpay:false,
      showway:false,
      a:4,
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
    change(e){
      //console.log(e.target)
      this.a=e.target.dataset.eventid
    },
    goPay(){
      this.isshow=true,
      this.showpay=true
    },
    goWay(){
      this.isshow=true,
      this.showpay=false,
      this.showway=true
    },
    backPage(){
      this.isshow=true,
      this.showpay=true,
      this.showway=false
    },
    closeMask(){
      this.isshow=false,
      this.showpay=false,
      this.showway=false
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
