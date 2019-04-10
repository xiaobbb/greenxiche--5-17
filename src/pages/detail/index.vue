<template>
  <div class="detail">
    <div v-if="showEvaluate">
      <!--头部-->
      <div>
        <img :src="product.img" class="shippic">
        <div class="shophead">
          <p class="headtitle">
            ￥
            <span>{{product.price}}</span>
          </p>
          <div class="flex-container">
            <p class="headinfo">{{product.title}}</p>
            <p class="flex-container headright" @click="share">
              <img src="/static/images/shareicon.png" class="share">
              <text>分享</text>
            </p>
          </div>
          <div class="flex-container headtips">
            <P>快递:{{product.freight||'免运费'}}</P>
            <P>已售{{product.salesNum}}</P>
            <P>{{product.province}}{{product.city}}</P>
          </div>
        </div>
      </div>
      <div class="slide"></div>
      <!--优惠-->
      <div class="flex-container coupon">
        <div class="flex-container">
          <div>优惠</div>
          <div>
            <div class="couponmenu">
              <div class="flex-container" v-if="coupon[0]">
                <text class="itemname">优惠券</text>
                <p class="couponmenuinfo">
                  <img src="/static/images/deatailbg.png" class="couponbg">
                  <text>满{{coupon[0].meetConditions}}减{{coupon[0].price}}</text>
                </p>
              </div>
              <div class="flex-container couptsild">
                <text class="itemname">积分</text>
                <p>购买可得{{product.score||0}}积分</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flec-container" @click="getCoupons">
          <text class="getcon">领券</text>
          <img src="/static/images/back.png" class="right">
        </div>
      </div>
      <div class="slide"></div>
      <!--说明-->
      <div class="state">
        <div class="flex-container statetips" v-if="product.serviceTab&&product.serviceTab.length>0">
          <p class="tipname">服务</p>
          <div class="flex-container stateinfo">
            <p v-for="(item,index) in product.serviceTab" :key="index">
              <img src="/static/images/gou.png" class="pics">
              <text>{{item}}</text>
            </p>
          </div>
        </div>
        <div class="flex-container statetips" @click="chooseSpecs">
          <p class="tipname">规格</p>
          <div class="flex-container stateinfo">
            <text>请选择规格数量</text>
            <img src="/static/images/back.png" class="right">
          </div>
        </div>
        <div class="flex-container statetips" @click="getPramas">
          <p class="tipname">参数</p>
          <div class="flex-container stateinfo">
            <text>服务类型 品牌...</text>
            <img src="/static/images/back.png" class="right">
          </div>
        </div>
      </div>
      <div class="slide"></div>
      <!--宝贝评价-->
      <div class="estimate">
        <div class="flex-container estititle">
          <p>宝贝评价</p>
          <p @click="commentList">
            <text class="seeall">查看全部</text>
            <img src="/static/images/back.png" class="right">
          </p>
        </div>
        <detailChildpic
          v-for="(item,index) in product.comment"
          :key="index"
          :data="item"
          v-show="index===0"
        >{{item}}</detailChildpic>
      </div>
      <div class="slide"></div>
      <!--商品详情-->
      <div class="particular">
        <div class="parttitle">商品详情</div>
        <div v-html="product.detail">
          <!-- <img src="/static/images/vedio.png" class="vedio"> -->
        </div>
        <!-- <img src="/static/images/detailinfo.png" class="partinfo"> -->
      </div>
      <!--底部按钮-->
      <div class="bottom">
        <div class="flex-container bottips">
          <p class="clomn flex-container" @click="gotabBar('/pages/index/main')">
            <img src="/static/images/home1.png" class="bottip">
            <text>主页</text>
          </p>
          <p class="clomn flex-container">
            <img src="/static/images/mesg.png" class="bottip">
            <text>客服</text>
          </p>
          <p class="clomn flex-container" @click="goUrl('/pages/shopcart/main')">
            <img src="/static/images/shopcar.png" class="bottip">
            <text>购物车</text>
          </p>
        </div>
        <div class="botcart bot" @click="chooseSpecs">加入购物车</div>
        <div class="botchase bot" @click="chooseSpecs('pay')">立即购买</div>
      </div>
      <!--遮罩层-->
      <div class="mask-modal" v-if="isshow" @click="onMask"></div>
      <!--优惠-->
      <div class="mask" v-if="showDiscount">
        <div class="masktitle">优惠</div>
        <div class="maskinfo">
          <p class="maskitem">促销</p>
          <div class="maskdetail">
            <p class="maskcoupon">积分</p>
            <text>购买可得{{product.score||0}}积分 拷贝</text>
          </div>
          <p class="maskitem">领券</p>
          <div class="maskcouponlist" v-for="(coupon,couponIndex) in coupon" :key="couponIndex">
            <img src="/static/images/pinkbg.png" class="pink">
            <div class="maskser flex-container">
              <div>
                <p class="maskprice">
                  ¥
                  <span>{{coupon.price}}</span>
                </p>
                <p class="maskask">满{{coupon.meetConditions}}使用</p>
                <p class="maskask">有效期{{coupon.time}}</p>
              </div>
              <div class="maskget" @click="nowGetCoupon(coupon.id)">立即领取</div>
            </div>
          </div>
        </div>
        <div class="btnget" @click="cancleMask">完成</div>
      </div>
      <!--产品参数-->
      <div class="mask" v-if="showPram">
        <div class="masktitle">产品参数</div>
        <div class="pramasitem flex-container" v-if="product.productParams.setviceType">
          <p>服务类型</p>
          <p class="pramastitle">{{product.productParams.setviceType}}</p>
        </div>
        <div class="pramasitem flex-container" v-if="product.productParams.name">
          <p>品牌</p>
          <p class="pramastitle">{{product.productParams.name}}</p>
        </div>
        <div class="pramasitem flex-container" v-if="product.productParams.typeNum">
          <p>型号</p>
          <p class="pramastitle">{{product.productParams.typeNum}}</p>
        </div>
        <div class="pramasitem flex-container" v-if="product.province">
          <p>省份</p>
          <p class="pramastitle">{{product.province}}</p>
        </div>
        <div class="pramasitem flex-container" v-if="product.productParams.attr">
          <p>规格</p>
          <p class="pramastitle">{{product.productParams.attr}}</p>
        </div>
        <div class="btnget pramasget" @click="canclePramas">完成</div>
      </div>
      <!--加入购物车、选择规格-->
      <div class="mask choose" v-if="showNums">
        <div class="flex-container choosetitle">
          <div class="flex-container">
            <!-- <img :src="activeImg" class="maskshop"> -->
            <img :src="activeImg||product.img" class="maskshop">
            <div class="chooseinfo">
              <p class="price">{{selectSkuPrice||product.price}}</p>
              <p class="tips count">库存{{selectSkuNum||product.stock}}件</p>
              <p class="tips" v-show="selectSkuValue">已选:“{{selectSkuValue}}”</p>
            </div>
          </div>
          <div>
            <img src="/static/images/close.png" @click="onMask" class="close">
          </div>
        </div>
        <div class="spcestitle" v-if="product.sku.length>0">规格</div>
        <div class="specs" v-if="product.sku.length>0">
          <!-- <div class="flex-container">
                      <img src="/static/images/specimg.png" class="specpic">
                      <text>精选1年版（全国包施工）</text>
          </div>-->
          <div
            class="flex-container spec"
            :class="activeSkuIndex === index?'specactive':''"
            v-for="(item,index) in product.sku"
            :key="index"
            @click="selectSku(index)"
          >
            <img :src="item.img" class="specpic">
            <text>{{item.value}}</text>
          </div>
          <!-- <div class="flex-container">
                      <img src="/static/images/specimg.png" class="specpic">
                      <text>精选1年版（全国包施工）</text>
          </div>-->
        </div>
        <div class="flex-container choosenums">
          <p>购买数量</p>
          <p class="flex-container">
            <img src="/static/images/11.png" class="menu" @click="lessNum">
            <input type="number" v-model="payNum">
            <img src="/static/images/12.png" class="menu" @click="addNum">
          </p>
        </div>
        <div class="btnget pramasget" v-if="addcart" @click="confirm">完成</div>
        <div class="addcart flex-container" v-else>
          <div class="addtocart" @click="addCart">加入购物车</div>
          <div class="addconfirm" @click="confirm">确定</div>
        </div>
      </div>
      <!--分享-->
      <div class="mask mask2" v-if="showShare">
        <div class="flex-container maskshare">
          <p class="flex-container clomn">
            <img src="/static/images/friend.png" class="friend">
            <text>微信好友</text>
          </p>
          <p class="flex-container clomn">
            <img src="/static/images/friend2.png" class="friend">
            <text>微信好友</text>
          </p>
        </div>
        <div class="cancleshare" @click="cancleShare">取消分享</div>
      </div>
    </div>
    <!--全部评价-->
    <div v-else>
      <detailChild></detailChild>
      <detailChildpic></detailChildpic>
      <detailChild></detailChild>
      <div>
        <detailChild></detailChild>
        <div class="callback">[商家回复]：感谢您的评价，我们的价格可以说是龙华最 低、性价比最高、服务最好的洗车店了</div>
      </div>
    </div>
  </div>
</template>

<script>
import detailChild from "@/components/detailChild"; //公用组件
import detailChildpic from "@/components/detailChildpic"; //公用组件
import { post } from "@/utils/index";
import "../../css/common.css";
import "../../css/global.css";
export default {
  data() {
    return {
      userId: wx.getStorageSync("userId"),
      token: wx.getStorageSync("token"),
      id: "",
      isshow: false,
      showDiscount: false,
      showShare: false,
      showPram: false,
      addcart: false,
      showNums: false,
      showEvaluate: true,
      payNum: 1,
      product: {},
      //   选择的sku图片
      activeImg: "",
      activeSkuIndex: "",
      selectSkuPrice: "",
      selectSkuNum: "",
      selectSkuValue: "",
      selectSkuValueSubmit:'',
      // 优惠券
      coupon: []
    };
  },

  components: {
    detailChild,
    detailChildpic
  },
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.setBarTitle();
    this.getData();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "商品详情"
      });
    },
    async getData() {
      const that = this;
      const id = this.$root.$mp.query.id;
      const res = await post("Goods/ProductInfo", { proId: id * 1 })

        const datas = res.data;
        // 获取优惠券信息
        that.getCoupon(datas.ShopId);
        that.product = {
          img: datas.ProductImgList[0].PicUrl||'',
          imgs: [],
          comment: [],
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
        // 商品图片
        for (let i = 0; i < datas.ProductImgList.length; i += 1) {
          that.product.imgs.push(datas.ProductImgList[i].PicUrl);
        }
        // 评论列表
        for (let i = 0; i < datas.EvaluateList.length; i += 1) {
          const comments = datas.EvaluateList[i];
          that.product.comment.push({
            id: comments.Id,
            userId: comments.MemberId,
            userName: comments.MemberName,
            userImg: comments.MemberHeadImg,
            content: comments.ContentText,
            time: comments.AddTime,
            rank: comments.Rank,
            img: comments.EvaluateImgList
          });
        }
        // sku
        for (let i = 0; i < datas.ProductSpecList.length; i += 1) {
          const sku = datas.ProductSpecList[i];
          // let value =JSON.parse(sku.SpecValue)
          // console.log(value,'对象')
          // for(let j in value){
          //    console.log(j,value[j], "产品详情");
          // }
          that.product.sku.push({
            id:sku.Id,
            productId: sku.ProId,
            num: sku.ProStock,
            price: sku.PunitPrice,
            img: sku.SpecImage,
            text: sku.SpecText,
            value: sku.SpecText.replace(/_/g, " "),
            sbumitValue:sku.SpecText
          });
          that.product.productParams.attr+=(sku.SpecText.replace(/_/g, " ")+'，')
         }
        
    },
    // 获取优惠券列表
    async getCoupon(shopId) {
      if (wx.getStorageSync("token") && wx.getStorageSync("userId")) {
        const params = {
          UserId: wx.getStorageSync("userId"),
          Token: wx.getStorageSync("token"),
          // ShopId:shopId,
          page: 1
        };
        const res = await post("Coupon/CouponCenter", params);
        for (let i = 0; i < res.data.length; i += 1) {
          const _res = res.data[i];
          this.coupon.push({
            price: _res.Denomination,
            time: _res.StartEndTimeStr,
            meetConditions: _res.MeetConditions,
            id: _res.Id
          });
        }
        console.log(this.coupon, "coupon");
      }
    },
    // 点击遮罩层隐藏
    onMask() {
      this.isshow = false;
      this.showDiscount = false;
      this.showPram = false;
      this.showNums = false;
      this.showShare = false;
    },
    lessNum() {
      if (this.payNum > 1) {
        this.payNum -= 1;
      }
    },
    addNum() {
      this.payNum += 1;
    },
    goUrl(url) {
      wx.navigateTo({ url });
    },
    gotabBar(url) {
      wx.switchTab({ url });
    },
    // 加入购物车
    async addCart() {
      // 判断库存
      if(!this.stockCheck()){
        return false;
      }
      const params = {
        UserId: this.userId,
        Token: this.token,
        ProId: this.product.id,
        Count: this.payNum,
        SpecText: this.selectSkuValueSubmit
      };
      try {
       const res = await post("Cart/AddCart", params);
        wx.showToast({
            title: "添加成功！",
            icon: "success"
          });
      }
      catch(e){
        console.log('e')
        console.log(e)
      }
    },
    // 校验购买数量
    stockCheck(){
      const stock = this.selectSkuNum||this.product.stock
      if (stock < this.payNum) {
        wx.showToast({
          title: "购买数量大于剩余库存！",
          icon: "none"
        });
        return false;
      }
      return true;
    },
    // 购买
    confirm() {
      // 判断库存
      if(!this.stockCheck()){
        return false;
      }
      this.showNums = false;
      this.isshow = false;
      
    this.$store.commit('setConfirmOrder',{
      addressId:'',
      productId:this.product.id,
      sku:this.selectSkuValueSubmit,
      // buyNum:this.selectSkuNum,
      buyNum:this.payNum,
      couponId:''
    })
      wx.navigateTo({ url: `/pages/confirmorder/main` });
    },
    // 选择sku
    selectSku(index) {
      this.activeSkuIndex = index;
      this.activeSkuId = this.product.sku[index].id;
      this.selectSkuPrice = this.product.sku[index].price;
      this.activeImg = this.product.sku[index].img;
      // this.selectSkuNum = this.payNum;
      this.selectSkuNum = this.product.sku[index].stock;
      this.selectSkuValue = this.product.sku[index].value;
      this.selectSkuValueSubmit = this.product.sku[index].sbumitValue;
    },
    share() {
      this.isshow = true;
      this.showShare = true;
    },
    cancleShare(pay) {
      this.isshow = false;
      this.showShare = false;
    },
    // 展示优惠券
    getCoupons() {
      this.isshow = true;
      this.showDiscount = true;
    },
    // 领取优惠券
    async nowGetCoupon(id) {
      const params = {
        UserId: wx.getStorageSync("userId"),
        Token: wx.getStorageSync("token"),
        UseType: 0,
        CouponId: id
      };
      const res = await post("Coupon/ReceiveCoupon", params);
      wx.showToast({
        title: "领取成功!",
        icon: "success"
      });
      setTimeout(() => {
        this.isshow = false;
        this.showDiscount = false;
      }, 1500);
    },
    cancleMask() {
      this.isshow = false;
      this.showDiscount = false;
    },
    getPramas() {
      this.isshow = true;
      this.showPram = true;
    },
    canclePramas() {
      this.isshow = false;
      this.showPram = false;
    },
    chooseSpecs(pay) {
      if (pay === "pay") {
        this.addcart = true;
      } else {
        this.addcart = false;
      }
      this.isshow = true;
      this.showNums = true;
    },
    commentList() {
      wx.navigateTo({
        url:'/pages/comment-list/main'
      })
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
