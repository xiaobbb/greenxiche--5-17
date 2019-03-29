<template>
  <div class="backgray">
    <!--全选-->
    <div class="btn flex-container white">
        <div class="btn-close flex-container">
          <input type="checkbox" class="checkbox-cart" @click="selectProduct()" :checked="isSelectAll"/>
          <text>全选商品</text>
        </div>
        <div class="btn-confirm" @click="editPro" v-if="isShow">编辑</div>
        <div class="btn-confirm" @click="editPro" v-else>完成</div>
    </div>
    <div class="slider"></div>
    <!--右列表-->
    <div class="list">
        <div class="flex-container shopitem white" v-for="(item,pindex) in servicelist" :key="item.id">
            <div class="left">
              <input type="checkbox" class="checkbox-cart" :checked="item.isSelect" @click="oneClick(pindex)"/>
            </div>
            <orderChild :showButton="isShow"></orderChild>
        </div>
    </div>
    <!--底部按钮-->
    <div>
        <div class="botbtn" v-if="isShow">
            <div class="price white">合计: <span>￥1288.00</span></div>
            <div class="btnconfir" @click="goPay">结算</div>
        </div>
        <div class="delete botbtn" v-else>
            <div class="price"></div>
            <div class="btnconfir" @click="Delete">删除</div>
        </div>
    </div>
    <!--删除遮罩层-->
    <div class="mask-modal" v-if="showMask"></div>
    <!--删除遮罩层-->
    <div v-if="showDelete" class="maskdelete flex-container clomn">
        <div>您确定要删除所选商品吗？</div>
        <div class="flex-container bottombtn">
            <div>取消</div>
            <div @click="confirmDel">确认</div>
        </div>
    </div>
    <!--参数遮罩层-->
    <specChild :showSpecs="showSpecs"></specChild>
    
    
   
    
  </div>
</template>

<script>
import orderChild from "@/components/orderChild"
import specChild from "@/components/specChild"
import "../../css/common.css";
import "../../css/global.css";
export default {
   onLoad(){
    this.setBarTitle();
  },
  data () {
    return {
      showMask:false,
      isShow:true,
      showDelete:false,
      showSpecs:false,
      menulist:[
        {name:"洗车"},
        {name:"内饰"},
        {name:"除甲醛"},
        {name:"镀金"},
      ],
      servicelist:[
        {id:1,title:"外观简单清洗",sale:"198",price:"30.00",isSelect:true},
        {id:2,title:"精细清洗漆面上光打蜡",sale:"98",price:"198.00",isSelect:false},
        {id:3,title:"普通清洗漆面去污",sale:"88",price:"60.00",isSelect:false},
        {id:4,title:"蒸汽深度清洗",sale:"38",price:"80.00",isSelect:false}
      ],
      active:"洗车",
      isSelectAll:false
    }
  },

  components: {
    orderChild,
    specChild
  },
  computed:{
     
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "购物车"
      });
    },
    
    selectProduct:function(){
        //遍历servicelist，全部取反
        this.isSelectAll=!this.isSelectAll
        //console.log(this.isSelectAll)
        for (var i = 0, len = this.servicelist.length; i < len; i++) {
            this.servicelist[i].isSelect = this.isSelectAll;
            console.log(this.servicelist[i].isSelect)
        }
    },
    oneClick(i){
      this.servicelist[i].isSelect=!this.servicelist[i].isSelect
      for(var i=0;i<this.servicelist.length;i++){
            if(!this.servicelist[i].isSelect){
                this.isSelectAll=false
                return
            }
        }
        this.isSelectAll=true
    },
    editPro(){
      this.isShow=false
      this.showDelete=false
    },
    Delete(){
      this.showMask=true
      this.showDelete=true
    },
    confirmDel(){
      this.showMask=false
      this.showDelete=false
      this.isShow=true
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
