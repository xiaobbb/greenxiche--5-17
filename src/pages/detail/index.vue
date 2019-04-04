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
              <div class="flex-container">
                <text class="itemname">优惠券</text>
                <p class="couponmenuinfo">
                  <img src="/static/images/deatailbg.png" class="couponbg">
                  <text>满188减20</text>
                </p>
              </div>
              <div class="flex-container couptsild">
                <text class="itemname">积分</text>
                <p>购买可得{{product.score||0}}积分</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flec-container" @click="getCoupon">
          <text class="getcon">领券</text>
          <img src="/static/images/back.png" class="right">
        </div>
      </div>
      <div class="slide"></div>
      <!--说明-->
      <div class="state">
        <div class="flex-container statetips">
          <p class="tipname">服务</p>
          <div class="flex-container stateinfo">
            <p>
              <img src="/static/images/gou.png" class="pics">
              <text>品质保证</text>
            </p>
            <p>
              <img src="/static/images/gou.png" class="pics">
              <text>破损补寄</text>
            </p>
            <p>
              <img src="/static/images/gou.png" class="pics">
              <text>及时发货</text>
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
            <text>汽车服务类型 品牌...</text>
            <img src="/static/images/back.png" class="right">
          </div>
        </div>
      </div>
      <div class="slide"></div>
      <!--宝贝评价-->
      <div class="estimate">
        <div class="flex-container estititle">
          <p>宝贝评价</p>
          <p @click="showAll">
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
            <text>购买可得200积分 拷贝</text>
          </div>
          <p class="maskitem">领券</p>
          <div class="maskcouponlist">
            <img src="/static/images/pinkbg.png" class="pink">
            <div class="maskser flex-container">
              <div>
                <p class="maskprice">
                  ¥
                  <span>20</span>
                </p>
                <p class="maskask">满188使用</p>
                <p class="maskask">有效期2018.10.01-2018.10.30</p>
              </div>
              <div class="maskget">立即领取</div>
            </div>
          </div>
        </div>
        <div class="btnget" @click="cancleMask">完成</div>
      </div>
      <!--产品参数-->
      <div class="mask" v-if="showPram">
        <div class="masktitle">产品参数</div>
        <div class="pramasitem flex-container" v-if="product.productParams.setviceType">
          <p>汽车服务类型</p>
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
        <div class="pramasitem flex-container">
          <p>规格</p>
          <p class="pramastitle">精选1年版（全国包施工）,经典1年版 （全国包施工）,优选版不含施工</p>
        </div>
        <div class="btnget pramasget" @click="canclePramas">完成</div>
      </div>
      <!--加入购物车、选择规格-->
      <div class="mask choose" v-if="showNums">
        <div class="flex-container choosetitle">
          <div class="flex-container">
            <!-- <img :src="activeImg" class="maskshop"> -->
            <img src="/static/images/smallcar.png" class="maskshop">
            <div class="chooseinfo">
              <p class="price">{{product.sku.price}}</p>
              <p class="tips count">库存{{product.sku.num||product.stock}}件</p>
              <p class="tips" v-if="product.sku[activeSkuIndex]">已选:“{{product.sku[activeSkuIndex].skuItem1}}{{product.sku[activeSkuIndex].skuItem2}}{{product.sku[activeSkuIndex].skuItem3}}”</p>
            </div>
          </div>
          <div>
            <img src="/static/images/close.png" @click="onMask" class="close">
          </div>
        </div>
        <div class="spcestitle">规格</div>
        <div class="flex-container specs">
          <!-- <div class="flex-container">
                      <img src="/static/images/specimg.png" class="specpic">
                      <text>精选1年版（全国包施工）</text>
          </div>-->
          <div
            class="flex-container"
            :class="activeSkuIndex === index?'specactive':''"
            v-for="(item,index) in product.sku"
            :key="index"
            @click="activeSkuIndex = index"
          >
            <img :src="item.img" class="specpic">
            <text>{{item.skuItem1}}{{item.skuItem2}}{{item.skuItem3}}</text>
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
      id: "",
      isshow: false,
      showDiscount: false,
      showShare: false,
      showPram: false,
      addcart: false,
      showNums: false,
      showEvaluate: true,
      payNum:1,
      product: {},
      //   选择的sku图片
      activeImg: "",
      activeSkuIndex: ""
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
    getData() {
      const that = this;
      const id = this.$root.$mp.query.id;
      console.log(this.$root.$mp.query, "id?");
      post("Goods/ProductInfo", { proId: id * 1 }).then(res => {
        const datas = res.data;
        that.product = {
          img: datas.ProductImgList[0].PicUrl,
          imgs: [],
          comment: [],
          sku: [],
          title: datas.ProductName,
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
          productParams: {
            // 品牌
            name: datas.BrandName,
            // 型号
            typeNum: datas.ModelName,
            // 服务类型
            serviceType: datas.TypeName
          }
        };

        for (let i = 0; i < datas.ProductImgList.length; i += 1) {
          that.product.imgs.push(datas.ProductImgList[i].PicUrl);
        }
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
        for (let i = 0; i < datas.ProductSpecList.length; i += 1) {
          const sku = datas.ProductSpecList[i];
          that.product.sku.push({
            id: sku.Id,
            skuName1: sku.ProSpecName1,
            skuName2: sku.ProSpecName2,
            skuName3: sku.ProSpecName3,
            skuItem1: sku.ProSpec1,
            skuItem2: sku.ProSpec2,
            skuItem3: sku.ProSpec3,
            price: sku.PunitPrice,
            num: sku.ProStock,
            img: sku.SpecImage
          });
        }
        console.log(that.product, "产品详情");
      });
    },
    // 点击遮罩层隐藏
    onMask(){
        this.isshow = false;
        this.showDiscount = false;
        this.showPram = false;
        this.showNums = false;
        this.showShare = false;
    },
    lessNum(){
        if(this.payNum>1){
            this.payNum-=1
        }
    },
    addNum(){
            this.payNum+=1
    },
    goUrl(url){
        wx.navigateTo({url})
    },
    gotabBar(url){
        wx.switchTab({url})
    },
    // 加入购物车
    addCart() {
    //   this.addcart = true;
    },
    // 购买
    confirm() {
      this.showNums = false;
      this.isshow = false;
      wx.navigateTo({url:'/pages/confirmorder/main'})
    },
    share() {
      this.isshow = true;
      this.showShare = true;
    },
    cancleShare(pay) {
      this.isshow = false;
      this.showShare = false;
    },
    getCoupon() {
      this.isshow = true;
      this.showDiscount = true;
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
        if(pay==='pay'){
            this.addcart = true;
        }else{
            this.addcart = false;
        }
      this.isshow = true;
      this.showNums = true;
    },
    showAll() {
      this.showEvaluate = false;
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
