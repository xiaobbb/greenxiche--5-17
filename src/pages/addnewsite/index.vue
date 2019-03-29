<template>
  <div class="backgray setlist">
      <div class="setitem flex-container white">
          <p>收货人</p>
          <input type="text" placeholder="请输入收货人姓名">
      </div>
      <div class="setitem flex-container white">
          <p>手机号码</p>
          <input type="text" placeholder="请输入手机号码">
      </div>
      <div class="setitem flex-container white">
          <p>所在地区</p>
          <div class="flex-container input">
              <input type="text" placeholder="请输入所在地区">
              <img src="/static/images/back.png" class="right">
          </div>
      </div>
      <div class="setitem flex-container white">
          <p>详细地址</p>
          <input type="text" placeholder="道路、门牌号、小区、楼栋号、单元、 室等">
      </div>
      <div class="setitem flex-container white">
          <p>设为默认地址</p>
          <!-- <img src="/static/images/nocheck1.png" class="checkstyle" v-if="showDefault">
          <img src="/static/images/check2.png" class="checkstyle" v-else> -->
          <div class="body-view">
              <!-- <switch checked bindchange="switch1Change" /> -->
              <switch checked @change="switch2Change" />
          </div>
      </div>
      <div class="paybtn setbtn">保存</div>
      <!--弹框遮罩-->
    <div class="mask-modal" v-if="isshow"></div>
    <div class="mask white flex-container clomn" v-if="isshow">
        <div class="masktitle">所在地区</div>
        <div class="province">
            <P>河北省</P>
            <P>唐山市</P>
            <P class="active">请选择</P>
        </div>
        <div class="arrlist">
            <p>北京市</p>
            <p>河北省</p>
            <p>山西省</p>
            <p>天津市</p>
            <p>吉林省</p>
            <p>吉林省</p>
            <p>吉林省</p>
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
      showDefault:true,
      isshow:true,
      index: 0,
      provArray: ['A', 'B', 'C']
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "添加新地址"
      });
    },
    switch2Change(e){
      //console.log( e ) 
    },
     bindPickerChange (e) {
      console.log(e)
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
