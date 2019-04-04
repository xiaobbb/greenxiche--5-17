<template>
  <div>
    <!--备注-->
    <div class="signtitle">
      <p>上传现场照片有助于洗车员快速找到车辆位置~</p>
      <p>不添加现场照片也可以提交订单</p> 
    </div>
    <!--图片列表-->
    <div class="flex" style="justify-content:flex-start">
        <div class="flexitem" style="margin-right:10rpx;" v-for="(img,index) in imgBase" :key="index">
            <img :src="img.PicUrl" class="pic">
            <img src="/static/images/close5.png" class="close"  @click="deleteImg(index)">
        </div>
        <div>
            <img src="/static/images/bg1.png" class="pic" v-show="!(imgBase.length >3)" @click="chosseImg">
        </div>
    </div>
    <div class="paybtn" @click="orderpay">确定</div>
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
      imgBase:[],
      userid: wx.getStorageSync("userId"),
      token: wx.getStorageSync("token"),
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "添加现场图片"
      });
    },
    // 修改图片
    chosseImg() {
      const that = this;
      wx.chooseImage({
        success: res => {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: "base64", //编码格式
            success: ress => {
              //成功的回调
              that.imgBase.push({
                PicUrl:'data:image/png;base64,'+ress.data.toString()
              });
            }
          });
          
          //以下两行注释的是同步方法 转化后的base路径
          // that.imgBase = wx .getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
          // console.log("that.imgBase" + that.imgBase);
          // this.updateimg();
        }
      });
    },
    deleteImg(i){
        this.imgBase.splice(i,1)
        this.deleteImgIndex=''
        console.log(this.deleteImgIndex)
    },
    
    orderpay(){
      wx.navigateTo({ url: "/pages/locationcomplete/main" });
    },
    
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
