<template>
  <div class="flex-container bigcontainer">
    <!--左菜单-->
    <div class="ser-menu">
        <div v-for="(item,index) in menulist" :key="index" :class="{active:active==item.TypeName}" @click="change(item.TypeName)" class="nemeitem">
          <text class="title">{{item.TypeName}}</text>
        </div>
    </div>
    <!--右列表-->
    <div class="list">
        <div class="flex-container intitem" v-for="(item,pindex) in servicelist" :key="item.id">
            <div class="flex-container">
              <img src="/static/images/caritem.png" class="carpic">
              <div class="flex-container clomn iteminfo">
                  <p class="itemtitle">{{item.title}}</p>
                  <p class="progress">
                    <text>深度清洁</text><text>增加亮度</text>
                  </p>
                  <p class="sales">销量{{item.sales}}</p>
                  <p class="price">￥{{item.price}}</p>
              </div>
            </div>
            <div>
              <input type="checkbox" class="checkbox-cart" :checked="item.isSelect" @click="oneClick(pindex)"/>
            </div>
        </div>
        
        <!--底部按钮-->
        <div class="btn">
          <div class="btn-close">
            <input type="checkbox" class="checkbox-cart" @click="selectProduct()" :checked="isSelectAll"/>
            <text>全选</text>
          </div>
          <div class="btn-confirm">确定</div>
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
    this.setBarTitle();
    this.id=this.$root.$mp.query.id
    this.getMenulist();
  },
  data () {
    return {
      id:"",
      menulist:[],
      servicelist:[
        {id:1,title:"外观简单清洗",sale:"198",price:"30.00",isSelect:true},
        {id:2,title:"精细清洗漆面上光打蜡",sale:"98",price:"198.00",isSelect:false},
        {id:3,title:"普通清洗漆面去污",sale:"88",price:"60.00",isSelect:false},
        {id:4,title:"蒸汽深度清洗",sale:"38",price:"80.00",isSelect:false}
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
        title: "服务项目"
      });
    },
    async getMenulist(){
       var result=await post("/Server/GetCarWash")
       if(result.code==0){
         if(this.id==1){
            this.menulist=result.data.slice(0,-2)
         }else{
           this.menulist=result.data
         }
          console.log(result.data)
         
       }
        
    },
    change(e){
      this.active=e
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
