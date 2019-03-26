<template>
  <div>
    <div class="shop b1">
      <img src="/static/images/car.png" alt>
      <div class="info">
        <div class="name">普洗轿车</div>
        <div class="price">￥30.00</div>
      </div>
    </div>
    <div class="prompt">
      <div>· 本品支持订单签收后的7天内退换货，商城将在2天内审核申请</div>
      <div>· 申请成功后奖励的积分将相应扣除，货款原支付方式退回</div>
      <div>· 如未与卖家协商一致，请勿使用到付或平邮</div>
    </div>
    <div class="inputs">
      <van-cell-group>
        <van-field
          :value="text"
          readonly
          icon="arrow"
          @click="onClickIcon"
          label="退款原因:"
          placeholder="请选择退款原因"
        />
        <van-field :value="info" label="退款说明:" placeholder="选填"/>

        <van-field :value="price" label="退款金额:" placeholder="请输入退款金额" :border="false "/>
      </van-cell-group>
    </div>
    <div class="pricePrompt">可修改退款金额，最多￥1288.00，不含配送费用</div>
    <div class="upimg plr30">
      <div class="title">上传凭证</div>
      <img src="/static/images/upuimg.png" alt>
    </div>
    <div class="editButton">
      <div class="buy" @click="submit">确认提交</div>
    </div>
    <van-action-sheet
      :show="show"
      :actions="actions"
      @close="onClose"
      @select="onSelect"
    />
  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  data() {
    return {
      info: "",
      price: "￥30.00",
      show:false,
      text:'',
      actions:[
        {name:'多拍/拍错/不想要'},
        {name:'质量问题/功能不符'},
        {name:'外观/型号/参数等描述不符'},
        {name:'发错货品'},
        {name:'货品小件/破损/受污染'},
        {name:'其他原因(请备注说明)'}
      ]
    };
  },

  components: {},
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "申请退款"
      });
    },
    onClickIcon() {
      this.show = true;
    },
    onClose(){
      this.show= false;
    },
    onSelect(e){
      this.text = e.target.name;
      this.show= false;
    },
    submit() {},
    orderpay() {
      wx.navigateTo({ url: "/pages/locationcomplete/main" });
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
