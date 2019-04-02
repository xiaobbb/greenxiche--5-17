<template>
  <div class="flex-container bigcontainer">
    <!--左菜单-->
    <div class="ser-menu">
      <div
        v-for="(item,index) in menulist"
        :key="index"
        :class="{'active':activeId==item.id}"
        @click="getClassifyLisit(item.id)"
        class="nemeitem"
      >
        <text class="title">{{item.name}}</text>
      </div>
    </div>
    <!--右列表-->
    <div class="list">
      <div class="flex-container intitem" v-for="(item,index) in productlist" :key="item.id">
        <div class="flex-container cartdetal">
          <div>
            <img :src="item.img" class="carpic" v-if="ispop" @click="goDetail(item.id)">
            <!-- <img src="/static/images/comblo.png" class="carpic" v-else-if="comb"  @click="goDetail(2)">
            <img src="/static/images/cardshop.png" class="carpic" v-else  @click="goDetail(2)">-->
          </div>
          <div class="flex-container citeminfo">
            <p class="itemtitle" @click="goDetail(item.id)">{{item.title}}</p>
            <p class="progress" @click="goDetail(item.id)">
              <text>深度清洁</text>
              <text>增加亮度</text>
            </p>
            <p class="sales">销量{{item.sale}}</p>
            <div class="flex-container around">
              <p class="price">￥{{item.price}}</p>
              <div>
                <img src="/static/images/s1.png" @click="lessNumber(index)" class="tippic">
                <text class="nums">{{item.num}}</text>
                <img src="/static/images/addcart.png" @click="addNumber(index)" class="tippic">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--底部按钮-->
    <div class="btn">
      <div class="btninfo">
        <div class="btn-shop">
          <div class="cartshopbg">
            <img src="/static/images/shopcart.png" class="cartshop">
            <text class="numright">2</text>
          </div>
          <div class="shopprice">￥428</div>
        </div>
        <div class="btn-confirm" @click="toPAy">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "@/utils/index";
import "../../css/common.css";
import "../../css/global.css";
export default {
  data() {
    return {
      // servicelist:'',
      ispop: true,
      comb: false,
      // 分类列表
      menulist: [],
      //普通商品
      productlist: [],
      //卡券
      cardlist: [
        { id: 1, title: "普通洗车单次卡", sale: "425", price: "80.00" },
        { id: 2, title: "镀晶服务两次卡", sale: "36", price: "368.00" },
        { id: 3, title: "普通洗车单次卡", sale: "96", price: "25.00" },
        { id: 4, title: "普通洗车单次卡", sale: "128", price: "96.00" }
      ],
      //套餐
      combolist: [
        { id: 1, title: "清洗套餐卡", sale: "369", price: "63.00" },
        { id: 2, title: "养护套餐卡", sale: "99", price: "156.00" },
        { id: 3, title: "镀晶套餐卡", sale: "84", price: "23.00" },
        { id: 4, title: "清洗套餐卡", sale: "328", price: "9.00" }
      ],
      activeId: Number,
      isSelectAll: "true"
    };
  },

  mounted() {
    this.setBarTitle();
    // 分类列表
    this.getClassify();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "商城"
      });
    },
    // 获取分类列表
    getClassify() {
      const that = this;
      post("Server/GetCarWash").then(res => {
        for (let i = 0; i < res.data.length; i += 1) {
          const datas = res.data[i];
          that.menulist.push({
            id: datas.Id,
            name: datas.TypeName
          });
        }
        // 获取第一个分类产品
        that.getClassifyLisit(that.menulist[0].id);
      });
    },
    // 分类产品列表
    getClassifyLisit(id) {
      const that = this;
      that.activeId = id;
      that.productlist = [];
      post("/Goods/GoodsList", { page: 1, pageSize: 10, TypeId: id }).then(
        res => {
          for (let i = 0; i < res.data.length; i += 1) {
            const datas = res.data[i];
            that.productlist.push({
              id: datas.Id,
              title: datas.Name,
              price: datas.Price,
              img: datas.ProductImg,
              sale: 100,
              num: 0
            });
          }
        }
      );
    },
    lessNumber(index) {
      if (this.productlist[index].num > 0) {
        this.productlist[index].num -= 1;
      }
    },
    addNumber(index) {
      this.productlist[index].num += 1;
    },
    change(e) {
      console.log(e);
      this.active = e;
      if (e == "服务卡券") {
        this.servicelist = this.cardlist;
        this.ispop = false;
        this.comb = false;
      } else if (e == "营销套餐") {
        this.servicelist = this.combolist;
        this.comb = true;
        this.ispop = false;
      } else {
        this.servicelist = this.productlist;
        this.ispop = true;
      }
    },
    // 跳转
    goDetail(id) {
        console.log(id,'id')
      wx.navigateTo({ url: "/pages/detail/main?id=" + id });
      return false;
      var a = e;
      if (a == 1) {
        wx.navigateTo({ url: "/pages/detail/main?id=" + id });
      }
      if (a == 2) {
        wx.navigateTo({ url: "/pages/coupondetail/main" });
      }
    },
    toPAy() {
      wx.navigateTo({ url: "/pages/confirmorder/main" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style";
@import "../../css/common.css";
</style>
