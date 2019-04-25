<template>
  <div>
    <!--备注-->
    <div class="signtitle">
      <p>上传现场照片有助于洗车员快速找到车辆位置~</p>
      <p>不添加现场照片也可以提交订单</p>
    </div>
    <!--图片列表-->
    <div class="flex-container comtitile">
      <p>上传图片</p>
      <p class="nums">{{imgPathArr.length}}/{{imgLenght}}</p>
    </div>
    <div class="flex" style="justify-content:flex-start">
      <div
        class="flexitem"
        v-for="(img,index) in imgPathArr"
        :key="index"
      >
        <img :src="img" class="pic">
        <img src="/static/images/close5.png" class="close" @click="deleteImg(index)">
      </div>
      <div v-show="isShowBtnUpload">
        <img src="/static/images/bg20.png" class="pic" @click="chosseImg">
      </div>
    </div>
    <div class="paybtn" @click="submit">确定</div>
  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
  data() {
    return {
      isShowBtnUpload: true,
      imgLenght: 8,
      imgPathArr: [],
      // imgBase: []
    };
  },

  components: {},
  onLoad() {
    this.setBarTitle();
     if(this.$store.state.upImgPathArr.length>0){
    this.imgPathArr = this.$store.state.upImgPathArr;
    // this.upDateImg()
    // this.imgBase = this.$store.state.pList;
     }else{
       this.imgPathArr=[]
     }
    // console.log('执行了onLoad',this.imgPathArr,this.imgBase)
  },
  onShow() {
    // if(this.$store.state.pList.length>0){
    //   this.imgBase = this.$store.state.pList
    // }
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
      let num = 0;
      if (that.imgPathArr.length < this.imgLenght) {
        num = this.imgLenght - that.imgPathArr.length;
        wx.chooseImage({
          count: num,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: res => {
            console.log("选择的图片", res.tempFilePaths);
            console.log("选择的图片2", that.imgPathArr);
            that.imgPathArr=that.imgPathArr.concat(res.tempFilePaths);
            if (this.imgPathArr.length == this.imgLenght) {
              this.isShowBtnUpload = false;
            } else {
              this.isShowBtnUpload = true;
            }
            console.log("选择的图片3", that.imgPathArr);
            // that.upDateImg();
          }
        });
      }
    },
    upDateImg() {
      this.imgBase=[]
      for (let i = 0; i < this.imgPathArr.length; i += 1) {
        wx.getFileSystemManager().readFile({
          filePath: this.imgPathArr[i], //选择图片返回的相对路径
          encoding: "base64", //编码格式
          success: ress => {
            //成功的回调
            this.imgBase.push({
              PicUrl: "data:image/png;base64," + ress.data.toString()
            });
            console.log("上传后的图片", this.imgBase);
          }
        });
      }
    },
    deleteImg(i) {
      console.log('点击了删除',i)
      // this.imgBase.splice(i, 1);
      this.imgPathArr.splice(i, 1);
      if (this.imgPathArr.length < this.imgLenght) {
        this.isShowBtnUpload = true;
      }
      // this.upDateImg()
    },
    submit() {
      
      // this.$store.commit("update", { 'pList': this.imgBase });
      this.$store.commit("update", { 'upImgPathArr': this.imgPathArr });
      wx.navigateBack({ url: "/pages/location/main" });
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
.comtitile {
  margin: 0 20rpx 20rpx;
}
.comtitile p:first-child {
  font-weight: bold;
}
</style>
