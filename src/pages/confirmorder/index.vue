<template>
  <div class="backgray">
      <!--地址栏-->
      <div class="flex-container clomn orderhead white" @click="goSelectAddress">
          <div class="orderuser">
              <p>收货人：{{address.name}}</p>
              <p>{{address.phone}}</p>
          </div>
          <div class="flex-container">
              <img src="/static/images/place.png" class="place">
              <text class="placeinfo">收货地址：{{address.address}}</text>
              <img src="/static/images/back.png" class="right">
          </div>
          <div class="ordertips">(温馨提示：请核对收货地址是否正确)</div>
      </div>
      <div class="slide"></div>
      <!--订单详情-->
      <div class="gray proorder">
          <div class="protitle white pad">{{product.shopName}}</div>
          <div class="proinfo flex-container pad">
              <div>
                <img :src="skuImg||product.img" class="orderimg">
              </div>
              <div class="inforight">
                  <div class="infotitle">{{product.title}}</div>
                  <div class="infospec">{{sku}}</div>
                  <div class="infoprice flex-container">
                      <p>￥{{price}}</p>
                      <p>x{{buyNum}}</p>
                  </div>
              </div>
          </div>
          <!-- <div class="flex-container infoslide white pad">
              <div>购买数量</div>
              <div class="flex-container">
                  <img src="/static/images/add5.png" @click="addNum" class="specpic"> 
                  <input class="num" v-model="buyNum" type="number" />
                  <img src="/static/images/shot5.png" @click="lessNum" class="specpic">
              </div>
          </div> -->
          <div class="flex-container infoslide white pad">
              <div>支付方式</div>
              <div class="infoway">在线支付</div>
          </div>
          <div class="flex-container infoslide white pad" @click="goSelectCoupon">
              <div>优惠券</div>
              <div>
                  -{{couponPrice}}
                  <img src="/static/images/back.png" class="right">
              </div>
          </div>
          <div class="infoslide inputbor flex-container white pad">
              <div>买家留言</div>
              <input type="text" v-model="message" placeholder="填写内容已和卖家协商确认" class="inputmes">
          </div>
          <div class="infoslide slideprice white pad">共计1件商品  合计：<span>￥{{total}}</span></div>
      </div>
      <!--底部按钮-->
      <div class="botbtn">
          <div class="price white">合计: <span>￥{{total}}</span></div>
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
          <div class="maskprice">￥{{total}}</div>
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
import {post} from "@/utils/index"
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
    this.getData();
    this.getAddress();
  },
  data () {
    return {
      userId: wx.getStorageSync("userId"),
      token: wx.getStorageSync("token"),
      isshow:false,
      showpay:false,
      showway:false,
      a:4,
      product:{},
      buyNum:1,
      sku:'',
      skuId:'',
      sbumitValue:'',
      skuPrice:0,
      message:'',
      address:{
        id:'',
        name:'',
        phone:'',
        address:'',
      },
      // 优惠券价格
      couponPrice:0.00,
    }
  },
 
  components: {
    
  },
  computed:{
    total(){
      let totals = 0;
      if(this.skuPrice){
        console.log('存在sku')
      totals =  this.skuPrice*this.buyNum - this.couponPrice
      }else if(this.product.price){
        console.log('不存在sku')
        totals = this.product.price * this.buyNum - this.couponPrice
      }
      return  totals.toFixed(2)
    },
    price(){
      return (this.product.price*this.buyNum).toFixed(2)
    }
  },
  watch:{

  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "确认订单"
      });
    },
    
    async getData() {
      const that = this;
      // 获取页面传参,在store里获取
      const store = this.$store.state
      const id = store.confirmOrder.productId;
      const skuId = store.confirmOrder.skuId;
      this.buyNum = store.confirmOrder.buyNum||1;
      this.couponPrice = this.$store.state.couponPrice.toFixed(2)
      const res = await post("Goods/ProductInfo", { proId: id * 1 })
      console.log('store',store)

      const datas = res.data;
      that.product = {
          shopName:datas.ShopName,
          img: datas.ProductImgList[0].PicUrl||'',
          sku: [],
          title: datas.ProductName,
          id: datas.ProductId,
          shopId: datas.ShopId,
          price: datas.ProductPrice,
          // 积分
          score: datas.Score,
          //   库存
          stock: datas.Stock,
          detail: datas.ContentDetail,
          // 邮费
          freight: datas.freight || "免运费",
        };
        // sku
        for (let i = 0; i < datas.ProductSpecList.length; i += 1) {
          const sku = datas.ProductSpecList[i];
          that.product.sku.push({
            productId: sku.ProId,
            num: sku.ProStock,
            price: sku.PunitPrice,
            img: sku.SpecImage,
            text: sku.SpecText,
            value: sku.SpecText.replace(/_/g, " "),
            sbumitValue:sku.SpecText
          });
          that.product.productParams.attr+=(sku.SpecText.replace(/_/g, " ")+'，')
          // 购买的sku
          if(sku.Id === skuId){
            this.sku = sku.SpecText.replace(/_/g, " ");
            this.skuPrice = sku.PunitPrice;
            this.skuImg = sku.SpecImage;
            this.sbumitValue = sku.SpecText
          }
         }
    },
    // 获取收货地址
    async getAddress(){
      // 重置store选择地址
      this.$store.commit('setSelectAddress',{
        url:'',
        status:false
      })
       // 重置store选择优惠券
      this.$store.commit('setSelectCoupon',{
        price:0,
        productId:0,
        classifyId:0,
        url:'',
        status:false
      })

      let res={}
      const confirmOrder = this.$store.state.confirmOrder
      // 还没选中地址，拿默认地址
      if(!confirmOrder.addressId){
      res = await post('Address/defaultaddress_New',{
        UserId:this.userId,
        Token:this.token
      })
      }else{
        // 选择地址获取选择的信息
        res = await post('Address/GetInfo',{
          UserId:this.userId,
          Token:this.token,
          Id:confirmOrder.addressId
        })
      }
      const _res = res.data
      this.address={
        id:_res.id,
        name:_res.name,
        phone:_res.tel,
        address:_res.addressinfo,
      }
    },
    // addNum(){
    //   let num = this.buyNum*1
    //     num +=1;
    //     this.buyNum = num
    // },
    // lessNum(){
    //   if(this.buyNum>1){
    //     this.buyNum -=1;
    //   }
    // },
    change(e){
      //console.log(e.target)
      this.a=e.target.dataset.eventid
    },
    // 提交订单
    async goPay(){
      // this.isshow=true,
      // this.showpay=true
      const res = await post('Order/BuyNowSubmitOrder',{
        UserId:this.userId,
        Token:this.token,
        ProId:this.product.id,
        Number:this.buyNum,
        AddressId:this.address.id,
        // sku
        SpecText:this.sbumitValue,
        // 是否开发票
        InvoiceId:0,
        InvoiceEmail:'',
        // InvoiceType:2,
        // 优惠券id
        MemberCouponId:0,
        // 备注
        Remark:'',
        // 服务卡券
        MemberCardId:0
      })
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
    },
    // 跳转选择收货地址
    goSelectAddress(){
      this.$store.commit('setSelectAddress',{
        url:'/pages/confirmorder/main',
        status:true
      })
      wx.navigateTo({url:'/pages/sitemanage/main'})
    },
    // 跳转选择优惠券
    goSelectCoupon(){
      // 设置提交订单参数
      const confirmOrder = this.$store.state.confirmOrder;
      this.$store.commit('setConfirmOrder',{
        addressId:confirmOrder.addressId,
      productId:confirmOrder.productId,
      skuId:confirmOrder.skuId,
      buyNum:this.buyNum,
      couponId:confirmOrder.couponId
      })
      this.$store.commit('setSelectCoupon',{
        price:this.total,
        // price:200,
        // productId:0,
        productId:this.product.id,
        classifyId:0,
        url:'/pages/confirmorder/main',
        status:true
      })
      wx.navigateTo({url:'/pages/coupons/main'})
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
