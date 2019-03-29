<template>
    <div class="proinfo flex-container pad">
        <div>
        <img src="/static/images/orderimg.png" class="orderimg">
        </div>
        <div class="inforight">
            <div class="infotitle">绿妞长效镀晶9H汽车度镀晶纳米水晶镀膜包施工新全车辆车漆面德国</div>
            <div class="infospec">精选1年版（全国包施工） </div>
            <div class="infoprice flex-container">
                <p>￥1288</p>
                <p v-if="showButton">x1</p>
                <div v-else>
                  <img src="/static/images/add5.png" class="specpic"> 
                  <text class="shopnum">1</text>
                  <img src="/static/images/shot5.png" class="specpic">
              </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  onLoad(){
    this.setBarTitle();
  },
   props: ["showButton"],
  data () {
    return {
      isshow:false,
      showpay:false,
      showway:false,
      a:4,
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: ""
      });
    },
  
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
/*弹性布局*/
.flex-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.clomn{
  flex-direction: column;
}
.proinfo{
    padding:20rpx 30rpx;
}
.orderimg{
    width:160rpx;
    height:160rpx;
    vertical-align: middle;
    margin-right:30rpx;
}
.infospec{
    color:#999;
    font-size:24rpx;
}
.infoprice{
    font-size:36rpx;
    color:#ff6666;
}
.infoprice p+p{
    color:#1a1a1a;
    font-size:28rpx;
}
.pad{
    padding:20rpx 30rpx;
}
.specpic{
    width:48rpx;
    height:44rpx;
    vertical-align: middle;
}
.shopnum{
    margin:0 20rpx;
    color:#1a1a1a;
    font-size:24rpx
}
</style>