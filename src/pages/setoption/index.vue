<template>
  <div class="backgray setlist">
      <div class="commonpad white">
          <div>
              <textarea name="" id=""  maxlength="120" v-model="text" placeholder="请输入您的反馈问题及建议..."></textarea>
              <p class="nums">{{text.length}}/120</p>
          </div>
      </div>
      <div class="relate white commonpad ">
          <div class="flex-container comtitile">
              <p>相关截图（选填）</p>
              <p class="nums">{{imgBase.length}}/4</p>
          </div>
          <div class="imgs" >
              <div class="imgItem" v-for="(img,index) in imgBase" :key="index">
                <div class="delete"  @click="deleteImg(index)">×</div>
               <img :src="img.PicUrl" alt="">
              </div>
              <img src="/static/images/bg20.png" @click="chosseImg" v-show="!(imgBase.length >3)" class="compics">
          </div>
      </div>
      <div class="paybtn setbtn" @click="submit">确定</div>
      
  </div>
</template>

<script>
import {post} from "@/utils/index";
import "../../css/common.css";
import "../../css/global.css";
export default {
  onLoad(){
    this.setBarTitle();
  },
  data () {
    return {
      text:'',
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
        title: "意见反馈"
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
    async submit() {
      console.log(JSON.stringify(this.imgBase))
      if(!this.text){
        wx.showToast({
          title:'请输入反馈内容！',
          icon: "none"
        });
        return false;
      }
      const result = await post("User/MemberFeedBack", {
        UserId: this.userid,
        Token: this.token,
        Content: this.text,
        PicList: JSON.stringify(this.imgBase),
        Type:''
      });
        wx.showToast({
          title:result.msg,
          icon: "success"
        });
        wx.navigateBack();
    },
    deleteImg(i){
      this.imgBase.splice(i,1)
      this.deleteImgIndex=''
      console.log(this.deleteImgIndex)
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
  .imgs{
    display:flex;
    align-items:center;
    flex-flow:row wrap;
    .imgItem{
    position:relative;
    }
    img {
      width:156rpx;
      height:156rpx;
      margin-right:10rpx;
      margin-bottom:20rpx;
    }
    .delete{
      width:36rpx;
      height:36rpx;
      line-height:30rpx;
      background:rgba(0,0,0,.6);
      color:#fff;
      font-size:34rpx;
      text-align:center;
      border-radius:50%;
      position:absolute;
      top:-15rpx;
      right:0;
    }
  }
</style>
