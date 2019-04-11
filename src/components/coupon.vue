<template>
  <div v-show="showCoupon">
      <!--遮罩层-->
    <div class="mask-modal" @click="closeMask"></div>
    <div class="paymask white">
      <div class="paytile">
        <text>选择优惠券</text>
      </div>
      <div>
        <radio-group class="radio-group" @change="selectCoupon">
          <label class="flex-container couponItem" v-for="(item,index) in couponList" :key="index">
            {{item.name}}
            <input type="radio" name="coupon" :value="index" :checked="item.status">
          </label>

          <label class="flex-container couponItem">
            不使用优惠券
            <input type="radio" name="coupon" value="不使用优惠券">
          </label>
        </radio-group>
      </div>
      <div class="paybtn btnbottom" @click="closeMask">完成</div>
    </div>
  </div>
</template>
<script>
export default {
    props:[
        'showCoupon'
    ],
  data() {
    return {
      couponList: [
        {
          name: "店铺优惠，满200-50",
          status: false
        },
        {
          name: "店铺优惠，满300-100",
          status: false
        },
        {
          name: "店铺优惠，满100-20",
          status: false
        }
      ]
    };
  },
  mounted() {},
  methods: {
      
    selectCoupon(e){
      console.log(e.mp.detail.value)
      const index = e.mp.detail.value
      if(index === '不使用优惠券'){
        return false;
      }
  },
  closeMask(){ 
      this.$emit('update:showCoupon', false); //触发 input 事件，并传入新值
        
    //   this.showCoupon = !this.showCoupon
  }
  }
};
</script>
<style lang="scss" scoped>
.paymask {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  // height:720rpx;
  box-sizing: border-box;
  z-index: 60;
  padding-bottom: 60rpx;
}
.paytile {
  position: relative;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
  text-align: center;
  font-size: 36rpx;
  font-weight: bold;
}
.couponItem {
  padding: 20rpx;
  border-bottom: 1rpx solid #ececec;
}
.btnbottom {
  margin-top: 60rpx;
}
</style>

