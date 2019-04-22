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
      <p class="nums">{{imgBase.length}}/{{imgLenght}}</p>
    </div>
    <div class="flex" style="justify-content:flex-start">
        <div class="flexitem" style="margin-right:10rpx;" v-for="(img,index) in imgBase" :key="index">
            <img :src="img.PicUrl" class="pic">
            <img src="/static/images/close5.png" class="close"  @click="deleteImg(index)">
        </div>
        <div>
            <img src="/static/images/bg20.png" class="pic"  v-show="isShowBtnUpload" @click="chosseImg">
        </div>
    </div>
    <div class="paybtn" @click="submit">确定</div>
  </div>
</template>

<script>
import "../../css/common.css";
import "../../css/global.css";
export default {
  data () {
    return {
      isShowBtnUpload:true,
      imgLenght:8,
      // imgPathArr:[],
      imgBase:[],
    }
  },
 
  components: {
    
  },
  onLoad(){
    this.setBarTitle();
  },
  onShow(){
      if(this.$store.state.pList.length>0){
        this.imgBase = this.$store.state.pList
      }
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
      if(that.imgBase.length<this.imgLenght){
        num=this.imgLenght-that.imgBase.length;
         wx.chooseImage({
           count:num,
           sizeType:["compressed"],
           sourceType: ["album", "camera"],
            success: res => {
               const imgPathArr = res.tempFilePaths;
                for(let i=0;i<imgPathArr.length;i+=1){
                    wx.getFileSystemManager().readFile({
                    filePath: imgPathArr[i], //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success: ress => { //成功的回调
                      that.imgBase.push({
                        PicUrl: "data:image/png;base64," + ress.data.toString()
                      });
                      if(that.imgBase.length==that.imgLenght){
                        that.isShowBtnUpload=false
                      }
                    }
                  })
                }
            }
        });
      }
     
    },
    deleteImg(i){
        this.imgBase.splice(i,1)
        // this.imgPathArr.splice(i,1);
        if(this.imgBase.length<this.imgLenght){
          this.isShowBtnUpload = true;
        }
    },
    submit(){
      this.$store.commit("update",{"pList":this.imgBase})
      wx.navigateBack({ url: "/pages/location/main"});
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
.comtitile {
  margin:0 20rpx 20rpx;

}
.comtitile p:first-child {
  font-weight: bold;
}
</style>
