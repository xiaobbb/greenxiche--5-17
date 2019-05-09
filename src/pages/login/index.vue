<template>
  <div class="login">
    <open-data class="icon icon_circular_bead" type="userAvatarUrl"></open-data>
    <div class="auth-text">
      <text class="main">{{title}}</text>
      <text class="sub">{{content}}</text>
    </div>
    <button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doBind">{{buttonText}}</button>
  </div>
</template>

<script>
import { host, myget, mypost } from "../../utils";
import logins from '@/utils/login'
// var qcloud = require("wafer2-client-sdk/index.js");
export default {
  onLoad(){
    //  this.askUrl = this.$root.$mp.query.askUrl;
    //  this.askUrl = this.askUrl.toString().replace(/\%3F/g, '?').replace(/\%3D/g, '=').replace(/\%26/g, '&');
    //   console.log("当前请求的路径："+this.askUrl);
  },
  onShow() {
    
        console.log('res1')
        const that = this;
    wx.getSetting({
      success(res){
        // 已授权
        if(res.authSetting['scope.userInfo']){
        console.log('res',res.authSetting['scope.userInfo'])
          that.title = '登录信息已过期或者已经失效，需重新进行登录'
          that.buttonText = '登录'
        }
        // 未授权
        else{

        }
      }
    })
  },
  created() {},
  data() {
    return {
      phonecode: "获取验证码",
      show: true,
      sessionId: "",
      openid: "",
      ivdata: "",
      encryptedData: "",
      count: "",
      timer: null,
      telNumber: "",
      code: "",
      accessToken: "",
      askUrl: "",
      // 是否授权的提示信息
      title:'该小程序由网坛科技开发，请提供以下授权，即可继续操作',
      content:'· 获得你的公开信息（昵称、头像等）',
      buttonText:'授权登录'
    };
  },
  components: {},
  methods: {
    doBind(){
        logins(true);
    },
    // 没作用上的函数
    setOpenId(session_id) {
      var sessionid = session_id;
      let that = this;
      wx.getUserInfo({
        success: function(res) {
          var userInfo = res.userInfo;
          //用户信息(object对象userInfo)存储到小程序本地；
          wx.setStorage({
            key: "userInfo",
            data: userInfo
          });

          var obj = {};
          obj.encryptedData = res.encryptedData;
          obj.iv = res.iv;
          obj.rawData = res.rawData;
          obj.signature = res.signature;
          var userdetail = {
            encryptedData: res.encryptedData,
            iv: res.iv,
            rawData: res.rawData,
            signature: res.signature
          };
          //先拿到微信用户的openid,授权之后每次登录，也需要获取这个openid
          wx.request({
            method: "POST",
            url:
              "https://auth.wtvxin.com/WxOpen/GetUserInfoAndOpenId?sessionId=" +
              sessionid,
            data: userdetail,
            header: {
              "content-type": "application/json" //默认值
            },
            success: function(res) {
              var openid = res.data.openId;
              wx.setStorageSync("openId", res.data.openId);
            },
            fail: function(error) {
              wx.showToast({
                title: "服务器开小差了，请重试",
                icon: "none",
                duration: 2000
              });
            },
            complete: function() {}
          });
        }
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
