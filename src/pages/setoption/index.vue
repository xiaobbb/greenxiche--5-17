<template>
  <div class="backgray setlist">
    <div class="commonpad white">
      <div>
        <textarea name id maxlength="120" v-model="text" placeholder="请输入您的反馈问题及建议..."></textarea>
        <p class="nums">{{text.length}}/120</p>
      </div>
    </div>
    <upImg :imgLangth="4" @upImgs="upImgs" title="相关截图（选填）" addImgUrl="/static/images/bg20.png"></upImg>
    
    <div class="paybtn setbtn" @click="submit">确定</div>
  </div>
</template>

<script>
import { post } from "@/utils/index";
import upImg from "@/components/upImg.vue"
import "../../css/common.css";
import "../../css/global.css";
export default {
  onShow() {
    this.setBarTitle();
      this.userid=wx.getStorageSync("userId")
      this.token=wx.getStorageSync("token")
  },
  data() {
    return {
      text: "",
      imgBase: [],
      isShowBtnUpload:true,
      imgLenght:4,
      userid: '',
      token: ''
    };
  },

  components: {upImg},
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "意见反馈"
      });
    },
    // 上传图片
    upImgs(imgs){
      this.imgBase = imgs;
    },
    async submit() {
      console.log(JSON.stringify(this.imgBase));
      if (!this.text) {
        wx.showToast({
          title: "请输入反馈内容！",
          icon: "none"
        });
        return false;
      }
      const result = await post("User/MemberFeedBack", {
        UserId: this.userid,
        Token: this.token,
        Content: this.text,
        PicList: JSON.stringify(this.imgBase),
        Type: ""
      });

      wx.showToast({
        title: result.msg,
        icon: "success",
        duration: 2000,
        success: function() {
          setTimeout(function() {
            wx.navigateBack();
          }, 2000);
        }
      });
    },
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
@import "./style";
@import "../../css/common.css";
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
