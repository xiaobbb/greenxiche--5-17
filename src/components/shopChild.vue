<template>
  <div class="childbg" v-if="isShow">
      <img src="/static/images/download2.png" class="shopbg1">
      <div class="radius">
        <div class="flex-container item">
            <div class="flex-container  row">
                <p class="sertitle">车御品汽车服务</p>
                <div class="shopclass flex-container">
                    <p>
                      <img src="/static/images/xing.png" class="xing-point">
                      <img src="/static/images/xing.png" class="xing-point">
                      <img src="/static/images/xing.png" class="xing-point">
                      <img src="/static/images/xing.png" class="xing-point">
                      <img src="/static/images/gray1.png" class="xing-point">
                    </p>
                    <text class="grad">5.0分</text>
                    <text class="numb">(428条订单)</text>
                </div>
            </div>
            <div class="flex-container range alig">
              <p class="location">
                  <img src="/static/images/bg9.png" class="big">
                  <img src="/static/images/phone.png" class="small">
              </p>
            </div>  
        </div>
        <div class="halfhr"></div>
        <div class="flex-container item">
            <div class="flex-container loactsty">
                <img src="/static/images/locat2.png" class="locationwid">
                <div>
                  <p class="sertitle">地址</p>
                  <p class="sercomplain">深圳市龙华区梅龙大道912号</p>
                </div>
            </div>
            <div class="flex-container range lineleft ">
              <p class="location">
                  <img src="/static/images/bg9.png" class="big">
                  <img src="/static/images/to.png" class="small">
              </p>
              <p>0.32km</p>
            </div>
        </div>
        <div class="halfhr"></div>
        <div class="flex-container item">
            <div class="flex-container loactsty">
                <img src="/static/images/time2.png" class="locationwid timesize">
                <div>
                  <p class="sertitle">营业时间</p>
                  <p class="sercomplain">09:00-18:00</p>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  props:["isShow"],
   onLoad(){
  
  },
  data () {
    return {
     
    }
  },

  components: {
    
  },

  methods: {
    
    
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.childbg{
   background:#f4f7fc ;
   padding-bottom:20rpx;
}
.shopbg1{
    width:702rpx;
    height:400rpx;
    display:block;
    margin:0 auto;
}
.big{
    width:48rpx;
    height:48rpx;
}
.small{
    width:24rpx;
    height:24rpx;
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%)
}
.location{
    position: relative;
    width:48rpx;
    height:48rpx;
   
}
.range{
    flex-direction: column;
    color:#999;
    padding:0 30rpx;
}
.lineleft{
  border-left:1rpx solid #eee;
}
.item{
    padding:20rpx 25rpx;
    background:#fff; 
    
}

.sertitle{
    font-size: 28rpx;
    font-weight: bold;
    height:28rpx;
    box-sizing: border-box;
}
.sercomplain{
    margin:25rpx 0;
    color:#999;
    font-weight:500;
    font-size:24rpx;
    height:24rpx;
    box-sizing: border-box;
}
.shopclass{
    font-size: 24rpx;
    margin:15rpx 0;
}
.numb{
    color:#999;
    margin-left:60rpx;
}
.grad{
    margin-left:10rpx;
    font-size:28rpx;
}
.row{
  flex-direction: column;
  align-items: flex-start;
  -ms-flex-direction: column;
}
.locationwid{
  width:34rpx;
  height:44rpx;
  margin-right:20rpx;
  box-sizing: border-box;
}
.timesize{
  width:38rpx;
  height:38rpx;
}
.loactsty{
  align-items: flex-start;
  justify-content: flex-start;
  width:70%;
}
.halfhr{
  width:670rpx;
  height:3rpx;
  border:0;
  background:#eee;
  margin:0 auto;
}
.radius{
  border-bottom-left-radius:15rpx;
  border-bottom-right-radius:15rpx;
  width:702rpx;
  margin:0 auto;
}
.alig{
  margin-right:20rpx;
}
</style>
