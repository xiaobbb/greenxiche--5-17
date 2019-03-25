<template>
  <div class="flex-container bigcontainer">
    <!--左菜单-->
    <div class="ser-menu">
        <div v-for="(item,index) in menulist" :key="index" :class="{active:active==item.name}" @click="change(item.name)" class="nemeitem">
          <text class="title">{{item.name}}</text>
        </div>
    </div>
    <!--右列表-->
    <div class="list">
        <div class="flex-container intitem" v-for="item in servicelist" :key="item.id">
            <div class="flex-container cartdetal">
                <div>
                    <img src="/static/images/caritem.png" class="carpic" v-if="ispop">
                    <img src="/static/images/comblo.png" class="carpic" v-else-if="comb">
                    <img src="/static/images/cardshop.png" class="carpic" v-else>
                </div>
              <div class="flex-container citeminfo">
                  <p class="itemtitle">{{item.title}}</p>
                  <p class="progress">
                    <text>深度清洁</text><text>增加亮度</text>
                  </p>
                  <p class="sales">销量{{item.sale}}</p>
                  <div  class="flex-container around">
                    <p class="price">￥{{item.price}}</p>
                    <div>
                        <img src="/static/images/s1.png" class="tippic">
                        <text class="nums">1</text>
                        <img src="/static/images/addcart.png" class="tippic">
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
            <div class="btn-confirm">确定</div>
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
    this.servicelist=this.productlist
  },
  data () {
    return {
      servicelist:'',
      ispop:true,
      comb:false,
      menulist:[
        {name:"洗车"},
        {name:"内饰"},
        {name:"除甲醛"},
        {name:"镀金"},
        {name:"服务卡券"},
        {name:"营销套餐"}
      ],
      //普通商品
      productlist:[
        {id:1,title:"外观简单清洗",sale:"198",price:"36.00"},
        {id:2,title:"精细清洗漆面上光打蜡",sale:"98",price:"198.00",},
        {id:3,title:"普通清洗漆面去污",sale:"88",price:"60.00",},
        {id:4,title:"蒸汽深度清洗",sale:"38",price:"80.00",}
      ],
      //卡券
      cardlist:[
        {id:1,title:"普通洗车单次卡",sale:"425",price:"80.00"},
        {id:2,title:"镀晶服务两次卡",sale:"36",price:"368.00",},
        {id:3,title:"普通洗车单次卡",sale:"96",price:"25.00",},
        {id:4,title:"普通洗车单次卡",sale:"128",price:"96.00",}
      ],
      //套餐
      combolist:[
        {id:1,title:"清洗套餐卡",sale:"369",price:"63.00"},
        {id:2,title:"养护套餐卡",sale:"99",price:"156.00",},
        {id:3,title:"镀晶套餐卡",sale:"84",price:"23.00",},
        {id:4,title:"清洗套餐卡",sale:"328",price:"9.00",}
      ],
      active:"洗车",
      isSelectAll:'true'
    }
  },

  components: {
    
  },
  computed:{
     
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "商城"
      });
    },
    change(e){
      //console.log(e)
      this.active=e
      if(e=="服务卡券"){
        this.servicelist=this.cardlist
        this.ispop=false
        this.comb=false
      }else if(e=="营销套餐"){
        this.servicelist=this.combolist
        this.comb=true
      }else{
        this.servicelist=this.productlist
        this.ispop=true
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
</style>
