<template>
    <div class="proinfo flex-container pad">
        <div>
        <img :src="data.img" class="orderimg">
        </div>
        <div class="inforight">
            <div class="infotitle">{{data.title}}</div>
            <div class="infospec">{{data.sku}}</div>
            <div class="infoprice flex-container">
                <p>￥{{price}}</p>
                <p v-if="showButton">x{{data.num}}</p>
                <div v-else class="flex-center">
                  <img src="/static/images/add5.png" @click="addNum" class="specpic"> 
                  <input class="shopnum" v-model="data.num" type="number" />
                  <img src="/static/images/shot5.png" @click="lessNum" class="specpic">
              </div>
            </div>
        </div>
    </div>
</template>
<script>
// 该组件使用的数据格式：
//       {
//           img:datas.ProductImg,
//           title: datas.ProductName,
//           sku: datas.SpecText,
//           skuSubmit: datas.SpecText,
//           shopName: datas.ShopName,
//           shopId:datas.ShopId,
//           price: datas.SalePrice,
//           num: datas.Number,
//           stock:datas.Stock,
//         }
    // showButton；为数量是否可编辑，true--显示数量；false--显示编辑按钮
export default {
  onLoad(){
    // this.setBarTitle();
  },
   props: ["showButton",'data'],
  data () {
    return {
      isshow:false,
      showpay:false,
      showway:false,
      a:4,
    }
  },
  computed:{
    price(){
      let num =0;
      num = (this.data.price*this.data.num).toFixed(2)
      return num
    }
  },
  watch:{
    'data.num'(){
      if(this.data.num>this.data.stock){
        wx.showToast({
                    title: "超出可用库存！",
                    icon: "none",
                    duration: 2000
        });
        this.data.num = this.data.stock
      }
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
    addNum(){
        console.log('加数量')
         this.$emit('addNum',this.data.id)
    },
    lessNum(){
      if(this.data.num>1){
         this.data.num-=1
         this.$emit('lessNum',this.data.id)
      }
    }
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
    font-size:24rpx;
    width:40rpx;
    text-align:center;
}
.flex-center{
  display:flex;
  align-items:center;
  justify-content:center;
}
</style>