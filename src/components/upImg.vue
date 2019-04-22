<template>
  <div class="relate white commonpad">
    <div class="flex-container comtitile">
      <p>{{title}}</p>
      <p class="nums">{{imgBase.length}}/{{imgLenght}}</p>
    </div>
    <div class="imgs">
      <div class="imgItem" v-for="(img,index) in imgPathArr" :key="index">
        <div class="delete" @click="deleteImg(index)">×</div>
        <img :src="img" alt>
      </div>
      <img
        :src="addImgUrl"
        @click="chosseImg"
        v-show="isShowBtnUpload"
        class="compics"
      >
    </div>
  </div>
</template>
<script>
export default {
    //title--上传图片标题
    //imgLenght--上传图片的最大数量 
    //addImgUrl -- 上传图片按钮的本地路径；默认不显示 addImgUrl='/static/images/camera.png'
    //返回upImgs事件---数组
    //  [
    //      {
    //         PicUrl:'base64:img' 
    //      },{
    //         PicUrl:'base64:img2' 
    //      }
    // ]
    props:{
        title:{
            type:String,
            default:'上传图片'
        },
        // 上传图片的最大数量
        imgLenght:{
            type:Number,
            default:4
        },
        addImgUrl:{
            type:String,
            default:''
        }
    },
  data() {
    return {
      imgBase: [],
      imgPathArr: [],
      isShowBtnUpload: true,
      imgLenght: 4 //图片最大数量
    };
  },
  onShow() {
      this.imgBase= []
      this.imgPathArr= []
  },
  methods: {
    // 修改图片
    chosseImg() {
      const that = this;
      let num = 0;
      if (that.imgPathArr.length < this.imgLenght) {
        num = this.imgLenght - that.imgPathArr.length;
        wx.chooseImage({
          count: num, //最大图片数量=最大数量-临时路径的数量
          sizeType: ["compressed"], //图片尺寸 original--原图；compressed--压缩图
          sourceType: ["album", "camera"], //选择图片的位置 album--相册选择, 'camera--使用相机
          success: res => {
            that.imgPathArr = that.imgPathArr.concat(res.tempFilePaths);
                    console.log(res.tempFilePaths,'base')
            // 判断是否大于图片最大数量
            if (that.imgPathArr.length === this.imgLenght) {
              that.isShowBtnUpload = false;
            }
            that.imgBase=[]
            // 根据临时路径数组imgPathArr获取base64图片
            for (let i = 0; i < that.imgPathArr.length; i++) {
              wx.getFileSystemManager().readFile({
                filePath: that.imgPathArr[i], //选择图片返回的相对路径
                encoding: "base64", //编码格式
                success: res => {
                  //成功的回调
                  that.imgBase.push({
                    PicUrl: "data:image/png;base64," + res.data.toString()
                  });
                  that.$emit('upImgs',that.imgBase)
                }
              });
            }
            // wx.getFileSystemManager().readFile({
            //   filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            //   encoding: "base64", //编码格式
            //   success: ress => {
            //     //成功的回调
            //     that.imgBase.push({
            //       PicUrl: "data:image/png;base64," + ress.data.toString()
            //     });
            //   }
            // });

            //以下两行注释的是同步方法 转化后的base路径
            // that.imgBase = wx .getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
            // console.log("that.imgBase" + that.imgBase);
            // this.updateimg();
          }
        });
      }
    },
    // 删除图片
    deleteImg(i) {
      this.imgBase.splice(i, 1);
      this.imgPathArr.splice(i, 1);
      if (this.imgPathArr.length < this.imgLenght) {
        this.isShowBtnUpload = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.nums {
  font-size: 24rpx;
  color: #999;
  text-align: right;
}
.compics {
  width: 156rpx;
  height: 156rpx;
}
.comtitile {
  margin-bottom: 20rpx;
}
.comtitile p:first-child {
  font-weight: bold;
}
.imgs {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  .imgItem {
    position: relative;
  }
  img {
    width: 156rpx;
    height: 156rpx;
    margin-right: 10rpx;
    margin-bottom: 20rpx;
  }
  .delete {
    width: 36rpx;
    height: 36rpx;
    line-height: 30rpx;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 34rpx;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    top: -15rpx;
    right: 0;
  }
}
</style>


