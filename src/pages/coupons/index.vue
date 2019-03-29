<template>
  <div class="cerbg">
      <!--导航栏-->
      <div class="title">
          <div class="ranktitle" v-for="item in titlelist" :key="item.name" :class="{active:active==item.id}" @click="change(item.id)">{{item.name}}</div>
      </div>
      <div class="slide"></div>
      <!--没有优惠券-->
      <div class="nodata"  v-if="isdata">
          <img src="/static/images/nodata.png" class="couppics">
          <p>暂无优惠券</p>
      </div>
      <!--排行list-->
      <div class="certlist">
          <div>
              <div class="coupitem" v-for="item in couptlist" :key="item.id">
                <img src="/static/images/huiyellow.png" class="bgcolor" v-if="isactive">
                <img src="/static/images/gray3.png" class="bgcolor" v-else-if="ispadded">
                <img src="/static/images/passbg3.png" class="bgcolor" v-else>
                <div class="coupinfo">
                    <div class="main">
                        <p><span>￥</span>30</p>
                        <p>直接减免100元</p>
                    </div>
                    <div class="right flex-container">
                        <div>
                            <p class="coupname">{{item.name}}</p>
                            <p class="couptime coupuse">2019.2.22-2019.2.24</p>
                            <p class="couptime">用户购买商品服务可使用</p>
                        </div>
                        <div class="btn" v-if="isactive">立即使用</div>
                    </div>
                </div>
              </div>
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
  },
  data () {
    return {
      active:"1",
      isdata:false,
      isactive:true,
      ispadded:false,
      titlelist:[
        {id:1,name:"未使用"},{id:2,name:"已使用"},{id:3,name:"已过期"}
      ],
      couptlist:[
        {id:1,name:"外观标准洗车券"},{id:2,name:"镀晶优惠券"},{id:3,name:"通用券-新人礼包"},{id:4,name:"通用优惠券"},
      ]
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "优惠券"
      });
    },
    change(e){
      //console.log(e)
      this.active=e
      if(e=="1"){
          this.isactive=true
      }else if(e=="2"){
          this.isactive=false
          this.ispadded=true
      }else if(e=="3"){
          this.ispadded=false
          this.isused=false
      }
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
