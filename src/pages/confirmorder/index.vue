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
                      <p>￥{{total}}</p>
                      <p>x{{buyNum}}</p>
                  </div>
              </div>
          </div>
          <div class="flex-container infoslide white pad">
              <div>购买数量</div>
              <div class="flex-container">
                  <img src="/static/images/add5.png" @click="addNum" class="specpic"> 
                  <input class="num" v-model="buyNum" type="number" />
                  <img src="/static/images/shot5.png" @click="lessNum" class="specpic">
              </div>
          </div>
          <div class="flex-container infoslide white pad">
              <div>支付方式</div>
              <div class="infoway">在线支付</div>
          </div>
          <div class="flex-container infoslide white pad" @click="goSelectCoupon">
              <div>优惠券</div>
              <div>
                  -50.00
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
      skuPrice:0,
      message:'',
      address:{
        id:'',
        name:'',
        phone:'',
        address:'',
      }
    }
  },
 
  components: {
    
  },
  computed:{
    total(){
      let totals = 0;
      if(this.skuPrice){
        console.log('存在sku')
      totals =  this.skuPrice*this.buyNum
      }else if(this.product.price){
        console.log('不存在sku')
        totals = this.product.price * this.buyNum
      }
      return  totals.toFixed(2)
    }
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
      const id = store.productId;
      const skuId = store.skuId;
      this.buyNum = store.buyNum||1;

      const res = await post("Goods/ProductInfo", { proId: 308 * 1 })
      console.log('skuINfo',id,skuId,this.buyNum)
    
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
          // 销量
          salesNum: datas.SalesVolume,
          // 邮费
          freight: datas.freight || "免运费",
          // 省份
          province: datas.ProvinceName,
          // 城市
          city: datas.CityName,
          serviceTab: datas.ServiceName?JSON.parse(datas.ServiceName):[],
          productParams: {
            // 品牌
            name: datas.BrandName,
            // 型号
            typeNum: datas.ModelName,
            // 服务类型
            serviceType: datas.TypeName,
             attr:'',
          }
        };
        // sku
        for (let i = 0; i < datas.ProductSpecList.length; i += 1) {
          const sku = datas.ProductSpecList[i];
          // let value =JSON.parse(sku.SpecValue)
          // console.log(value,'对象')
          // for(let j in value){
          //    console.log(j,value[j], "产品详情");
          // }
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
            this.skuImg = sku.SpecImage
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
    addNum(){
      let num = this.buyNum*1
        num +=1;
        this.buyNum = num
    },
    lessNum(){
      if(this.buyNum>1){
        this.buyNum -=1;
      }
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
    },
    goSelectAddress(){
      this.$store.commit('setSelectAddress',{
        url:'/pages/confirmorder/main',
        status:true
      })
      wx.navigateTo({url:'/pages/sitemanage/main'})
    },
    goSelectCoupon(){
      this.$store.commit('setSelectCoupon',{
        price:this.product.price,
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
