<template>
  <div class="contain">
    <!--大图片-->
    <div class="glo-relative bg-cart">
        <img src="/static/images/cartbg5.png" class="shopbg">
        <img src="/static/images/location.png" class="location-logo">
        <img src="/static/images/cart.png" class="cart-img pic-center">
    </div>
    <div class="pad">
        <!--预约时间-->
          <div class="appoint">预约时间</div>
        <!--时间-->
          <div class="timeflex">
            <div v-for="(item,index) in datelist" :key="index" :class="{active:active==index}" @click="changebg(index)">{{item}}</div>
          </div>
          <!--开始时间 结束时间-->
          <div class="tagflex">
            <div>开始时间</div>
            <div>结束时间</div>
          </div>
          <!--滑动选择时间-->
          <div class="freeRoom">
            <div>
                <!--<div class="timeText">{{year}}年{{month}}月{{day}}日</div>-->
                <picker-view class="pickerView" :value="value" @change="bindDateChangeStart">
                    <picker-view-column class="pickerColumn">
                        <div class="pickerItem" v-for="(item,key) in hourses" :key='key'>{{item}}点</div>
                    </picker-view-column>
                    <picker-view-column class="pickerColumn">
                        <div class="pickerItem" v-for="(item,key) in minutes" :key='key'>{{item}}分</div>
                    </picker-view-column>
                    <picker-view-column class="pickerColumn">
                        <div class="pickerItem" v-for="(item,key) in hourses" :key='key'>{{item}}点</div>
                    </picker-view-column>
                    <picker-view-column class="pickerColumn">
                        <div class="pickerItem" v-for="(item,key) in minutes" :key='key'>{{item}}分</div>
                    </picker-view-column>
                </picker-view>
            </div>
        </div>
    </div>
    <!--底部按钮组-->
    <div class="tagflex bottomstyle">
        <div class="btn-cancle">取消</div>
        <div class="btn-order">立即下单</div>
    </div>
  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
    this.choosedate();
    this.gethous();
    this.getMinutes()
  },
  data () {
    return {
      datelist:[],
      active:'0',
      hourses:[],
      minutes:[]
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "填写订单"
      });
    },
    orderpay(){
      wx.navigateTo({ url: "/pages/orderpay/main" });
    },
    changebg(item){
      this.active=item
    },
    choosedate(){
      var d=new Date()
      //console.log(date)
      var month=d.getMonth()+1
      var date=d.getDate()
      for(var n=0;n<5;n++){
        var i=`${month}`+'月'+`${date}`+'日'
        this.datelist.push(i)
        date++
      }
      //console.log(this.datelist)
    },
    gethous(){
      for (let i =0; i <= 24; i++) {
          if(i.toString().length<2){
            i="0"+i
          }
          this.hourses.push(i)
      }
    },
    getMinutes(){
      for (let i =0; i <= 60; i++) {
          if(i.toString().length<2){
            i="0"+i
          }
          this.minutes.push(i)
      }
    },
    bindDateChangeStart (e) {
        //console.log(e)
          // valIndex 是获取到的年月日在各自集合中的下标
          const valIndex = e.mp.detail.value
          // console.log(JSON.stringify(e.mp.detail.value))
          let hourses = this.hourses[valIndex[0]]
          let minutes = this.minutes[valIndex[1]]
          // 滚动时再动态 通过年和月获取 这个月下对应有多少天
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
  .freeRoom{
        .timeText{
            text-align: center;
        }
        .pickerView{
            width:100%;
            height: 300rpx;
            .pickerColumn{
                .pickerItem{
                    line-height:68rpx;
                    height:34rpx;
                    overflow:hidden;
                    text-align: center;
                }
            }
        }
    }
</style>
